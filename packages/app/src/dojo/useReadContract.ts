import { useReadContract as useStarknetReadContract } from '@starknet-react/core'
import { ACTUAL_GAME_ABI } from '../lib/abi'
import manifest from '../../../contracts/dojoimpl/manifest_sepolia.json'

/**
 * Custom hook for read-only contract operations using Starknet React
 * This wraps the @starknet-react/core useReadContract hook with our contract configuration
 */
export const useReadContract = <T = any>({
    functionName,
    args,
    watch = false
}: {
    functionName: string
    args?: any[]
    watch?: boolean
}) => {
    const dojoContract = manifest.contracts[0]

    const result = useStarknetReadContract({
        abi: ACTUAL_GAME_ABI,
        address: dojoContract.address as `0x${string}`,
        functionName: functionName as any,
        args: args as any,
        watch
    })

    return {
        ...result,
        data: result.data as T | undefined
    }
}

/**
 * Specific hook for getting game current round
 */
export const useGetGameCurrentRound = (gameId: number) => {
    return useReadContract<number>({
        functionName: 'get_game_current_round',
        args: [gameId]
    })
}

/**
 * Specific hook for getting game current stage
 */
export const useGetGameCurrentStage = (gameId: number) => {
    return useReadContract<string>({
        functionName: 'get_game_current_stage',
        args: [gameId]
    })
}

/**
 * Specific hook for getting game result
 */
export const useGetGameResult = (gameId: number) => {
    return useReadContract<any>({
        functionName: 'get_game_result',
        args: [gameId]
    })
}

/**
 * Specific hook for getting player name
 */
export const useGetPlayerName = (playerAddress: string) => {
    return useReadContract<string>({
        functionName: 'get_player_name',
        args: [playerAddress]
    })
}

/**
 * Specific hook for getting game creator address
 */
export const useGetGameCreatorAddress = (gameId: number) => {
    return useReadContract<string>({
        functionName: 'get_game_creator_address',
        args: [gameId]
    })
}

/**
 * Specific hook for getting game opponent address
 */
export const useGetGameOpponentAddress = (gameId: number) => {
    return useReadContract<string>({
        functionName: 'get_game_opponent_address',
        args: [gameId]
    })
}

/**
 * Specific hook for getting submitted guesses
 */
export const useGetGameSubmittedGuesses = (gameId: number, playerAddress: string) => {
    return useReadContract<
        Array<{ g1: number; g2: number; g3: number; g4: number; submitted: boolean }>
    >({
        functionName: 'get_game_submitted_guesses',
        args: [gameId, playerAddress]
    })
}

/**
 * Specific hook for getting submitted hit and blow responses
 */
export const useGetGameSubmittedHitAndBlow = (gameId: number, playerAddress: string) => {
    return useReadContract<Array<{ hit: number; blow: number; submitted: boolean }>>({
        functionName: 'get_game_submitted_hit_and_blow',
        args: [gameId, playerAddress]
    })
}

/**
 * Specific hook for getting solution hash
 */
export const useGetGameSolutionHash = (gameId: number, playerAddress: string) => {
    return useReadContract<string>({
        functionName: 'get_game_solution_hash',
        args: [gameId, playerAddress]
    })
}

/**
 * Specific hook for getting total players count
 */
export const useGetTotalPlayersCount = () => {
    return useReadContract<number>({
        functionName: 'get_total_players_count',
        args: []
    })
}

/**
 * Specific hook for getting total games count
 */
export const useGetTotalGamesCount = () => {
    return useReadContract<number>({
        functionName: 'get_total_games_count',
        args: []
    })
}

/**
 * Specific hook for getting available game IDs
 */
export const useGetAvailableGameIds = () => {
    return useReadContract<number[]>({
        functionName: 'get_available_game_ids',
        args: []
    })
}

/**
 * Specific hook for getting player active game IDs
 */
export const useGetPlayerActiveGameIds = (playerAddress: string) => {
    return useReadContract<number[]>({
        functionName: 'get_player_active_game_ids',
        args: [playerAddress]
    })
}

/**
 * Specific hook for getting player stats
 */
export const useGetPlayerStats = (playerAddress: string) => {
    const { data: totalWon } = useReadContract<number>({
        functionName: 'get_player_total_games_won',
        args: [playerAddress]
    })

    const { data: totalLost } = useReadContract<number>({
        functionName: 'get_player_total_games_lost',
        args: [playerAddress]
    })

    const { data: totalTied } = useReadContract<number>({
        functionName: 'get_player_total_games_tied',
        args: [playerAddress]
    })

    const { data: totalPlayed } = useReadContract<number>({
        functionName: 'get_player_total_games_played',
        args: [playerAddress]
    })

    return {
        totalWon,
        totalLost,
        totalTied,
        totalPlayed
    }
}
