import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineNouveauProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineNouveau: React.FC<CoverLineNouveauProps> = ({ data, scale, progressBarConfig }) => {
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
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f0f2e8' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 藤蔓曲线 - 左侧 */}
          <path d="M0,800 C80,750 120,700 200,720 C280,740 300,680 380,660 C460,640 480,700 560,680 C640,660 660,600 740,620 C820,640 840,580 900,560" stroke="#5a7a4a" strokeWidth="1.5" fill="none" opacity="0.15" />
          {/* 藤蔓分支 */}
          <path d="M200,720 C220,680 260,660 240,620 C220,580 260,560 280,520" stroke="#5a7a4a" strokeWidth="0.8" fill="none" opacity="0.12" />
          <path d="M380,660 C400,620 440,610 420,570 C400,530 440,510 460,470" stroke="#5a7a4a" strokeWidth="0.8" fill="none" opacity="0.12" />
          <path d="M560,680 C580,640 620,630 600,590 C580,550 620,530 640,490" stroke="#5a7a4a" strokeWidth="0.8" fill="none" opacity="0.12" />
          {/* 叶片装饰 */}
          <path d="M240,620 C220,600 200,610 190,590 C210,600 230,595 240,610" stroke="#5a7a4a" strokeWidth="0.5" fill="#5a7a4a" fillOpacity="0.04" opacity="0.2" />
          <path d="M280,520 C300,500 320,510 330,490 C310,500 290,495 280,510" stroke="#5a7a4a" strokeWidth="0.5" fill="#5a7a4a" fillOpacity="0.04" opacity="0.2" />
          <path d="M420,570 C400,550 380,560 370,540 C390,550 410,545 420,560" stroke="#5a7a4a" strokeWidth="0.5" fill="#5a7a4a" fillOpacity="0.04" opacity="0.2" />
          <path d="M600,590 C580,570 560,580 550,560 C570,570 590,565 600,580" stroke="#5a7a4a" strokeWidth="0.5" fill="#5a7a4a" fillOpacity="0.04" opacity="0.2" />
          {/* 藤蔓曲线 - 右侧 */}
          <path d="M1920,800 C1840,750 1800,700 1720,720 C1640,740 1620,680 1540,660 C1460,640 1440,700 1360,680 C1280,660 1260,600 1180,620 C1100,640 1080,580 1020,560" stroke="#5a7a4a" strokeWidth="1.5" fill="none" opacity="0.15" />
          {/* 右侧藤蔓分支 */}
          <path d="M1720,720 C1700,680 1660,660 1680,620 C1700,580 1660,560 1640,520" stroke="#5a7a4a" strokeWidth="0.8" fill="none" opacity="0.12" />
          <path d="M1540,660 C1520,620 1480,610 1500,570 C1520,530 1480,510 1460,470" stroke="#5a7a4a" strokeWidth="0.8" fill="none" opacity="0.12" />
          {/* 右侧叶片 */}
          <path d="M1680,620 C1700,600 1720,610 1730,590 C1710,600 1690,595 1680,610" stroke="#5a7a4a" strokeWidth="0.5" fill="#5a7a4a" fillOpacity="0.04" opacity="0.2" />
          <path d="M1500,570 C1520,550 1540,560 1550,540 C1530,550 1510,545 1500,560" stroke="#5a7a4a" strokeWidth="0.5" fill="#5a7a4a" fillOpacity="0.04" opacity="0.2" />
          {/* 顶部藤蔓 */}
          <path d="M400,100 C500,80 600,120 700,90 C800,60 900,100 1000,80 C1100,60 1200,100 1300,80 C1400,60 1500,100 1600,80" stroke="#5a7a4a" strokeWidth="0.8" fill="none" opacity="0.1" />
          {/* 底部藤蔓 */}
          <path d="M400,980 C500,1000 600,960 700,990 C800,1020 900,980 1000,1000 C1100,1020 1200,980 1300,1000 C1400,1020 1500,980 1600,1000" stroke="#5a7a4a" strokeWidth="0.8" fill="none" opacity="0.1" />
          {/* 花朵装饰 */}
          <circle cx="900" cy="560" r="8" stroke="#5a7a4a" strokeWidth="0.5" fill="none" opacity="0.15" />
          <circle cx="1020" cy="560" r="8" stroke="#5a7a4a" strokeWidth="0.5" fill="none" opacity="0.15" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <h1 ref={titleRef} style={{ fontSize: '68px', fontWeight: 300, letterSpacing: '0.03em', lineHeight: 1.3, color: '#2a3d1a', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '24px', fontWeight: 300, color: '#6a8a5a', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '750px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineNouveau: TemplateConfig = {
  id: 'coverLineNouveau',
  name: '新艺术封面',
  description: '新艺术封面，藤蔓曲线装饰与叶片，标题居中',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineNouveau, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineNouveau'),
};
