const fs = require('fs');
const path = require('path');

const catPath = path.join(__dirname, '..', 'src', 'templates', 'catalog.ts');
let content = fs.readFileSync(catPath, 'utf8');

// Remove duplicate category entries
const seenIds = new Set();
const lines = content.split('\n');
const out = [];
let inCategory = false;
let currentEntry = '';

for (const line of lines) {
  const idMatch = line.match(/id:\s*'([^']+)'/);
  if (idMatch && line.includes('name:') && line.includes('themeIds:')) {
    const catId = idMatch[1];
    if (seenIds.has(catId)) {
      continue;
    }
    seenIds.add(catId);
  }
  out.push(line);
}

content = out.join('\n');
content = content.replace(/\n{3,}/g, '\n\n');

fs.writeFileSync(catPath, content, 'utf8');
console.log('Cleaned up catalog.ts');
