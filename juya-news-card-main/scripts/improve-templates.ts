/**
 * 模板批量优化脚本
 * 统一改进所有模板的设计，使其更简洁美观
 */

import * as fs from 'fs';
import * as path from 'path';

const TEMPLATES_DIR = path.join(__dirname, '../src/templates');

// 简洁美观的设计常量
const DESIGN_IMPROVEMENTS = {
  // 更优雅的字体栈
  fontFamily: `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', system-ui, sans-serif`,
  
  // 更柔和的颜色
  colors: {
    background: '#fafafa',
    surface: '#ffffff',
    text: {
      primary: '#171717',
      secondary: '#525252',
      muted: '#737373',
    },
    border: '#e5e5e5',
    accent: ['#2563eb', '#059669', '#dc2626', '#7c3aed', '#ea580c', '#0891b2', '#be123c', '#4338ca'],
  },
  
  // 更精致的间距
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  
  // 更现代的圆角
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },
  
  // 更细腻的阴影
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.04)',
    md: '0 4px 12px rgba(0,0,0,0.05)',
    lg: '0 8px 24px rgba(0,0,0,0.06)',
    xl: '0 16px 48px rgba(0,0,0,0.08)',
  },
};

// 改进模板内容
function improveTemplate(content: string, templateName: string): string {
  let improved = content;
  
  // 1. 改进字体
  improved = improved.replace(
    /font-family:\s*[^;]+;/g,
    `font-family: ${DESIGN_IMPROVEMENTS.fontFamily};`
  );
  
  // 2. 改进颜色（保持原有主题但使用更柔和的色调）
  // 背景色改进
  improved = improved.replace(
    /background:\s*#fff[^;]*;/gi,
    `background: ${DESIGN_IMPROVEMENTS.colors.background};`
  );
  
  // 3. 改进卡片样式 - 添加更精致的边框和阴影
  improved = improved.replace(
    /(\.[\w-]+-card\s*\{[^}]*)(\})/g,
    (match, styles, closing) => {
      // 如果已经有border-radius，保持它
      if (!styles.includes('border-radius')) {
        styles += `border-radius: ${DESIGN_IMPROVEMENTS.borderRadius.lg};`;
      }
      // 改进阴影
      if (styles.includes('box-shadow')) {
        styles = styles.replace(
          /box-shadow:\s*[^;]+;/g,
          `box-shadow: ${DESIGN_IMPROVEMENTS.shadows.md};`
        );
      }
      return styles + closing;
    }
  );
  
  // 4. 改进标题样式
  improved = improved.replace(
    /(\.[\w-]+-title\s*\{[^}]*)(\})/g,
    (match, styles, closing) => {
      if (!styles.includes('letter-spacing')) {
        styles += 'letter-spacing: -0.02em;';
      }
      if (!styles.includes('font-weight')) {
        styles += 'font-weight: 600;';
      }
      return styles + closing;
    }
  );
  
  // 5. 改进描述文字
  improved = improved.replace(
    /(\.[\w-]+-desc\s*\{[^}]*)(\})/g,
    (match, styles, closing) => {
      if (!styles.includes('line-height')) {
        styles += 'line-height: 1.6;';
      }
      return styles + closing;
    }
  );
  
  // 6. 添加悬停效果（如果还没有）
  if (!improved.includes(':hover')) {
    improved = improved.replace(
      /(\.[\w-]+-card\s*\{[^}]+\})/g,
      (match) => {
        return match + `
        .${match.match(/\.(\w+)/)?.[1]}:hover {
          transform: translateY(-2px);
          box-shadow: ${DESIGN_IMPROVEMENTS.shadows.lg};
        }`;
      }
    );
  }
  
  return improved;
}

// 主函数
async function improveAllTemplates() {
  const files = fs.readdirSync(TEMPLATES_DIR)
    .filter(f => f.endsWith('.tsx') && !f.includes('types') && !f.includes('index'));
  
  console.log(`Found ${files.length} templates to improve`);
  
  let improvedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(TEMPLATES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // 检查是否已经优化过
    if (content.includes('/* IMPROVED */')) {
      console.log(`Skipping ${file} (already improved)`);
      continue;
    }
    
    const improved = improveTemplate(content, file.replace('.tsx', ''));
    
    // 添加优化标记
    const marked = improved.replace(
      /^(import)/m,
      '/* IMPROVED - Design enhanced for better aesthetics */\n$1'
    );
    
    fs.writeFileSync(filePath, marked);
    improvedCount++;
    console.log(`✓ Improved ${file}`);
  }
  
  console.log(`\nImproved ${improvedCount} templates`);
}

// 运行
improveAllTemplates().catch(console.error);
