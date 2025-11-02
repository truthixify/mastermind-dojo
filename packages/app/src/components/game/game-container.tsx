import { useState, useEffect } from 'react'
import GameBoard from './game-board'
import GameDashboard from './game-dashboard'
import GameOverScreen from './game-over-screen'
import CreateGameScreen from './create-game-screen'
import JoinGameScreen from './join-game-screen'
import CommitSolutionHash from './commit-solution-hash-screen'

import { useToast } from '../../hooks/use-toast'
import { Toaster } from '../ui/toaster'
import { useDojoWriteContract } from '../../dojo/useDojoWriteContract'
import {
    useGetGameCurrentStage,
    useGetGameCreatorAddress,
    useGetGameOpponentAddress,
    useGetGameSubmittedGuesses,
    useGetGameSubmittedHitAndBlow,
    useGetGameResult,
    useGetPlayerName,
    useGetGameCurrentRound
} from '../../dojo/useReadContract'
import { useGameStore } from '../../stores/gameStore'
import { useAccount, useReadContract } from '@starknet-react/core'
import { addAddressPadding } from 'starknet'
import { useGameStorage } from '../../hooks/use-game-storage'
import ViewStats from './view-stats'
import PlayerRegistration from './user-registration'
import { usePlayerStore } from '../../stores/playerStore'
import { feltToString } from '../../utils/utils'
import { useDojoEvents } from '../../dojo/events'
import { ACTUAL_GAME_ABI } from '../../lib/abi'
import manifest from '../../../../contracts/dojoimpl/manifest_sepolia.json'
import { feltToHex } from '../../utils/common'

export type GameState =
    | 'register'
    | 'dashboard'
    | 'create'
    | 'join'
    | 'commit'
    | 'waiting'
    | 'playing'
    | 'won'
    | 'lost'
    | 'draw'
    | 'reveal'
    | 'stats'

export type GameCreationStatus = 'idle' | 'creating' | 'waiting_event' | 'error'

// Dojo game stage enum mapping
type DojoGameStage =
    | 'WaitingForOpponent'
    | 'CreatorCommitSolutionHash'
    | 'OpponentCommitSolutionHash'
    | 'Playing'
    | 'Reveal'
    | 'Finished'

// Dojo game result enum mapping
type DojoGameResult = 'Undecided' | 'CreatorWin' | 'OpponentWin' | 'Draw'

