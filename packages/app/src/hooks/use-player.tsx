import { init, KeysClause, ToriiQueryBuilder } from "@dojoengine/sdk";
import { useEntityId, useEntityQuery, useModel } from "@dojoengine/sdk/react";
import { ModelsMapping, useSystemCalls } from "../dojo";
import { addAddressPadding } from "starknet";
// import { init, ToriiQueryBuilder } from '@dojoengine/sdk'
import manifest from '../../../contracts/dojoimpl/manifest_sepolia.json'

export const usePlayer = ({ address }: {
    address: `0x${string}`
}) => {

    useEntityQuery(
        new ToriiQueryBuilder()
            .withClause(
                // Querying Moves and Position models that has at least [account.address] as key
                KeysClause(
                    [ModelsMapping.Player],
                    [
                        address
                            ? addAddressPadding(address)
                            : undefined,
                    ],
                    "FixedLen"
                ).build()
            )
            .includeHashedKeys()
    );

    const entityId = useEntityId(address ?? "0");
    const player = useModel(entityId as string, ModelsMapping.Player);

    return {
        player
    }
}

// const DOMAIN_SEPERATOR = {
//         name: 'dojo-intro',
//         version: '1.0',
//         chainId: 'KATANA',
//         revision: '1',
//       };

// const torii = await init({
//         client: {
//         worldAddress: manifest.world.address,
//         toriiUrl: 'https://api.cartridge.gg/x/mastermind001/torii',
//         },
//         domain: DOMAIN_SEPERATOR,
//     });

//     const { initGame } = useSystemCalls();

//     initGame();

//     // Subscribe to model updates
//     const [_, subscription] = await torii.subscribeEntityQuery({
//         query: new ToriiQueryBuilder().withClause(
//         KeysClause(['di-Position', 'di-Moves'], [address], 'FixedLen').build(),
//         ),
//         callback: ({ data, error }) => {
//         if (data) {
//             updateFromEntitiesData(data);
//         }
//         if (error) {
//             console.error(error);
//         }
//         },
//     });