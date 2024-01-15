import fs from "fs-extra";
import { join } from "path";
import { RollupOutput } from "rollup";

export const renderPage = async (
  render: any,
  clientBundle: RollupOutput,
  root: string,
) => {
  // 1. html 文件
  const appHtml = render();
  const _root = join(process.cwd(), root);

  // 2. script 插入 client-entry.js 文件
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === "chunk" && chunk.isEntry
  );

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="root">${appHtml}</div>
  <script src="./${clientChunk?.fileName}"></script>
</body>
</html>
  `
  await fs.ensureDir(join(_root, "dist"));
  await fs.writeFile(join(_root, "dist/index.html"), html);
  await fs.remove(join(_root, ".temp"));
}


