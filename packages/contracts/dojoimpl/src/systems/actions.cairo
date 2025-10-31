#[dojo::contract]
pub mod actions {
    // Import necessary Cairo core libraries and StarkNet functionalities.
    use core::array::ArrayTrait; // For dynamic arrays.
    use core::circuit::u384; // For u384 arithmetic, used in hashing.
    use core::num::traits::Zero; // For checking if a value is zero.
    use dojo::event::EventStorage;
    use dojo::model::{Model, ModelStorage};
    use dojo::world::WorldStorage;
    use garaga::hashes::poseidon_hash_2_bn254; // Poseidon hash function for cryptographic commitments.
    use starknet::{
        ContractAddress, SyscallResultTrait, get_caller_address, syscalls,
    }; // StarkNet specific utilities.
    use crate::models::{
        Game, Guess, GuessResponse, GuessSchema, HitAndBlow, HitAndBlowResponse, Mastermind, Player,
        PlayerGames,
    }; // Custom data structures for game entities.
    use crate::systems::enums::{GameResult, Stages}; // Custom enums for game state and results.
    use crate::systems::events::*;
    use crate::systems::interface::IMastermind; // The external interface for this contract.

    // Constants
    /// Maximum number of rounds allowed in a single game. A round consists of one guess from each
    /// player.
    /// So, each player gets MAX_ROUND / 2 guesses.
    pub const MAX_ROUND: u64 = 10;
    /// Class hash of the ZK verifier contract used to verify hit/blow proofs.
    /// This contract is called to ensure that the reported hits and blows are correct
    /// without revealing the secret code.
    pub const VERIFIER_CLASSHASH: felt252 =
        0x01a9aa9d61d25fe04260e5e6b9ec7bdbed753a31c99f8cd47e39d6a528bb820b;

    pub const MASTER: felt252 = 'MASTERMIND';


    #[abi(embed_v0)]
    impl MastermindImpl of IMastermind<ContractState> {
        /// Registers a new player in the Mastermind game system.
        /// A player must be registered before they can create or join games.
        /// Each player is assigned a unique player ID.
        ///
        /// # Arguments
        /// * `ref self`: A mutable reference to the contract's state.
        /// * `player_name`: A `felt252` representing the desired display name for the player.
        ///
        /// # Panics
        /// * If the `get_caller_address()` is already registered (i.e., `player.player_id` is not
        /// its default zero value).
        ///
        /// # Emits
        /// * `Event::RegisterPlayer` on successful registration.
        fn register_player(ref self: ContractState, player_name: felt252) {
            let caller = get_caller_address();
            let mut world = self.world_default();
            let mut m: Mastermind = world.read_model(MASTER);

            let mut player: Player = world.read_model(caller);
            assert!(player.player_id == 0, "User already registered");

            player.player_id = m.player_count;
            player.player_name = player_name;
            m.player_count += 1;

            world.write_model(@m);
            world.write_model(@player);
            let event = RegisterPlayer { account: caller, player_id: player.player_id };
            world.emit_event(@event);
        }

        /// Initializes a new game instance.
        /// The caller of this function becomes the creator of the game.
        /// The game is assigned a new unique ID and set to the `CreatorCommitSolutionHash` stage.
        ///
        /// # Arguments
        /// * `ref self`: A mutable reference to the contract's state.
        ///
        /// # Panics
        /// * If the caller (`get_caller_address()`) is not registered as a player.
        ///
        /// # Emits
        /// * `Event::InitializeGame` on successful game initialization.
        fn init_game(ref self: ContractState) {
            let creator_address = get_caller_address();
            let mut world = self.world_default();

            let mut player: Player = world.read_model(creator_address);
            let mut m: Mastermind = world.read_model(MASTER);
            assert!(
                player.player_id >= 0 && m.player_count > 0,
                "You need to register first before you can start a game",
            );

            // Game id starts from 1 and increments, unlike the previous impl
            let mut game: Game = world.read_model(m.game_count + 1);
            game.stage = Stages::CreatorCommitSolutionHash;
            game.current_round = 1;
            game.creator = creator_address;
            player.player_game_ids.append(m.game_count + 1);
            m.game_count += 1;

            world.write_model(@m);
            world.write_model(@player);
            world.write_model(@game);

            let event = InitializeGame { account: creator_address, game_id: game.id };
            world.emit_event(@event);
        }

