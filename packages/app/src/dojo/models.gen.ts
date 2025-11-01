import type { SchemaType as ISchemaType } from "@dojoengine/sdk";

import { CairoCustomEnum, BigNumberish } from 'starknet';

// Type definition for `mastermind::models::Game` struct
export interface Game {
	id: BigNumberish;
	creator: string;
	opponent: string;
	stage: StagesEnum;
	game_result: GameResultEnum;
	current_round: BigNumberish;
}

// Type definition for `mastermind::models::Guess` struct
export interface Guess {
	id: BigNumberish;
	player_address: string;
	guess: Array<[BigNumberish, BigNumberish, BigNumberish, BigNumberish]>;
	submitted: Array<boolean>;
	solution_hash: BigNumberish;
	guess_index: BigNumberish;
}

// Type definition for `mastermind::models::HitAndBlow` struct
export interface HitAndBlow {
	game_id: BigNumberish;
	player_address: string;
	hit_and_blow: Array<[BigNumberish, BigNumberish, boolean]>;
}

// Type definition for `mastermind::models::Mastermind` struct
export interface Mastermind {
	id: BigNumberish;
	player_count: BigNumberish;
	game_count: BigNumberish;
}

// Type definition for `mastermind::models::Player` struct
export interface Player {
	address: string;
	player_id: BigNumberish;
	player_name: BigNumberish;
	player_game_ids: Array<BigNumberish>;
	games_won: BigNumberish;
	games_lost: BigNumberish;
	games_tied: BigNumberish;
}

// Type definition for `mastermind::systems::events::CommitSolutionHash` struct
export interface CommitSolutionHash {
	account: string;
	solution_hash: BigNumberish;
}

// Type definition for `mastermind::systems::events::GameFinish` struct
export interface GameFinish {
	game_id: BigNumberish;
	game_result: GameResultEnum;
}

// Type definition for `mastermind::systems::events::InitializeGame` struct
export interface InitializeGame {
	account: string;
	game_id: BigNumberish;
}

// Type definition for `mastermind::systems::events::OpponentJoined` struct
export interface OpponentJoined {
	account: string;
	game_id: BigNumberish;
}

// Type definition for `mastermind::systems::events::RegisterPlayer` struct
export interface RegisterPlayer {
	account: string;
	player_id: BigNumberish;
}

// Type definition for `mastermind::systems::events::RevealSolution` struct
export interface RevealSolution {
	account: string;
	game_id: BigNumberish;
	solution: Array<BigNumberish>;
}

// Type definition for `mastermind::systems::events::StageChange` struct
export interface StageChange {
	game_id: BigNumberish;
	stage: StagesEnum;
}

// Type definition for `mastermind::systems::events::SubmitGuess` struct
export interface SubmitGuess {
	account: string;
	current_round: BigNumberish;
	guess: Array<BigNumberish>;
}

// Type definition for `mastermind::systems::events::SubmitHitAndBlow` struct
export interface SubmitHitAndBlow {
	account: string;
	current_round: BigNumberish;
	hit: BigNumberish;
	blow: BigNumberish;
}

// Type definition for `mastermind::models::GuessResponse` struct
export interface GuessResponse {
	g1: BigNumberish;
	g2: BigNumberish;
	g3: BigNumberish;
	g4: BigNumberish;
	submitted: boolean;
}

// Type definition for `mastermind::models::HitAndBlowResponse` struct
export interface HitAndBlowResponse {
	hit: BigNumberish;
	blow: BigNumberish;
	submitted: boolean;
}

// Type definition for `mastermind::systems::enums::GameResult` enum
export const gameResult = [
	'Undecided',
	'Win',
	'Tie',
] as const;
export type GameResult = { [key in typeof gameResult[number]]: string };
export type GameResultEnum = CairoCustomEnum;

// Type definition for `mastermind::systems::enums::Stages` enum
export const stages = [
	'Init',
	'CreatorCommitSolutionHash',
	'WaitingForOpponent',
	'OpponentCommitSolutionHash',
	'Playing',
	'Reveal',
] as const;
export type Stages = { [key in typeof stages[number]]: string };
export type StagesEnum = CairoCustomEnum;

