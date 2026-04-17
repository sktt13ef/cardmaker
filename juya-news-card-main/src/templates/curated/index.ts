/**
 * 精选模板集
 * 只展示最简洁、最美观的模板
 */

import { TemplateConfig } from '../types';

// 导入精选模板
import { claudeStyleTemplate } from '../claudeStyle';
import { minimalCleanTemplate } from '../minimalClean';
import { modernCardTemplate } from '../modernCard';
import { bentoGridTemplate } from '../bentoGrid';
import { flatDesignTemplate } from '../flatDesign';
import { newsCardTemplate } from '../newsCard';
import { swissStyleTemplate } from '../swissStyle';
import { materialYouTemplate } from '../materialYou';
import { glassmorphismTemplate } from '../glassmorphism';
import { neumorphismTemplate } from '../neumorphism';

/**
 * 精选模板列表 - 按美观程度排序
 */
export const CURATED_TEMPLATES: TemplateConfig[] = [
  // 第1梯队：现代简洁
  minimalCleanTemplate,      // 极简干净
  modernCardTemplate,        // 现代卡片
  materialYouTemplate,       // Material You
  
  // 第2梯队：精致设计
  claudeStyleTemplate,       // 暖调卡片
  glassmorphismTemplate,     // 玻璃拟态
  neumorphismTemplate,       // 新拟态
  
  // 第3梯队：经典布局
  bentoGridTemplate,         // Bento网格
  flatDesignTemplate,        // 扁平设计
  swissStyleTemplate,        // 瑞士风格
  newsCardTemplate,          // 新闻卡片
];

/**
 * 获取精选模板ID列表
 */
export const CURATED_TEMPLATE_IDS = CURATED_TEMPLATES.map(t => t.id);

/**
 * 检查模板是否在精选集中
 */
export const isCuratedTemplate = (templateId: string): boolean => {
  return CURATED_TEMPLATE_IDS.includes(templateId);
};
