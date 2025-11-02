import { ArrowRight, Loader2 } from 'lucide-react'
// import { useDojoReadContract } from '../../dojo/useDojoReadContract'

import { useEffect, useState } from 'react'
import { useAccount } from '@starknet-react/core'
import { addAddressPadding } from 'starknet'
import { feltToHex } from '../../utils/common'
import {
    useGetGameOpponentAddress,
    useGetGameCreatorAddress,
    useGetGameCurrentRound
} from '../../dojo/useReadContract'
import { contractAddressToHex, shortenAddress } from '../../lib/utils'

type ActiveGameProps = {
    id: number
    onContinueGame: (gameId: number) => void
}

const ActiveGame = ({ id, onContinueGame }: ActiveGameProps) => {
    const [isPlayerTurn, setIsPlayerTurn] = useState<boolean | null>(null)
    const { address } = useAccount()

    const { data: opponentAddress } = useGetGameOpponentAddress(id)

    const { data: creatorAddress } = useGetGameCreatorAddress(id)

    const { data: getGameCurrentRound } = useGetGameCurrentRound(id)

    useEffect(() => {
        if (address === addAddressPadding(feltToHex(creatorAddress || 0n))) {
            setIsPlayerTurn(Number(getGameCurrentRound) % 2 === 1)
        } else if (address === addAddressPadding(feltToHex(opponentAddress || 0n))) {
            setIsPlayerTurn(Number(getGameCurrentRound) % 2 === 0)
        }
    }, [getGameCurrentRound, creatorAddress, opponentAddress, address])

    return (
        <div
            key={id}
            className={`retro-dashboard-card ${isPlayerTurn ? 'retro-dashboard-card-active' : ''}`}
        >
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">Game #{id}</h3>
                <span
                    className={`retro-badge ${isPlayerTurn ? 'retro-badge-success' : 'retro-badge-secondary'}`}
                >
                    {isPlayerTurn === null && '????'}
                    {isPlayerTurn === true && 'Your Turn'}
                    {isPlayerTurn === false && 'Waiting'}
                </span>
            </div>
            {creatorAddress && opponentAddress && getGameCurrentRound ? (
                <p className="flex justify-between mb-4">
                    <span>
                        {shortenAddress(contractAddressToHex(creatorAddress)) || 'Unknown'} vs.{' '}
                        {shortenAddress(contractAddressToHex(opponentAddress)) || 'Unknown'}
                    </span>
                    <span>Round {getGameCurrentRound}</span>
                </p>
            ) : (
                <p className="flex items-center mb-4">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Loading Game Details...
                </p>
            )}
            <button
                onClick={() => onContinueGame(id)}
                className={`retro-button ${isPlayerTurn ? 'retro-button-primary' : 'retro-button-outline'} w-full flex items-center justify-center`}
            >
                Continue Game
                <ArrowRight className="ml-2 h-4 w-4 inline" />
            </button>
        </div>
    )
}

export default ActiveGame
