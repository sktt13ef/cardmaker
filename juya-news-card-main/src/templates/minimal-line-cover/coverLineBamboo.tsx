import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineBambooProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineBamboo: React.FC<CoverLineBambooProps> = ({ data, scale, progressBarConfig }) => {
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
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f5f8f0' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 竹竿1 - 左侧 */}
          <line x1="200" y1="0" x2="200" y2="1080" stroke="#3a6b3a" strokeWidth="3" opacity="0.15" />
          <line x1="195" y1="180" x2="205" y2="180" stroke="#3a6b3a" strokeWidth="2" opacity="0.2" />
          <line x1="195" y1="380" x2="205" y2="380" stroke="#3a6b3a" strokeWidth="2" opacity="0.2" />
          <line x1="195" y1="580" x2="205" y2="580" stroke="#3a6b3a" strokeWidth="2" opacity="0.2" />
          <line x1="195" y1="780" x2="205" y2="780" stroke="#3a6b3a" strokeWidth="2" opacity="0.2" />
          <line x1="195" y1="950" x2="205" y2="950" stroke="#3a6b3a" strokeWidth="2" opacity="0.2" />
          {/* 竹竿2 */}
          <line x1="280" y1="100" x2="280" y2="1080" stroke="#3a6b3a" strokeWidth="2.5" opacity="0.12" />
          <line x1="276" y1="280" x2="284" y2="280" stroke="#3a6b3a" strokeWidth="1.5" opacity="0.18" />
          <line x1="276" y1="480" x2="284" y2="480" stroke="#3a6b3a" strokeWidth="1.5" opacity="0.18" />
          <line x1="276" y1="680" x2="284" y2="680" stroke="#3a6b3a" strokeWidth="1.5" opacity="0.18" />
          <line x1="276" y1="880" x2="284" y2="880" stroke="#3a6b3a" strokeWidth="1.5" opacity="0.18" />
          {/* 竹竿3 - 右侧 */}
          <line x1="1650" y1="0" x2="1650" y2="1080" stroke="#3a6b3a" strokeWidth="3" opacity="0.15" />
          <line x1="1645" y1="220" x2="1655" y2="220" stroke="#3a6b3a" strokeWidth="2" opacity="0.2" />
          <line x1="1645" y1="420" x2="1655" y2="420" stroke="#3a6b3a" strokeWidth="2" opacity="0.2" />
          <line x1="1645" y1="620" x2="1655" y2="620" stroke="#3a6b3a" strokeWidth="2" opacity="0.2" />
          <line x1="1645" y1="820" x2="1655" y2="820" stroke="#3a6b3a" strokeWidth="2" opacity="0.2" />
          {/* 竹竿4 */}
          <line x1="1730" y1="50" x2="1730" y2="1080" stroke="#3a6b3a" strokeWidth="2.5" opacity="0.12" />
          <line x1="1726" y1="250" x2="1734" y2="250" stroke="#3a6b3a" strokeWidth="1.5" opacity="0.18" />
          <line x1="1726" y1="450" x2="1734" y2="450" stroke="#3a6b3a" strokeWidth="1.5" opacity="0.18" />
          <line x1="1726" y1="650" x2="1734" y2="650" stroke="#3a6b3a" strokeWidth="1.5" opacity="0.18" />
          <line x1="1726" y1="850" x2="1734" y2="850" stroke="#3a6b3a" strokeWidth="1.5" opacity="0.18" />
          {/* 竹叶 - 左侧 */}
          <path d="M200,180 C180,160 150,170 140,150 C160,160 180,155 200,170" stroke="#3a6b3a" strokeWidth="0.8" fill="#3a6b3a" fillOpacity="0.06" opacity="0.25" />
          <path d="M200,380 C220,360 250,365 260,345 C240,355 220,350 200,370" stroke="#3a6b3a" strokeWidth="0.8" fill="#3a6b3a" fillOpacity="0.06" opacity="0.25" />
          <path d="M200,580 C175,560 145,568 130,548 C155,558 175,550 200,570" stroke="#3a6b3a" strokeWidth="0.8" fill="#3a6b3a" fillOpacity="0.06" opacity="0.2" />
          <path d="M280,280 C300,260 330,268 345,248 C325,258 300,252 280,270" stroke="#3a6b3a" strokeWidth="0.8" fill="#3a6b3a" fillOpacity="0.06" opacity="0.25" />
          <path d="M280,680 C260,660 230,665 215,645 C240,655 260,650 280,670" stroke="#3a6b3a" strokeWidth="0.8" fill="#3a6b3a" fillOpacity="0.06" opacity="0.2" />
          {/* 竹叶 - 右侧 */}
          <path d="M1650,220 C1670,200 1700,208 1715,188 C1695,198 1670,192 1650,210" stroke="#3a6b3a" strokeWidth="0.8" fill="#3a6b3a" fillOpacity="0.06" opacity="0.25" />
          <path d="M1650,620 C1630,600 1600,608 1585,588 C1610,598 1630,592 1650,610" stroke="#3a6b3a" strokeWidth="0.8" fill="#3a6b3a" fillOpacity="0.06" opacity="0.2" />
          <path d="M1730,450 C1750,430 1780,438 1795,418 C1775,428 1750,422 1730,440" stroke="#3a6b3a" strokeWidth="0.8" fill="#3a6b3a" fillOpacity="0.06" opacity="0.25" />
          <path d="M1730,850 C1710,830 1680,838 1665,818 C1690,828 1710,822 1730,840" stroke="#3a6b3a" strokeWidth="0.8" fill="#3a6b3a" fillOpacity="0.06" opacity="0.2" />
          {/* 远处淡竹 */}
          <line x1="450" y1="200" x2="450" y2="1080" stroke="#3a6b3a" strokeWidth="1" opacity="0.05" />
          <line x1="1470" y1="150" x2="1470" y2="1080" stroke="#3a6b3a" strokeWidth="1" opacity="0.05" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <h1 ref={titleRef} style={{ fontSize: '68px', fontWeight: 300, letterSpacing: '0.05em', lineHeight: 1.3, color: '#1a3d1a', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '24px', fontWeight: 300, color: '#5a8b5a', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '750px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineBamboo: TemplateConfig = {
  id: 'coverLineBamboo',
  name: '竹节封面',
  description: '竹节封面，竹节线条与竹叶装饰，标题居中，东方韵味',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineBamboo, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineBamboo'),
};
