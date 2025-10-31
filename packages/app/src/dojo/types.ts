// Compile this file using
// DOJO_ROOT="path/to/mastermind-dojo/packages/contracts/dojoimpl" bunx @dojoengine/core --output ./mastermind_dev.json --generate-types
import { DojoProvider, ExtractAbiTypes } from "@dojoengine/core";
import { compiledAbi } from "./mastermind_dev";
import { dojoConfig } from "../../dojoConfig";

type MastermindAbi = ExtractAbiTypes<typeof compiledAbi>;
type MastermindActions = MastermindAbi["interfaces"]["mastermind::systems::interface::IMastermind"];

export const dojoProvider = new DojoProvider<MastermindActions>(
    dojoConfig.manifest,
    dojoConfig.rpcUrl
);
