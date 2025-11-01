import { DojoProvider, DojoCall } from "@dojoengine/core";
import { Account, AccountInterface, BigNumberish, CairoOption, CairoCustomEnum } from "starknet";
import * as models from "./models.gen";

export function setupWorld(provider: DojoProvider) {

	const build_actions_commitSolutionHash_calldata = (gameId: BigNumberish, solutionHash: BigNumberish): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "commit_solution_hash",
			calldata: [gameId, solutionHash],
		};
	};

	const actions_commitSolutionHash = async (snAccount: Account | AccountInterface, gameId: BigNumberish, solutionHash: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_commitSolutionHash_calldata(gameId, solutionHash),
				"mastermind",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_getAvailableGameIds_calldata = (): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "get_available_game_ids",
			calldata: [],
		};
	};

	const actions_getAvailableGameIds = async () => {
		try {
			return await provider.call("mastermind", build_actions_getAvailableGameIds_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_getGameCreatorAddress_calldata = (gameId: BigNumberish): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "get_game_creator_address",
			calldata: [gameId],
		};
	};

	const actions_getGameCreatorAddress = async (gameId: BigNumberish) => {
		try {
			return await provider.call("mastermind", build_actions_getGameCreatorAddress_calldata(gameId));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_getGameCurrentRound_calldata = (gameId: BigNumberish): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "get_game_current_round",
			calldata: [gameId],
		};
	};

	const actions_getGameCurrentRound = async (gameId: BigNumberish) => {
		try {
			return await provider.call("mastermind", build_actions_getGameCurrentRound_calldata(gameId));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_getGameCurrentStage_calldata = (gameId: BigNumberish): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "get_game_current_stage",
			calldata: [gameId],
		};
	};

	const actions_getGameCurrentStage = async (gameId: BigNumberish) => {
		try {
			return await provider.call("mastermind", build_actions_getGameCurrentStage_calldata(gameId));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_getGameOpponentAddress_calldata = (gameId: BigNumberish): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "get_game_opponent_address",
			calldata: [gameId],
		};
	};

	const actions_getGameOpponentAddress = async (gameId: BigNumberish) => {
		try {
			return await provider.call("mastermind", build_actions_getGameOpponentAddress_calldata(gameId));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_getGameResult_calldata = (gameId: BigNumberish): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "get_game_result",
			calldata: [gameId],
		};
	};

	const actions_getGameResult = async (gameId: BigNumberish) => {
		try {
			return await provider.call("mastermind", build_actions_getGameResult_calldata(gameId));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_getGameSolutionHash_calldata = (gameId: BigNumberish, playerAddress: string): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "get_game_solution_hash",
			calldata: [gameId, playerAddress],
		};
	};

	const actions_getGameSolutionHash = async (gameId: BigNumberish, playerAddress: string) => {
		try {
			return await provider.call("mastermind", build_actions_getGameSolutionHash_calldata(gameId, playerAddress));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_getGameSubmittedGuesses_calldata = (gameId: BigNumberish, playerAddress: string): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "get_game_submitted_guesses",
			calldata: [gameId, playerAddress],
		};
	};

	const actions_getGameSubmittedGuesses = async (gameId: BigNumberish, playerAddress: string) => {
		try {
			return await provider.call("mastermind", build_actions_getGameSubmittedGuesses_calldata(gameId, playerAddress));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_getGameSubmittedHitAndBlow_calldata = (gameId: BigNumberish, playerAddress: string): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "get_game_submitted_hit_and_blow",
			calldata: [gameId, playerAddress],
		};
	};

	const actions_getGameSubmittedHitAndBlow = async (gameId: BigNumberish, playerAddress: string) => {
		try {
			return await provider.call("mastermind", build_actions_getGameSubmittedHitAndBlow_calldata(gameId, playerAddress));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_getPlayerActiveGameIds_calldata = (playerAddress: string): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "get_player_active_game_ids",
			calldata: [playerAddress],
		};
	};

	const actions_getPlayerActiveGameIds = async (playerAddress: string) => {
		try {
			return await provider.call("mastermind", build_actions_getPlayerActiveGameIds_calldata(playerAddress));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_getPlayerId_calldata = (playerAddress: string): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "get_player_id",
			calldata: [playerAddress],
		};
	};

	const actions_getPlayerId = async (playerAddress: string) => {
		try {
			return await provider.call("mastermind", build_actions_getPlayerId_calldata(playerAddress));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_getPlayerName_calldata = (playerAddress: string): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "get_player_name",
			calldata: [playerAddress],
		};
	};

	const actions_getPlayerName = async (playerAddress: string) => {
		try {
			return await provider.call("mastermind", build_actions_getPlayerName_calldata(playerAddress));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_getPlayerTotalGamesLost_calldata = (playerAddress: string): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "get_player_total_games_lost",
			calldata: [playerAddress],
		};
	};

	const actions_getPlayerTotalGamesLost = async (playerAddress: string) => {
		try {
			return await provider.call("mastermind", build_actions_getPlayerTotalGamesLost_calldata(playerAddress));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_getPlayerTotalGamesPlayed_calldata = (playerAddress: string): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "get_player_total_games_played",
			calldata: [playerAddress],
		};
	};

	const actions_getPlayerTotalGamesPlayed = async (playerAddress: string) => {
		try {
			return await provider.call("mastermind", build_actions_getPlayerTotalGamesPlayed_calldata(playerAddress));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_getPlayerTotalGamesTied_calldata = (playerAddress: string): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "get_player_total_games_tied",
			calldata: [playerAddress],
		};
	};

	const actions_getPlayerTotalGamesTied = async (playerAddress: string) => {
		try {
			return await provider.call("mastermind", build_actions_getPlayerTotalGamesTied_calldata(playerAddress));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_getPlayerTotalGamesWon_calldata = (playerAddress: string): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "get_player_total_games_won",
			calldata: [playerAddress],
		};
	};

	const actions_getPlayerTotalGamesWon = async (playerAddress: string) => {
		try {
			return await provider.call("mastermind", build_actions_getPlayerTotalGamesWon_calldata(playerAddress));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_getTotalGamesCount_calldata = (): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "get_total_games_count",
			calldata: [],
		};
	};

	const actions_getTotalGamesCount = async () => {
		try {
			return await provider.call("mastermind", build_actions_getTotalGamesCount_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_getTotalPlayersCount_calldata = (): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "get_total_players_count",
			calldata: [],
		};
	};

	const actions_getTotalPlayersCount = async () => {
		try {
			return await provider.call("mastermind", build_actions_getTotalPlayersCount_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_initGame_calldata = (): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "init_game",
			calldata: [],
		};
	};

	const actions_initGame = async (snAccount: Account | AccountInterface) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_initGame_calldata(),
				"mastermind",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_joinGame_calldata = (gameId: BigNumberish): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "join_game",
			calldata: [gameId],
		};
	};

	const actions_joinGame = async (snAccount: Account | AccountInterface, gameId: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_joinGame_calldata(gameId),
				"mastermind",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_registerPlayer_calldata = (playerName: BigNumberish): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "register_player",
			calldata: [playerName],
		};
	};

	const actions_registerPlayer = async (snAccount: Account | AccountInterface, playerName: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_registerPlayer_calldata(playerName),
				"mastermind",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_revealSolution_calldata = (gameId: BigNumberish, solution: Array<BigNumberish>, salt: BigNumberish): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "reveal_solution",
			calldata: [gameId, solution, salt],
		};
	};

	const actions_revealSolution = async (snAccount: Account | AccountInterface, gameId: BigNumberish, solution: Array<BigNumberish>, salt: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_revealSolution_calldata(gameId, solution, salt),
				"mastermind",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_submitGuess_calldata = (gameId: BigNumberish, guess: Array<BigNumberish>): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "submit_guess",
			calldata: [gameId, guess],
		};
	};

	const actions_submitGuess = async (snAccount: Account | AccountInterface, gameId: BigNumberish, guess: Array<BigNumberish>) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_submitGuess_calldata(gameId, guess),
				"mastermind",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_actions_submitHitAndBlowProof_calldata = (gameId: BigNumberish, fullProofWithHints: Array<BigNumberish>): DojoCall => {
		return {
			contractName: "actions",
			entrypoint: "submit_hit_and_blow_proof",
			calldata: [gameId, fullProofWithHints],
		};
	};

	const actions_submitHitAndBlowProof = async (snAccount: Account | AccountInterface, gameId: BigNumberish, fullProofWithHints: Array<BigNumberish>) => {
		try {
			return await provider.execute(
				snAccount,
				build_actions_submitHitAndBlowProof_calldata(gameId, fullProofWithHints),
				"mastermind",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};



	return {
		actions: {
			commitSolutionHash: actions_commitSolutionHash,
			buildCommitSolutionHashCalldata: build_actions_commitSolutionHash_calldata,
			getAvailableGameIds: actions_getAvailableGameIds,
			buildGetAvailableGameIdsCalldata: build_actions_getAvailableGameIds_calldata,
			getGameCreatorAddress: actions_getGameCreatorAddress,
			buildGetGameCreatorAddressCalldata: build_actions_getGameCreatorAddress_calldata,
			getGameCurrentRound: actions_getGameCurrentRound,
			buildGetGameCurrentRoundCalldata: build_actions_getGameCurrentRound_calldata,
			getGameCurrentStage: actions_getGameCurrentStage,
			buildGetGameCurrentStageCalldata: build_actions_getGameCurrentStage_calldata,
			getGameOpponentAddress: actions_getGameOpponentAddress,
			buildGetGameOpponentAddressCalldata: build_actions_getGameOpponentAddress_calldata,
			getGameResult: actions_getGameResult,
			buildGetGameResultCalldata: build_actions_getGameResult_calldata,
			getGameSolutionHash: actions_getGameSolutionHash,
			buildGetGameSolutionHashCalldata: build_actions_getGameSolutionHash_calldata,
			getGameSubmittedGuesses: actions_getGameSubmittedGuesses,
			buildGetGameSubmittedGuessesCalldata: build_actions_getGameSubmittedGuesses_calldata,
			getGameSubmittedHitAndBlow: actions_getGameSubmittedHitAndBlow,
			buildGetGameSubmittedHitAndBlowCalldata: build_actions_getGameSubmittedHitAndBlow_calldata,
			getPlayerActiveGameIds: actions_getPlayerActiveGameIds,
			buildGetPlayerActiveGameIdsCalldata: build_actions_getPlayerActiveGameIds_calldata,
			getPlayerId: actions_getPlayerId,
			buildGetPlayerIdCalldata: build_actions_getPlayerId_calldata,
			getPlayerName: actions_getPlayerName,
			buildGetPlayerNameCalldata: build_actions_getPlayerName_calldata,
			getPlayerTotalGamesLost: actions_getPlayerTotalGamesLost,
			buildGetPlayerTotalGamesLostCalldata: build_actions_getPlayerTotalGamesLost_calldata,
			getPlayerTotalGamesPlayed: actions_getPlayerTotalGamesPlayed,
			buildGetPlayerTotalGamesPlayedCalldata: build_actions_getPlayerTotalGamesPlayed_calldata,
			getPlayerTotalGamesTied: actions_getPlayerTotalGamesTied,
			buildGetPlayerTotalGamesTiedCalldata: build_actions_getPlayerTotalGamesTied_calldata,
			getPlayerTotalGamesWon: actions_getPlayerTotalGamesWon,
			buildGetPlayerTotalGamesWonCalldata: build_actions_getPlayerTotalGamesWon_calldata,
			getTotalGamesCount: actions_getTotalGamesCount,
			buildGetTotalGamesCountCalldata: build_actions_getTotalGamesCount_calldata,
			getTotalPlayersCount: actions_getTotalPlayersCount,
			buildGetTotalPlayersCountCalldata: build_actions_getTotalPlayersCount_calldata,
			initGame: actions_initGame,
			buildInitGameCalldata: build_actions_initGame_calldata,
			joinGame: actions_joinGame,
			buildJoinGameCalldata: build_actions_joinGame_calldata,
			registerPlayer: actions_registerPlayer,
			buildRegisterPlayerCalldata: build_actions_registerPlayer_calldata,
			revealSolution: actions_revealSolution,
			buildRevealSolutionCalldata: build_actions_revealSolution_calldata,
			submitGuess: actions_submitGuess,
			buildSubmitGuessCalldata: build_actions_submitGuess_calldata,
			submitHitAndBlowProof: actions_submitHitAndBlowProof,
			buildSubmitHitAndBlowProofCalldata: build_actions_submitHitAndBlowProof_calldata,
		},
	};
}