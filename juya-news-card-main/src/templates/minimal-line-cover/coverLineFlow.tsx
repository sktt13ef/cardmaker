import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineFlowProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineFlow: React.FC<CoverLineFlowProps> = ({ data, scale, progressBarConfig }) => {
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
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#e8f4f0' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 流线1 - 上方大弧线 */}
          <path d="M-100,200 C200,100 400,350 700,250 C1000,150 1200,400 1500,300 C1800,200 1900,350 2020,280" stroke="#1a6b5a" strokeWidth="1.2" fill="none" opacity="0.2" />
          {/* 流线2 */}
          <path d="M-100,320 C200,220 400,470 700,370 C1000,270 1200,520 1500,420 C1800,320 1900,470 2020,400" stroke="#1a6b5a" strokeWidth="1" fill="none" opacity="0.18" />
          {/* 流线3 */}
          <path d="M-100,440 C200,340 400,590 700,490 C1000,390 1200,640 1500,540 C1800,440 1900,590 2020,520" stroke="#1a6b5a" strokeWidth="0.8" fill="none" opacity="0.15" />
          {/* 流线4 - 中心线 */}
          <path d="M-100,560 C200,460 400,710 700,610 C1000,510 1200,760 1500,660 C1800,560 1900,710 2020,640" stroke="#1a6b5a" strokeWidth="1.5" fill="none" opacity="0.22" />
          {/* 流线5 */}
          <path d="M-100,680 C200,580 400,830 700,730 C1000,630 1200,880 1500,780 C1800,680 1900,830 2020,760" stroke="#1a6b5a" strokeWidth="0.8" fill="none" opacity="0.15" />
          {/* 流线6 */}
          <path d="M-100,800 C200,700 400,950 700,850 C1000,750 1200,1000 1500,900 C1800,800 1900,950 2020,880" stroke="#1a6b5a" strokeWidth="1" fill="none" opacity="0.18" />
          {/* 流线7 - 下方大弧线 */}
          <path d="M-100,920 C200,820 400,1070 700,970 C1000,870 1200,1120 1500,1020 C1800,920 1900,1070 2020,1000" stroke="#1a6b5a" strokeWidth="1.2" fill="none" opacity="0.2" />
          {/* 反向流线 */}
          <path d="M2020,150 C1800,250 1500,100 1200,200 C900,300 600,150 300,250 C0,350 -100,200 -200,280" stroke="#1a6b5a" strokeWidth="0.5" fill="none" opacity="0.08" />
          <path d="M2020,750 C1800,850 1500,700 1200,800 C900,900 600,750 300,850 C0,950 -100,800 -200,880" stroke="#1a6b5a" strokeWidth="0.5" fill="none" opacity="0.08" />
          {/* 流线上的小圆点 */}
          <circle cx="700" cy="250" r="2" fill="#1a6b5a" opacity="0.25" />
          <circle cx="1500" cy="300" r="2" fill="#1a6b5a" opacity="0.25" />
          <circle cx="700" cy="610" r="2.5" fill="#1a6b5a" opacity="0.3" />
          <circle cx="1500" cy="660" r="2.5" fill="#1a6b5a" opacity="0.3" />
          <circle cx="700" cy="970" r="2" fill="#1a6b5a" opacity="0.25" />
          <circle cx="1500" cy="1020" r="2" fill="#1a6b5a" opacity="0.25" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <h1 ref={titleRef} style={{ fontSize: '70px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.3, color: '#0d3d30', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '25px', fontWeight: 300, color: '#4a8b78', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '800px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineFlow: TemplateConfig = {
  id: 'coverLineFlow',
  name: '流线封面',
  description: '流线封面，多条流畅曲线横穿画面，标题在曲线之间',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineFlow, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineFlow'),
};
