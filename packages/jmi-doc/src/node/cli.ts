import { cac } from "cac";
import { createDevServer } from "./dev.js";
/* 手动构造 require 处理 */
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const version = require("../../package.json").version;
const cli = cac("jmi-doc").version(version).help();

cli
  .command("dev [docs]", "启动服务器")
  .action(async (docs: string, options: any = {}) => {
    // 执行启动服务器的逻辑
    console.log("触发启动", docs);
    const server = await createDevServer(docs);
    await server.listen();
    server.printUrls();
  })

cli
  .command("build [docs]", "构建服务器")
  .action((docs: string, options: any = {}) => {
    // 执行启动服务器的逻辑
    console.log("触发构建任务", docs);
  })

const parsed = cli.parse()

/* console.log(JSON.stringify(parsed, null, 2)) */