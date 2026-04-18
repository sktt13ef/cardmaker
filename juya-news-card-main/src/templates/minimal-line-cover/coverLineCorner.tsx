import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineCornerProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineCorner: React.FC<CoverLineCornerProps> = ({ data, scale, progressBarConfig }) => {
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
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f8f5ef' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 左上角装饰 */}
          <line x1="60" y1="60" x2="300" y2="60" stroke="#6b5b4a" strokeWidth="1.5" opacity="0.25" />
          <line x1="60" y1="60" x2="60" y2="300" stroke="#6b5b4a" strokeWidth="1.5" opacity="0.25" />
          <line x1="60" y1="100" x2="220" y2="100" stroke="#6b5b4a" strokeWidth="0.8" opacity="0.18" />
          <line x1="100" y1="60" x2="100" y2="220" stroke="#6b5b4a" strokeWidth="0.8" opacity="0.18" />
          <line x1="60" y1="140" x2="160" y2="140" stroke="#6b5b4a" strokeWidth="0.5" opacity="0.12" />
          <line x1="140" y1="60" x2="140" y2="160" stroke="#6b5b4a" strokeWidth="0.5" opacity="0.12" />
          <circle cx="60" cy="60" r="3" fill="#6b5b4a" opacity="0.3" />
          {/* 右上角装饰 */}
          <line x1="1860" y1="60" x2="1620" y2="60" stroke="#6b5b4a" strokeWidth="1.5" opacity="0.25" />
          <line x1="1860" y1="60" x2="1860" y2="300" stroke="#6b5b4a" strokeWidth="1.5" opacity="0.25" />
          <line x1="1860" y1="100" x2="1700" y2="100" stroke="#6b5b4a" strokeWidth="0.8" opacity="0.18" />
          <line x1="1820" y1="60" x2="1820" y2="220" stroke="#6b5b4a" strokeWidth="0.8" opacity="0.18" />
          <line x1="1860" y1="140" x2="1760" y2="140" stroke="#6b5b4a" strokeWidth="0.5" opacity="0.12" />
          <line x1="1780" y1="60" x2="1780" y2="160" stroke="#6b5b4a" strokeWidth="0.5" opacity="0.12" />
          <circle cx="1860" cy="60" r="3" fill="#6b5b4a" opacity="0.3" />
          {/* 左下角装饰 */}
          <line x1="60" y1="1020" x2="300" y2="1020" stroke="#6b5b4a" strokeWidth="1.5" opacity="0.25" />
          <line x1="60" y1="1020" x2="60" y2="780" stroke="#6b5b4a" strokeWidth="1.5" opacity="0.25" />
          <line x1="60" y1="980" x2="220" y2="980" stroke="#6b5b4a" strokeWidth="0.8" opacity="0.18" />
          <line x1="100" y1="1020" x2="100" y2="860" stroke="#6b5b4a" strokeWidth="0.8" opacity="0.18" />
          <line x1="60" y1="940" x2="160" y2="940" stroke="#6b5b4a" strokeWidth="0.5" opacity="0.12" />
          <line x1="140" y1="1020" x2="140" y2="920" stroke="#6b5b4a" strokeWidth="0.5" opacity="0.12" />
          <circle cx="60" cy="1020" r="3" fill="#6b5b4a" opacity="0.3" />
          {/* 右下角装饰 */}
          <line x1="1860" y1="1020" x2="1620" y2="1020" stroke="#6b5b4a" strokeWidth="1.5" opacity="0.25" />
          <line x1="1860" y1="1020" x2="1860" y2="780" stroke="#6b5b4a" strokeWidth="1.5" opacity="0.25" />
          <line x1="1860" y1="980" x2="1700" y2="980" stroke="#6b5b4a" strokeWidth="0.8" opacity="0.18" />
          <line x1="1820" y1="1020" x2="1820" y2="860" stroke="#6b5b4a" strokeWidth="0.8" opacity="0.18" />
          <line x1="1860" y1="940" x2="1760" y2="940" stroke="#6b5b4a" strokeWidth="0.5" opacity="0.12" />
          <line x1="1780" y1="1020" x2="1780" y2="920" stroke="#6b5b4a" strokeWidth="0.5" opacity="0.12" />
          <circle cx="1860" cy="1020" r="3" fill="#6b5b4a" opacity="0.3" />
          {/* 四角对角线装饰 */}
          <line x1="60" y1="60" x2="180" y2="180" stroke="#6b5b4a" strokeWidth="0.3" opacity="0.1" />
          <line x1="1860" y1="60" x2="1740" y2="180" stroke="#6b5b4a" strokeWidth="0.3" opacity="0.1" />
          <line x1="60" y1="1020" x2="180" y2="900" stroke="#6b5b4a" strokeWidth="0.3" opacity="0.1" />
          <line x1="1860" y1="1020" x2="1740" y2="900" stroke="#6b5b4a" strokeWidth="0.3" opacity="0.1" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <h1 ref={titleRef} style={{ fontSize: '68px', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.3, color: '#3d2e1e', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '24px', fontWeight: 300, color: '#8b7a60', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '750px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineCorner: TemplateConfig = {
  id: 'coverLineCorner',
  name: '角落封面',
  description: '角落封面，四角精致装饰线条，标题偏中心',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineCorner, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineCorner'),
};
