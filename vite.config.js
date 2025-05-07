import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"
import vue from "@vitejs/plugin-vue"
import { URL, fileURLToPath } from "node:url"

// const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 5173,
  },
  // // prevent vite from obscuring rust errors
  // clearScreen: false,
  // server: {
  //   port: 1420,
  //   // Tauri expects a fixed port, fail if that port is not available
  //   strictPort: true,
  //   // if the host Tauri is expecting is set, use it
  //   host: host || false,
  //   hmr: host
  //     ? {
  //         protocol: 'ws',
  //         host,
  //         port: 1421,
  //       }
  //     : undefined,

  //   watch: {
  //     // tell vite to ignore watching `src-tauri`
  //     ignored: ['**/src-tauri/**'],
  //   },
  // },
  // // Env variables starting with the item of `envPrefix` will be exposed in tauri's source code through `import.meta.env`.
  // envPrefix: ['VITE_', 'TAURI_ENV_*'],
  // build: {
  //   // Tauri uses Chromium on Windows and WebKit on macOS and Linux
  //   target:
  //     process.env.TAURI_ENV_PLATFORM == 'windows'
  //       ? 'chrome105'
  //       : 'safari13',
  //   // don't minify for debug builds
  //   minify: !process.env.TAURI_ENV_DEBUG ? 'esbuild' : false,
  //   // produce sourcemaps for debug builds
  //   sourcemap: !!process.env.TAURI_ENV_DEBUG,
  // },
})
