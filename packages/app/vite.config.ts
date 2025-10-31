import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import serveStatic from 'vite-plugin-serve-static'
import mkcert from 'vite-plugin-mkcert'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vite.dev/config/
export default defineConfig({
    server: {
        proxy: {}
    },
    plugins: [
        react(),
        mkcert(),
        wasm(),
        topLevelAwait(),
        {
            // Workaround for https://github.com/keep-starknet-strange/scaffold-garaga/issues/5
            ...serveStatic([
                {
                    pattern: /main.worker.js/,
                    resolve: 'node_modules/@aztec/bb.js/dest/browser/main.worker.js'
                }
            ]),
            apply: 'serve' // Only apply in dev mode
        }
    ],
    optimizeDeps: {
        exclude: ['@dojoengine/torii-wasm']
    }
})
