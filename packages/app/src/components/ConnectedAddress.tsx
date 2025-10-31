'use client'
import { useAccount } from '@starknet-react/core'

export const ConnectedAddress = () => {
    const { address, isConnecting } = useAccount()

    if (!address) return null

    return (
        <div className="flex justify-center items-center space-x-2">
            <div className="text-sm font-mono">
                {isConnecting ? 'Connecting...' : `${address.slice(0, 6)}...${address.slice(-4)}`}
            </div>
        </div>
    )
}
