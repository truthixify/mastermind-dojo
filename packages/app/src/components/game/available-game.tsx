import { Loader2, Users } from 'lucide-react'
// import { useDojoReadContract } from '../../dojo/useDojoReadContract'
import { useSystemCalls } from '../../dojo/useSystemCalls'
import { useGameStore } from '../../stores/gameStore'
// import { feltToString } from '../../utils/utils'
import { Button } from '../ui/button'
import { useToast } from '../../hooks/use-toast'
import { SetStateAction, useState } from 'react'
import { useGetGameCreatorAddress, useGetPlayerName } from '../../dojo/useReadContract'
import { contractAddressToHex, shortenAddress } from '../../lib/utils'
import CommitSolutionHash from '../game/commit-solution-hash-screen'

type AvailableGameProps = {
    id: number
    onJoinAvalaibleGame: () => void
    setActiveTab: React.Dispatch<SetStateAction<string>>
}

const AvailableGame = ({ id, onJoinAvalaibleGame, setActiveTab }: AvailableGameProps) => {
    const { setGameId } = useGameStore()
    const [isJoiningGame, setIsJoiningGame] = useState(false)
    const { toast } = useToast()
    const [showCommitSolnHash, setShowCommitSolnHash] = useState(false)

    const { joinGame: dojoJoinGame } = useSystemCalls()

    // const { data: creatorAddress } = useDojoReadContract({
    //     functionName: 'get_game_creator_address',
    //     args: [id]
    // })

    const { data: gameCreatorAddress } = useGetGameCreatorAddress(id)

    const { data: gameCreatorName } = useGetPlayerName(
        contractAddressToHex(gameCreatorAddress || '')
    )

    // console.log(gameCreatorName);

    // console.log(contractAddressToHex(gameCreatorAddress))

    // const { data: creatorName } = useDojoReadContract({
    //     functionName: 'get_player_name',
    //     args: [creatorAddress]
    // })

    const handleJoinGame = async () => {
        setIsJoiningGame(true)

        try {
            setGameId(id)

            await dojoJoinGame(id)
            // console.log("Joined game")

            onJoinAvalaibleGame()
            toast({
                title: 'Joined Game',
                description: `You successfully joined game #${id}`
            })
        } catch (error: any) {
            toast({
                title: 'Join Game Error',
                description: error?.message || 'An unexpected error occurred.',
                variant: 'destructive'
            })
        } finally {
            setIsJoiningGame(false)
            setShowCommitSolnHash(true)
        }
    }

    return (
        <div className="retro-dashboard-card">
            <h3 className="font-bold text-lg mb-2">Game #{id}</h3>
            {/* <p className="mb-2">Created by {feltToString(creatorName)}</p> */}
            <p className="mb-2">
                Created by {shortenAddress(contractAddressToHex(gameCreatorAddress))}
            </p>
            <Button
                onClick={handleJoinGame}
                className="retro-button retro-button-secondary w-full flex items-center justify-center"
                variant={'secondary'}
                disabled={isJoiningGame}
            >
                {isJoiningGame && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {isJoiningGame ? 'Joining...' : 'Join Game'}
                {!isJoiningGame && <Users className="ml-2 h-4 w-4 inline" />}
            </Button>

            {showCommitSolnHash && (
                <CommitSolutionHash
                    onCommit={() => setShowCommitSolnHash(false)}
                    onBack={() => setActiveTab('active')}
                />
            )}
        </div>
    )
}

export default AvailableGame
