// Auto-generated types for Mastermind Dojo models
// Based on the Cairo models in packages/contracts/dojoimpl/src/models.cairo

export interface Guess {
    id: number;
    player_address: string;
    guess: Array<[number, number, number, number]>;
    submitted: boolean[];
    solution_hash: bigint;
    guess_index: bigint;
}

export interface HitAndBlow {
    game_id: number;
    player_address: string;
    hit_and_blow: Array<[number, number, boolean]>;
}

export interface Game {
    id: number;
    creator: string;
    opponent: string;
    stage: Stages;
    game_result: GameResult;
    current_round: number;
}

export interface Player {
    address: string;
    player_id: number;
    player_name: string;
    player_game_ids: number[];
    games_won: number;
    games_lost: number;
    games_tied: number;
}

export interface Mastermind {
    id: string;
    player_count: number;
    game_count: number;
}

export enum Stages {
    Init = "Init",
    CreatorCommitSolutionHash = "CreatorCommitSolutionHash",
    WaitingForOpponent = "WaitingForOpponent",
    OpponentCommitSolutionHash = "OpponentCommitSolutionHash",
    Playing = "Playing",
    Reveal = "Reveal",
}

export enum GameResult {
    Undecided = "Undecided",
    Win = "Win",
    Tie = "Tie",
}

// Schema type for the Dojo SDK
export interface SchemaType {
    mastermind: {
        Guess: Guess;
        HitAndBlow: HitAndBlow;
        Game: Game;
        Player: Player;
        Mastermind: Mastermind;
    };
    [key: string]: any; // Index signature for Dojo SDK compatibility
}

// Models mapping for queries
export const ModelsMapping = {
    Guess: "mastermind-Guess",
    HitAndBlow: "mastermind-HitAndBlow",
    Game: "mastermind-Game",
    Player: "mastermind-Player",
    Mastermind: "mastermind-Mastermind",
};