        /// Allows a registered player to join an existing game that is waiting for an opponent.
        /// The caller becomes the opponent in the specified game.
        ///
        /// # Arguments
        /// * `ref self`: A mutable reference to the contract's state.
        /// * `game_id`: The `u32` ID of the game to join.
        ///
        /// # Panics
        /// * If the caller (`get_caller_address()`) is not registered as a player.
        /// * If the caller is the creator of the game (`game.creator.read() == opponent_address`).
        /// * If an opponent has already joined the game (`!game.opponent.read().is_zero()`).
        /// * If the game is not in the `Stages::WaitingForOpponent` stage (implicitly, as the stage
        /// is only updated if this condition is met).
        ///
        /// # Emits
        /// * `Event::OpponentJoined` if the player successfully joins the game.
        fn join_game(ref self: ContractState, game_id: u32) {
            let opponent_address = get_caller_address();
            let mut world = self.world_default();

            let mut game: Game = world.read_model(game_id);
            let mut player: Player = world.read_model(opponent_address);
            let mut m: Mastermind = world.read_model(MASTER);

            let total_players_count = m.player_count;

            assert!(
                player.player_id >= 0 && total_players_count > 0,
                "You need to register first before you can join a game",
            );
            assert!(game.creator != opponent_address, "You cannot join your own game");
            assert!(game.opponent.is_zero(), "Opponent already joined");

            if game.stage == Stages::WaitingForOpponent {
                game.opponent = opponent_address;
                game.stage = Stages::OpponentCommitSolutionHash;
                player.player_game_ids.append(game_id);

                let event = OpponentJoined { account: opponent_address, game_id };
                world.emit_event(@event);
                world.write_model(@game);
                world.write_model(@player);
            }
        }

        /// Allows a player (creator or opponent) to commit the hash of their secret solution for a
        /// game.
        /// This must be done before the guessing phase (`Stages::Playing`) begins.
        ///
        /// # Arguments
        /// * `ref self`: A mutable reference to the contract's state.
        /// * `game_id`: The `u32` ID of the game.
        /// * `solution_hash`: A `u256` representing the hash of the player's secret code and a
        /// salt.
        ///
        /// # Panics
        /// * If the game is not in the `Stages::CreatorCommitSolutionHash` or
        /// `Stages::OpponentCommitSolutionHash` stage.
        ///
        /// # Emits
        /// * `Event::CommitSolutionHash` for the committing player.
        /// * `Event::StageChange` to `Stages::WaitingForOpponent` if the creator commits and no
        /// opponent has committed yet.
        /// * `Event::StageChange` to `Stages::Playing` if both players have committed their
        /// solution hashes.
        fn commit_solution_hash(ref self: ContractState, game_id: u32, solution_hash: u256) {
            let mut world = self.world_default();
            let mut game: Game = world.read_model(game_id);
            let creator_address = game.creator;
            let opponent_address = game.opponent;
            let caller = get_caller_address();

            assert!(
                game.stage == Stages::CreatorCommitSolutionHash
                    || game.stage == Stages::OpponentCommitSolutionHash,
                "Not in CommitSolutionHash stage",
            );

            // Combine solution hash into the guess struct
            let solution_key = Model::<Guess>::ptr_from_keys((game_id, caller));
            world.write_member(solution_key, selector!("solution_hash"), solution_hash);

            let event = CommitSolutionHash { account: caller, solution_hash };
            world.emit_event(@event);

            let csk = Model::<Guess>::ptr_from_keys((game_id, creator_address));
            let creator_solution_hash = world.read_member(csk, selector!("solution_hash"));
            let osk = Model::<Guess>::ptr_from_keys((game_id, opponent_address));
            let opponent_solution_hash = world.read_member(osk, selector!("solution_hash"));

            if creator_solution_hash != 0 && opponent_solution_hash != 0 {
                game.stage = Stages::Playing;
            } else if creator_solution_hash != 0 {
                game.stage = Stages::WaitingForOpponent;
            }

            let event = StageChange { game_id, stage: game.stage };
            world.emit_event(@event);
            world.write_model(@game);
        }

