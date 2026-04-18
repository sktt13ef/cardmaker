const fs = require('fs');
const path = require('path');
const BASE = path.join(__dirname, '..');

// 1. Fix minimal-line/index.ts - deduplicate exports
const mlIndexPath = path.join(BASE, 'src', 'templates', 'minimal-line', 'index.ts');
let mlIndex = fs.readFileSync(mlIndexPath, 'utf8');
const mlLines = mlIndex.split('\n');
const mlSeen = new Set();
const mlOut = [];
for (const line of mlLines) {
  const trimmed = line.trim();
  if (trimmed.startsWith('export {')) {
    if (!mlSeen.has(trimmed)) {
      mlSeen.add(trimmed);
      mlOut.push(line);
    }
  } else {
    mlOut.push(line);
  }
}
fs.writeFileSync(mlIndexPath, mlOut.join('\n'), 'utf8');
console.log('Fixed: minimal-line/index.ts (' + mlSeen.size + ' unique exports)');

// 2. Fix catalog.ts - deduplicate categories
const catPath = path.join(BASE, 'src', 'templates', 'catalog.ts');
let cat = fs.readFileSync(catPath, 'utf8');
const catLines = cat.split('\n');
const catSeen = new Set();
const catOut = [];
for (const line of catLines) {
  const idMatch = line.match(/id:\s*'([^']+)'/);
  if (idMatch && line.includes('themeIds:')) {
    const catId = idMatch[1];
    if (catSeen.has(catId)) {
      console.log('  Removed duplicate category: ' + catId);
      continue;
    }
    catSeen.add(catId);
  }
  catOut.push(line);
}
fs.writeFileSync(catPath, catOut.join('\n'), 'utf8');
console.log('Fixed: catalog.ts');

// 3. Fix index.ts - remove ALL duplicate imports and TEMPLATES entries
const indexPath = path.join(BASE, 'src', 'templates', 'index.ts');
let index = fs.readFileSync(indexPath, 'utf8');

// Remove duplicate imports
const indexLines = index.split('\n');
const importSeen = new Set();
const indexOut = [];
for (const line of indexLines) {
  const trimmed = line.trim();
  const isImport = trimmed.startsWith('import ');
  if (isImport) {
    if (!importSeen.has(trimmed)) {
      importSeen.add(trimmed);
      indexOut.push(line);
    } else {
      console.log('  Removed duplicate import: ' + trimmed.substring(0, 60) + '...');
    }
  } else {
    indexOut.push(line);
  }
}
index = indexOut.join('\n');

// Remove duplicate TEMPLATES entries (lines like "  lineArtMondrian: lineArtMondrian,")
const entrySeen = new Set();
const entryLines = index.split('\n');
const entryOut = [];
for (const line of entryLines) {
  const trimmed = line.trim();
  const isEntry = /^\s*(lineArt|coverLine)\w+:\s*\1\w+,?\s*$/.test(trimmed);
  if (isEntry) {
    if (!entrySeen.has(trimmed)) {
      entrySeen.add(trimmed);
      entryOut.push(line);
    } else {
      console.log('  Removed duplicate entry: ' + trimmed.substring(0, 50) + '...');
    }
  } else {
    entryOut.push(line);
  }
}
index = entryOut.join('\n');

// Remove duplicate section comments
index = index.replace(/(\/\/ 极简线条GLM版 - 30个\s*\n)+/g, '// 极简线条GLM版 - 30个\n');
index = index.replace(/(\/\/ 极简线条封面 - 30个\s*\n)+/g, '// 极简线条封面 - 30个\n');

// Clean up multiple blank lines
index = index.replace(/\n{3,}/g, '\n\n');

fs.writeFileSync(indexPath, index, 'utf8');
console.log('Fixed: index.ts');

// 4. Verify cover template files exist
const coverDir = path.join(BASE, 'src', 'templates', 'minimal-line-cover');
const coverFiles = fs.readdirSync(coverDir).filter(f => f.endsWith('.tsx'));
console.log('Cover template files: ' + coverFiles.length);

// Check which ones are referenced in index.ts
const coverImports = index.match(/coverLine\w+/g) || [];
const uniqueCoverImports = [...new Set(coverImports)];
console.log('Cover imports in index.ts: ' + uniqueCoverImports.length);

// Check for missing files
for (const name of uniqueCoverImports) {
  const filePath = path.join(coverDir, name + '.tsx');
  if (!fs.existsSync(filePath)) {
    console.log('  MISSING: ' + name + '.tsx');
  }
}

console.log('\nAll fixes applied!');
