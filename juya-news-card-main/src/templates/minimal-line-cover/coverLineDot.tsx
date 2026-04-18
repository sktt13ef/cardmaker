import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineDotProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineDot: React.FC<CoverLineDotProps> = ({ data, scale, progressBarConfig }) => {
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
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#fefcf3' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 大面积圆点散布 - 左上区域 */}
          <circle cx="120" cy="80" r="6" fill="#c4a35a" opacity="0.15" />
          <circle cx="200" cy="150" r="4" fill="#c4a35a" opacity="0.12" />
          <circle cx="300" cy="60" r="8" fill="#c4a35a" opacity="0.1" />
          <circle cx="180" cy="250" r="3" fill="#c4a35a" opacity="0.18" />
          <circle cx="350" cy="180" r="5" fill="#c4a35a" opacity="0.1" />
          <circle cx="80" cy="350" r="4" fill="#c4a35a" opacity="0.12" />
          <circle cx="400" cy="100" r="3" fill="#c4a35a" opacity="0.15" />
          <circle cx="260" cy="320" r="7" fill="#c4a35a" opacity="0.08" />
          {/* 右上区域 */}
          <circle cx="1500" cy="90" r="5" fill="#c4a35a" opacity="0.12" />
          <circle cx="1620" cy="180" r="7" fill="#c4a35a" opacity="0.1" />
          <circle cx="1750" cy="60" r="4" fill="#c4a35a" opacity="0.15" />
          <circle cx="1580" cy="280" r="3" fill="#c4a35a" opacity="0.18" />
          <circle cx="1700" cy="200" r="6" fill="#c4a35a" opacity="0.08" />
          <circle cx="1820" cy="300" r="5" fill="#c4a35a" opacity="0.12" />
          <circle cx="1440" cy="220" r="4" fill="#c4a35a" opacity="0.1" />
          {/* 左下区域 */}
          <circle cx="100" cy="750" r="5" fill="#c4a35a" opacity="0.12" />
          <circle cx="220" cy="850" r="7" fill="#c4a35a" opacity="0.1" />
          <circle cx="150" cy="950" r="4" fill="#c4a35a" opacity="0.15" />
          <circle cx="350" cy="800" r="3" fill="#c4a35a" opacity="0.18" />
          <circle cx="300" cy="920" r="6" fill="#c4a35a" opacity="0.08" />
          <circle cx="80" cy="880" r="5" fill="#c4a35a" opacity="0.12" />
          <circle cx="400" cy="950" r="4" fill="#c4a35a" opacity="0.1" />
          {/* 右下区域 */}
          <circle cx="1550" cy="780" r="6" fill="#c4a35a" opacity="0.12" />
          <circle cx="1680" cy="860" r="4" fill="#c4a35a" opacity="0.15" />
          <circle cx="1800" cy="750" r="5" fill="#c4a35a" opacity="0.1" />
          <circle cx="1600" cy="950" r="3" fill="#c4a35a" opacity="0.18" />
          <circle cx="1750" cy="900" r="7" fill="#c4a35a" opacity="0.08" />
          <circle cx="1850" cy="1000" r="4" fill="#c4a35a" opacity="0.12" />
          {/* 中间区域 - 标题周围稀疏 */}
          <circle cx="600" cy="400" r="3" fill="#c4a35a" opacity="0.1" />
          <circle cx="1320" cy="380" r="4" fill="#c4a35a" opacity="0.08" />
          <circle cx="550" cy="680" r="5" fill="#c4a35a" opacity="0.1" />
          <circle cx="1380" cy="700" r="3" fill="#c4a35a" opacity="0.12" />
          <circle cx="700" cy="300" r="4" fill="#c4a35a" opacity="0.08" />
          <circle cx="1200" cy="780" r="5" fill="#c4a35a" opacity="0.1" />
          {/* 顶部密集圆点带 */}
          <circle cx="500" cy="40" r="2" fill="#c4a35a" opacity="0.2" />
          <circle cx="540" cy="55" r="2.5" fill="#c4a35a" opacity="0.18" />
          <circle cx="580" cy="35" r="1.5" fill="#c4a35a" opacity="0.22" />
          <circle cx="620" cy="50" r="2" fill="#c4a35a" opacity="0.15" />
          <circle cx="660" cy="42" r="3" fill="#c4a35a" opacity="0.12" />
          <circle cx="700" cy="58" r="2" fill="#c4a35a" opacity="0.18" />
          <circle cx="740" cy="38" r="2.5" fill="#c4a35a" opacity="0.15" />
          <circle cx="780" cy="52" r="1.5" fill="#c4a35a" opacity="0.2" />
          <circle cx="820" cy="44" r="2" fill="#c4a35a" opacity="0.16" />
          <circle cx="860" cy="56" r="3" fill="#c4a35a" opacity="0.12" />
          <circle cx="900" cy="36" r="2" fill="#c4a35a" opacity="0.18" />
          <circle cx="940" cy="48" r="2.5" fill="#c4a35a" opacity="0.14" />
          <circle cx="980" cy="40" r="1.5" fill="#c4a35a" opacity="0.2" />
          <circle cx="1020" cy="55" r="2" fill="#c4a35a" opacity="0.16" />
          <circle cx="1060" cy="38" r="3" fill="#c4a35a" opacity="0.12" />
          <circle cx="1100" cy="50" r="2" fill="#c4a35a" opacity="0.18" />
          <circle cx="1140" cy="42" r="2.5" fill="#c4a35a" opacity="0.15" />
          <circle cx="1180" cy="56" r="1.5" fill="#c4a35a" opacity="0.2" />
          <circle cx="1220" cy="35" r="2" fill="#c4a35a" opacity="0.16" />
          <circle cx="1260" cy="48" r="3" fill="#c4a35a" opacity="0.12" />
          <circle cx="1300" cy="40" r="2" fill="#c4a35a" opacity="0.18" />
          <circle cx="1340" cy="52" r="2.5" fill="#c4a35a" opacity="0.14" />
          <circle cx="1380" cy="36" r="1.5" fill="#c4a35a" opacity="0.2" />
          {/* 底部密集圆点带 */}
          <circle cx="500" cy="1040" r="2" fill="#c4a35a" opacity="0.2" />
          <circle cx="540" cy="1025" r="2.5" fill="#c4a35a" opacity="0.18" />
          <circle cx="580" cy="1045" r="1.5" fill="#c4a35a" opacity="0.22" />
          <circle cx="620" cy="1030" r="2" fill="#c4a35a" opacity="0.15" />
          <circle cx="660" cy="1038" r="3" fill="#c4a35a" opacity="0.12" />
          <circle cx="700" cy="1022" r="2" fill="#c4a35a" opacity="0.18" />
          <circle cx="740" cy="1042" r="2.5" fill="#c4a35a" opacity="0.15" />
          <circle cx="780" cy="1028" r="1.5" fill="#c4a35a" opacity="0.2" />
          <circle cx="820" cy="1036" r="2" fill="#c4a35a" opacity="0.16" />
          <circle cx="860" cy="1024" r="3" fill="#c4a35a" opacity="0.12" />
          <circle cx="900" cy="1044" r="2" fill="#c4a35a" opacity="0.18" />
          <circle cx="940" cy="1032" r="2.5" fill="#c4a35a" opacity="0.14" />
          <circle cx="980" cy="1040" r="1.5" fill="#c4a35a" opacity="0.2" />
          <circle cx="1020" cy="1025" r="2" fill="#c4a35a" opacity="0.16" />
          <circle cx="1060" cy="1042" r="3" fill="#c4a35a" opacity="0.12" />
          <circle cx="1100" cy="1030" r="2" fill="#c4a35a" opacity="0.18" />
          <circle cx="1140" cy="1038" r="2.5" fill="#c4a35a" opacity="0.15" />
          <circle cx="1180" cy="1024" r="1.5" fill="#c4a35a" opacity="0.2" />
          <circle cx="1220" cy="1045" r="2" fill="#c4a35a" opacity="0.16" />
          <circle cx="1260" cy="1032" r="3" fill="#c4a35a" opacity="0.12" />
          <circle cx="1300" cy="1040" r="2" fill="#c4a35a" opacity="0.18" />
          <circle cx="1340" cy="1028" r="2.5" fill="#c4a35a" opacity="0.14" />
          <circle cx="1380" cy="1044" r="1.5" fill="#c4a35a" opacity="0.2" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <h1 ref={titleRef} style={{ fontSize: '70px', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.3, color: '#3d2e1a', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '25px', fontWeight: 300, color: '#8b7a55', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '800px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineDot: TemplateConfig = {
  id: 'coverLineDot',
  name: '圆点封面',
  description: '圆点封面，大量圆点散布画面，标题在圆点间隙中',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineDot, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineDot'),
};