        /// Allows a player to submit their guess for the opponent's secret code.
        ///
        /// # Arguments
        /// * `ref self`: A mutable reference to the contract's state.
        /// * `game_id`: The `u32` ID of the game.
        /// * `guess`: An `Array<u8>` of length 4 representing the player's guess. Each element is a
        /// digit.
        ///
        /// # Panics
        /// * If the game is not in the `Stages::Playing` stage.
        /// * If the `guess` array length is not equal to 4.
        /// * If the player has already submitted `MAX_ROUND / 2` guesses.
        ///
        /// # Emits
        /// * `Event::SubmitGuess` on successful guess submission.
        fn submit_guess(ref self: ContractState, game_id: u32, guess: Array<u8>) {
            let mut world = self.world_default();
            let mut game: Game = world.read_model(game_id);
            let player_address = get_caller_address();

            assert!(game.stage == Stages::Playing, "Not in Playing stage");
            assert!(guess.len() == 4, "Guess length must be 4");

            let mut guess_ref: Guess = world.read_model((game_id, player_address));
            let player_current_round = guess_ref.guess_index;
            let current_round = game.current_round;

            assert!(player_current_round <= MAX_ROUND / 2, "Max round reached");
            let current_guess = (*guess.at(0), *guess.at(1), *guess.at(2), *guess.at(3));
            guess_ref.submitted.append(true); // for guess index
            guess_ref.guess.append(current_guess);
            game.current_round += 1;

            world.write_model(@game);
            world.write_model(@guess_ref);

            let event = SubmitGuess { account: player_address, current_round, guess };
            world.emit_event(@event);
        }

        /// Submits a Zero-Knowledge Proof to verify the hit and blow counts for an opponent's
        /// guess.
        /// The caller is the player whose code was guessed, and they are providing feedback.
        /// The proof is verified by an external verifier contract specified by
        /// `VERIFIER_CLASSHASH`.
        ///
        /// # Arguments
        /// * `ref self`: A mutable reference to the contract's state.
        /// * `game_id`: The `u32` ID of the game.
        /// * `full_proof_with_hints`: A `Span<felt252>` containing the ZK proof data and public
        /// inputs.
        ///
        /// # Panics
        /// * If the ZK proof verification fails (e.g., `library_call_syscall` returns an error or
        /// deserialization fails).
        /// * If the game ends in a win (`hit == 4`) but the `solution_hash` from the proof's public
        /// inputs
        ///   does not match the caller's committed `solution_hash`.
        /// * If `hit == 4` but `blow != 0`.
        ///
        /// # Emits
        /// * `Event::SubmitHitAndBlow` on successful proof verification and feedback submission.
        /// * `Event::GameFinish` if the submission results in a win or a tie.
        fn submit_hit_and_blow_proof(
            ref self: ContractState, game_id: u32, full_proof_with_hints: Span<felt252>,
        ) {
            let mut result = syscalls::library_call_syscall(
                VERIFIER_CLASSHASH.try_into().unwrap(),
                selector!("verify_ultra_starknet_honk_proof"),
                full_proof_with_hints,
            )
                .unwrap_syscall();
            let public_inputs = Serde::<Option<Span<u256>>>::deserialize(ref result)
                .unwrap()
                .expect('Proof is invalid');
            let solution_hash = *public_inputs.at(4);
            let num_hit = *public_inputs.at(5);
            let num_blow = *public_inputs.at(6);

            let mut world = self.world_default();
            let mut game: Game = world.read_model(game_id);
            let player_address =
                get_caller_address(); // Player whose code was guessed, providing feedback

            let hit: u8 = num_hit.try_into().unwrap();
            let blow: u8 = num_blow.try_into().unwrap();

            let mut hb: HitAndBlow = world.read_model((game_id, player_address));
            hb.hit_and_blow.append((hit, blow, true));

            // let submitted_hit_and_blow = game.submitted_hit_and_blow;
            // let player_submitted_hit_and_blow = submitted_hit_and_blow.entry(player_address);
            // player_submitted_hit_and_blow.push(HitAndBlow { hit, blow, submitted: true });

            // Determine the opponent (the one who made the guess and might have won)

            let opponent_address = if player_address == game.creator {
                game.opponent
            } else {
                game.creator
            };

            let mut player: Player = world
                .read_model(player_address); // The one whose code was guessed (potential loser)
            let mut opponent: Player = world
                .read_model(opponent_address); // The one who guessed (potential winner)
            if hit == 4 && game.game_result == GameResult::Undecided {
                let shk = Model::<Guess>::ptr_from_keys((game_id, player_address));
                let solution_hash_ref = world.read_member(shk, selector!("solution_hash"));
                assert!(solution_hash == solution_hash_ref, "Solution hash is not correct");
                assert!(blow == 0, "Blow is not 0");
                game.game_result = GameResult::Win(opponent_address);
                game.stage = Stages::Reveal;
                opponent.games_won += 1;
                player.games_lost += 1;

                let event = GameFinish { game_id, game_result: game.game_result };
                world.emit_event(@event);
            } else if game.current_round > MAX_ROUND.try_into().unwrap()
                && game.game_result == GameResult::Undecided {
                // Check if max rounds reached
                game.game_result = GameResult::Tie;
                game.stage = Stages::Reveal;

                // Update tie stats for both players involved
                player.games_tied += 1;
                opponent.games_tied += 1;
                let event = GameFinish { game_id, game_result: game.game_result };
                world.emit_event(@event);
            }

            let event = SubmitHitAndBlow {
                account: player_address, current_round: game.current_round, hit, blow,
            };
            world.emit_event(@event);
            world.write_model(@game);
            world.write_model(@player);
            world.write_model(@opponent);
        }

