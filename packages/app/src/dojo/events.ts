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
    const entityId = useEntityId(account?.address ?? '0')

    useEventQuery(
        new ToriiQueryBuilder()
            .withClause(
                KeysClause([], [addAddressPadding(account?.address ?? '0')], 'VariableLen').build()
            )
            .includeHashedKeys()
    )

    const commitSolutionHash = useModel(entityId, ModelsMapping.CommitSolutionHash)
    const gameFinish = useModel(entityId, ModelsMapping.GameFinish)
    const initializeGame = useModel(entityId, ModelsMapping.InitializeGame)
    const opponentJoined = useModel(entityId, ModelsMapping.OpponentJoined)
    const registerPlayer = useModel(entityId, ModelsMapping.RegisterPlayer)
    const revealSolution = useModel(entityId, ModelsMapping.RevealSolution)
    const stageChange = useModel(entityId, ModelsMapping.StageChange)
    const submitGuess = useModel(entityId, ModelsMapping.SubmitGuess)
    const submitHitAndBlow = useModel(entityId, ModelsMapping.SubmitHitAndBlow)

    return {
        commitSolutionHash: commitSolutionHash as CommitSolutionHash | undefined,
        gameFinish: gameFinish as GameFinish | undefined,
        initializeGame: initializeGame as InitializeGame | undefined,
        opponentJoined: opponentJoined as OpponentJoined | undefined,
        registerPlayer: registerPlayer as RegisterPlayer | undefined,
        revealSolution: revealSolution as RevealSolution | undefined,
        stageChange: stageChange as StageChange | undefined,
        submitGuess: submitGuess as SubmitGuess | undefined,
        submitHitAndBlow: submitHitAndBlow as SubmitHitAndBlow | undefined
    }
}
