import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineInkProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineInk: React.FC<CoverLineInkProps> = ({ data, scale, progressBarConfig }) => {
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
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f5f2ec' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 墨色晕染 - 大面积淡墨 */}
          <ellipse cx="300" cy="400" rx="250" ry="200" fill="#1a1a1a" opacity="0.02" />
          <ellipse cx="1600" cy="650" rx="300" ry="220" fill="#1a1a1a" opacity="0.025" />
          <ellipse cx="960" cy="200" rx="400" ry="150" fill="#1a1a1a" opacity="0.015" />
          {/* 墨色晕染 - 中等浓度 */}
          <ellipse cx="250" cy="380" rx="120" ry="100" fill="#1a1a1a" opacity="0.03" />
          <ellipse cx="1650" cy="680" rx="140" ry="110" fill="#1a1a1a" opacity="0.035" />
          {/* 墨线 - 枯笔效果 */}
          <path d="M50,500 C200,480 400,520 600,490 C800,460 1000,510 1200,480 C1400,450 1600,500 1870,470" stroke="#1a1a1a" strokeWidth="3" opacity="0.06" strokeLinecap="round" />
          <path d="M50,520 C200,500 400,540 600,510 C800,480 1000,530 1200,500 C1400,470 1600,520 1870,490" stroke="#1a1a1a" strokeWidth="1.5" opacity="0.04" strokeLinecap="round" />
          {/* 墨线 - 竖笔 */}
          <path d="M600,50 C590,200 610,400 600,600 C595,700 605,800 600,1030" stroke="#1a1a1a" strokeWidth="4" opacity="0.04" strokeLinecap="round" />
          <path d="M620,50 C615,200 625,400 620,600 C618,700 622,800 620,1030" stroke="#1a1a1a" strokeWidth="1" opacity="0.03" strokeLinecap="round" />
          {/* 墨点 */}
          <circle cx="300" cy="400" r="15" fill="#1a1a1a" opacity="0.04" />
          <circle cx="300" cy="400" r="5" fill="#1a1a1a" opacity="0.06" />
          <circle cx="1600" cy="650" r="12" fill="#1a1a1a" opacity="0.035" />
          <circle cx="1600" cy="650" r="4" fill="#1a1a1a" opacity="0.055" />
          {/* 飞白碎点 */}
          <circle cx="450" cy="490" r="1.5" fill="#1a1a1a" opacity="0.06" />
          <circle cx="550" cy="500" r="1" fill="#1a1a1a" opacity="0.05" />
          <circle cx="750" cy="480" r="1.5" fill="#1a1a1a" opacity="0.04" />
          <circle cx="1050" cy="510" r="1" fill="#1a1a1a" opacity="0.05" />
          <circle cx="1250" cy="490" r="1.5" fill="#1a1a1a" opacity="0.06" />
          <circle cx="1450" cy="500" r="1" fill="#1a1a1a" opacity="0.04" />
          {/* 水渍效果 */}
          <ellipse cx="960" cy="800" rx="200" ry="80" fill="#1a1a1a" opacity="0.01" />
          <ellipse cx="400" cy="150" rx="150" ry="60" fill="#1a1a1a" opacity="0.01" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <h1 ref={titleRef} style={{ fontSize: '68px', fontWeight: 400, letterSpacing: '0.05em', lineHeight: 1.3, color: '#1a1a1a', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '24px', fontWeight: 300, color: '#5a5a5a', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '750px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineInk: TemplateConfig = {
  id: 'coverLineInk',
  name: '水墨封面',
  description: '水墨封面，墨色晕染效果与枯笔线条，标题居中',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineInk, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineInk'),
};
