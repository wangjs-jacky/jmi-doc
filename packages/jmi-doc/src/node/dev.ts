/* 封装 vite-dev-server */
import { createServer as createViteDevServer } from "vite";
import { pluginIndexHtml } from "../plugins/plugin-index-html/index.js";

export async function createDevServer(root = process.cwd()) {
  return createViteDevServer({
    root,
    plugins: [
      pluginIndexHtml()
    ]
  })
}