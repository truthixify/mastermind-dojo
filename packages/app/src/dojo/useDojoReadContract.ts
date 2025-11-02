import { useEffect, useState, useCallback } from "react";
import { dojoProvider } from "./types";

/**
 * Hook to read contract data from Dojo world
 * This replaces useScaffoldReadContract for Dojo compatibility
 * 
 * Calls Mastermind contract view functions directly
 */
export const useDojoReadContract = <T = any>({
    functionName,
    args,
    watch = false,
}: {
    functionName: string;
    args?: any[];
    watch?: boolean;
}) => {
    const [data, setData] = useState<T | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Create contract call function
    const callContract = useCallback(async () => {
        if (!functionName) return;

        // Skip if required args are missing
        const requiredArgsFunctions = [
            "get_player_id", "get_player_name", "get_player_active_game_ids",
            "get_player_total_games_won", "get_player_total_games_lost",
            "get_player_total_games_tied", "get_player_total_games_played",
            "get_game_opponent_address", "get_game_creator_address", "get_game_result",
            "get_game_current_stage", "get_game_current_round",
            "get_game_submitted_guesses", "get_game_solution_hash", "get_game_submitted_hit_and_blow"
        ];

        if (requiredArgsFunctions.includes(functionName) && (!args || args.some(arg => arg === undefined))) {
            setData(undefined);
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            let result: any;

            // Build the call data based on function name
            const buildCallData = () => {
                switch (functionName) {
                    case "get_available_game_ids":
                        return {
                            contractName: "actions",
                            entrypoint: "get_available_game_ids",
                            calldata: [],
                        };
                    case "get_total_players_count":
                        return {
                            contractName: "actions",
                            entrypoint: "get_total_players_count",
                            calldata: [],
                        };
                    case "get_total_games_count":
                        return {
                            contractName: "actions",
                            entrypoint: "get_total_games_count",
                            calldata: [],
                        };
                    case "get_player_id":
                        return {
                            contractName: "actions",
                            entrypoint: "get_player_id",
                            calldata: [args![0]],
                        };
                    case "get_player_name":
                        return {
                            contractName: "actions",
                            entrypoint: "get_player_name",
                            calldata: [args![0]],
                        };
                    case "get_player_active_game_ids":
                        return {
                            contractName: "actions",
                            entrypoint: "get_player_active_game_ids",
                            calldata: [args![0]],
                        };
                    case "get_player_total_games_won":
                        return {
                            contractName: "actions",
                            entrypoint: "get_player_total_games_won",
                            calldata: [args![0]],
                        };
                    case "get_player_total_games_lost":
                        return {
                            contractName: "actions",
                            entrypoint: "get_player_total_games_lost",
                            calldata: [args![0]],
                        };
                    case "get_player_total_games_tied":
                        return {
                            contractName: "actions",
                            entrypoint: "get_player_total_games_tied",
                            calldata: [args![0]],
                        };
                    case "get_player_total_games_played":
                        return {
                            contractName: "actions",
                            entrypoint: "get_player_total_games_played",
                            calldata: [args![0]],
                        };
                    case "get_game_opponent_address":
                        return {
                            contractName: "actions",
                            entrypoint: "get_game_opponent_address",
                            calldata: [args![0]],
                        };
                    case "get_game_creator_address":
                        return {
                            contractName: "actions",
                            entrypoint: "get_game_creator_address",
                            calldata: [args![0]],
                        };
                    case "get_game_result":
                        return {
                            contractName: "actions",
                            entrypoint: "get_game_result",
                            calldata: [args![0]],
                        };
                    case "get_game_current_stage":
                        return {
                            contractName: "actions",
                            entrypoint: "get_game_current_stage",
                            calldata: [args![0]],
                        };
                    case "get_game_current_round":
                        return {
                            contractName: "actions",
                            entrypoint: "get_game_current_round",
                            calldata: [args![0]],
                        };
                    case "get_game_submitted_guesses":
                        return {
                            contractName: "actions",
                            entrypoint: "get_game_submitted_guesses",
                            calldata: [args![0], args![1]],
                        };
                    case "get_game_solution_hash":
                        return {
                            contractName: "actions",
                            entrypoint: "get_game_solution_hash",
                            calldata: [args![0], args![1]],
                        };
                    case "get_game_submitted_hit_and_blow":
                        return {
                            contractName: "actions",
                            entrypoint: "get_game_submitted_hit_and_blow",
                            calldata: [args![0], args![1]],
                        };
                    default:
                        throw new Error(`Unknown function: ${functionName}`);
                }
            };

            const callData = buildCallData();
            result = await dojoProvider.call("mastermind", callData);

            setData(result as T);
        } catch (err) {
            console.error(`Error calling ${functionName}:`, err);
            setError(err as Error);
            setData(undefined);
        } finally {
            setIsLoading(false);
        }
    }, [functionName, JSON.stringify(args)]);

    // Call contract on mount and when dependencies change
    useEffect(() => {
        callContract();
    }, [callContract]);

    // Set up polling for watch mode
    useEffect(() => {
        if (!watch) return;

        const interval = setInterval(() => {
            callContract();
        }, 2000); // Poll every 2 seconds

        return () => clearInterval(interval);
    }, [watch, callContract]);

    const refetch = useCallback(() => {
        callContract();
    }, [callContract]);

    return {
        data,
        isLoading,
        error,
        refetch,
    };
};
