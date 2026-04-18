import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineBoldProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineBold: React.FC<CoverLineBoldProps> = ({ data, scale, progressBarConfig }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitle = data.cards.length > 0 ? data.cards[0].desc : '';

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!titleRef.current) return;
    const title = titleRef.current;
    let size = 76;
    title.style.fontSize = size + 'px';
    let guard = 0;
    while (title.scrollWidth > 1500 && size > 38 && guard < 100) { size -= 1; title.style.fontSize = size + 'px'; guard++; }
  }, [data]);

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#1a1a2e' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 粗线条几何 - 大三角 */}
          <polygon points="960,120 1760,880 160,880" stroke="#e0d0b0" strokeWidth="3" fill="none" opacity="0.12" />
          {/* 倒三角 */}
          <polygon points="960,960 160,200 1760,200" stroke="#e0d0b0" strokeWidth="2" fill="none" opacity="0.08" />
          {/* 粗水平线 */}
          <line x1="0" y1="540" x2="1920" y2="540" stroke="#e0d0b0" strokeWidth="4" opacity="0.15" />
          {/* 粗垂直线 */}
          <line x1="960" y1="0" x2="960" y2="1080" stroke="#e0d0b0" strokeWidth="4" opacity="0.15" />
          {/* 粗对角线 */}
          <line x1="0" y1="0" x2="1920" y2="1080" stroke="#e0d0b0" strokeWidth="2.5" opacity="0.1" />
          <line x1="1920" y1="0" x2="0" y2="1080" stroke="#e0d0b0" strokeWidth="2.5" opacity="0.1" />
          {/* 粗矩形 */}
          <rect x="320" y="240" width="1280" height="600" stroke="#e0d0b0" strokeWidth="3" fill="none" opacity="0.1" />
          {/* 粗圆 */}
          <circle cx="960" cy="540" r="300" stroke="#e0d0b0" strokeWidth="3" fill="none" opacity="0.1" />
          {/* 角落粗线 */}
          <line x1="0" y1="0" x2="200" y2="0" stroke="#e0d0b0" strokeWidth="5" opacity="0.2" />
          <line x1="0" y1="0" x2="0" y2="200" stroke="#e0d0b0" strokeWidth="5" opacity="0.2" />
          <line x1="1920" y1="0" x2="1720" y2="0" stroke="#e0d0b0" strokeWidth="5" opacity="0.2" />
          <line x1="1920" y1="0" x2="1920" y2="200" stroke="#e0d0b0" strokeWidth="5" opacity="0.2" />
          <line x1="0" y1="1080" x2="200" y2="1080" stroke="#e0d0b0" strokeWidth="5" opacity="0.2" />
          <line x1="0" y1="1080" x2="0" y2="880" stroke="#e0d0b0" strokeWidth="5" opacity="0.2" />
          <line x1="1920" y1="1080" x2="1720" y2="1080" stroke="#e0d0b0" strokeWidth="5" opacity="0.2" />
          <line x1="1920" y1="1080" x2="1920" y2="880" stroke="#e0d0b0" strokeWidth="5" opacity="0.2" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
          <h1 ref={titleRef} style={{ fontSize: '76px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, color: '#f0e8d8', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '26px', fontWeight: 400, color: '#a09880', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '800px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineBold: TemplateConfig = {
  id: 'coverLineBold',
  name: '粗线封面',
  description: '粗线封面，粗线条几何图形，标题居中，力量感',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineBold, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineBold'),
};
