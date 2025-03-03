import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import fs from "fs";
// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [
      vue(),
      {
        name: "copy-index-html",
        apply: "build", // this executes after build. I hope this help
        writeBundle() {
          console.log("copying index.html file to templates!📖");
          fs.copyFileSync(
            path.resolve(__dirname, "dist/index.html"),
            path.resolve(__dirname, "../templates/earthquake/index.html")
          );
          console.log("copying assets to static!📦");
          fs.copyFileSync(
            path.resolve(__dirname, "dist/assets/*"),
            path.resolve(__dirname, "../static/earthquake/")
          );
        },
      },
    ],
    server: {
      allowedHosts: [process.env.VITE_HOST_NAME ?? ""],
      // proxy: {
      //   "/api": {
      //     target: "https://490f-103-97-2-71.ngrok-free.app",
      //     changeOrigin: true,
      //     secure: false,
      //     rewrite: (path) => path.replace(/^\/api/, ""),
      //   },
      // },
    },
  });
};
