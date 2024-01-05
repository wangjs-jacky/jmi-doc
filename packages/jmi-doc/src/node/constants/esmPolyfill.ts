import { dirname } from "path";

// 获取当前文件的URL
const currentFileUrl = import.meta.url;

// 转换为file协议URL
const currentFilePath = new URL(currentFileUrl).pathname;

// __filename 的等价物（在 Windows 系统中需要特别处理）
export const __filename = process.platform === 'win32' ? currentFilePath.substring(1) : currentFilePath;

// __dirname 的等价物
export const __dirname = dirname(__filename);