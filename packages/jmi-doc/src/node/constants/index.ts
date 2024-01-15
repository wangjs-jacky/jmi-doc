import { join } from "path";
import { __dirname } from './esmPolyfill.js';

export const JMI_DOC_PATH = join(__dirname, '..', '..', '..');

export const DEFAULT_HTML_PATH = join(JMI_DOC_PATH, "template.html");

export const CLIENT_ENTRY_PATH = join(JMI_DOC_PATH, "src", "runtime", "client-entry.tsx");

export const SSR_ENTRY_PATH = join(JMI_DOC_PATH, "src", "runtime", "ssr-entry.tsx");