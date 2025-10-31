import { useDojoSDK } from "@dojoengine/sdk/react";

import { useEffect, useState, useMemo } from "react";
import { ModelsMapping } from "./models.gen";
import { addAddressPadding } from "starknet";

/**
 * Hook to read contract data from Dojo world
 * This replaces useScaffoldReadContract for Dojo compatibility
 * 
 * Maps Mastermind contract view functions to Dojo model queries
 */
export const useDojoReadContract = <T = any>({
    functionName,
    args,
}: {
    functionName: string;
    args?: any[];
    watch?: boolean;
}) => {
    const { useDojoStore } = useDojoSDK();
    const entities = useDojoStore((state) => state.entities);
    const [data, setData] = useState<T | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Memoize entity ID generation based on function and args
    const entityId = useMemo(() => {
        if (!args || args.some(arg => arg === undefined)) return undefined;

        switch (functionName) {
            case "get_player_id":
            case "get_player_name":
            case "get_player_active_game_ids":
            case "get_player_total_games_won":
            case "get_player_total_games_lost":
            case "get_player_total_games_tied":
            case "get_player_total_games_played":
                return args[0] ? addAddressPadding(args[0]) : undefined;

            case "get_game_opponent_address":
            case "get_game_creator_address":
            case "get_game_result":
            case "get_game_current_stage":
            case "get_game_current_round":
                return args[0]?.toString();

            case "get_game_submitted_guesses":
            case "get_game_solution_hash":
                return args[0] && args[1] 
                    ? `${args[0]}-${addAddressPadding(args[1])}`
                    : undefined;

            case "get_game_submitted_hit_and_blow":
                return args[0] && args[1]
                    ? `${args[0]}-${addAddressPadding(args[1])}`
                    : undefined;

            case "get_total_players_count":
            case "get_total_games_count":
                return "mastermind";

            case "get_available_game_ids":
                return "games_list";

            default:
                return undefined;
        }
    }, [functionName, JSON.stringify(args)]);

    const modelName = useMemo(() => {
        switch (functionName) {
            case "get_player_id":
            case "get_player_name":
            case "get_player_active_game_ids":
            case "get_player_total_games_won":
            case "get_player_total_games_lost":
            case "get_player_total_games_tied":
            case "get_player_total_games_played":
                return ModelsMapping.Player;

            case "get_game_opponent_address":
            case "get_game_creator_address":
            case "get_game_result":
            case "get_game_current_stage":
            case "get_game_current_round":
                return ModelsMapping.Game;

            case "get_game_submitted_guesses":
            case "get_game_solution_hash":
                return ModelsMapping.Guess;

            case "get_game_submitted_hit_and_blow":
                return ModelsMapping.HitAndBlow;

            case "get_total_players_count":
            case "get_total_games_count":
                return ModelsMapping.Mastermind;

            default:
                return undefined;
        }
    }, [functionName]);

    // Use the entity directly from the store instead of useModel hook
    const entity = entities[entityId || ""];

    useEffect(() => {
        const extractData = () => {
            try {
                setIsLoading(true);

                if (!entity) {
                    setData(undefined);
                    setError(null);
                    setIsLoading(false);
                    return;
                }

                // Get the specific model from the entity
                const model = modelName ? entity.models?.mastermind?.[modelName.split('-')[1] as keyof typeof entity.models.mastermind] : undefined;
                
                if (!model) {
                    setData(undefined);
                    setError(null);
                    setIsLoading(false);
                    return;
                }

                let result: any;

                switch (functionName) {
                    case "get_player_id":
                        result = model.player_id;
                        break;
                    case "get_player_name":
                        result = model.player_name;
                        break;
                    case "get_player_active_game_ids":
                        result = model.player_game_ids?.filter((gameId: number) => {
                            const gameEntity = entities[gameId.toString()];
                            return gameEntity?.models?.mastermind?.Game?.stage === "Playing";
                        }) || [];
                        break;
                    case "get_player_total_games_won":
                        result = model.games_won;
                        break;
                    case "get_player_total_games_lost":
                        result = model.games_lost;
                        break;
                    case "get_player_total_games_tied":
                        result = model.games_tied;
                        break;
                    case "get_player_total_games_played":
                        result = (model.games_won || 0) + (model.games_lost || 0) + (model.games_tied || 0);
                        break;

                    case "get_game_opponent_address":
                        result = model.opponent;
                        break;
                    case "get_game_creator_address":
                        result = model.creator;
                        break;
                    case "get_game_result":
                        result = model.game_result;
                        break;
                    case "get_game_current_stage":
                        result = model.stage;
                        break;
                    case "get_game_current_round":
                        result = model.current_round;
                        break;

                    case "get_game_submitted_guesses":
                        result = model.guess?.map((g: [number, number, number, number], index: number) => ({
                            g1: g[0],
                            g2: g[1],
                            g3: g[2],
                            g4: g[3],
                            submitted: model.submitted?.[index] || false,
                        })) || [];
                        break;

                    case "get_game_solution_hash":
                        result = model.solution_hash;
                        break;

                    case "get_game_submitted_hit_and_blow":
                        result = model.hit_and_blow?.map((hb: [number, number, boolean]) => ({
                            hit: hb[0],
                            blow: hb[1],
                            submitted: hb[2],
                        })) || [];
                        break;

                    case "get_total_players_count":
                        result = model.player_count;
                        break;

                    case "get_total_games_count":
                        result = model.game_count;
                        break;

                    case "get_available_game_ids":
                        result = Object.entries(entities)
                            .filter(([_, entity]) => {
                                const game = entity.models?.mastermind?.Game;
                                return game?.stage === "WaitingForOpponent";
                            })
                            .map(([entityId, _]) => parseInt(entityId));
                        break;

                    default:
                        result = undefined;
                }

                setData(result as T);
                setError(null);
            } catch (err) {
                console.error(`Error reading ${functionName}:`, err);
                setError(err as Error);
                setData(undefined);
            } finally {
                setIsLoading(false);
            }
        };

        extractData();
    }, [functionName, entity, entities, modelName, JSON.stringify(args)]);

    const refetch = () => {
        setIsLoading(true);
    };

    return {
        data,
        isLoading,
        error,
        refetch,
    };
};
