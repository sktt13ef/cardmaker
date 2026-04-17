/**
 * 现代共享样式系统
 * 提供统一、简洁、美观的设计常量
 */

// 更优雅的字体栈
export const MODERN_FONT_FAMILY = `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif`;

// 更柔和的现代色彩系统
export const MODERN_COLORS = {
  // 背景
  background: {
    primary: '#fafafa',
    secondary: '#f5f5f5',
    tertiary: '#ffffff',
  },
  // 表面
  surface: {
    primary: '#ffffff',
    secondary: '#fafafa',
    elevated: '#ffffff',
  },
  // 文字
  text: {
    primary: '#171717',
    secondary: '#525252',
    tertiary: '#737373',
    muted: '#a3a3a3',
    inverse: '#ffffff',
  },
  // 边框
  border: {
    light: '#e5e5e5',
    medium: '#d4d4d4',
    strong: '#a3a3a3',
  },
  // 强调色（柔和的现代色调）
  accent: [
    { name: 'blue', value: '#3b82f6', light: '#eff6ff' },
    { name: 'emerald', value: '#10b981', light: '#ecfdf5' },
    { name: 'violet', value: '#8b5cf6', light: '#f5f3ff' },
    { name: 'orange', value: '#f97316', light: '#fff7ed' },
    { name: 'rose', value: '#f43f5e', light: '#fff1f2' },
    { name: 'cyan', value: '#06b6d4', light: '#ecfeff' },
    { name: 'amber', value: '#f59e0b', light: '#fffbeb' },
    { name: 'indigo', value: '#6366f1', light: '#eef2ff' },
  ],
};

// 更精致的间距系统
export const MODERN_SPACING = {
  '0': '0',
  '0.5': '2px',
  '1': '4px',
  '2': '8px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '8': '32px',
  '10': '40px',
  '12': '48px',
  '16': '64px',
  '20': '80px',
  '24': '96px',
};

// 更现代的圆角系统
export const MODERN_RADIUS = {
  none: '0',
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '20px',
  '2xl': '28px',
  full: '9999px',
};

// 更细腻的阴影系统
export const MODERN_SHADOWS = {
  none: 'none',
  xs: '0 1px 2px rgba(0,0,0,0.03)',
  sm: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
  md: '0 4px 6px -1px rgba(0,0,0,0.04), 0 2px 4px -2px rgba(0,0,0,0.02)',
  lg: '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -4px rgba(0,0,0,0.02)',
  xl: '0 20px 25px -5px rgba(0,0,0,0.06), 0 8px 10px -6px rgba(0,0,0,0.02)',
};

// 更优雅的过渡效果
export const MODERN_TRANSITIONS = {
  fast: 'all 0.15s ease',
  normal: 'all 0.2s ease',
  slow: 'all 0.3s ease',
};

// 共享的 CSS 类名生成器
export const generateModernStyles = () => `
  /* 现代共享样式 */
  .modern-container {
    font-family: ${MODERN_FONT_FAMILY};
  }
  
  .modern-title {
    font-weight: 600;
    letter-spacing: -0.025em;
    line-height: 1.2;
    color: ${MODERN_COLORS.text.primary};
  }
  
  .modern-card {
    background: ${MODERN_COLORS.surface.primary};
    border-radius: ${MODERN_RADIUS.lg};
    box-shadow: ${MODERN_SHADOWS.sm};
    transition: ${MODERN_TRANSITIONS.normal};
  }
  
  .modern-card:hover {
    transform: translateY(-2px);
    box-shadow: ${MODERN_SHADOWS.lg};
  }
  
  .modern-desc {
    line-height: 1.65;
    color: ${MODERN_COLORS.text.secondary};
  }
  
  .modern-desc code {
    background: ${MODERN_COLORS.background.secondary};
    padding: 0.15em 0.4em;
    border-radius: ${MODERN_RADIUS.sm};
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 0.875em;
    color: ${MODERN_COLORS.text.secondary};
  }
  
  .modern-desc strong {
    font-weight: 600;
    color: ${MODERN_COLORS.text.primary};
  }
  
  .modern-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${MODERN_RADIUS.md};
    transition: ${MODERN_TRANSITIONS.fast};
  }
`;

// 获取强调色
export const getAccentColor = (index: number) => {
  return MODERN_COLORS.accent[index % MODERN_COLORS.accent.length];
};