        /// Allows a player to reveal their secret solution for a game, typically after the game has
        /// concluded.
        /// The revealed solution is verified against the hash committed at the beginning of the
        /// game.
        ///
        /// # Arguments
        /// * `ref self`: A mutable reference to the contract's state.
        /// * `game_id`: The `u32` ID of the game.
        /// * `solution`: An `Array<u8>` of length 4 representing the player's secret solution.
        /// * `salt`: The `u256` salt value used with the solution to generate the committed hash.
        ///
        /// # Panics
        /// * If the game is not in the `Stages::Reveal` stage.
        /// * If the `solution` array length is not equal to 4.
        /// * If the Poseidon hash of the provided `solution` (packed) and `salt` does not match
        ///   the `solution_hash` committed by the caller for this game.
        ///
        /// # Emits
        /// * `Event::RevealSolution` on successful solution reveal and verification.
        fn reveal_solution(ref self: ContractState, game_id: u32, solution: Array<u8>, salt: u256) {
            let mut world = self.world_default();
            let game_key = Model::<Game>::ptr_from_keys(game_id);
            let stage = world.read_member(game_key, selector!("stage"));

            assert!(stage == Stages::Reveal, "Not in Reveal stage");
            assert!(solution.len() == 4, "Solution length must be 4");

            let caller = get_caller_address();
            let shk = Model::<Guess>::ptr_from_keys((game_id, caller));
            let solution_hash: u256 = world.read_member(shk, selector!("solution_hash"));

            let s0_u256: u256 = (*solution.at(0)).into();
            let s1_u256: u256 = (*solution.at(1)).into();
            let s2_u256: u256 = (*solution.at(2)).into();
            let s3_u256: u256 = (*solution.at(3)).into();
            // Pack solution into a u384 for hashing: s0 + s1*256 + s2*256^2 + s3*256^3
            let prep_solution: u384 = (s0_u256
                + s1_u256 * 256
                + s2_u256 * 256 * 256
                + s3_u256 * 256 * 256 * 256)
                .into();
            let salt_u384: u384 = salt.into();
            let computed_hash = poseidon_hash_2_bn254(prep_solution, salt_u384);

            assert!(computed_hash == solution_hash.into(), "Invalid solution");

            let event = RevealSolution { account: caller, game_id, solution };
            world.emit_event(@event);
        }

