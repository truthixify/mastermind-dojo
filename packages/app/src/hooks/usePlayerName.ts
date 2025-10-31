import { useDojoSDK } from "@dojoengine/sdk/react";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { addAddressPadding } from "starknet";

export const usePlayerName = (address: string | undefined) => {
    const { useDojoStore } = useDojoSDK();
    const entities = useDojoStore((state) => state.entities);
    
    if (!address) return '';
    
    const entityId = getEntityIdFromKeys([BigInt(addAddressPadding(address))]);
    const entity = entities[entityId];
    const player = entity?.models?.mastermind?.Player;

    return player?.player_name || '';
}
