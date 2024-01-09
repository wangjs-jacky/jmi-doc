/* 封装 vite-dev-server */
import { createServer as createViteDevServer } from "vite";
import { pluginIndexHtml } from "../plugins/plugin-index-html/index.js";
import { join } from "path";

export async function createDevServer(root = ".") {
  console.log("root", root);

  return createViteDevServer({
    root: join(process.cwd(), "."),
    plugins: [
      pluginIndexHtml()
    ]
  })
}