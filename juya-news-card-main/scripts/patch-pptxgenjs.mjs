import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const esPath = resolve(__dirname, '../node_modules/pptxgenjs/dist/pptxgen.es.js');

let content = readFileSync(esPath, 'utf8');

if (content.includes("import('node:fs')") || content.includes('import("node:fs")')) {
  content = content.replace(
    /import\(['"]node:fs['"]\)/g,
    "import(/* webpackIgnore: true */ 'node:fs')"
  );
  content = content.replace(
    /import\(['"]node:https['"]\)/g,
    "import(/* webpackIgnore: true */ 'node:https')"
  );

  if (!content.includes("try { ({ default: fs } = yield import(/* webpackIgnore: true */ 'node:fs')); } catch(e) {}")) {
    content = content.replace(
      /\(\{ default: fs \} = yield import\(\/\* webpackIgnore: true \*\/ 'node:fs'\)\)/,
      "try { ({ default: fs } = yield import(/* webpackIgnore: true */ 'node:fs')); } catch(e) {}"
    );
    content = content.replace(
      /\(\{ default: https \} = yield import\(\/\* webpackIgnore: true \*\/ 'node:https'\)\)/,
      "try { ({ default: https } = yield import(/* webpackIgnore: true */ 'node:https')); } catch(e) {}"
    );
  }

  writeFileSync(esPath, content, 'utf8');
  console.log('[patch-pptxgenjs] Patched pptxgen.es.js with webpackIgnore comments');
} else if (content.includes("/* webpackIgnore: true */ 'node:fs'")) {
  console.log('[patch-pptxgenjs] Already patched, skipping');
} else {
  console.log('[patch-pptxgenjs] No node:fs imports found, skipping');
}
