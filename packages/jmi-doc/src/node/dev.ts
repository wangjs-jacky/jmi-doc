/* 封装 vite-dev-server */
import { createServer as createViteDevServer } from "vite";
import { pluginIndexHtml } from "../plugins/plugin-index-html/index.js";
import { join } from "path";
import Inspect from 'vite-plugin-inspect';
import pluginReact from "@vitejs/plugin-react";

export async function createDevServer(root = ".") {
  return createViteDevServer({
    root: join(process.cwd(), "."),
    plugins: [
      pluginIndexHtml(),
      pluginReact(),
      Inspect()
    ]
  })
}