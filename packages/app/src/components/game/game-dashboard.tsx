import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Users, Clock, Trophy, RefreshCw, HelpCircle, Loader2 } from 'lucide-react'
import HelpModal from './help-modal'
import { useDojoReadContract } from '../../dojo/useDojoReadContract'
import AvailableGame from './available-game'
import ActiveGame from './active-game'
import { useAccount } from '@starknet-react/core'
import { Button } from '../ui/button'
import { GameCreationStatus } from './game-container'

interface GameDashboardProps {
    onCreateGame: () => void
    onJoinGame: () => void
    onContinueGame: (gameId: number) => void
    onJoinAvalaibleGame: () => void
    onViewStats: () => void
    gameCreationStatus: GameCreationStatus
}

export default function GameDashboard({
    onCreateGame,
    onJoinGame,
    onContinueGame,
    onJoinAvalaibleGame,
    onViewStats,
    gameCreationStatus
}: GameDashboardProps) {
    const [activeTab, setActiveTab] = useState('active')
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [activeGameIds, setActiveGameIds] = useState<number[]>([1])
    const [availableGameIds, setAvailableGameIds] = useState<number[]>([1])
    const [showHelp, setShowHelp] = useState(false)
    const { address } = useAccount()

    const { data: getAvailableGameIds } = useDojoReadContract<number[]>({
        functionName: 'get_available_game_ids'
    })

    const { data: getActiveGameIds } = useDojoReadContract<number[]>({
        functionName: 'get_player_active_game_ids',
        args: [address]
    })

    useEffect(() => {
        setActiveGameIds(getActiveGameIds)
        setAvailableGameIds(getAvailableGameIds)
    }, [getAvailableGameIds, getAvailableGameIds])

    const refreshGames = () => {
        setIsRefreshing(true)
        setActiveGameIds(getActiveGameIds)
        setAvailableGameIds(getAvailableGameIds)

        setTimeout(() => {
            setIsRefreshing(false)
        }, 500)
    }

    return (
        <div className="retro-container">
            {/* Main actions */}
            <motion.div
                className="flex flex-col md:flex-row gap-4 justify-center mb-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
            >
                <Button
                    onClick={onCreateGame}
                    className="retro-button retro-button-primary flex items-center gap-2 justify-center"
                    size="xl"
                    disabled={
                        gameCreationStatus === 'creating' || gameCreationStatus === 'waiting_event'
                    }
                >
                    {gameCreationStatus === 'creating' || gameCreationStatus === 'waiting_event' ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                        <Plus className="h-5 w-5" />
                    )}
                    {
                        {
                            creating: 'Creating Game...',
                            waiting_event: 'Waiting for Game ID...',
                            idle: 'Create Game',
                            error: 'Try Again'
                        }[gameCreationStatus]
                    }
                </Button>
                <Button
                    onClick={onJoinGame}
                    className="retro-button retro-button-secondary flex items-center gap-2 justify-center"
                    size={'xl'}
                    variant={'secondary'}
                >
                    <Users className="h-5 w-5" />
                    Join Game by ID
                </Button>
                <Button
                    onClick={onViewStats}
                    className="retro-button retro-button-outline w-full py-3 flex items-center justify-center gap-3"
                    size={'xl'}
                    variant={'outline'}
                >
                    <Trophy className="h-5 w-5" />
                    View Stats
                </Button>
                <Button
                    onClick={refreshGames}
                    className="retro-button retro-button-outline flex items-center gap-2 justify-center"
                    size={'xl'}
                    disabled={isRefreshing}
                    variant={'ghost'}
                >
                    <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    {isRefreshing ? 'Refreshing...' : 'Refresh Games'}
                </Button>
            </motion.div>

            {/* Game lists */}
            <motion.div
                className="mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
            >
                <div className="retro-tabs flex justify-center">
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`w-1/2 retro-tab ${activeTab === 'active' ? 'retro-tab-active' : 'retro-tab-inactive'}`}
                    >
                        <Clock className="h-4 w-4 inline mr-2" />
                        <span>Active Games</span>
                        <span className="retro-badge retro-badge-primary ml-2">
                            {activeGameIds ? activeGameIds.length : 0}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('available')}
                        className={`w-1/2 retro-tab ${activeTab === 'available' ? 'retro-tab-active' : 'retro-tab-inactive'}`}
                    >
                        <Users className="h-4 w-4 inline mr-2" />
                        <span>Available Games</span>
                        <span className="retro-badge retro-badge-primary ml-2">
                            {availableGameIds ? availableGameIds.length : 0}
                        </span>
                    </button>
                </div>

                {/* Active Games Tab */}
                <div className={activeTab === 'active' ? 'block' : 'hidden'}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {activeGameIds && activeGameIds.length > 0 ? (
                            activeGameIds.map(id => (
                                <ActiveGame key={id} id={id} onContinueGame={onContinueGame} />
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-8 text-gray-500 dark:text-gray-400">
                                <Trophy className="h-12 w-12 mx-auto mb-2 opacity-20" />
                                <p className="font-bold">You don't have any active games.</p>
                                <p className="text-sm mt-1">
                                    Create a new game or join an available one to start playing!
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Available Games Tab */}
                <div className={activeTab === 'available' ? 'block' : 'hidden'}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {availableGameIds && availableGameIds.length > 0 ? (
                            availableGameIds.map(id => (
                                <AvailableGame
                                    key={id}
                                    id={id}
                                    onJoinAvalaibleGame={onJoinAvalaibleGame}
                                />
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-8 text-gray-500 dark:text-gray-400">
                                <Users className="h-12 w-12 mx-auto mb-2 opacity-20" />
                                <p className="font-bold">No available games found.</p>
                                <p className="text-sm mt-1">
                                    Create a new game and wait for someone to join!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Help button */}
            <motion.div
                className="fixed bottom-4 right-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
            >
                <button
                    onClick={() => setShowHelp(true)}
                    className="retro-button retro-button-outline flex items-center gap-2 py-2 px-3"
                >
                    <HelpCircle size={18} />
                    How to Play
                </button>
            </motion.div>

            {/* Help modal */}
            <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
        </div>
    )
}
