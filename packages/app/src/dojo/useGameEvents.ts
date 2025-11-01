import { KeysClause, ToriiQueryBuilder } from "@dojoengine/sdk";
import { useEventQuery, useDojoSDK } from "@dojoengine/sdk/react";
import { useAccount } from "@starknet-react/core";
import { addAddressPadding } from "starknet";
import { ModelsMapping } from "./models.gen";
import type { 
    InitializeGame, 
    RegisterPlayer, 
    CommitSolutionHash, 
    SubmitGuess, 
    SubmitHitAndBlow, 
    RevealSolution, 
    GameFinish, 
    StageChange, 
    OpponentJoined 
} from "./models.gen";

/**
 * Hook to listen to mastermind game events for the connected account
 * This follows the proper Dojo pattern using useEventQuery and useModel
 */
export function useGameEvents() {
    const { account } = useAccount();
    const { useDojoStore } = useDojoSDK();
    const entities = useDojoStore((state) => state.entities);

    console.log('🔍 useGameEvents - Account:', account?.address);
    console.log('🔍 useGameEvents - Entities count:', Object.keys(entities).length);
    console.log('🔍 useGameEvents - All entities:', entities);

    // Set up event query for the connected account
    const query = account?.address ? new ToriiQueryBuilder()
        .withClause(
            KeysClause(
                [],
                [addAddressPadding(account.address)],
                "VariableLen"
            ).build()
        )
        .includeHashedKeys() : undefined;

    console.log('🔍 useGameEvents - Event query:', query);
    console.log('🔍 useGameEvents - Padded address:', account?.address ? addAddressPadding(account.address) : 'No address');

    useEventQuery(query);

    // Find events in the entities store
    // Events are stored as separate entities, not under the player's address
    const findLatestEvent = <T>(modelName: string, filterFn?: (event: T) => boolean): T | undefined => {
        console.log(`🔍 Finding events for model: ${modelName}`);
        
        const eventEntities = Object.values(entities).filter(entity => 
            entity.models?.mastermind?.[modelName.split('-')[1]]
        );
        
        console.log(`🔍 Found ${eventEntities.length} entities for ${modelName}`);
        console.log(`🔍 Event entities for ${modelName}:`, eventEntities);
        
        if (eventEntities.length === 0) return undefined;
        
        const events = eventEntities
            .map(entity => entity.models.mastermind[modelName.split('-')[1]] as T)
            .filter(event => filterFn ? filterFn(event) : true);
            
        console.log(`🔍 Filtered events for ${modelName}:`, events);
        
        const latestEvent = events[events.length - 1];
        console.log(`🔍 Latest event for ${modelName}:`, latestEvent);
        
        return latestEvent; // Return the latest event
    };

    const initializeGameEvent = findLatestEvent<InitializeGame>(
        ModelsMapping.InitializeGame, 
        (event) => {
            console.log(`🔍 Filtering InitializeGame event:`, event, 'account match:', event.account === account?.address);
            return event.account === account?.address;
        }
    );
    
    console.log('🎮 InitializeGame Event Result:', initializeGameEvent);
    
    const registerPlayerEvent = findLatestEvent<RegisterPlayer>(
        ModelsMapping.RegisterPlayer,
        (event) => event.account === account?.address
    );
    
    const commitSolutionHashEvent = findLatestEvent<CommitSolutionHash>(
        ModelsMapping.CommitSolutionHash,
        (event) => event.account === account?.address
    );
    
    const submitGuessEvent = findLatestEvent<SubmitGuess>(
        ModelsMapping.SubmitGuess,
        (event) => event.account === account?.address
    );
    
    const submitHitAndBlowEvent = findLatestEvent<SubmitHitAndBlow>(
        ModelsMapping.SubmitHitAndBlow,
        (event) => event.account === account?.address
    );
    
    const revealSolutionEvent = findLatestEvent<RevealSolution>(
        ModelsMapping.RevealSolution,
        (event) => event.account === account?.address
    );
    
    const gameFinishEvent = findLatestEvent<GameFinish>(ModelsMapping.GameFinish);
    const stageChangeEvent = findLatestEvent<StageChange>(ModelsMapping.StageChange);
    const opponentJoinedEvent = findLatestEvent<OpponentJoined>(ModelsMapping.OpponentJoined);

    return {
        // Individual event models
        initializeGameEvent,
        registerPlayerEvent,
        commitSolutionHashEvent,
        submitGuessEvent,
        submitHitAndBlowEvent,
        revealSolutionEvent,
        gameFinishEvent,
        stageChangeEvent,
        opponentJoinedEvent,

        // Helper functions for specific event types
        getLatestGameCreated: () => {
            console.log('🎮 getLatestGameCreated called');
            console.log('🎮 initializeGameEvent:', initializeGameEvent);
            console.log('🎮 account?.address:', account?.address);
            
            if (initializeGameEvent && initializeGameEvent.account === account?.address) {
                const gameId = Number(initializeGameEvent.game_id);
                console.log('🎮 Returning game ID:', gameId);
                return gameId;
            }
            console.log('🎮 No game created event found');
            return null;
        },

        getLatestOpponentJoined: () => {
            if (opponentJoinedEvent) {
                return {
                    account: opponentJoinedEvent.account,
                    gameId: Number(opponentJoinedEvent.game_id)
                };
            }
            return null;
        },

        getLatestStageChange: () => {
            if (stageChangeEvent) {
                return {
                    gameId: Number(stageChangeEvent.game_id),
                    stage: stageChangeEvent.stage
                };
            }
            return null;
        },

        getLatestGameFinish: () => {
            if (gameFinishEvent) {
                return {
                    gameId: Number(gameFinishEvent.game_id),
                    result: gameFinishEvent.game_result
                };
            }
            return null;
        },

        getLatestPlayerRegistration: () => {
            if (registerPlayerEvent && registerPlayerEvent.account === account?.address) {
                return {
                    account: registerPlayerEvent.account,
                    playerId: Number(registerPlayerEvent.player_id)
                };
            }
            return null;
        },

        getLatestCommitSolutionHash: () => {
            if (commitSolutionHashEvent && commitSolutionHashEvent.account === account?.address) {
                return {
                    account: commitSolutionHashEvent.account,
                    solutionHash: commitSolutionHashEvent.solution_hash.toString()
                };
            }
            return null;
        },

        getLatestSubmitGuess: () => {
            if (submitGuessEvent && submitGuessEvent.account === account?.address) {
                return {
                    account: submitGuessEvent.account,
                    currentRound: Number(submitGuessEvent.current_round),
                    guess: submitGuessEvent.guess.map(g => Number(g))
                };
            }
            return null;
        },

        getLatestSubmitHitAndBlow: () => {
            if (submitHitAndBlowEvent && submitHitAndBlowEvent.account === account?.address) {
                return {
                    account: submitHitAndBlowEvent.account,
                    currentRound: Number(submitHitAndBlowEvent.current_round),
                    hit: Number(submitHitAndBlowEvent.hit),
                    blow: Number(submitHitAndBlowEvent.blow)
                };
            }
            return null;
        },

        getLatestRevealSolution: () => {
            if (revealSolutionEvent && revealSolutionEvent.account === account?.address) {
                return {
                    account: revealSolutionEvent.account,
                    gameId: Number(revealSolutionEvent.game_id),
                    solution: revealSolutionEvent.solution.map(s => Number(s))
                };
            }
            return null;
        }
    };
}

