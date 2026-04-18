import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineDashProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineDash: React.FC<CoverLineDashProps> = ({ data, scale, progressBarConfig }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitle = data.cards.length > 0 ? data.cards[0].desc : '';

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!titleRef.current) return;
    const title = titleRef.current;
    let size = 68;
    title.style.fontSize = size + 'px';
    let guard = 0;
    while (title.scrollWidth > 1400 && size > 34 && guard < 100) { size -= 1; title.style.fontSize = size + 'px'; guard++; }
  }, [data]);

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f0f7f4' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 虚线矩形 - 外框 */}
          <rect x="120" y="80" width="1680" height="920" stroke="#2d7a5f" strokeWidth="1.5" strokeDasharray="20 10" fill="none" opacity="0.15" />
          {/* 虚线矩形 - 内框 */}
          <rect x="200" y="160" width="1520" height="760" stroke="#2d7a5f" strokeWidth="1" strokeDasharray="15 8" fill="none" opacity="0.2" />
          {/* 虚线矩形 - 最内框 */}
          <rect x="280" y="240" width="1360" height="600" stroke="#2d7a5f" strokeWidth="0.8" strokeDasharray="10 6" fill="none" opacity="0.25" />
          {/* 虚线对角线 */}
          <line x1="120" y1="80" x2="200" y2="160" stroke="#2d7a5f" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.15" />
          <line x1="1800" y1="80" x2="1720" y2="160" stroke="#2d7a5f" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.15" />
          <line x1="120" y1="1000" x2="200" y2="920" stroke="#2d7a5f" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.15" />
          <line x1="1800" y1="1000" x2="1720" y2="920" stroke="#2d7a5f" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.15" />
          {/* 虚线水平线 */}
          <line x1="280" y1="400" x2="1640" y2="400" stroke="#2d7a5f" strokeWidth="0.5" strokeDasharray="8 4" opacity="0.12" />
          <line x1="280" y1="680" x2="1640" y2="680" stroke="#2d7a5f" strokeWidth="0.5" strokeDasharray="8 4" opacity="0.12" />
          {/* 虚线垂直线 */}
          <line x1="640" y1="240" x2="640" y2="840" stroke="#2d7a5f" strokeWidth="0.5" strokeDasharray="8 4" opacity="0.12" />
          <line x1="1280" y1="240" x2="1280" y2="840" stroke="#2d7a5f" strokeWidth="0.5" strokeDasharray="8 4" opacity="0.12" />
          {/* 虚线圆形 */}
          <circle cx="960" cy="540" r="160" stroke="#2d7a5f" strokeWidth="0.8" strokeDasharray="12 6" fill="none" opacity="0.2" />
          <circle cx="960" cy="540" r="100" stroke="#2d7a5f" strokeWidth="0.6" strokeDasharray="8 4" fill="none" opacity="0.15" />
          {/* 虚线三角形 */}
          <polygon points="960,300 1100,500 820,500" stroke="#2d7a5f" strokeWidth="0.5" strokeDasharray="6 4" fill="none" opacity="0.12" />
          {/* 四角虚线装饰 */}
          <line x1="120" y1="200" x2="180" y2="200" stroke="#2d7a5f" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.2" />
          <line x1="120" y1="880" x2="180" y2="880" stroke="#2d7a5f" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.2" />
          <line x1="1740" y1="200" x2="1800" y2="200" stroke="#2d7a5f" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.2" />
          <line x1="1740" y1="880" x2="1800" y2="880" stroke="#2d7a5f" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.2" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <h1 ref={titleRef} style={{ fontSize: '68px', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.3, color: '#1a3d2e', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '24px', fontWeight: 300, color: '#5a8b70', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '750px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineDash: TemplateConfig = {
  id: 'coverLineDash',
  name: '虚线封面',
  description: '虚线封面，虚线构成的几何图案层层嵌套，标题居中',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineDash, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineDash'),
};
