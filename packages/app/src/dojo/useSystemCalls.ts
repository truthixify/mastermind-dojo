import { useDojoSDK } from "@dojoengine/sdk/react";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useAccount } from "@starknet-react/core";
import { v4 as uuidv4 } from "uuid";
import { dojoProvider } from "./types";
import { useState } from "react";

/**
 * Custom hook to handle Mastermind system calls and state management.
 * Provides functionality for game actions with optimistic updates.
 */
export const useSystemCalls = () => {
    const { useDojoStore } = useDojoSDK();
    const state = useDojoStore((state) => state);
    const { account } = useAccount();

    const initGame = async () => {
        if (!account) throw new Error("No account connected");

        const transactionId = uuidv4();
        const playerEntityId = getEntityIdFromKeys([BigInt(account.address)]);

        state.applyOptimisticUpdate(transactionId, (draft) => {
            if (draft.entities[playerEntityId]?.models?.mastermind?.Player) {
                // Game will be added when event is received
            }
        });

        try {
            await dojoProvider.init_game(account);

            // await state.waitForEntityChange(playerEntityId, (entity) => {
            //     const player = entity?.models?.mastermind?.Player;
            //     return player?.player_game_ids && player.player_game_ids.length > 0;
            // });
        } catch (error) {
            state.revertOptimisticUpdate(transactionId);
            console.error("Error initializing game:", error);
            throw error;
        } finally {
            state.confirmTransaction(transactionId);
        }
    };

    const registerPlayer = async (playerName: string) => {
        if (!account) throw new Error("No account connected");

        const transactionId = uuidv4();
        const playerEntityId = getEntityIdFromKeys([BigInt(account.address)]);

        state.applyOptimisticUpdate(transactionId, (draft) => {
            if (!draft.entities[playerEntityId]) {
                draft.entities[playerEntityId] = { 
                    entityId: playerEntityId,
                    models: { mastermind: {} } 
                };
            }
            if (!draft.entities[playerEntityId].models.mastermind.Player) {
                draft.entities[playerEntityId].models.mastermind.Player = {
                    address: account.address,
                    player_name: playerName,
                    player_game_ids: [],
                    games_won: 0,
                    games_lost: 0,
                    games_tied: 0,
                };
            }
        });

        try {
            await dojoProvider.register_player(account, playerName);

            await state.waitForEntityChange(playerEntityId, (entity) => {
                return entity?.models?.mastermind?.Player?.player_name === playerName;
            });
        } catch (error) {
            state.revertOptimisticUpdate(transactionId);
            console.error("Error registering player:", error);
            throw error;
        } finally {
            state.confirmTransaction(transactionId);
        }
    };

    const joinGame = async (gameId: number) => {
        if (!account) throw new Error("No account connected");

        const transactionId = uuidv4();
        const gameEntityId = gameId.toString();

        state.applyOptimisticUpdate(transactionId, (draft) => {
            if (draft.entities[gameEntityId]?.models?.mastermind?.Game) {
                draft.entities[gameEntityId].models.mastermind.Game.opponent = account.address;
                draft.entities[gameEntityId].models.mastermind.Game.stage = "OpponentCommitSolutionHash";
            }
        });

        try {
            await dojoProvider.join_game(account, {
                game_id: gameId
            });

            // await state.waitForEntityChange(gameEntityId, (entity) => {
            //     const game = entity?.models?.mastermind?.Game;
            //     return game?.opponent === account.address;
            // });
        } catch (error) {
            state.revertOptimisticUpdate(transactionId);
            console.error("Error joining game:", error);
            throw error;
        } finally {
            state.confirmTransaction(transactionId);
        }
    };

    const commitSolutionHash = async (gameId: number, solutionHash: bigint) => {
        if (!account) throw new Error("No account connected");

        const transactionId = uuidv4();
        const guessEntityId = `${gameId}-${account.address}`;

        state.applyOptimisticUpdate(transactionId, (draft) => {
            if (!draft.entities[guessEntityId]) {
                draft.entities[guessEntityId] = { 
                    entityId: guessEntityId,
                    models: { mastermind: {} } 
                };
            }
            if (!draft.entities[guessEntityId].models.mastermind.Guess) {
                draft.entities[guessEntityId].models.mastermind.Guess = {
                    id: gameId,
                    player_address: account.address,
                    guess: [],
                    submitted: [],
                    solution_hash: solutionHash,
                    guess_index: BigInt(0),
                };
            } else {
                draft.entities[guessEntityId].models.mastermind.Guess.solution_hash = solutionHash;
            }
        });

        try {
            await dojoProvider.commit_solution_hash(account, {
                game_id: gameId,
                solution_hash: solutionHash
            });

            // await state.waitForEntityChange(guessEntityId, (entity) => {
            //     return entity?.models?.mastermind?.Guess?.solution_hash === solutionHash;
            // });
        } catch (error) {
            state.revertOptimisticUpdate(transactionId);
            console.error("Error committing solution hash:", error);
            throw error;
        } finally {
            state.confirmTransaction(transactionId);
        }
    };

    const submitGuess = async (gameId: number, guess: number[]) => {
        if (!account) throw new Error("No account connected");

        const transactionId = uuidv4();
        const guessEntityId = `${gameId}-${account.address}`;

        state.applyOptimisticUpdate(transactionId, (draft) => {
            if (draft.entities[guessEntityId]?.models?.mastermind?.Guess) {
                const guessModel = draft.entities[guessEntityId].models.mastermind.Guess;
                guessModel.guess.push([guess[0], guess[1], guess[2], guess[3]]);
                guessModel.submitted.push(true);
                guessModel.guess_index = BigInt(guessModel.guess.length);
            }
        });

        try {
            await dojoProvider.submit_guess(account, {
                guess,
                game_id: gameId
            });

            const currentIndex = state.entities[guessEntityId]?.models?.mastermind?.Guess?.guess_index || BigInt(0);
            // await state.waitForEntityChange(guessEntityId, (entity) => {
            //     return entity?.models?.mastermind?.Guess?.guess_index > currentIndex;
            // });
        } catch (error) {
            state.revertOptimisticUpdate(transactionId);
            console.log("Error submitting guess how:", error);
            throw error;
        } finally {
            state.confirmTransaction(transactionId);
        }
    };

    const submitHitAndBlowProof = async (gameId: number, proof: bigint[]) => {
        if (!account) throw new Error("No account connected");

        const transactionId = uuidv4();
        const hbEntityId = `${gameId}-${account.address}`;

        try {
            await dojoProvider.submit_hit_and_blow_proof(account, {
                full_proof_with_hints: proof,
                game_id: gameId
            });

            // await state.waitForEntityChange(hbEntityId, (entity) => {
            //     const hb = entity?.models?.mastermind?.HitAndBlow;
            //     return hb && hb.hit_and_blow.length > 0;
            // });
        } catch (error) {
            state.revertOptimisticUpdate(transactionId);
            console.error("Error submitting proof:", error);
            throw error;
        } finally {
            state.confirmTransaction(transactionId);
        }
    };

    const revealSolution = async (gameId: number, solution: number[], salt: bigint) => {
        if (!account) throw new Error("No account connected");

        const transactionId = uuidv4();
        const gameEntityId = gameId.toString();

        try {
            await dojoProvider.reveal_solution(account, {
                solution,
                salt,
                game_id: gameId
            });

            // await state.waitForEntityChange(gameEntityId, (entity) => {
            //     const game = entity?.models?.mastermind?.Game;
            //     return game?.game_result !== "Undecided";
            // });
        } catch (error) {
            state.revertOptimisticUpdate(transactionId);
            console.error("Error revealing solution:", error);
            throw error;
        } finally {
            state.confirmTransaction(transactionId);
        }
    };

    return {
        initGame,
        registerPlayer,
        joinGame,
        commitSolutionHash,
        submitGuess,
        submitHitAndBlowProof,
        revealSolution,
    };
};
