import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { exec } from "child_process";
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
          let content = fs.readFileSync("dist/index.html").toString();
          content = content.replaceAll(
            /"\/assets\/([\w-]+\.[\w]+)"/g,
            "{% static 'earthquake/$1' %}"
          );
          content = `{% load static %}${content}`;
          fs.writeFileSync("dist/index.html", content);
          console.log("copying index.html file to templates!📖");
          console.log("copying assets to static!📦");
          exec(
            "cp dist/index.html ../templates/earthquake/ && rm -f ../static/earthquake/* && cp dist/assets/* ../static/earthquake/",
            (err, out, stderr) => {
              console.log(out);
              console.error(stderr);
              if (err !== null) {
                console.error(`exec error: ${err}`);
              }
            }
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
