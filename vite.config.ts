import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  build : {
    lib : { entry : "src/main.ts", formats : ["es"], fileName: "index", cssFileName : "styles"},
    // React doit rester fourni par le projet consommateur (peerDependency), y compris
    // react/jsx-runtime et react/compiler-runtime injecté par le React Compiler.
    rolldownOptions : { external : [/^react(-dom)?($|\/)/]},
    copyPublicDir : false,
    sourcemap : true
  }
})
