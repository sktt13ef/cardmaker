/**
 * 批量为封面模板文件添加进度条支持
 * 使用方法: node scripts/add-progressbar-covers.cjs
 */
const fs = require('fs');
const path = require('path');

const COVERS_DIR = path.join(__dirname, '..', 'src', 'templates', 'covers');

// 获取所有封面模板文件
function getCoverFiles() {
  const files = fs.readdirSync(COVERS_DIR);
  return files
    .filter(f => f.endsWith('.tsx'))
    .filter(f => f !== 'index.ts')
    .map(f => path.join(COVERS_DIR, f));
}

// 进度条渲染代码
function getProgressBarCode(bgColor, progressColor) {
  return `
  // 进度条配置
  const topConfig = progressBarConfig?.top;
  const bottomConfig = progressBarConfig?.bottom;

  const renderProgressBar = (position: 'top' | 'bottom') => {
    const config = position === 'top' ? topConfig : bottomConfig;
    if (!config?.show) return null;
    const { segmentCount, segmentLabels, activeIndex } = config;

    return (
      <div style={{
        width: '100%',
        padding: position === 'top' ? '20px 60px 12px' : '12px 60px 20px',
        background: '${bgColor}',
        borderBottom: position === 'top' ? '1px solid #e5e7eb' : undefined,
        borderTop: position === 'bottom' ? '1px solid #e5e7eb' : undefined,
      }}>
        <div style={{ width: '100%', height: 4, background: '#e5e7eb', borderRadius: 2, display: 'flex', position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, height: '100%',
            width: \`\${((activeIndex + 1) / segmentCount) * 100}%\`,
            background: '${progressColor}', borderRadius: 2, transition: 'width 0.3s ease',
          }} />
          {Array.from({ length: segmentCount - 1 }, (_, i) => (
            <div key={i} style={{
              position: 'absolute', left: \`\${((i + 1) / segmentCount) * 100}%\`,
              top: 0, width: 2, height: '100%', background: '#fff', transform: 'translateX(-50%)',
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          {segmentLabels.slice(0, segmentCount).map((label, index) => (
            <div key={index} style={{
              flex: 1, textAlign: 'center', fontSize: '12px', fontWeight: 500,
              color: index <= activeIndex ? '${progressColor}' : '#9ca3af', transition: 'color 0.3s ease',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}>{label}</div>
          ))}
        </div>
      </div>
    );
  };
`;
}

