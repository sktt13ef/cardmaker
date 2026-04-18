import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineCoralProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineCoral: React.FC<CoverLineCoralProps> = ({ data, scale, progressBarConfig }) => {
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
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#fdf0ec' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 珊瑚分支 - 左下 */}
          <path d="M100,1080 C120,900 180,800 200,700 C220,600 180,500 200,400" stroke="#d4725a" strokeWidth="2" fill="none" opacity="0.15" strokeLinecap="round" />
          <path d="M200,700 C250,650 300,680 350,620 C400,560 380,500 420,440" stroke="#d4725a" strokeWidth="1.5" fill="none" opacity="0.12" strokeLinecap="round" />
          <path d="M200,400 C240,350 280,380 320,330 C360,280 340,230 370,180" stroke="#d4725a" strokeWidth="1" fill="none" opacity="0.1" strokeLinecap="round" />
          <path d="M200,700 C160,640 130,660 100,600 C70,540 90,490 60,440" stroke="#d4725a" strokeWidth="1.2" fill="none" opacity="0.1" strokeLinecap="round" />
          <path d="M350,620 C380,580 420,600 460,550 C500,500 480,450 520,400" stroke="#d4725a" strokeWidth="1" fill="none" opacity="0.08" strokeLinecap="round" />
          {/* 珊瑚分支 - 右下 */}
          <path d="M1820,1080 C1800,900 1740,800 1720,700 C1700,600 1740,500 1720,400" stroke="#d4725a" strokeWidth="2" fill="none" opacity="0.15" strokeLinecap="round" />
          <path d="M1720,700 C1670,650 1620,680 1570,620 C1520,560 1540,500 1500,440" stroke="#d4725a" strokeWidth="1.5" fill="none" opacity="0.12" strokeLinecap="round" />
          <path d="M1720,400 C1680,350 1640,380 1600,330 C1560,280 1580,230 1550,180" stroke="#d4725a" strokeWidth="1" fill="none" opacity="0.1" strokeLinecap="round" />
          <path d="M1720,700 C1760,640 1790,660 1820,600 C1850,540 1830,490 1860,440" stroke="#d4725a" strokeWidth="1.2" fill="none" opacity="0.1" strokeLinecap="round" />
          <path d="M1570,620 C1540,580 1500,600 1460,550 C1420,500 1440,450 1400,400" stroke="#d4725a" strokeWidth="1" fill="none" opacity="0.08" strokeLinecap="round" />
          {/* 小珊瑚分支 - 左上 */}
          <path d="M300,0 C310,80 340,130 330,200 C320,270 350,300 340,370" stroke="#d4725a" strokeWidth="1" fill="none" opacity="0.08" strokeLinecap="round" />
          <path d="M330,200 C370,220 390,200 420,230 C450,260 440,290 470,310" stroke="#d4725a" strokeWidth="0.7" fill="none" opacity="0.06" strokeLinecap="round" />
          {/* 小珊瑚分支 - 右上 */}
          <path d="M1600,0 C1590,80 1560,130 1570,200 C1580,270 1550,300 1560,370" stroke="#d4725a" strokeWidth="1" fill="none" opacity="0.08" strokeLinecap="round" />
          {/* 珊瑚末端小圆点 */}
          <circle cx="200" cy="400" r="3" fill="#d4725a" opacity="0.15" />
          <circle cx="420" cy="440" r="2.5" fill="#d4725a" opacity="0.12" />
          <circle cx="370" cy="180" r="2" fill="#d4725a" opacity="0.1" />
          <circle cx="60" cy="440" r="2.5" fill="#d4725a" opacity="0.1" />
          <circle cx="520" cy="400" r="2" fill="#d4725a" opacity="0.08" />
          <circle cx="1720" cy="400" r="3" fill="#d4725a" opacity="0.15" />
          <circle cx="1500" cy="440" r="2.5" fill="#d4725a" opacity="0.12" />
          <circle cx="1550" cy="180" r="2" fill="#d4725a" opacity="0.1" />
          <circle cx="1860" cy="440" r="2.5" fill="#d4725a" opacity="0.1" />
          <circle cx="1400" cy="400" r="2" fill="#d4725a" opacity="0.08" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <h1 ref={titleRef} style={{ fontSize: '68px', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.3, color: '#5a2a1a', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '24px', fontWeight: 300, color: '#b07060', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '750px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineCoral: TemplateConfig = {
  id: 'coverLineCoral',
  name: '珊瑚封面',
  description: '珊瑚封面，珊瑚分支线条从角落生长，标题居中',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineCoral, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineCoral'),
};
