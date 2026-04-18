const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'src', 'templates', 'index.ts');
let content = fs.readFileSync(indexPath, 'utf8');
const lines = content.split('\n');
const seen = new Set();
const out = [];

for (const line of lines) {
  const trimmed = line.trim();
  const isImport = /^import\s+\{[^}]+\}\s+from\s+['"]\.\/(minimal-line|minimal-line-cover)\//.test(trimmed);
  if (isImport) {
    if (!seen.has(trimmed)) {
      seen.add(trimmed);
      out.push(line);
    }
  } else {
    out.push(line);
  }
}

content = out.join('\n');

// Also deduplicate TEMPLATES entries
const seenEntries = new Set();
content = content.replace(
  /(\s+(?:lineArt|coverLine)\w+:\s+(?:lineArt|coverLine)\w+,)/g,
  (match) => {
    if (seenEntries.has(match)) return '';
    seenEntries.add(match);
    return match;
  }
);

// Remove duplicate section comments
content = content.replace(/\/\/ 极简线条GLM版 - 30个\s*\n\/\/ 极简线条GLM版 - 30个/g, '// 极简线条GLM版 - 30个');
content = content.replace(/\/\/ 极简线条封面 - 30个\s*\n\/\/ 极简线条封面 - 30个/g, '// 极简线条封面 - 30个');

// Remove empty lines between deduplicated entries
content = content.replace(/\n{3,}/g, '\n\n');

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Cleaned up index.ts');
