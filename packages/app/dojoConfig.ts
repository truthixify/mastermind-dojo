import { createDojoConfig } from "@dojoengine/core";

import manifest from "../contracts/dojoimpl/manifest_sepolia.json";

export const dojoConfig = createDojoConfig({
    manifest,
});