/**
 * Hook specifically for listening to game creation events
 * Useful for getting the game ID after creating a game
 */
export function useGameCreationEvents() {
    const { initializeGameEvent, getLatestGameCreated } = useGameEvents();
    
    return {
        initializeGameEvent,
        latestCreatedGameId: getLatestGameCreated(),
        hasNewGameCreated: !!initializeGameEvent
    };
}

/**
 * Hook for listening to opponent joined events
 */
export function useOpponentJoinedEvents() {
    const { opponentJoinedEvent, getLatestOpponentJoined } = useGameEvents();
    
    return {
        opponentJoinedEvent,
        latestOpponentJoined: getLatestOpponentJoined(),
        hasOpponentJoined: !!opponentJoinedEvent
    };
}

/**
 * Hook for listening to stage change events
 */
export function useStageChangeEvents() {
    const { stageChangeEvent, getLatestStageChange } = useGameEvents();
    
    return {
        stageChangeEvent,
        latestStageChange: getLatestStageChange(),
        hasStageChanged: !!stageChangeEvent
    };
}

/**
 * Hook for listening to game finish events
 */
export function useGameFinishEvents() {
    const { gameFinishEvent, getLatestGameFinish } = useGameEvents();
    
    return {
        gameFinishEvent,
        latestGameFinish: getLatestGameFinish(),
        hasGameFinished: !!gameFinishEvent
    };
}