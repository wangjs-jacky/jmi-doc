import { readFile } from "fs/promises"
import type { Plugin } from "vite"
import { DEFAULT_HTML_PATH } from "../../node/constants/index.js"

export const pluginIndexHtml = (): Plugin => {
  return {
    name: 'vite-plugin-index-html',
    apply: 'serve',
    /* configureServer的配置： https://cn.vitejs.dev/guide/api-plugin.html#configurepreviewserver */
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        /* 读取当前工程文件夹下的 template.html */
        let html = await readFile(DEFAULT_HTML_PATH, 'utf-8')

        try {
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(html)
        } catch (error) {
          next(error)
        }
      })
    }
  }
}