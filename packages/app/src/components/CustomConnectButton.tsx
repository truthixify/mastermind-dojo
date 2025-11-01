import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { Button } from "./ui/button";
import { lookupAddresses } from '@cartridge/controller';
import { useEffect, useState } from "react";
import { addAddressPadding,  } from "starknet";

function normalizeAddress(addr: string) {
  if (!addr) return addr
  return addr.toLowerCase().replace(/^0x0+/, '0x')
}

export const CustomConnectButton = () => {
    const { address } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();

    const [username, setUsername] = useState('')

    useEffect(() => {
        if (!address) return
        addAddressPadding

        const fetchUsername = async () => {
            const addressMap = await lookupAddresses([address]);
            setUsername(addressMap.get(normalizeAddress(address)))
        }

        fetchUsername()
    }, [address])

    if (address) {
        return (
            <Button size="lg" className="retro-button" onClick={() => disconnect()}>
                {username ? username : `${address.slice(0, 6)}...${address.slice(-4)}`}
            </Button>
        );
    }

    return (
        <Button size="lg" className="retro-button" onClick={() => connect({ connector: connectors[0] })}>
            Connect Wallet
        </Button>
    );
};