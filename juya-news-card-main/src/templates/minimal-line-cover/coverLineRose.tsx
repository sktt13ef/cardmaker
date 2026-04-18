import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineRoseProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineRose: React.FC<CoverLineRoseProps> = ({ data, scale, progressBarConfig }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitle = data.cards.length > 0 ? data.cards[0].desc : '';

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!titleRef.current) return;
    const title = titleRef.current;
    let size = 66;
    title.style.fontSize = size + 'px';
    let guard = 0;
    while (title.scrollWidth > 1200 && size > 30 && guard < 100) { size -= 1; title.style.fontSize = size + 'px'; guard++; }
  }, [data]);

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#fdf0f2' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 玫瑰花瓣 - 螺旋花瓣线条 */}
          <path d="M960,540 C960,440 880,380 820,420 C760,460 780,540 840,560 C900,580 960,540 960,540" stroke="#c45a6a" strokeWidth="1" fill="none" opacity="0.2" />
          <path d="M960,540 C960,440 1040,380 1100,420 C1160,460 1140,540 1080,560 C1020,580 960,540 960,540" stroke="#c45a6a" strokeWidth="1" fill="none" opacity="0.2" />
          <path d="M960,540 C960,640 880,700 820,660 C760,620 780,540 840,520 C900,500 960,540 960,540" stroke="#c45a6a" strokeWidth="1" fill="none" opacity="0.2" />
          <path d="M960,540 C960,640 1040,700 1100,660 C1160,620 1140,540 1080,520 C1020,500 960,540 960,540" stroke="#c45a6a" strokeWidth="1" fill="none" opacity="0.2" />
          {/* 外层花瓣 */}
          <path d="M960,540 C960,380 840,300 760,360 C680,420 700,540 780,580 C860,620 960,540 960,540" stroke="#c45a6a" strokeWidth="0.8" fill="none" opacity="0.15" />
          <path d="M960,540 C960,380 1080,300 1160,360 C1240,420 1220,540 1140,580 C1060,620 960,540 960,540" stroke="#c45a6a" strokeWidth="0.8" fill="none" opacity="0.15" />
          <path d="M960,540 C960,700 840,780 760,720 C680,660 700,540 780,500 C860,460 960,540 960,540" stroke="#c45a6a" strokeWidth="0.8" fill="none" opacity="0.15" />
          <path d="M960,540 C960,700 1080,780 1160,720 C1240,660 1220,540 1140,500 C1060,460 960,540 960,540" stroke="#c45a6a" strokeWidth="0.8" fill="none" opacity="0.15" />
          {/* 最外层花瓣 */}
          <path d="M960,540 C960,320 800,220 700,300 C600,380 620,540 720,600 C820,660 960,540 960,540" stroke="#c45a6a" strokeWidth="0.5" fill="none" opacity="0.1" />
          <path d="M960,540 C960,320 1120,220 1220,300 C1320,380 1300,540 1200,600 C1100,660 960,540 960,540" stroke="#c45a6a" strokeWidth="0.5" fill="none" opacity="0.1" />
          <path d="M960,540 C960,760 800,860 700,780 C600,700 620,540 720,480 C820,420 960,540 960,540" stroke="#c45a6a" strokeWidth="0.5" fill="none" opacity="0.1" />
          <path d="M960,540 C960,760 1120,860 1220,780 C1320,700 1300,540 1200,480 C1100,420 960,540 960,540" stroke="#c45a6a" strokeWidth="0.5" fill="none" opacity="0.1" />
          {/* 花蕊 */}
          <circle cx="960" cy="540" r="15" stroke="#c45a6a" strokeWidth="0.8" fill="none" opacity="0.2" />
          <circle cx="960" cy="540" r="8" stroke="#c45a6a" strokeWidth="0.5" fill="none" opacity="0.25" />
          <circle cx="960" cy="540" r="3" fill="#c45a6a" opacity="0.3" />
          {/* 茎 - 左下 */}
          <path d="M840,560 C800,650 750,750 680,850 C640,920 600,980 560,1080" stroke="#6a8a4a" strokeWidth="1" fill="none" opacity="0.12" />
          {/* 茎 - 右下 */}
          <path d="M1080,560 C1120,650 1170,750 1240,850 C1280,920 1320,980 1360,1080" stroke="#6a8a4a" strokeWidth="1" fill="none" opacity="0.12" />
          {/* 小叶子 */}
          <path d="M720,750 C700,730 680,740 670,720 C690,730 710,725 720,740" stroke="#6a8a4a" strokeWidth="0.5" fill="#6a8a4a" fillOpacity="0.04" opacity="0.15" />
          <path d="M1200,750 C1220,730 1240,740 1250,720 C1230,730 1210,725 1200,740" stroke="#6a8a4a" strokeWidth="0.5" fill="#6a8a4a" fillOpacity="0.04" opacity="0.15" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
          <h1 ref={titleRef} style={{ fontSize: '66px', fontWeight: 300, letterSpacing: '0.02em', lineHeight: 1.3, color: '#5a1a2a', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '24px', fontWeight: 300, color: '#a06070', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '650px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineRose: TemplateConfig = {
  id: 'coverLineRose',
  name: '玫瑰封面',
  description: '玫瑰封面，螺旋花瓣线条与花茎，标题在花心',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineRose, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineRose'),
};
