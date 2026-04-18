import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineSplitProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineSplit: React.FC<CoverLineSplitProps> = ({ data, scale, progressBarConfig }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitle = data.cards.length > 0 ? data.cards[0].desc : '';

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!titleRef.current) return;
    const title = titleRef.current;
    let size = 70;
    title.style.fontSize = size + 'px';
    let guard = 0;
    while (title.scrollWidth > 1400 && size > 34 && guard < 100) { size -= 1; title.style.fontSize = size + 'px'; guard++; }
  }, [data]);

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f5f0f0' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 主分割线 - 水平 */}
          <line x1="0" y1="540" x2="1920" y2="540" stroke="#8b4a4a" strokeWidth="2" opacity="0.25" />
          {/* 分割线上方区域 - 浅色填充 */}
          <rect x="0" y="0" width="1920" height="540" fill="#8b4a4a" opacity="0.02" />
          {/* 分割线下方区域 - 稍深填充 */}
          <rect x="0" y="540" width="1920" height="540" fill="#8b4a4a" opacity="0.04" />
          {/* 上方细线 */}
          <line x1="200" y1="200" x2="1720" y2="200" stroke="#8b4a4a" strokeWidth="0.5" opacity="0.1" />
          <line x1="300" y1="300" x2="1620" y2="300" stroke="#8b4a4a" strokeWidth="0.3" opacity="0.08" />
          <line x1="400" y1="400" x2="1520" y2="400" stroke="#8b4a4a" strokeWidth="0.3" opacity="0.06" />
          {/* 下方细线 */}
          <line x1="200" y1="880" x2="1720" y2="880" stroke="#8b4a4a" strokeWidth="0.5" opacity="0.1" />
          <line x1="300" y1="780" x2="1620" y2="780" stroke="#8b4a4a" strokeWidth="0.3" opacity="0.08" />
          <line x1="400" y1="680" x2="1520" y2="680" stroke="#8b4a4a" strokeWidth="0.3" opacity="0.06" />
          {/* 垂直分割辅助线 */}
          <line x1="960" y1="0" x2="960" y2="540" stroke="#8b4a4a" strokeWidth="0.3" opacity="0.06" />
          <line x1="960" y1="540" x2="960" y2="1080" stroke="#8b4a4a" strokeWidth="0.3" opacity="0.06" />
          {/* 分割线上的装饰点 */}
          <circle cx="480" cy="540" r="3" fill="#8b4a4a" opacity="0.2" />
          <circle cx="960" cy="540" r="4" fill="#8b4a4a" opacity="0.25" />
          <circle cx="1440" cy="540" r="3" fill="#8b4a4a" opacity="0.2" />
          {/* 对角线装饰 */}
          <line x1="0" y1="0" x2="960" y2="540" stroke="#8b4a4a" strokeWidth="0.2" opacity="0.04" />
          <line x1="1920" y1="0" x2="960" y2="540" stroke="#8b4a4a" strokeWidth="0.2" opacity="0.04" />
          <line x1="0" y1="1080" x2="960" y2="540" stroke="#8b4a4a" strokeWidth="0.2" opacity="0.04" />
          <line x1="1920" y1="1080" x2="960" y2="540" stroke="#8b4a4a" strokeWidth="0.2" opacity="0.04" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <h1 ref={titleRef} style={{ fontSize: '70px', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.3, color: '#3d1a1a', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '24px', fontWeight: 300, color: '#8b5a5a', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '750px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineSplit: TemplateConfig = {
  id: 'coverLineSplit',
  name: '分割封面',
  description: '分割封面，画面上下分割，标题在分割线上',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineSplit, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineSplit'),
};
