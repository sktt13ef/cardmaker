import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineParallelProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineParallel: React.FC<CoverLineParallelProps> = ({ data, scale, progressBarConfig }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitle = data.cards.length > 0 ? data.cards[0].desc : '';

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!titleRef.current) return;
    const title = titleRef.current;
    let size = 72;
    title.style.fontSize = size + 'px';
    let guard = 0;
    while (title.scrollWidth > 1500 && size > 36 && guard < 100) { size -= 1; title.style.fontSize = size + 'px'; guard++; }
  }, [data]);

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f5f5f5' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 平行线条阵列 - 水平 */}
          <line x1="0" y1="60" x2="1920" y2="60" stroke="#555555" strokeWidth="0.3" opacity="0.08" />
          <line x1="0" y1="120" x2="1920" y2="120" stroke="#555555" strokeWidth="0.4" opacity="0.1" />
          <line x1="0" y1="180" x2="1920" y2="180" stroke="#555555" strokeWidth="0.3" opacity="0.08" />
          <line x1="0" y1="240" x2="1920" y2="240" stroke="#555555" strokeWidth="0.5" opacity="0.12" />
          <line x1="0" y1="300" x2="1920" y2="300" stroke="#555555" strokeWidth="0.3" opacity="0.08" />
          <line x1="0" y1="360" x2="1920" y2="360" stroke="#555555" strokeWidth="0.4" opacity="0.1" />
          <line x1="0" y1="420" x2="1920" y2="420" stroke="#555555" strokeWidth="0.3" opacity="0.08" />
          <line x1="0" y1="660" x2="1920" y2="660" stroke="#555555" strokeWidth="0.3" opacity="0.08" />
          <line x1="0" y1="720" x2="1920" y2="720" stroke="#555555" strokeWidth="0.4" opacity="0.1" />
          <line x1="0" y1="780" x2="1920" y2="780" stroke="#555555" strokeWidth="0.3" opacity="0.08" />
          <line x1="0" y1="840" x2="1920" y2="840" stroke="#555555" strokeWidth="0.5" opacity="0.12" />
          <line x1="0" y1="900" x2="1920" y2="900" stroke="#555555" strokeWidth="0.3" opacity="0.08" />
          <line x1="0" y1="960" x2="1920" y2="960" stroke="#555555" strokeWidth="0.4" opacity="0.1" />
          <line x1="0" y1="1020" x2="1920" y2="1020" stroke="#555555" strokeWidth="0.3" opacity="0.08" />
          {/* 平行线条阵列 - 垂直 */}
          <line x1="120" y1="0" x2="120" y2="1080" stroke="#555555" strokeWidth="0.3" opacity="0.06" />
          <line x1="240" y1="0" x2="240" y2="1080" stroke="#555555" strokeWidth="0.4" opacity="0.08" />
          <line x1="360" y1="0" x2="360" y2="1080" stroke="#555555" strokeWidth="0.3" opacity="0.06" />
          <line x1="480" y1="0" x2="480" y2="1080" stroke="#555555" strokeWidth="0.5" opacity="0.1" />
          <line x1="600" y1="0" x2="600" y2="1080" stroke="#555555" strokeWidth="0.3" opacity="0.06" />
          <line x1="720" y1="0" x2="720" y2="1080" stroke="#555555" strokeWidth="0.4" opacity="0.08" />
          <line x1="840" y1="0" x2="840" y2="1080" stroke="#555555" strokeWidth="0.3" opacity="0.06" />
          <line x1="1080" y1="0" x2="1080" y2="1080" stroke="#555555" strokeWidth="0.3" opacity="0.06" />
          <line x1="1200" y1="0" x2="1200" y2="1080" stroke="#555555" strokeWidth="0.4" opacity="0.08" />
          <line x1="1320" y1="0" x2="1320" y2="1080" stroke="#555555" strokeWidth="0.3" opacity="0.06" />
          <line x1="1440" y1="0" x2="1440" y2="1080" stroke="#555555" strokeWidth="0.5" opacity="0.1" />
          <line x1="1560" y1="0" x2="1560" y2="1080" stroke="#555555" strokeWidth="0.3" opacity="0.06" />
          <line x1="1680" y1="0" x2="1680" y2="1080" stroke="#555555" strokeWidth="0.4" opacity="0.08" />
          <line x1="1800" y1="0" x2="1800" y2="1080" stroke="#555555" strokeWidth="0.3" opacity="0.06" />
          {/* 对角平行线 */}
          <line x1="0" y1="1080" x2="400" y2="0" stroke="#555555" strokeWidth="0.3" opacity="0.05" />
          <line x1="200" y1="1080" x2="600" y2="0" stroke="#555555" strokeWidth="0.3" opacity="0.05" />
          <line x1="400" y1="1080" x2="800" y2="0" stroke="#555555" strokeWidth="0.3" opacity="0.05" />
          <line x1="1120" y1="1080" x2="1520" y2="0" stroke="#555555" strokeWidth="0.3" opacity="0.05" />
          <line x1="1320" y1="1080" x2="1720" y2="0" stroke="#555555" strokeWidth="0.3" opacity="0.05" />
          <line x1="1520" y1="1080" x2="1920" y2="0" stroke="#555555" strokeWidth="0.3" opacity="0.05" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <h1 ref={titleRef} style={{ fontSize: '72px', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.3, color: '#222222', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '26px', fontWeight: 300, color: '#666666', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '800px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineParallel: TemplateConfig = {
  id: 'coverLineParallel',
  name: '平行封面',
  description: '平行封面，水平垂直对角平行线条阵列，标题横跨线条',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineParallel, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineParallel'),
};