export default function GameContainer() {
    const [gameState, setGameState] = useState<GameState>('dashboard')
    const [gameStage, setGameStage] = useState<DojoGameStage>()
    const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true)
    const [creatorGuesses, setCreatorGuesses] = useState<string[]>(Array.from({ length: 5 }))
    const [opponentGuesses, setOpponentGuesses] = useState<string[]>(Array.from({ length: 5 }))
    const [creatorHB, setCreatorHB] = useState<
        Array<{ hit: number; blow: number; submitted: boolean }>
    >(Array.from({ length: 5 }, () => ({ hit: 0, blow: 0, submitted: false })))
    const [opponentHB, setOpponentHB] = useState<
        Array<{ hit: number; blow: number; submitted: boolean }>
    >(Array.from({ length: 5 }, () => ({ hit: 0, blow: 0, submitted: false })))
    const [gameResult, setGameResult] = useState<DojoGameResult>()
    const [revealedSolution, setRevealedSolution] = useState<string>()
    const [opponentRevealedSolution, setOpponentRevealedSolution] = useState<string>()
    const [isRevealed, setIsRevealed] = useState(false)

    const [isJoiningGame, setIsJoiningGame] = useState(false)
    const [playerRole, setPlayerRole] = useState<'creator' | 'opponent' | null>(null)
    const [gameCreationStatus, setGameCreationStatus] = useState<GameCreationStatus>('idle')
    const [isRegistering, setIsRegistering] = useState(false)

    const { setPlayerName } = usePlayerStore()
    const { gameId, setGameId } = useGameStore()
    const { toast } = useToast()
    const { getGameData } = useGameStorage('game-data')
    const { address } = useAccount()

    // Event hooks - using the comprehensive Dojo events hook
    const dojoEvents = useDojoEvents()

    const { writeAsync } = useDojoWriteContract()

    const dojoContract = manifest.contracts[0]

    const { data: getGameCurrentStage } = useGetGameCurrentStage(gameId)

    const { data: getGameCurrentRound } = useGetGameCurrentRound(gameId)

    const { data: creatorAddress } = useGetGameCreatorAddress(gameId)

    const { data: opponentAddress } = useGetGameOpponentAddress(gameId)

    const { data: creatorSubmittedGuesses } = useGetGameSubmittedGuesses(
        gameId,
        creatorAddress || ''
    )

    const { data: opponentSubmittedGuesses } = useGetGameSubmittedGuesses(
        gameId,
        opponentAddress || ''
    )

    const { data: creatorSubmittedHB } = useGetGameSubmittedHitAndBlow(gameId, creatorAddress || '')

    const { data: opponentSubmittedHB } = useGetGameSubmittedHitAndBlow(
        gameId,
        opponentAddress || ''
    )

    const { data: getGameResult } = useGetGameResult(gameId)

    const { data: getPlayerName } = useGetPlayerName(address || '')

    // Reset game state when gameId changes
    const resetGameState = () => {
        setCreatorGuesses(Array.from({ length: 5 }))
        setOpponentGuesses(Array.from({ length: 5 }))
        setCreatorHB(Array.from({ length: 5 }, () => ({ hit: 0, blow: 0, submitted: false })))
        setOpponentHB(Array.from({ length: 5 }, () => ({ hit: 0, blow: 0, submitted: false })))
        setRevealedSolution(undefined)
        setOpponentRevealedSolution(undefined)
        setGameResult(undefined)
        setPlayerRole(null)
        setIsPlayerTurn(false)
        setIsRevealed(false)

        setGameStage(undefined)
    }

    // Register a new player
    const onRegister = async (username: string) => {
        setIsRegistering(true)
        try {
            await writeAsync({
                functionName: 'register_player',
                args: [username]
            })

            toast({
                title: 'Registration successful!',
                description: `Welcome to Word Mastermind, ${username}!`
            })

            setGameState('dashboard')
        } catch (error: any) {
            toast({
                title: 'Registration failed',
                description:
                    error?.message ||
                    'There was an error registering your username. Please try again.',
                variant: 'destructive'
            })
        } finally {
            setIsRegistering(false)
        }
    }

    // Create a new multiplayer game
    const createNewGame = async () => {
        resetGameState()
        setGameCreationStatus('creating')

        try {
            await writeAsync({
                functionName: 'init_game'
            })

            // Set status to waiting for event
            setGameCreationStatus('waiting_event')
        } catch (error: any) {
            setGameCreationStatus('error')
            toast({
                title: 'Game Creation Error',
                description: error?.message || 'An unexpected error occurred.',
                variant: 'destructive'
            })
        }
    }

    // Event listeners using useEffect
    useEffect(() => {
        if (dojoEvents.initializeGame && gameCreationStatus === 'waiting_event') {
            toast({
                title: 'Game Created',
                description: `New game created successfully! Game ID: ${dojoEvents.initializeGame.game_id}`
            })
            setGameId(Number(dojoEvents.initializeGame.game_id))
            setGameCreationStatus('idle')
            setGameState('commit')
        }
    }, [dojoEvents.initializeGame, gameCreationStatus, setGameId, toast])

    useEffect(() => {
        if (dojoEvents.opponentJoined) {
            if (
                dojoEvents.opponentJoined.account !== address &&
                dojoEvents.opponentJoined.game_id === gameId
            ) {
                toast({
                    title: 'Opponent Joined',
                    description: `An opponent has joined your game #${dojoEvents.opponentJoined.game_id}!`
                })
                // If we're waiting for an opponent, move to commit stage
                if (gameState === 'waiting') {
                    setGameState('commit')
                }
            }
        }
    }, [dojoEvents.opponentJoined, address, gameId, gameState, toast])

    useEffect(() => {
        if (dojoEvents.stageChange && dojoEvents.stageChange.game_id === gameId) {
            const newStage = dojoEvents.stageChange.stage?.activeVariant?.() || 'unknown'

            // Update game state based on stage changes
            switch (newStage) {
                case 'WaitingForOpponent':
                    setGameState('waiting')
                    break
                case 'CreatorCommitSolutionHash':
                case 'OpponentCommitSolutionHash':
                    if (gameState !== 'commit') {
                        setGameState('commit')
                    }
                    break
                case 'Playing':
                    if (gameState !== 'playing') {
                        setGameState('playing')
                        toast({
                            title: 'Game Started',
                            description:
                                'Both players have committed their solutions. Let the game begin!'
                        })
                    }
                    break
                case 'Reveal':
                    if (gameState !== 'reveal') {
                        setGameState('reveal')
                    }
                    break
            }
        }
    }, [dojoEvents.stageChange, gameId, gameState, toast])

    useEffect(() => {
        if (dojoEvents.gameFinish) {
            toast({
                title: 'Game Finished',
                description: `Game #${dojoEvents.gameFinish.game_id} has finished with result: ${dojoEvents.gameFinish.game_result?.activeVariant?.() || 'unknown'}`
            })
            setGameState('reveal')
        }
    }, [dojoEvents.gameFinish, toast])

    // Handle commit solution hash events
    useEffect(() => {
        if (dojoEvents.commitSolutionHash) {
            if (dojoEvents.commitSolutionHash.account === address) {
                toast({
                    title: 'Solution Committed',
                    description: 'Your solution has been committed successfully!'
                })
            } else {
                toast({
                    title: 'Opponent Ready',
                    description: 'Your opponent has committed their solution!'
                })
            }
        }
    }, [dojoEvents.commitSolutionHash, address, toast])

    // Handle guess submission events
    useEffect(() => {
        if (dojoEvents.submitGuess) {
            // console.log(
            //     `Guess submitted by ${dojoEvents.submitGuess.account} in round ${dojoEvents.submitGuess.current_round}`
            // )
            // The game state will be updated through the read contracts
        }
    }, [dojoEvents.submitGuess])

    // Handle hit and blow submission events
    useEffect(() => {
        if (dojoEvents.submitHitAndBlow) {
            // console.log(
            //     `Hit and blow submitted by ${dojoEvents.submitHitAndBlow.account} in round ${dojoEvents.submitHitAndBlow.current_round}`
            // )
            // The game state will be updated through the read contracts
        }
    }, [dojoEvents.submitHitAndBlow])

    // Handle solution reveal events
    useEffect(() => {
        if (dojoEvents.revealSolution) {
            if (dojoEvents.revealSolution.account === address) {
                setRevealedSolution(
                    dojoEvents.revealSolution.solution
                        ?.map(s => String.fromCharCode(Number(s)))
                        .join('') || ''
                )
                setIsRevealed(true)
            } else {
                setOpponentRevealedSolution(
                    dojoEvents.revealSolution.solution
                        ?.map(s => String.fromCharCode(Number(s)))
                        .join('') || ''
                )
            }
        }
    }, [dojoEvents.revealSolution, address])

    // Handle player registration events
    useEffect(() => {
        if (dojoEvents.registerPlayer && dojoEvents.registerPlayer.account === address) {
            // console.log(`Player registered with ID: ${dojoEvents.registerPlayer.player_id}`)
            // Registration success is already handled in the onRegister function
        }
    }, [dojoEvents.registerPlayer, address])

    // Join an existing multiplayer game
    const joinExistingGame = async (gameId: number) => {
        resetGameState()
        setIsJoiningGame(true)

        try {
            setGameId(gameId)

            await writeAsync({
                functionName: 'join_game',
                args: [gameId]
            })

            toast({
                title: 'Joining Game',
                description: `Successfully joined game #${gameId}`
            })
            setGameState('commit')
        } catch (error: any) {
            console.error('Join Game Error:', error)
            toast({
                title: 'Join Game Error',
                description: error?.message || String(error),
                variant: 'destructive'
            })
        } finally {
            setIsJoiningGame(false)
        }
    }

    // Continue an existing game
    const continueGame = (gameId: number) => {
        resetGameState()

        toast({
            title: 'Game Loaded',
            description: `Continuing game #${gameId}`
        })

        setGameId(gameId)

        setGameState('playing')
    }

    const onCommit = () => {
        if (playerRole === 'creator') {
            setGameState('waiting')
        } else {
            setGameState('playing')
        }
    }

    // Start the multiplayer game when both players are ready
    const startMultiplayerGame = () => {
        resetGameState()

        if (gameStage === 'Playing') {
            setGameState('playing')
        }
    }

    const onJoinAvalaibleGame = () => {
        resetGameState()
        setGameState('commit')
    }

    const onRevealSolution = async () => {
        try {
            const gameData = getGameData(Number(gameId))
            const solution = gameData?.solution
            const salt = gameData?.salt

            if (!solution || (Array.isArray(solution) ? solution.length === 0 : !solution)) {
                toast({
                    title: 'Unable to Reveal',
                    description: "The solution couldn't be loaded. Please try again.",
                    variant: 'destructive'
                })
                return
            }

            if (!salt || salt === '0') {
                toast({
                    title: 'Unable to Reveal',
                    description: "The salt couldn't be loaded. Please try again.",
                    variant: 'destructive'
                })
                return
            }

            // Solution is already a number array from GameData
            const solutionArray = solution

            await writeAsync({
                functionName: 'reveal_solution',
                args: [gameId, solutionArray, BigInt(salt)]
            })

            toast({
                title: 'Solution Revealed',
                description: 'Your solution has been revealed successfully.'
            })
            setIsRevealed(true)
        } catch (error: any) {
            toast({
                title: 'Reveal Error',
                description: error?.message || 'An error occurred while revealing the solution.',
                variant: 'destructive'
            })
        }
    }

    const onViewStats = () => {
        setGameState('stats')
    }

    // Play sound effects
    const playSound = (type: 'play' | 'finish') => {
        const sounds = {
            play: new Audio('/sounds/play.wav'),
            finish: new Audio('/sounds/finish.wav')
        }

        try {
            sounds[type].volume = 0.5
            sounds[type].play()
        } catch (error) {
            console.error('Error playing sound:', error)
        }
    }

    // Game creation is now handled directly in createNewGame function

    useEffect(() => {
        if (!getGameCurrentStage) return

        setGameStage(prev =>
            prev !== getGameCurrentStage ? (getGameCurrentStage as DojoGameStage) : prev
        )
    }, [getGameCurrentStage])

    useEffect(() => {
        if (getGameCurrentRound === undefined) return

        if (address === addAddressPadding(feltToHex(creatorAddress || 0n))) {
            setIsPlayerTurn(Number(getGameCurrentRound) % 2 === 1)
        } else if (address === addAddressPadding(feltToHex(opponentAddress || 0n))) {
            setIsPlayerTurn(Number(getGameCurrentRound) % 2 === 0)
        }
    }, [getGameCurrentRound, playerRole])

    useEffect(() => {
        if (address && (creatorAddress || opponentAddress)) {
            if (address === addAddressPadding(creatorAddress || '0x0')) {
                setPlayerRole('creator')
            } else if (address === addAddressPadding(opponentAddress || '0x0')) {
                setPlayerRole('opponent')
            }
        }
    }, [address, creatorAddress, opponentAddress])

    useEffect(() => {
        if (creatorSubmittedGuesses && creatorSubmittedGuesses.length > 0) {
            const arr: string[] = Array.from({ length: 5 }, () => '')

            for (let i = 0; i < creatorSubmittedGuesses.length; i++) {
                arr[i] =
                    String.fromCharCode(Number(creatorSubmittedGuesses[i].g1)) +
                    String.fromCharCode(Number(creatorSubmittedGuesses[i].g2)) +
                    String.fromCharCode(Number(creatorSubmittedGuesses[i].g3)) +
                    String.fromCharCode(Number(creatorSubmittedGuesses[i].g4))
            }

            setCreatorGuesses(arr)
        }
        if (opponentSubmittedGuesses && opponentSubmittedGuesses.length > 0) {
            const arr: string[] = Array.from({ length: 5 }, () => '')

            for (let i = 0; i < opponentSubmittedGuesses.length; i++) {
                arr[i] =
                    String.fromCharCode(Number(opponentSubmittedGuesses[i].g1)) +
                    String.fromCharCode(Number(opponentSubmittedGuesses[i].g2)) +
                    String.fromCharCode(Number(opponentSubmittedGuesses[i].g3)) +
                    String.fromCharCode(Number(opponentSubmittedGuesses[i].g4))
            }

            setOpponentGuesses(arr)
        }
    }, [gameId, creatorAddress, opponentAddress, creatorSubmittedGuesses, opponentSubmittedGuesses])

    useEffect(() => {
        if (creatorSubmittedHB && creatorSubmittedHB.length > 0) {
            const arr: { hit: number; blow: number; submitted: boolean }[] = Array.from(
                { length: 5 },
                () => ({ hit: 0, blow: 0, submitted: false })
            )

            for (let i = 0; i < creatorSubmittedHB.length; i++) {
                arr[i].hit = creatorSubmittedHB[i].hit
                arr[i].blow = creatorSubmittedHB[i].blow
                arr[i].submitted = creatorSubmittedHB[i].submitted
            }

            setCreatorHB(arr)
        }

        if (opponentSubmittedHB && opponentSubmittedHB.length > 0) {
            const arr: { hit: number; blow: number; submitted: boolean }[] = Array.from(
                { length: 5 },
                () => ({ hit: 0, blow: 0, submitted: false })
            )

            for (let i = 0; i < opponentSubmittedHB.length; i++) {
                arr[i].hit = opponentSubmittedHB[i].hit
                arr[i].blow = opponentSubmittedHB[i].blow
                arr[i].submitted = opponentSubmittedHB[i].submitted
            }

            setOpponentHB(arr)
        }
    }, [gameId, creatorAddress, opponentAddress, creatorSubmittedHB, opponentSubmittedHB])

    useEffect(() => {
        setGameResult(getGameResult)
    }, [getGameResult])

    // Solution reveals are now handled through the game result state
    // The revealed solutions will be available through the game model when the game is finished

    useEffect(() => {
        if (typeof address === 'undefined') return // Wallet not connected yet

        if (getPlayerName === undefined) return

        if (!getPlayerName) {
            setGameState('register')
        } else {
            setGameState('dashboard')
        }
    }, [address, getPlayerName])

    useEffect(() => {
        if (getPlayerName) {
            setPlayerName(
                typeof getPlayerName === 'string' ? getPlayerName : feltToString(getPlayerName)
            )
        }
    }, [getPlayerName, address, setPlayerName])

    // Render appropriate screen based on game state
    if (gameState === 'dashboard') {
        return (
            <>
                <GameDashboard
                    onCreateGame={createNewGame}
                    gameCreationStatus={gameCreationStatus}
                    onJoinGame={() => setGameState('join')}
                    onContinueGame={continueGame}
                    onJoinAvalaibleGame={onJoinAvalaibleGame}
                    onViewStats={onViewStats}
                />
                <Toaster />
            </>
        )
    }

    // if (gameState === 'register') {
    //     return <PlayerRegistration onRegister={onRegister} isRegistering={isRegistering} />
    // }

    if (gameState === 'join') {
        return (
            <>
                <JoinGameScreen
                    isJoiningGame={isJoiningGame}
                    onJoinGame={joinExistingGame}
                    onBack={() => setGameState('dashboard')}
                />
                <Toaster />
            </>
        )
    }

    if (gameState === 'commit') {
        return (
            <>
                <CommitSolutionHash onCommit={onCommit} onBack={() => setGameState('dashboard')} />
                <Toaster />
            </>
        )
    }

    if (gameState === 'waiting') {
        return (
            <>
                <CreateGameScreen
                    onGameStart={startMultiplayerGame}
                    onBack={() => setGameState('dashboard')}
                />
                <Toaster />
            </>
        )
    }

    if (gameState === 'stats') {
        return <ViewStats playerAddress={address} onBack={() => setGameState('dashboard')} />
    }

    if (gameStage === 'Reveal' || gameState === 'reveal') {
        return (
            <>
                <GameOverScreen
                    gameResult={gameResult as any}
                    revealedSolution={
                        playerRole === 'creator' ? revealedSolution : opponentRevealedSolution
                    }
                    opponentRevealedSolution={
                        playerRole === 'creator' ? opponentRevealedSolution : revealedSolution
                    }
                    onRevealSolution={onRevealSolution}
                    isRevealed={isRevealed}
                    onPlayAgain={() => setGameState('dashboard')}
                    playSound={playSound}
                />
                <Toaster />
            </>
        )
    }

    return (
        <>
            <GameBoard
                guesses={playerRole === 'creator' ? creatorGuesses : opponentGuesses}
                opponentGuesses={playerRole === 'creator' ? opponentGuesses : creatorGuesses}
                hb={playerRole === 'creator' ? opponentHB : creatorHB}
                opponentHb={playerRole === 'creator' ? creatorHB : opponentHB}
                isPlayerTurn={isPlayerTurn}
                round={getGameCurrentRound ? Number(getGameCurrentRound) : undefined}
                playerRole={playerRole}
                onBack={() => setGameState('dashboard')}
                playerAddress={playerRole === 'creator' ? creatorAddress : opponentAddress}
                playSound={playSound}
            />
            <Toaster />
        </>
    )
}
