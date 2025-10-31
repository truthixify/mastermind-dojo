import { useAccount } from "@starknet-react/core";
import { useState, useCallback } from "react";
import { useSystemCalls } from "./useSystemCalls";

/**
 * Hook to write to Dojo contracts
 * This replaces useScaffoldWriteContract for Dojo compatibility
 * 
 * Provides a similar API to useScaffoldWriteContract but uses Dojo system calls
 */
export const useDojoWriteContract = () => {
    const { account } = useAccount();
    const systemCalls = useSystemCalls();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<any>(undefined);

    const writeAsync = useCallback(async ({
        functionName,
        args = [],
    }: {
        functionName: string;
        args?: any[];
    }) => {
        if (!account) {
            const err = new Error("No account connected");
            setError(err);
            throw err;
        }

        setIsPending(true);
        setError(null);
        setData(undefined);

        try {
            let result: any;

            switch (functionName) {
                case "init_game":
                    result = await systemCalls.initGame();
                    break;

                case "register_player":
                    if (!args[0]) throw new Error("Player name is required");
                    result = await systemCalls.registerPlayer(args[0]);
                    break;

                case "join_game":
                    if (args[0] === undefined) throw new Error("Game ID is required");
                    result = await systemCalls.joinGame(args[0]);
                    break;

                case "commit_solution_hash":
                    if (args[0] === undefined) throw new Error("Game ID is required");
                    if (args[1] === undefined) throw new Error("Solution hash is required");
                    result = await systemCalls.commitSolutionHash(args[0], args[1]);
                    break;

                case "submit_guess":
                    if (args[0] === undefined) throw new Error("Game ID is required");
                    if (!args[1] || !Array.isArray(args[1])) throw new Error("Guess array is required");
                    if (args[1].length !== 4) throw new Error("Guess must have exactly 4 elements");
                    result = await systemCalls.submitGuess(args[0], args[1]);
                    break;

                case "submit_hit_and_blow_proof":
                    if (args[0] === undefined) throw new Error("Game ID is required");
                    if (!args[1] || !Array.isArray(args[1])) throw new Error("Proof array is required");
                    result = await systemCalls.submitHitAndBlowProof(args[0], args[1]);
                    break;

                case "reveal_solution":
                    if (args[0] === undefined) throw new Error("Game ID is required");
                    if (!args[1] || !Array.isArray(args[1])) throw new Error("Solution array is required");
                    if (args[1].length !== 4) throw new Error("Solution must have exactly 4 elements");
                    if (args[2] === undefined) throw new Error("Salt is required");
                    result = await systemCalls.revealSolution(args[0], args[1], args[2]);
                    break;

                default:
                    throw new Error(`Unknown function: ${functionName}. Available functions: init_game, register_player, join_game, commit_solution_hash, submit_guess, submit_hit_and_blow_proof, reveal_solution`);
            }

            setData(result);
            return result;
        } catch (err) {
            const error = err as Error;
            setError(error);
            console.error(`Error executing ${functionName}:`, error);
            throw error;
        } finally {
            setIsPending(false);
        }
    }, [account, systemCalls]);

    const reset = useCallback(() => {
        setIsPending(false);
        setError(null);
        setData(undefined);
    }, []);

    return {
        writeAsync,
        isPending,
        error,
        data,
        reset,
    };
};