        // --- Getter Functions ---

        /// Retrieves all submitted guesses for a specific player in a given game.
        ///
        /// # Arguments
        /// * `self`: A snapshot of the contract's state.
        /// * `game_id`: The `u32` ID of the game.
        /// * `player_address`: The `ContractAddress` of the player whose guesses are requested.
        ///
        /// # Returns
        /// An `Array<Guess>` containing all guesses submitted by the specified player in the game.
        fn get_game_submitted_guesses(
            self: @ContractState, game_id: u32, player_address: ContractAddress,
        ) -> Array<GuessResponse> {
            let mut world = self.world_default();
            let guess_key = Model::<Guess>::ptr_from_keys((game_id, player_address));

            let gs: GuessSchema = world.read_schema(guess_key);
            let guesses: Array<(u8, u8, u8, u8)> = gs.guess;
            let submitted = gs.submitted;

            let mut submitted_guesses = array![];

            for i in 0..guesses.len() {
                let (g1, g2, g3, g4) = *guesses.at(i);
                let guess = GuessResponse { g1, g2, g3, g4, submitted: *submitted.at(i) };
                submitted_guesses.append(guess);
            }

            submitted_guesses
        }

        /// Retrieves the unique ID of a registered player.
        ///
        /// # Arguments
        /// * `self`: A snapshot of the contract's state.
        /// * `player_address`: The `ContractAddress` of the player.
        ///
        /// # Returns
        /// The `u32` player ID. Returns 0 if the player is not registered or if 0 was the first
        /// assigned ID.
        fn get_player_id(self: @ContractState, player_address: ContractAddress) -> u32 {
            let mut world = self.world_default();
            let key = Model::<Player>::ptr_from_keys(player_address);
            world.read_member(key, selector!("player_id"))
        }

        /// Retrieves the name of a registered player.
        ///
        /// # Arguments
        /// * `self`: A snapshot of the contract's state.
        /// * `player_address`: The `ContractAddress` of the player.
        ///
        /// # Returns
        /// The `felt252` player name.
        fn get_player_name(self: @ContractState, player_address: ContractAddress) -> felt252 {
            let mut world = self.world_default();
            let key = Model::<Player>::ptr_from_keys(player_address);
            world.read_member(key, selector!("player_name"))
        }

        /// Retrieves the `ContractAddress` of the creator of a specific game.
        ///
        /// # Arguments
        /// * `self`: A snapshot of the contract's state.
        /// * `game_id`: The `u32` ID of the game.
        ///
        /// # Returns
        /// The `ContractAddress` of the game creator.
        fn get_game_creator_address(self: @ContractState, game_id: u32) -> ContractAddress {
            let mut world = self.world_default();
            let key = Model::<Game>::ptr_from_keys(game_id);
            world.read_member(key, selector!("creator"))
        }

        /// Retrieves the `ContractAddress` of the opponent in a specific game.
        ///
        /// # Arguments
        /// * `self`: A snapshot of the contract's state.
        /// * `game_id`: The `u32` ID of the game.
        ///
        /// # Returns
        /// The `ContractAddress` of the opponent. Returns a zero address if no opponent has joined.
        fn get_game_opponent_address(self: @ContractState, game_id: u32) -> ContractAddress {
            let mut world = self.world_default();
            let key = Model::<Game>::ptr_from_keys(game_id);
            world.read_member(key, selector!("opponent"))
        }

        /// Retrieves all submitted hit and blow feedback by a specific player for their opponent's
        /// guesses in a given game.
        ///
        /// # Arguments
        /// * `self`: A snapshot of the contract's state.
        /// * `game_id`: The `u32` ID of the game.
        /// * `player_address`: The `ContractAddress` of the player who submitted the hit/blow
        /// feedback.
        ///
        /// # Returns
        /// An `Array<HitAndBlow>` containing the hit and blow records submitted by the player.
        fn get_game_submitted_hit_and_blow(
            self: @ContractState, game_id: u32, player_address: ContractAddress,
        ) -> Array<HitAndBlowResponse> {
            let mut world = self.world_default();
            let hb_key = Model::<HitAndBlow>::ptr_from_keys((game_id, player_address));
            let mut hit_and_blows = array![];
            let hit_and_blows_ref: Array<(u8, u8, bool)> = world
                .read_member(hb_key, selector!("hit_and_blow"));

            for i in 0..hit_and_blows_ref.len() {
                let (hit, blow, submitted) = *hit_and_blows_ref.at(i);
                let hab = HitAndBlowResponse { hit, blow, submitted };
                hit_and_blows.append(hab);
            }

            hit_and_blows
        }

