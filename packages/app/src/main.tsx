import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals-simplified.css'
import App from './App.tsx'
import { Separator } from './components/seperator.tsx'
import { Header } from './components/header.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import { DictionaryProvider } from './context/dictionary.tsx'

// Dojo imports
import { init } from "@dojoengine/sdk";
import { DojoSdkProvider } from "@dojoengine/sdk/react";
import { dojoConfig } from "../dojoConfig";
import DojoStarknetProvider from "./dojo/starknet-provider";
import type { SchemaType } from "./dojo/models.gen";
import { setupWorld } from "./dojo/contracts.gen";

/**
 * Initializes and bootstraps the Mastermind Dojo application.
 */
async function main() {
    const sdk = await init<SchemaType>({
        client: {
            worldAddress: dojoConfig.manifest.world.address,
        },
        domain: {
            name: "Mastermind",
            version: "1.0",
            chainId: "SN_SEPOLIA",
            revision: "1",
        },
    });

    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <DojoSdkProvider
                    sdk={sdk}
                    dojoConfig={dojoConfig}
                    clientFn={setupWorld}
                >
                    <DojoStarknetProvider>
                        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 retro-bg-pattern flex flex-col">
                            <Header />
                            <Separator className="border-b-4 border-black dark:border-gray-700" />
                            <DictionaryProvider>
                                <App />
                            </DictionaryProvider>
                        </div>
                        <Toaster />
                    </DojoStarknetProvider>
                </DojoSdkProvider>
            </ThemeProvider>
        </StrictMode>
    )
}

main().catch((error) => {
    console.error("Failed to initialize the Dojo application:", error);
});
