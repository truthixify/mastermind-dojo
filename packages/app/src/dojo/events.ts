import { KeysClause, ToriiQueryBuilder } from '@dojoengine/sdk'
import { useEntityId, useEventQuery, useModel } from '@dojoengine/sdk/react'
import { useAccount } from '@starknet-react/core'
import { addAddressPadding } from 'starknet'
import { ModelsMapping } from './models.gen'
import type {
    CommitSolutionHash,
    GameFinish,
    InitializeGame,
    OpponentJoined,
    RegisterPlayer,
    RevealSolution,
    StageChange,
    SubmitGuess,
    SubmitHitAndBlow
} from './models.gen'

export interface DojoEvents {
    commitSolutionHash: CommitSolutionHash | undefined
    gameFinish: GameFinish | undefined
    initializeGame: InitializeGame | undefined
    opponentJoined: OpponentJoined | undefined
    registerPlayer: RegisterPlayer | undefined
    revealSolution: RevealSolution | undefined
    stageChange: StageChange | undefined
    submitGuess: SubmitGuess | undefined
    submitHitAndBlow: SubmitHitAndBlow | undefined
}

export function useDojoEvents(): DojoEvents {
    const { account } = useAccount()
    const address = account?.address
    const entityId = useEntityId(address ?? '0')

    // Create query builder - use null/undefined for invalid addresses to prevent errors
    const queryBuilder =
        address && address !== '0x0' && address !== '0'
            ? new ToriiQueryBuilder()
                  .withClause(KeysClause([], [addAddressPadding(address)], 'VariableLen').build())
                  .includeHashedKeys()
            : null

    useEventQuery(queryBuilder)

    // Always call hooks, but the models will be undefined if no valid address
    const commitSolutionHash = useModel(entityId, ModelsMapping.CommitSolutionHash)
    const gameFinish = useModel(entityId, ModelsMapping.GameFinish)
    const initializeGame = useModel(entityId, ModelsMapping.InitializeGame)
    const opponentJoined = useModel(entityId, ModelsMapping.OpponentJoined)
    const registerPlayer = useModel(entityId, ModelsMapping.RegisterPlayer)
    const revealSolution = useModel(entityId, ModelsMapping.RevealSolution)
    const stageChange = useModel(entityId, ModelsMapping.StageChange)
    const submitGuess = useModel(entityId, ModelsMapping.SubmitGuess)
    const submitHitAndBlow = useModel(entityId, ModelsMapping.SubmitHitAndBlow)

    // Return undefined for all events if no valid address
    const hasValidAddress = address && address !== '0x0' && address !== '0'

    return {
        commitSolutionHash: hasValidAddress
            ? (commitSolutionHash as CommitSolutionHash | undefined)
            : undefined,
        gameFinish: hasValidAddress ? (gameFinish as GameFinish | undefined) : undefined,
        initializeGame: hasValidAddress
            ? (initializeGame as InitializeGame | undefined)
            : undefined,
        opponentJoined: hasValidAddress
            ? (opponentJoined as OpponentJoined | undefined)
            : undefined,
        registerPlayer: hasValidAddress
            ? (registerPlayer as RegisterPlayer | undefined)
            : undefined,
        revealSolution: hasValidAddress
            ? (revealSolution as RevealSolution | undefined)
            : undefined,
        stageChange: hasValidAddress ? (stageChange as StageChange | undefined) : undefined,
        submitGuess: hasValidAddress ? (submitGuess as SubmitGuess | undefined) : undefined,
        submitHitAndBlow: hasValidAddress
            ? (submitHitAndBlow as SubmitHitAndBlow | undefined)
            : undefined
    }
}
