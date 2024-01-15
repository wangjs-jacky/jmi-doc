import { cac } from "cac";
import { createDevServer } from "./dev.js";
/* 手动构造 require 处理 */
import { createRequire } from 'module';
import { build } from "./build.js";
import { renderPage } from "./renderPage.js";
import { join } from "path";

const require = createRequire(import.meta.url);
const version = require("../../package.json").version;
const cli = cac("jmi-doc").version(version).help();

cli
  .command("dev [docs]", "启动服务器")
  .example("jmi-doc dev docs")
  .action(async (docs: string, options: any = {}) => {
    // 执行启动服务器的逻辑
    if (!docs) {
      cli.outputHelp();
      return;
    }
    const server = await createDevServer(docs);
    await server.listen();
    server.printUrls();
  })

cli
  .command("build <docs>", "构建服务器")
  .example("jmi-doc build docs")
  .action(async (docs: string, options: any = {}) => {
    // 执行启动服务器的逻辑
    console.log("触发构建任务", docs);
    if (!docs) {
      cli.outputHelp();
      return;
    }

    try {
      const [clientBundle] = await build(docs);
      // clientBundle 格式化规范 cjs 使用 require 方式导入
      const { render } = require(join(process.cwd(), docs, '.temp', 'ssr-entry.js'));
      await renderPage(render, clientBundle, docs);
    } catch (error) {
      console.log(error);
    }
  })

const parsed = cli.parse()

/* console.log(JSON.stringify(parsed, null, 2)) */