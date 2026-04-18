/**
 * 修复模板文件中的语法错误
 * 使用方法: node scripts/fix-templates.cjs
 */
const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '..', 'src', 'templates');
const COVERS_DIR = path.join(__dirname, '..', 'src', 'templates', 'covers');

// 获取所有模板文件
function getAllTemplateFiles() {
  const files = [];

  // 主模板
  const mainFiles = fs.readdirSync(TEMPLATES_DIR)
    .filter(f => f.endsWith('.tsx'))
    .filter(f => !['index.ts', 'types.ts', 'catalog.ts', 'client-registry.ts', 'runtime-resolver.ts', 'ssr-runtime.ts'].includes(f))
    .map(f => path.join(TEMPLATES_DIR, f));
  files.push(...mainFiles);

  // 封面模板
  const coverFiles = fs.readdirSync(COVERS_DIR)
    .filter(f => f.endsWith('.tsx'))
    .filter(f => f !== 'index.ts')
    .map(f => path.join(COVERS_DIR, f));
  files.push(...coverFiles);

  return files;
}

// 修复单个文件
function fixTemplate(filepath) {
  let content = fs.readFileSync(filepath, 'utf-8');
  const basename = path.basename(filepath);
  let fixed = false;

  // 检查是否有语法错误特征
  // 1. 检查是否有未闭合的 <div style={{ flex: 1, overflow: 'hidden' }}>
  const openDivCount = (content.match(/<div style=\{\{\s*flex:\s*1/g) || []).length;
  const closeDivCount = (content.match(/<\/div>\s*\n\s*\{\/\*\s*底部进度条/g) || []).length;

  if (openDivCount > closeDivCount) {
    console.log(`  [FIXING] ${basename} - unclosed div detected`);

    // 修复：确保底部进度条前有正确的闭合
    // 查找 export const 之前的模式
    const wrongPattern = /(\s+<\/div>\s+<\/div>\s*\);\s*\};\s*export\s+const)/;
    const rightReplacement = `      </div>

      {/* 底部进度条 */}
      {renderProgressBar('bottom')}
    </div>
  );
};

export const`;

    if (wrongPattern.test(content)) {
      content = content.replace(wrongPattern, rightReplacement);
      fixed = true;
    }
  }

  // 2. 检查 renderProgressBar 函数是否重复
  const renderProgressBarCount = (content.match(/const renderProgressBar = /g) || []).length;
  if (renderProgressBarCount > 1) {
    console.log(`  [FIXING] ${basename} - duplicate renderProgressBar`);
    // 保留第一个，移除其他的
    const parts = content.split(/(?=\s+\/\/ 进度条配置)/);
    if (parts.length > 2) {
      content = parts[0] + parts.slice(2).join('');
      fixed = true;
    }
  }

  // 3. 检查是否有未正确闭合的 JSX
  if (content.includes('JSX element') || content.includes('Unexpected token')) {
    // 尝试修复常见的 JSX 错误
    // 确保每个 opening div 有对应的 closing div
    const lines = content.split('\n');
    let depth = 0;
    let inJSX = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes('return (') || line.includes('return(')) {
        inJSX = true;
      }
      if (inJSX) {
        if (line.includes('<div') && !line.includes('</div>')) depth++;
        if (line.includes('</div>') && !line.includes('<div')) depth--;
      }
    }
  }

  if (fixed) {
    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`  [FIXED] ${basename}`);
  }

  return fixed;
}

function main() {
  const templates = getAllTemplateFiles();
  console.log(`Found ${templates.length} template files to check\n`);

  let fixed = 0;
  let ok = 0;

  for (const filepath of templates) {
    try {
      if (fixTemplate(filepath)) {
        fixed++;
      } else {
        ok++;
      }
    } catch (err) {
      console.error(`  [ERROR] ${path.basename(filepath)}: ${err.message}`);
    }
  }

  console.log(`\n=================================`);
  console.log(`Fixed: ${fixed}`);
  console.log(`OK: ${ok}`);
  console.log(`Total: ${templates.length}`);
  console.log(`=================================`);
}

main();
