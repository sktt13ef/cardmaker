import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineRadiantProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineRadiant: React.FC<CoverLineRadiantProps> = ({ data, scale, progressBarConfig }) => {
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
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#faf5ee' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 从中心放射的线条 - 36条均匀分布 */}
          <line x1="960" y1="540" x2="960" y2="-200" stroke="#b8860b" strokeWidth="0.5" opacity="0.12" />
          <line x1="960" y1="540" x2="1150" y2="-160" stroke="#b8860b" strokeWidth="0.5" opacity="0.12" />
          <line x1="960" y1="540" x2="1330" y2="-60" stroke="#b8860b" strokeWidth="0.5" opacity="0.12" />
          <line x1="960" y1="540" x2="1480" y2="90" stroke="#b8860b" strokeWidth="0.5" opacity="0.12" />
          <line x1="960" y1="540" x2="1580" y2="280" stroke="#b8860b" strokeWidth="0.5" opacity="0.12" />
          <line x1="960" y1="540" x2="1620" y2="490" stroke="#b8860b" strokeWidth="0.5" opacity="0.12" />
          <line x1="960" y1="540" x2="1620" y2="700" stroke="#b8860b" strokeWidth="0.5" opacity="0.12" />
          <line x1="960" y1="540" x2="1580" y2="900" stroke="#b8860b" strokeWidth="0.5" opacity="0.12" />
          <line x1="960" y1="540" x2="1480" y2="1060" stroke="#b8860b" strokeWidth="0.5" opacity="0.12" />
          <line x1="960" y1="540" x2="1330" y2="1180" stroke="#b8860b" strokeWidth="0.5" opacity="0.12" />
          <line x1="960" y1="540" x2="1150" y2="1260" stroke="#b8860b" strokeWidth="0.5" opacity="0.12" />
          <line x1="960" y1="540" x2="960" y2="1300" stroke="#b8860b" strokeWidth="0.5" opacity="0.12" />
          <line x1="960" y1="540" x2="770" y2="1260" stroke="#b8860b" strokeWidth="0.5" opacity="0.12" />
          <line x1="960" y1="540" x2="590" y2="1180" stroke="#b8860b" strokeWidth="0.5" opacity="0.12" />
          <line x1="960" y1="540" x2="440" y2="1060" stroke="#b8860b" strokeWidth="0.5" opacity="0.12" />
          <line x1="960" y1="540" x2="340" y2="900" stroke="#b8860b" strokeWidth="0.5" opacity="0.12" />
          <line x1="960" y1="540" x2="300" y2="700" stroke="#b8860b" strokeWidth="0.5" opacity="0.12" />
          <line x1="960" y1="540" x2="300" y2="490" stroke="#b8860b" strokeWidth="0.5" opacity="0.12" />
          <line x1="960" y1="540" x2="340" y2="280" stroke="#b8860b" strokeWidth="0.5" opacity="0.12" />
          <line x1="960" y1="540" x2="440" y2="90" stroke="#b8860b" strokeWidth="0.5" opacity="0.12" />
          <line x1="960" y1="540" x2="590" y2="-60" stroke="#b8860b" strokeWidth="0.5" opacity="0.12" />
          <line x1="960" y1="540" x2="770" y2="-160" stroke="#b8860b" strokeWidth="0.5" opacity="0.12" />
          {/* 同心圆环 */}
          <circle cx="960" cy="540" r="150" stroke="#b8860b" strokeWidth="0.8" fill="none" opacity="0.15" />
          <circle cx="960" cy="540" r="300" stroke="#b8860b" strokeWidth="0.6" fill="none" opacity="0.12" />
          <circle cx="960" cy="540" r="450" stroke="#b8860b" strokeWidth="0.5" fill="none" opacity="0.1" />
          <circle cx="960" cy="540" r="600" stroke="#b8860b" strokeWidth="0.4" fill="none" opacity="0.08" />
          {/* 中心装饰 */}
          <circle cx="960" cy="540" r="6" fill="#b8860b" opacity="0.3" />
          <circle cx="960" cy="540" r="20" stroke="#b8860b" strokeWidth="1" fill="none" opacity="0.2" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <h1 ref={titleRef} style={{ fontSize: '68px', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.3, color: '#4a3508', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '24px', fontWeight: 300, color: '#8b7030', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '750px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineRadiant: TemplateConfig = {
  id: 'coverLineRadiant',
  name: '放射封面',
  description: '放射封面，从中心放射的线条与同心圆，标题居中',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineRadiant, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineRadiant'),
};
