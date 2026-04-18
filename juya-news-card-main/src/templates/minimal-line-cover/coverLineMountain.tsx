import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineMountainProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineMountain: React.FC<CoverLineMountainProps> = ({ data, scale, progressBarConfig }) => {
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
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#eef2f8' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 远山 - 最远层 */}
          <path d="M0,700 C100,650 200,680 350,620 C500,560 600,600 750,550 C900,500 1000,540 1100,490 C1200,440 1300,480 1450,430 C1600,380 1700,420 1850,380 L1920,400 L1920,1080 L0,1080 Z" fill="#4a6a8a" opacity="0.04" />
          {/* 远山轮廓线 */}
          <path d="M0,700 C100,650 200,680 350,620 C500,560 600,600 750,550 C900,500 1000,540 1100,490 C1200,440 1300,480 1450,430 C1600,380 1700,420 1850,380" stroke="#4a6a8a" strokeWidth="0.8" fill="none" opacity="0.12" />
          {/* 中山 */}
          <path d="M0,800 C150,740 300,770 500,710 C700,650 800,690 960,640 C1120,590 1200,630 1400,580 C1600,530 1700,570 1920,530 L1920,1080 L0,1080 Z" fill="#4a6a8a" opacity="0.06" />
          {/* 中山轮廓线 */}
          <path d="M0,800 C150,740 300,770 500,710 C700,650 800,690 960,640 C1120,590 1200,630 1400,580 C1600,530 1700,570 1920,530" stroke="#4a6a8a" strokeWidth="1" fill="none" opacity="0.15" />
          {/* 近山 */}
          <path d="M0,900 C200,840 400,870 600,820 C800,770 900,800 1100,760 C1300,720 1400,750 1600,710 C1800,670 1860,700 1920,680 L1920,1080 L0,1080 Z" fill="#4a6a8a" opacity="0.08" />
          {/* 近山轮廓线 */}
          <path d="M0,900 C200,840 400,870 600,820 C800,770 900,800 1100,760 C1300,720 1400,750 1600,710 C1800,670 1860,700 1920,680" stroke="#4a6a8a" strokeWidth="1.2" fill="none" opacity="0.2" />
          {/* 云雾 */}
          <path d="M200,600 C300,580 400,610 500,590 C600,570 700,600 800,585" stroke="#4a6a8a" strokeWidth="0.3" fill="none" opacity="0.08" />
          <path d="M1100,520 C1200,500 1300,530 1400,510 C1500,490 1600,520 1700,505" stroke="#4a6a8a" strokeWidth="0.3" fill="none" opacity="0.08" />
          {/* 飞鸟 */}
          <path d="M700,250 L710,240 L720,250" stroke="#4a6a8a" strokeWidth="0.5" fill="none" opacity="0.1" />
          <path d="M750,230 L758,222 L766,230" stroke="#4a6a8a" strokeWidth="0.4" fill="none" opacity="0.08" />
          <path d="M720,270 L726,264 L732,270" stroke="#4a6a8a" strokeWidth="0.3" fill="none" opacity="0.06" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, marginTop: -80 }}>
          <h1 ref={titleRef} style={{ fontSize: '68px', fontWeight: 300, letterSpacing: '0.03em', lineHeight: 1.3, color: '#1a2a3d', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '24px', fontWeight: 300, color: '#5a7a9a', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '750px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineMountain: TemplateConfig = {
  id: 'coverLineMountain',
  name: '山水封面',
  description: '山水封面，层叠山峦轮廓线与云雾，标题在山间',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineMountain, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineMountain'),
};
