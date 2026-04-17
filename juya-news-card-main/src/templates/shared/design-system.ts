/**
 * 统一设计系统
 * 为所有模板提供一致、美观的设计常量
 */

// ===== 字体系统 =====
export const FONT_FAMILY = {
  primary: `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', system-ui, sans-serif`,
  mono: `'SF Mono', 'Fira Code', 'JetBrains Mono', monospace`,
};

// ===== 色彩系统 =====
export const COLORS = {
  // 背景色
  bg: {
    primary: '#fafafa',
    secondary: '#f5f5f5',
    tertiary: '#ffffff',
    dark: '#171717',
  },
  // 表面色
  surface: {
    primary: '#ffffff',
    secondary: '#fafafa',
    elevated: '#ffffff',
  },
  // 文字色
  text: {
    primary: '#171717',
    secondary: '#525252',
    tertiary: '#737373',
    muted: '#a3a3a3',
    inverse: '#ffffff',
  },
  // 边框色
  border: {
    light: '#e5e5e5',
    medium: '#d4d4d4',
    strong: '#a3a3a3',
  },
  // 强调色（现代柔和色调）
  accent: [
    { name: 'blue', value: '#3b82f6', light: '#eff6ff', dark: '#1d4ed8' },
    { name: 'emerald', value: '#10b981', light: '#ecfdf5', dark: '#047857' },
    { name: 'violet', value: '#8b5cf6', light: '#f5f3ff', dark: '#5b21b6' },
    { name: 'orange', value: '#f97316', light: '#fff7ed', dark: '#c2410c' },
    { name: 'rose', value: '#f43f5e', light: '#fff1f2', dark: '#be123c' },
    { name: 'cyan', value: '#06b6d4', light: '#ecfeff', dark: '#0891b2' },
    { name: 'amber', value: '#f59e0b', light: '#fffbeb', dark: '#b45309' },
    { name: 'indigo', value: '#6366f1', light: '#eef2ff', dark: '#4338ca' },
  ],
};

// ===== 间距系统 =====
export const SPACING = {
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

// ===== 圆角系统 =====
export const RADIUS = {
  none: '0',
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '20px',
  '2xl': '28px',
  full: '9999px',
};

// ===== 阴影系统 =====
export const SHADOWS = {
  none: 'none',
  xs: '0 1px 2px rgba(0,0,0,0.03)',
  sm: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
  md: '0 4px 6px -1px rgba(0,0,0,0.04), 0 2px 4px -2px rgba(0,0,0,0.02)',
  lg: '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -4px rgba(0,0,0,0.02)',
  xl: '0 20px 25px -5px rgba(0,0,0,0.06), 0 8px 10px -6px rgba(0,0,0,0.02)',
};

// ===== 过渡效果 =====
export const TRANSITIONS = {
  fast: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  normal: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
};

// ===== 通用样式类生成器 =====
export const generateCommonStyles = () => `
  /* 通用容器样式 */
  .template-container {
    font-family: ${FONT_FAMILY.primary};
    background: ${COLORS.bg.primary};
  }
  
  /* 标题样式 */
  .template-title {
    font-weight: 600;
    letter-spacing: -0.025em;
    line-height: 1.15;
    color: ${COLORS.text.primary};
  }
  
  /* 卡片基础样式 */
  .template-card {
    background: ${COLORS.surface.primary};
    border-radius: ${RADIUS.lg};
    box-shadow: ${SHADOWS.sm};
    transition: ${TRANSITIONS.normal};
  }
  
  .template-card:hover {
    transform: translateY(-2px);
    box-shadow: ${SHADOWS.lg};
  }
  
  /* 描述文字样式 */
  .template-desc {
    line-height: 1.65;
    color: ${COLORS.text.secondary};
  }
  
  .template-desc code {
    background: ${COLORS.bg.secondary};
    padding: 0.15em 0.4em;
    border-radius: ${RADIUS.sm};
    font-family: ${FONT_FAMILY.mono};
    font-size: 0.875em;
    color: ${COLORS.text.secondary};
  }
  
  .template-desc strong {
    font-weight: 600;
    color: ${COLORS.text.primary};
  }
  
  /* 图标容器样式 */
  .template-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${RADIUS.md};
    transition: ${TRANSITIONS.fast};
  }
`;

// ===== 获取强调色 =====
export const getAccentColor = (index: number) => {
  return COLORS.accent[index % COLORS.accent.length];
};

// ===== 获取多个强调色（用于渐变） =====
export const getAccentColors = (count: number) => {
  return Array.from({ length: count }, (_, i) => getAccentColor(i));
};
