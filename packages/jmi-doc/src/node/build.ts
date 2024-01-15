import { build as viteBuild } from "vite";
import { CLIENT_ENTRY_PATH, SSR_ENTRY_PATH } from "./constants/index.js";
import { join } from "path";
import type { RollupOutput } from "rollup";

export const build = async (root = ".") => {
  const clientBuild = () => {
    return viteBuild({
      mode: "production",
      root: join(process.cwd(), root),
      build: {
        outDir: "dist",
        rollupOptions: {
          input: CLIENT_ENTRY_PATH,
          output: {
            format: "esm"
          }
        }
      }
    })
  };
  const ssrBuild = () => {
    return viteBuild({
      mode: "production",
      root: join(process.cwd(), root),
      build: {
        ssr: true,
        outDir: ".temp",
        rollupOptions: {
          input: SSR_ENTRY_PATH,
          output: {
            format: "cjs"
          }
        }
      }
    })
  }

  const [clientBundle, ssrBundle] = await Promise.all([clientBuild(), ssrBuild()])
  return [clientBundle, ssrBundle] as [RollupOutput, RollupOutput]
}