        /// Retrieves the result of a specific game.
        ///
        /// # Arguments
        /// * `self`: A snapshot of the contract's state.
        /// * `game_id`: The `u32` ID of the game.
        ///
        /// # Returns
        /// The `GameResult` enum indicating the game's outcome (e.g., Win, Tie, Undecided).
        fn get_game_result(self: @ContractState, game_id: u32) -> GameResult {
            let mut world = self.world_default();
            let key = Model::<Game>::ptr_from_keys(game_id);
            world.read_member(key, selector!("game_result"))
        }

        /// Retrieves the current stage of a specific game.
        ///
        /// # Arguments
        /// * `self`: A snapshot of the contract's state.
        /// * `game_id`: The `u32` ID of the game.
        ///
        /// # Returns
        /// The `Stages` enum representing the current stage of the game.
        fn get_game_current_stage(self: @ContractState, game_id: u32) -> Stages {
            let mut world = self.world_default();
            let key = Model::<Game>::ptr_from_keys(game_id);
            world.read_member(key, selector!("stage"))
        }

        /// Retrieves the committed solution hash for a specific player in a given game.
        ///
        /// # Arguments
        /// * `self`: A snapshot of the contract's state.
        /// * `game_id`: The `u32` ID of the game.
        /// * `player_address`: The `ContractAddress` of the player.
        ///
        /// # Returns
        /// The `u256` solution hash. Returns 0 if no hash has been committed by this player for
        /// this game.
        fn get_game_solution_hash(
            self: @ContractState, game_id: u32, player_address: ContractAddress,
        ) -> u256 {
            let mut world = self.world_default();
            let shk = Model::<Guess>::ptr_from_keys((game_id, player_address));
            world.read_member(shk, selector!("solution_hash"))
        }

        /// Retrieves the current round number for a specific game.
        /// This typically represents the total number of guesses made by both players combined up
        /// to this point.
        ///
        /// # Arguments
        /// * `self`: A snapshot of the contract's state.
        /// * `game_id`: The `u32` ID of the game.
        ///
        /// # Returns
        /// The current round number as `u8`.
        fn get_game_current_round(self: @ContractState, game_id: u32) -> u8 {
            let mut world = self.world_default();
            let key = Model::<Game>::ptr_from_keys(game_id);
            world.read_member(key, selector!("current_round"))
        }

        /// Retrieves the total number of registered players in the system.
        ///
        /// # Arguments
        /// * `self`: A snapshot of the contract's state.
        ///
        /// # Returns
        /// The total player count as `u32`.
        fn get_total_players_count(self: @ContractState) -> u32 {
            let mut world = self.world_default();
            let m: Mastermind = world.read_model(MASTER);
            m.player_count
        }

        /// Retrieves the total number of games created in the system.
        ///
        /// # Arguments
        /// * `self`: A snapshot of the contract's state.
        ///
        /// # Returns
        /// The total game count as `u32`.
        fn get_total_games_count(self: @ContractState) -> u32 {
            let mut world = self.world_default();
            let m: Mastermind = world.read_model(MASTER);
            m.game_count
        }

