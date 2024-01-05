import { join } from "path";
import { __dirname } from './esmPolyfill.js';

export const PACKAGE_ROOT = join(__dirname, '..', '..', '..');

export const DEFAULT_HTML_PATH = join(PACKAGE_ROOT, "template.html");