export interface SchemaType extends ISchemaType {
	mastermind: {
		Game: Game,
		Guess: Guess,
		HitAndBlow: HitAndBlow,
		Mastermind: Mastermind,
		Player: Player,
		CommitSolutionHash: CommitSolutionHash,
		GameFinish: GameFinish,
		InitializeGame: InitializeGame,
		OpponentJoined: OpponentJoined,
		RegisterPlayer: RegisterPlayer,
		RevealSolution: RevealSolution,
		StageChange: StageChange,
		SubmitGuess: SubmitGuess,
		SubmitHitAndBlow: SubmitHitAndBlow,
		GuessResponse: GuessResponse,
		HitAndBlowResponse: HitAndBlowResponse,
	},
}
export const schema: SchemaType = {
	mastermind: {
		Game: {
			id: 0,
			creator: "",
			opponent: "",
		stage: new CairoCustomEnum({ 
					Init: "",
				CreatorCommitSolutionHash: undefined,
				WaitingForOpponent: undefined,
				OpponentCommitSolutionHash: undefined,
				Playing: undefined,
				Reveal: undefined, }),
		game_result: new CairoCustomEnum({ 
					Undecided: "",
				Win: undefined,
				Tie: undefined, }),
			current_round: 0,
		},
		Guess: {
			id: 0,
			player_address: "",
			guess: [[0, 0, 0, 0]],
			submitted: [false],
		solution_hash: 0,
			guess_index: 0,
		},
		HitAndBlow: {
			game_id: 0,
			player_address: "",
			hit_and_blow: [[0, 0, false]],
		},
		Mastermind: {
			id: 0,
			player_count: 0,
			game_count: 0,
		},
		Player: {
			address: "",
			player_id: 0,
			player_name: 0,
			player_game_ids: [0],
			games_won: 0,
			games_lost: 0,
			games_tied: 0,
		},
		CommitSolutionHash: {
			account: "",
		solution_hash: 0,
		},
		GameFinish: {
			game_id: 0,
		game_result: new CairoCustomEnum({ 
					Undecided: "",
				Win: undefined,
				Tie: undefined, }),
		},
		InitializeGame: {
			account: "",
			game_id: 0,
		},
		OpponentJoined: {
			account: "",
			game_id: 0,
		},
		RegisterPlayer: {
			account: "",
			player_id: 0,
		},
		RevealSolution: {
			account: "",
			game_id: 0,
			solution: [0],
		},
		StageChange: {
			game_id: 0,
		stage: new CairoCustomEnum({ 
					Init: "",
				CreatorCommitSolutionHash: undefined,
				WaitingForOpponent: undefined,
				OpponentCommitSolutionHash: undefined,
				Playing: undefined,
				Reveal: undefined, }),
		},
		SubmitGuess: {
			account: "",
			current_round: 0,
			guess: [0],
		},
		SubmitHitAndBlow: {
			account: "",
			current_round: 0,
			hit: 0,
			blow: 0,
		},
		GuessResponse: {
			g1: 0,
			g2: 0,
			g3: 0,
			g4: 0,
			submitted: false,
		},
		HitAndBlowResponse: {
			hit: 0,
			blow: 0,
			submitted: false,
		},
	},
};
export enum ModelsMapping {
	Game = 'mastermind-Game',
	Guess = 'mastermind-Guess',
	HitAndBlow = 'mastermind-HitAndBlow',
	Mastermind = 'mastermind-Mastermind',
	Player = 'mastermind-Player',
	GameResult = 'mastermind-GameResult',
	Stages = 'mastermind-Stages',
	CommitSolutionHash = 'mastermind-CommitSolutionHash',
	GameFinish = 'mastermind-GameFinish',
	InitializeGame = 'mastermind-InitializeGame',
	OpponentJoined = 'mastermind-OpponentJoined',
	RegisterPlayer = 'mastermind-RegisterPlayer',
	RevealSolution = 'mastermind-RevealSolution',
	StageChange = 'mastermind-StageChange',
	SubmitGuess = 'mastermind-SubmitGuess',
	SubmitHitAndBlow = 'mastermind-SubmitHitAndBlow',
	GuessResponse = 'mastermind-GuessResponse',
	HitAndBlowResponse = 'mastermind-HitAndBlowResponse',
}