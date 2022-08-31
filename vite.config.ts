import { defineConfig } from "vite"
import prefresh from "@prefresh/vite"

export default defineConfig({
  plugins: [prefresh()],
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "preact",
  },
})
