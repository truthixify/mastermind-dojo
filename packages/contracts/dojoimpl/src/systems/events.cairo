use mastermind::systems::enums::{GameResult, Stages};
use starknet::ContractAddress;
// --- Event Struct Definitions ---

/// Event data for when a new game is initialized.
#[derive(Drop, Copy, Serde)]
#[dojo::event]
pub struct InitializeGame {
    /// The address of the player who initialized the game (game creator).
    #[key] // Indexed field for easier off-chain querying.
    pub account: ContractAddress,
    /// The unique ID of the newly initialized game.
    pub game_id: u32,
}

/// Event data for when a new player registers.
#[derive(Drop, Copy, Serde)]
#[dojo::event]
pub struct RegisterPlayer {
    /// The address of the registered player.
    #[key]
    pub account: ContractAddress,
    /// The unique ID assigned to the player.
    pub player_id: u32,
}

/// Event data for when a player commits the hash of their secret solution.
#[derive(Drop, Copy, Serde)]
#[dojo::event]
pub struct CommitSolutionHash {
    /// The address of the player committing the hash.
    #[key]
    pub account: ContractAddress,
    /// The committed hash of the solution (typically Poseidon(solution_packed, salt)).
    pub solution_hash: u256,
}

/// Event data for when a player submits a guess.
#[derive(Drop, Serde)]
#[dojo::event]
pub struct SubmitGuess {
    /// The address of the player submitting the guess.
    #[key]
    pub account: ContractAddress,
    /// The current round number within the game when this guess was submitted for this player.
    pub current_round: u8,
    /// The submitted guess (an array of 4 numbers, typically 0-7).
    pub guess: Array<u8>,
}

/// Event data for when a player submits hit and blow counts for their opponent's guess.
/// This event is emitted after successful ZK proof verification.
#[derive(Drop, Copy, Serde)]
#[dojo::event]
pub struct SubmitHitAndBlow {
    /// The address of the player providing the feedback (hits/blows) for their opponent's
    /// guess.
    #[key]
    pub account: ContractAddress,
    /// The round number corresponding to this feedback.
    pub current_round: u8,
    /// The number of "hits" (correct number in correct position).
    pub hit: u8,
    /// The number of "blows" (correct number in wrong position).
    pub blow: u8,
}

/// Event data for when a player reveals their secret solution.
/// This usually happens at the end of the game or if a player wins and needs to prove their
/// solution.
#[derive(Drop, Serde)]
#[dojo::event]
pub struct RevealSolution {
    /// The address of the player revealing their solution.
    #[key]
    pub account: ContractAddress,
    /// The ID of the game for which the solution is revealed.
    #[key]
    pub game_id: u32,
    /// The actual secret solution (an array of 4 numbers).
    pub solution: Array<u8>,
}

/// Event data for when a game finishes.
#[derive(Drop, Copy, Serde)]
#[dojo::event]
pub struct GameFinish {
    /// The ID of the finished game.
    #[key]
    pub game_id: u32,
    /// The outcome of the game (e.g., Win(winner_address), Tie, Undecided).
    pub game_result: GameResult,
}

/// Event data for when the game's current stage changes.
#[derive(Drop, Copy, Serde)]
#[dojo::event]
pub struct StageChange {
    /// The new stage of the game (e.g., Playing, Reveal).
    #[key]
    pub game_id: u32,
    pub stage: Stages,
}

/// Event data for when an opponent joins a game.
#[derive(Drop, Copy, Serde)]
#[dojo::event]
pub struct OpponentJoined {
    /// The address of the opponent who joined the game.
    #[key]
    pub account: ContractAddress,
    /// The ID of the game joined by the opponent.
    pub game_id: u32,
}
