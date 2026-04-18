import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineGridProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineGrid: React.FC<CoverLineGridProps> = ({ data, scale, progressBarConfig }) => {
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
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#fafafa' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 垂直线 */}
          <line x1="240" y1="0" x2="240" y2="1080" stroke="#1a1a2e" strokeWidth="1.5" opacity="0.18" />
          <line x1="480" y1="0" x2="480" y2="1080" stroke="#1a1a2e" strokeWidth="2" opacity="0.22" />
          <line x1="720" y1="0" x2="720" y2="1080" stroke="#1a1a2e" strokeWidth="1" opacity="0.12" />
          <line x1="960" y1="0" x2="960" y2="1080" stroke="#1a1a2e" strokeWidth="2.5" opacity="0.28" />
          <line x1="1200" y1="0" x2="1200" y2="1080" stroke="#1a1a2e" strokeWidth="1" opacity="0.12" />
          <line x1="1440" y1="0" x2="1440" y2="1080" stroke="#1a1a2e" strokeWidth="2" opacity="0.22" />
          <line x1="1680" y1="0" x2="1680" y2="1080" stroke="#1a1a2e" strokeWidth="1.5" opacity="0.18" />
          {/* 水平线 */}
          <line x1="0" y1="120" x2="1920" y2="120" stroke="#1a1a2e" strokeWidth="1.5" opacity="0.18" />
          <line x1="0" y1="300" x2="1920" y2="300" stroke="#1a1a2e" strokeWidth="2" opacity="0.22" />
          <line x1="0" y1="480" x2="1920" y2="480" stroke="#1a1a2e" strokeWidth="1" opacity="0.12" />
          <line x1="0" y1="540" x2="1920" y2="540" stroke="#1a1a2e" strokeWidth="2.5" opacity="0.28" />
          <line x1="0" y1="660" x2="1920" y2="660" stroke="#1a1a2e" strokeWidth="1" opacity="0.12" />
          <line x1="0" y1="780" x2="1920" y2="780" stroke="#1a1a2e" strokeWidth="2" opacity="0.22" />
          <line x1="0" y1="960" x2="1920" y2="960" stroke="#1a1a2e" strokeWidth="1.5" opacity="0.18" />
          {/* 蒙德里安色块 - 红色区域 */}
          <rect x="0" y="0" width="240" height="120" fill="#d42b2b" opacity="0.08" />
          <rect x="1440" y="780" width="480" height="300" fill="#d42b2b" opacity="0.06" />
          {/* 蓝色区域 */}
          <rect x="1680" y="0" width="240" height="120" fill="#1a5ab8" opacity="0.08" />
          <rect x="0" y="780" width="240" height="300" fill="#1a5ab8" opacity="0.06" />
          {/* 黄色区域 */}
          <rect x="480" y="960" width="240" height="120" fill="#d4a82b" opacity="0.08" />
          <rect x="1200" y="0" width="240" height="120" fill="#d4a82b" opacity="0.06" />
          {/* 交叉点加粗标记 */}
          <circle cx="960" cy="540" r="4" fill="#1a1a2e" opacity="0.15" />
          <circle cx="480" cy="300" r="3" fill="#1a1a2e" opacity="0.12" />
          <circle cx="1440" cy="300" r="3" fill="#1a1a2e" opacity="0.12" />
          <circle cx="480" cy="780" r="3" fill="#1a1a2e" opacity="0.12" />
          <circle cx="1440" cy="780" r="3" fill="#1a1a2e" opacity="0.12" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <h1 ref={titleRef} style={{ fontSize: '68px', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 1.3, color: '#1a1a2e', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '24px', fontWeight: 300, color: '#555566', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '750px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineGrid: TemplateConfig = {
  id: 'coverLineGrid',
  name: '网格封面',
  description: '网格封面，蒙德里安式网格线条与色块，标题在网格间隙中',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineGrid, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineGrid'),
};
