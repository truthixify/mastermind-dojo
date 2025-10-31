import type { DojoCall, DojoProvider } from "@dojoengine/core";
import type { Account, AccountInterface } from "starknet";

export function setupWorld(provider: DojoProvider) {
    // Init game
    const build_init_game_calldata = (): DojoCall => {
        return {
            contractName: "actions",
            entrypoint: "init_game",
            calldata: [],
        };
    };

    const init_game = async (snAccount: Account | AccountInterface) => {
        try {
            return await provider.execute(
                snAccount as any,
                build_init_game_calldata(),
                "mastermind"
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // Register player
    const build_register_player_calldata = (playerName: string): DojoCall => {
        return {
            contractName: "actions",
            entrypoint: "register_player",
            calldata: [playerName],
        };
    };

    const register_player = async (
        snAccount: Account | AccountInterface,
        playerName: string
    ) => {
        try {
            return await provider.execute(
                snAccount as any,
                build_register_player_calldata(playerName),
                "mastermind"
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // Join game
    const build_join_game_calldata = (gameId: number): DojoCall => {
        return {
            contractName: "actions",
            entrypoint: "join_game",
            calldata: [gameId],
        };
    };

    const join_game = async (
        snAccount: Account | AccountInterface,
        gameId: number
    ) => {
        try {
            return await provider.execute(
                snAccount as any,
                build_join_game_calldata(gameId),
                "mastermind"
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // Commit solution hash
    const build_commit_solution_hash_calldata = (
        gameId: number,
        solutionHash: bigint
    ): DojoCall => {
        return {
            contractName: "actions",
            entrypoint: "commit_solution_hash",
            calldata: [gameId, solutionHash],
        };
    };

    const commit_solution_hash = async (
        snAccount: Account | AccountInterface,
        gameId: number,
        solutionHash: bigint
    ) => {
        try {
            return await provider.execute(
                snAccount as any,
                build_commit_solution_hash_calldata(gameId, solutionHash),
                "mastermind"
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // Submit guess
    const build_submit_guess_calldata = (
        gameId: number,
        guess: number[]
    ): DojoCall => {
        return {
            contractName: "actions",
            entrypoint: "submit_guess",
            calldata: [gameId, ...guess],
        };
    };

    const submit_guess = async (
        snAccount: Account | AccountInterface,
        gameId: number,
        guess: number[]
    ) => {
        try {
            return await provider.execute(
                snAccount as any,
                build_submit_guess_calldata(gameId, guess),
                "mastermind"
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // Submit hit and blow proof
    const build_submit_hit_and_blow_proof_calldata = (
        gameId: number,
        proof: bigint[]
    ): DojoCall => {
        return {
            contractName: "actions",
            entrypoint: "submit_hit_and_blow_proof",
            calldata: [gameId, ...proof],
        };
    };

    const submit_hit_and_blow_proof = async (
        snAccount: Account | AccountInterface,
        gameId: number,
        proof: bigint[]
    ) => {
        try {
            return await provider.execute(
                snAccount as any,
                build_submit_hit_and_blow_proof_calldata(gameId, proof),
                "mastermind"
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // Reveal solution
    const build_reveal_solution_calldata = (
        gameId: number,
        solution: number[],
        salt: bigint
    ): DojoCall => {
        return {
            contractName: "actions",
            entrypoint: "reveal_solution",
            calldata: [gameId, ...solution, salt],
        };
    };

    const reveal_solution = async (
        snAccount: Account | AccountInterface,
        gameId: number,
        solution: number[],
        salt: bigint
    ) => {
        try {
            return await provider.execute(
                snAccount as any,
                build_reveal_solution_calldata(gameId, solution, salt),
                "mastermind"
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return {
        actions: {
            init_game,
            buildInitGameCalldata: build_init_game_calldata,
            register_player,
            buildRegisterPlayerCalldata: build_register_player_calldata,
            join_game,
            buildJoinGameCalldata: build_join_game_calldata,
            commit_solution_hash,
            buildCommitSolutionHashCalldata: build_commit_solution_hash_calldata,
            submit_guess,
            buildSubmitGuessCalldata: build_submit_guess_calldata,
            submit_hit_and_blow_proof,
            buildSubmitHitAndBlowProofCalldata: build_submit_hit_and_blow_proof_calldata,
            reveal_solution,
            buildRevealSolutionCalldata: build_reveal_solution_calldata,
        },
    };
}