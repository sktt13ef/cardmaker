import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineCalligraphyProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineCalligraphy: React.FC<CoverLineCalligraphyProps> = ({ data, scale, progressBarConfig }) => {
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
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f8f4ec' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 毛笔笔触1 - 大横划 */}
          <path d="M100,300 C300,280 600,320 900,290 C1200,260 1500,310 1800,280" stroke="#2a2a2a" strokeWidth="8" opacity="0.06" strokeLinecap="round" />
          {/* 毛笔笔触2 - 竖划 */}
          <path d="M400,100 C390,300 410,500 400,700 C395,800 405,900 400,1000" stroke="#2a2a2a" strokeWidth="6" opacity="0.05" strokeLinecap="round" />
          {/* 毛笔笔触3 - 撇 */}
          <path d="M800,150 C750,300 650,450 500,600 C400,700 300,780 200,850" stroke="#2a2a2a" strokeWidth="5" opacity="0.05" strokeLinecap="round" />
          {/* 毛笔笔触4 - 捺 */}
          <path d="M1100,200 C1200,350 1350,500 1500,650 C1600,750 1700,820 1800,880" stroke="#2a2a2a" strokeWidth="5" opacity="0.05" strokeLinecap="round" />
          {/* 毛笔笔触5 - 点 */}
          <path d="M960,200 C970,210 980,240 975,260 C970,240 960,220 960,200" stroke="#2a2a2a" strokeWidth="4" fill="#2a2a2a" fillOpacity="0.04" opacity="0.08" />
          {/* 飞白效果 - 细碎线条 */}
          <line x1="300" y1="290" x2="350" y2="288" stroke="#2a2a2a" strokeWidth="0.5" opacity="0.08" />
          <line x1="500" y1="295" x2="560" y2="292" stroke="#2a2a2a" strokeWidth="0.3" opacity="0.06" />
          <line x1="700" y1="298" x2="740" y2="295" stroke="#2a2a2a" strokeWidth="0.4" opacity="0.07" />
          <line x1="1100" y1="285" x2="1150" y2="282" stroke="#2a2a2a" strokeWidth="0.5" opacity="0.08" />
          <line x1="1300" y1="290" x2="1360" y2="287" stroke="#2a2a2a" strokeWidth="0.3" opacity="0.06" />
          {/* 墨滴 */}
          <circle cx="400" cy="720" r="8" fill="#2a2a2a" opacity="0.04" />
          <circle cx="1500" cy="680" r="6" fill="#2a2a2a" opacity="0.03" />
          <circle cx="960" cy="850" r="10" fill="#2a2a2a" opacity="0.03" />
          {/* 印章装饰 - 右下角 */}
          <rect x="1700" y="880" width="80" height="80" stroke="#c43a2a" strokeWidth="2" fill="none" opacity="0.15" />
          <rect x="1710" y="890" width="60" height="60" stroke="#c43a2a" strokeWidth="1" fill="none" opacity="0.1" />
          {/* 印章内线条 */}
          <line x1="1720" y1="910" x2="1760" y2="910" stroke="#c43a2a" strokeWidth="1" opacity="0.1" />
          <line x1="1720" y1="930" x2="1760" y2="930" stroke="#c43a2a" strokeWidth="1" opacity="0.1" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <h1 ref={titleRef} style={{ fontSize: '70px', fontWeight: 500, letterSpacing: '0.08em', lineHeight: 1.3, color: '#1a1a1a', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '24px', fontWeight: 300, color: '#6b6b5a', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '750px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineCalligraphy: TemplateConfig = {
  id: 'coverLineCalligraphy',
  name: '书法封面',
  description: '书法封面，毛笔笔触装饰与印章，标题居中',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineCalligraphy, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineCalligraphy'),
};
