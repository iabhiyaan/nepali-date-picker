// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import packageJson from "./package.json";

export default defineConfig({
  plugins: [
    vue(), // Enable Vue plugin
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__dirname, "index.js"),
      name: packageJson.name, // Global variable name for UMD build
      formats: ["es", "umd", "cjs"], // Output formats
      fileName: (format) => `${packageJson.name}.${format}.js`, // Output file naming
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      // into your library (provided by the consuming application)
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
        assetFileNames: (assetInfo) => {
          return assetInfo.name;
        },
      },
    },
    cssCodeSplit: false,
    minify: true,
    sourcemap: true
    // Optional: Minify options or other build tweaks
    // sourcemap: true, // Generate source maps for debugging
    // emptyOutDir: true, // Clean output directory before build
  },
  css: {
    modules: {
      scopeBehaviour: 'local'
    }
  },
  // Optional: Define aliases for cleaner imports
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      [packageJson.name]: path.resolve(__dirname, 'dist/np-date-picker-vue-3.es.js')
    },
  },
});
