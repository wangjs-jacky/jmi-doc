import { cac } from "cac";
import { createDevServer } from "./dev.js";
/* 手动构造 require 处理 */
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const version = require("../../package.json").version;
const cli = cac("jmi-doc").version(version).help();

cli
  .command("dev [docs]", "启动服务器")
  .example("jmi-doc dev docs")
  .action(async (docs: string, options: any = {}) => {
    // 执行启动服务器的逻辑
    if(!docs){
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
  .action((docs: string, options: any = {}) => {
    // 执行启动服务器的逻辑
    console.log("触发构建任务", docs);
    if(!docs){
      cli.outputHelp();
      return;
    }
  })

const parsed = cli.parse()

/* console.log(JSON.stringify(parsed, null, 2)) */