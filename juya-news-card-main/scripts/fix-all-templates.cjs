/**
 * 修复所有模板文件中的语法错误
 * 使用方法: node scripts/fix-all-templates.cjs
 */
const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '..', 'src', 'templates');
const COVERS_DIR = path.join(__dirname, '..', 'src', 'templates', 'covers');

// 获取所有模板文件
function getAllTemplateFiles() {
  const files = [];

  const mainFiles = fs.readdirSync(TEMPLATES_DIR)
    .filter(f => f.endsWith('.tsx'))
    .filter(f => !['index.ts', 'types.ts', 'catalog.ts', 'client-registry.ts', 'runtime-resolver.ts', 'ssr-runtime.ts'].includes(f))
    .map(f => path.join(TEMPLATES_DIR, f));
  files.push(...mainFiles);

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

  // 1. 修复组件参数 - 确保接收 progressBarConfig
  const funcPattern = /const\s+(\w+):\s*React\.FC<\{[^}]*progressBarConfig\?:\s*ProgressBarConfig[^}]*\}>\s*=\s*\(\{[^}]*\}\)\s*=>/;
  const funcMatch = content.match(funcPattern);
  if (funcMatch) {
    const fullMatch = funcMatch[0];
    // 检查参数中是否缺少 progressBarConfig
    if (fullMatch.includes('progressBarConfig?: ProgressBarConfig') && !fullMatch.includes('progressBarConfig }')) {
      // 在 }) => 前添加 progressBarConfig
      const newFunc = fullMatch.replace(/\}\)\s*=>/, ', progressBarConfig }) =>');
      content = content.replace(fullMatch, newFunc);
      fixed = true;
    }
  }

  // 2. 修复未闭合的 flex div - 在 </div>  </div> ); }; export const 前添加闭合
  const unclosedPattern = /(\s+<\/div>\s+<\/div>\s*\);\s*\};\s*export\s+const\s+\w+Template)/;
  if (unclosedPattern.test(content) && content.includes("{renderProgressBar('top')}") && !content.includes("{renderProgressBar('bottom')}")) {
    // 需要添加底部进度条和闭合 div
    const replacement = `
      </div>

      {/* 底部进度条 */}
      {renderProgressBar('bottom')}
    </div>
  );
};

export const $1Template`;
    content = content.replace(unclosedPattern, replacement);
    fixed = true;
  }

  // 3. 检查是否有重复的 renderProgressBar 函数
  const renderProgressBarMatches = content.match(/const renderProgressBar = /g);
  if (renderProgressBarMatches && renderProgressBarMatches.length > 1) {
    console.log(`  [WARNING] ${basename} has ${renderProgressBarMatches.length} renderProgressBar functions`);
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