        /// Retrieves a list of game IDs where the specified player is currently active
        /// (i.e., the game is in the `Stages::Playing` stage).
        ///
        /// # Arguments
        /// * `self`: A snapshot of the contract's state.
        /// * `player_address`: The `ContractAddress` of the player.
        ///
        /// # Returns
        /// An `Array<u32>` of game IDs where the player is actively playing.
        fn get_player_active_game_ids(
            self: @ContractState, player_address: ContractAddress,
        ) -> Array<u32> {
            let mut world = self.world_default();
            let mut active_game_ids: Array<u32> = array![];
            let player_key = Model::<Player>::ptr_from_keys(player_address);
            let player_game_ids: Array<u32> = world
                .read_member(player_key, selector!("player_game_ids"));
            for i in 0..player_game_ids.len() {
                let game_id = *player_game_ids.at(i);
                let game_key = Model::<Game>::ptr_from_keys(game_id);
                let game_stage: Stages = world.read_member(game_key, selector!("stage"));
                if game_stage == Stages::Playing {
                    active_game_ids.append(game_id);
                }
            }
            active_game_ids
        }

        /// Retrieves a list of game IDs that are currently available for joining.
        /// An available game is one that is in the `Stages::WaitingForOpponent` stage
        /// and was not created by the caller.
        ///
        /// # Arguments
        /// * `self`: A snapshot of the contract's state.
        ///
        /// # Returns
        /// An `Array<u32>` of available game IDs.
        fn get_available_game_ids(self: @ContractState) -> Array<u32> {
            let mut world = self.world_default();
            let m: Mastermind = world.read_model(MASTER);
            let total_games_count = m.game_count;
            let mut available_game_ids: Array<u32> = array![];

            for i in 0..total_games_count {
                let game_key = Model::<Game>::ptr_from_keys(i);
                let game_stage: Stages = world.read_member(game_key, selector!("stage"));
                let game_creator: ContractAddress = world
                    .read_member(game_key, selector!("creator"));
                let caller = get_caller_address();
                if game_stage == Stages::WaitingForOpponent && game_creator != caller {
                    available_game_ids.append(i + 1); // Game IDs start from 1
                }
            }
            available_game_ids
        }

        /// Retrieves the total number of games won by a specific player.
        ///
        /// # Arguments
        /// * `self`: A snapshot of the contract's state.
        /// * `player_address`: The `ContractAddress` of the player.
        ///
        /// # Returns
        /// The total number of games won by the player as `u32`.
        fn get_player_total_games_won(
            self: @ContractState, player_address: ContractAddress,
        ) -> u32 {
            let mut world = self.world_default();
            let key = Model::<Player>::ptr_from_keys(player_address);
            world.read_member(key, selector!("games_won"))
        }

        /// Retrieves the total number of games lost by a specific player.
        ///
        /// # Arguments
        /// * `self`: A snapshot of the contract's state.
        /// * `player_address`: The `ContractAddress` of the player.
        ///
        /// # Returns
        /// The total number of games lost by the player as `u32`.
        fn get_player_total_games_lost(
            self: @ContractState, player_address: ContractAddress,
        ) -> u32 {
            let mut world = self.world_default();
            let key = Model::<Player>::ptr_from_keys(player_address);
            world.read_member(key, selector!("games_lost"))
        }

        /// Retrieves the total number of games tied by a specific player.
        ///
        /// # Arguments
        /// * `self`: A snapshot of the contract's state.
        /// * `player_address`: The `ContractAddress` of the player.
        ///
        /// # Returns
        /// The total number of games tied by the player as `u32`.
        fn get_player_total_games_tied(
            self: @ContractState, player_address: ContractAddress,
        ) -> u32 {
            let mut world = self.world_default();
            let key = Model::<Player>::ptr_from_keys(player_address);
            world.read_member(key, selector!("games_tied"))
        }

        /// Retrieves the total number of games played (won + lost + tied) by a specific player.
        ///
        /// # Arguments
        /// * `self`: A snapshot of the contract's state.
        /// * `player_address`: The `ContractAddress` of the player.
        ///
        /// # Returns
        /// The total number of games played by the player as `u32`.
        fn get_player_total_games_played(
            self: @ContractState, player_address: ContractAddress,
        ) -> u32 {
            let mut world = self.world_default();
            let key = Model::<Player>::ptr_from_keys(player_address);
            let pg: PlayerGames = world.read_schema(key);
            pg.games_won + pg.games_lost + pg.games_tied
        }
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn world_default(self: @ContractState) -> WorldStorage {
            self.world(@"poker")
        }
    }
}