// 处理单个封面模板文件
function processCover(filepath) {
  let content = fs.readFileSync(filepath, 'utf-8');
  const basename = path.basename(filepath);

  // 跳过已支持进度条的文件
  if (content.includes('progressBarConfig')) {
    console.log(`  [SKIP] ${basename} - already has progress bar`);
    return;
  }

  // 1. 添加 ProgressBarConfig 导入
  if (!content.includes("import { ProgressBarConfig }")) {
    const lastImportMatch = content.match(/import\s+.*?from\s+.*?;\n/g);
    if (lastImportMatch) {
      const lastImport = lastImportMatch[lastImportMatch.length - 1];
      const importLine = "import { ProgressBarConfig } from '../types/progress-bar';\n";
      content = content.replace(lastImport, lastImport + importLine);
    }
  }

  // 2. 修改 Props 接口 - 查找 interface XXXProps
  const propsMatch = content.match(/interface\s+(\w+)Props\s*\{([^}]*)\}/);
  if (propsMatch) {
    const oldProps = propsMatch[0];
    if (!oldProps.includes('progressBarConfig')) {
      const newProps = oldProps.replace(/\}$/, '  progressBarConfig?: ProgressBarConfig;\n}');
      content = content.replace(oldProps, newProps);
    }
  }

  // 3. 修改内联 Props 类型定义
  const inlinePropsMatch = content.match(/React\.FC<\{\s*data:\s*GeneratedContent;\s*scale:\s*number\s*\}>/);
  if (inlinePropsMatch && !content.includes('progressBarConfig?: ProgressBarConfig')) {
    const oldInline = inlinePropsMatch[0];
    const newInline = 'React.FC<{ data: GeneratedContent; scale: number; progressBarConfig?: ProgressBarConfig }>';
    content = content.replace(oldInline, newInline);
  }

  // 4. 修改组件函数参数
  const funcMatch1 = content.match(/(const\s+\w+:\s*React\.FC<[^>]+>\s*=\s*\(\{[^}]*?)\}\s*\)\s*=>/);
  if (funcMatch1 && !funcMatch1[1].includes('progressBarConfig')) {
    const oldFunc = funcMatch1[1];
    const newFunc = oldFunc + ', progressBarConfig';
    content = content.replace(oldFunc + '}', newFunc + '}');
  }

  const funcMatch2 = content.match(/(const\s+\w+\s*=\s*\(\{[^}]*?)\}\s*:\s*\w+Props\s*\)\s*=>/);
  if (funcMatch2 && !funcMatch2[1].includes('progressBarConfig')) {
    const oldFunc = funcMatch2[1];
    const newFunc = oldFunc + ', progressBarConfig';
    content = content.replace(oldFunc + '}', newFunc + '}');
  }

  // 5. 在 return 前添加进度条代码
  if (!content.includes('renderProgressBar')) {
    let bgColor = '#fff';
    let progressColor = '#2563eb';

    const bgMatch = content.match(/background(?:Color)?:\s*['"`](#[0-9a-fA-F]{3,6})['"`]/);
    if (bgMatch) bgColor = bgMatch[1];

    const colorMatch = content.match(/icon:\s*['"`](#[0-9a-fA-F]{3,6})['"`]/);
    if (colorMatch) progressColor = colorMatch[1];

    const progressCode = getProgressBarCode(bgColor, progressColor);

    const returnMatch = content.match(/(\s+return\s*\(?\s*<div\s+style=\{\{[^}]*width:\s*1920)/);
    if (returnMatch) {
      const insertPos = returnMatch.index;
      content = content.slice(0, insertPos) + progressCode + content.slice(insertPos);
    }
  }

  // 6. 修改最外层 div 添加 flex 布局
  const outerDivPattern = /style=\{\{\s*width:\s*1920,\s*height:\s*1080,\s*transform:\s*`scale\(\$\{scale\}\)`,\s*transformOrigin:\s*['"]top left['"],\s*overflow:\s*['"]hidden['"]\s*\}\}/;
  if (outerDivPattern.test(content)) {
    content = content.replace(
      outerDivPattern,
      "style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}"
    );
  }

  // 7. 添加顶部进度条
  if (!content.includes("renderProgressBar('top')")) {
    const firstDivPattern = /(style=\{\{\s*width:\s*1920,\s*height:\s*1080,\s*transform:\s*`scale\(\$\{scale\}\)`,\s*transformOrigin:\s*['"]top left['"],\s*overflow:\s*['"]hidden['"],\s*display:\s*['"]flex['"],\s*flexDirection:\s*['"]column['"]\s*\}\}>\s*)/;
    const topProgress = "      {/* 顶部进度条 */}\n      {renderProgressBar('top')}\n\n      <div style={{ flex: 1, overflow: 'hidden' }}>\n";
    content = content.replace(firstDivPattern, '$1' + topProgress);
  }

  // 8. 添加底部进度条
  if (!content.includes("renderProgressBar('bottom')")) {
    const bottomPattern = /(\s+<\/div>\s+<\/div>\s*\);\s*\};\s*export\s+const)/;
    const bottomProgress = "      </div>\n\n      {/* 底部进度条 */}\n      {renderProgressBar('bottom')}\n    </div>\n  );\n};\n\nexport const";
    content = content.replace(bottomPattern, bottomProgress);
  }

  // 9. 修改 render 函数
  content = content.replace(/render:\s*\(\s*data\s*,\s*scale\s*\)\s*=>/g, 'render: (data, scale, progressBarConfig) =>');

  // 10. 修改 React.createElement
  content = content.replace(/React\.createElement\((\w+),\s*\{\s*data\s*,\s*scale\s*\}\)/g, 'React.createElement($1, { data, scale, progressBarConfig })');

  // 11. 修改 JSX 组件调用
  content = content.replace(/<(\w+)\s+data=\{data\}\s+scale=\{scale\}\s*\/>/g, '<$1 data={data} scale={scale} progressBarConfig={progressBarConfig} />');

  fs.writeFileSync(filepath, content, 'utf-8');
  console.log(`  [DONE] ${basename}`);
}

function main() {
  const covers = getCoverFiles();
  console.log(`Found ${covers.length} cover template files to process\n`);

  let processed = 0;
  let skipped = 0;

  for (const filepath of covers) {
    try {
      const content = fs.readFileSync(filepath, 'utf-8');
      if (content.includes('progressBarConfig')) {
        console.log(`  [SKIP] ${path.basename(filepath)} - already has progress bar`);
        skipped++;
      } else {
        processCover(filepath);
        processed++;
      }
    } catch (err) {
      console.error(`  [ERROR] ${path.basename(filepath)}: ${err.message}`);
    }
  }

  console.log(`\n=================================`);
  console.log(`Processed: ${processed}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Total: ${covers.length}`);
  console.log(`=================================`);
}

main();
