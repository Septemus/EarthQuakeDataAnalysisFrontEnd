import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [vue()],
  server: {
    allowedHosts:["0cc4-103-97-2-67.ngrok-free.app","6851-160-30-128-130.ngrok-free.app"],
    proxy: {
      "/api": {
        target: "https://490f-103-97-2-71.ngrok-free.app",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
