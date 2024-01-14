import { readFile } from "fs/promises"
import type { Plugin } from "vite"
import { CLIENT_ENTRY_PATH, DEFAULT_HTML_PATH } from "../../node/constants/index.js"

export const pluginIndexHtml = (): Plugin => {
  return {
    name: 'vite-plugin-index-html',
    apply: 'serve',
    transformIndexHtml(html){
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              type: 'module',
              src: `/@fs/${CLIENT_ENTRY_PATH}`
            },
            injectTo: 'body'
          }
        ]
      }
    },
    /* configureServer的配置： https://cn.vitejs.dev/guide/api-plugin.html#configurepreviewserver */
    configureServer(server) {
      return () => server.middlewares.use(async (req, res, next) => {
        /* 读取当前工程文件夹下的 template.html */
        let html = await readFile(DEFAULT_HTML_PATH, 'utf-8');

        try {
          html = await server.transformIndexHtml(req.url!, html, req.originalUrl)
          
          res.writeHead(200, { 'Content-Type': 'text/html' })
          /* res.statusCode = 200;
          res.setHeader("Content-Type", "text/html"); */
          res.end(html)
        } catch (error) {
          next(error)
        }
      })
    }
  }
}