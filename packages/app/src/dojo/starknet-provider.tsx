import { sepolia } from "@starknet-react/chains";
import { 
    StarknetConfig, 
    jsonRpcProvider,
    voyager,
    InjectedConnector 
} from "@starknet-react/core";
import { constants } from "starknet";
import ControllerConnector from "@cartridge/connector/controller";
import { SessionPolicies } from "@cartridge/controller";
import type { PropsWithChildren } from "react";

// Standard contract addresses
export const MASTERMIND_CONTRACT_ADDRESS = "0x0"; // Replace with your actual contract address

// Supported chains configuration
const chains = [
    {
        id: constants.StarknetChainId.SN_SEPOLIA,
        name: "Sepolia",
        rpcUrl: "https://api.cartridge.gg/x/starknet/sepolia"
    },
    {
        id: constants.StarknetChainId.SN_MAIN,
        name: "Mainnet", 
        rpcUrl: "https://api.cartridge.gg/x/starknet/mainnet"
    }
];

// Session policies for contracts
const policies: SessionPolicies = {
    contracts: {
        [MASTERMIND_CONTRACT_ADDRESS]: {
            methods: [
                { name: "register_player", entrypoint: "register_player" },
                { name: "init_game", entrypoint: "init_game" },
                { name: "join_game", entrypoint: "join_game" },
                { name: "submit_guess", entrypoint: "submit_guess" },
                { name: "commit_solution_hash", entrypoint: "commit_solution_hash" },
                { name: "submit_hit_and_blow_proof", entrypoint: "submit_hit_and_blow_proof" },
                { name: "reveal_solution", entrypoint: "reveal_solution" }
            ]
        }
    }
};

// Create Cartridge Controller instance
export const controllerInstance = new ControllerConnector({
    policies,
    defaultChainId: constants.StarknetChainId.SN_SEPOLIA,
    chains: chains,
    url: import.meta.env.VITE_KEYCHAIN_DEPLOYMENT_URL,
    profileUrl: import.meta.env.VITE_PROFILE_DEPLOYMENT_URL
}) as unknown as InjectedConnector;

// Configure the JSON RPC provider
const provider = jsonRpcProvider({
    rpc: () => ({ nodeUrl: "https://api.cartridge.gg/x/starknet/sepolia" }),
});

// Create the Starknet provider with Cartridge Controller only
export default function DojoStarknetProvider({ children }: PropsWithChildren) {
    return (
        <StarknetConfig
            chains={[sepolia]}
            provider={provider}
            connectors={[controllerInstance]}
            explorer={voyager}
            autoConnect
        >
            {children}
        </StarknetConfig>
    );
}