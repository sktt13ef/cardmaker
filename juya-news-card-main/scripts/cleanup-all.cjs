const fs = require('fs');
const path = require('path');
const BASE = path.join(__dirname, '..');

// Delete all cover template files
const coverDir = path.join(BASE, 'src', 'templates', 'minimal-line-cover');
if (fs.existsSync(coverDir)) {
  const files = fs.readdirSync(coverDir);
  for (const f of files) {
    if (f.endsWith('.tsx') || f.endsWith('.ts')) {
      fs.unlinkSync(path.join(coverDir, f));
      console.log('Deleted: ' + f);
    }
  }
}

// Clean up index.ts - remove all duplicate imports and entries
const indexPath = path.join(BASE, 'src', 'templates', 'index.ts');
let content = fs.readFileSync(indexPath, 'utf8');

// Remove all GLM and cover import blocks (they'll be regenerated)
content = content.replace(/\/\/ 极简线条GLM版[\s\S]*?\/\/ 简约线条模板\n/g, '// 简约线条模板\n');

// Remove all GLM and cover TEMPLATES entries
content = content.replace(/\/\/ 极简线条GLM版 - 30个[\s\S]*?\/\/ 简约线条模板\n  lineMinimal:/g, '// 简约线条模板\n  lineMinimal:');

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Cleaned index.ts');
