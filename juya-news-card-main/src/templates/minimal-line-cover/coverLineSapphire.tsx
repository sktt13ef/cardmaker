import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineSapphireProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineSapphire: React.FC<CoverLineSapphireProps> = ({ data, scale, progressBarConfig }) => {
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
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#0a1a3a' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 蓝宝石切割面 - 中心大宝石 */}
          <polygon points="960,180 1200,340 1200,620 960,780 720,620 720,340" stroke="#4a8abf" strokeWidth="1.5" fill="none" opacity="0.2" />
          {/* 内部切割面 */}
          <line x1="960" y1="180" x2="960" y2="780" stroke="#4a8abf" strokeWidth="0.5" opacity="0.12" />
          <line x1="720" y1="340" x2="1200" y2="620" stroke="#4a8abf" strokeWidth="0.5" opacity="0.12" />
          <line x1="1200" y1="340" x2="720" y2="620" stroke="#4a8abf" strokeWidth="0.5" opacity="0.12" />
          {/* 水平切割线 */}
          <line x1="720" y1="400" x2="1200" y2="400" stroke="#4a8abf" strokeWidth="0.3" opacity="0.08" />
          <line x1="720" y1="480" x2="1200" y2="480" stroke="#4a8abf" strokeWidth="0.3" opacity="0.08" />
          <line x1="720" y1="560" x2="1200" y2="560" stroke="#4a8abf" strokeWidth="0.3" opacity="0.08" />
          {/* 外层切割面 */}
          <polygon points="960,120 1260,310 1260,650 960,840 660,650 660,310" stroke="#4a8abf" strokeWidth="0.8" fill="none" opacity="0.12" />
          {/* 最外层 */}
          <polygon points="960,60 1320,280 1320,680 960,900 600,680 600,280" stroke="#4a8abf" strokeWidth="0.5" fill="none" opacity="0.08" />
          {/* 切割面填充 - 淡蓝色 */}
          <polygon points="960,180 1200,340 960,400" fill="#4a8abf" opacity="0.02" />
          <polygon points="960,180 720,340 960,400" fill="#4a8abf" opacity="0.03" />
          <polygon points="960,780 1200,620 960,560" fill="#4a8abf" opacity="0.03" />
          <polygon points="960,780 720,620 960,560" fill="#4a8abf" opacity="0.02" />
          {/* 闪光效果 */}
          <line x1="960" y1="180" x2="980" y2="200" stroke="#8ac0e8" strokeWidth="0.5" opacity="0.2" />
          <line x1="960" y1="180" x2="940" y2="200" stroke="#8ac0e8" strokeWidth="0.5" opacity="0.15" />
          {/* 小宝石 - 左上 */}
          <polygon points="300,200 380,250 380,330 300,380 220,330 220,250" stroke="#4a8abf" strokeWidth="0.8" fill="none" opacity="0.1" />
          <line x1="300" y1="200" x2="300" y2="380" stroke="#4a8abf" strokeWidth="0.3" opacity="0.06" />
          <line x1="220" y1="250" x2="380" y2="330" stroke="#4a8abf" strokeWidth="0.3" opacity="0.06" />
          <line x1="380" y1="250" x2="220" y2="330" stroke="#4a8abf" strokeWidth="0.3" opacity="0.06" />
          {/* 小宝石 - 右下 */}
          <polygon points="1620,700 1700,750 1700,830 1620,880 1540,830 1540,750" stroke="#4a8abf" strokeWidth="0.8" fill="none" opacity="0.1" />
          <line x1="1620" y1="700" x2="1620" y2="880" stroke="#4a8abf" strokeWidth="0.3" opacity="0.06" />
          <line x1="1540" y1="750" x2="1700" y2="830" stroke="#4a8abf" strokeWidth="0.3" opacity="0.06" />
          <line x1="1700" y1="750" x2="1540" y2="830" stroke="#4a8abf" strokeWidth="0.3" opacity="0.06" />
          {/* 光芒线条 */}
          <line x1="960" y1="60" x2="960" y2="30" stroke="#8ac0e8" strokeWidth="0.3" opacity="0.1" />
          <line x1="960" y1="900" x2="960" y2="930" stroke="#8ac0e8" strokeWidth="0.3" opacity="0.1" />
          <line x1="600" y1="480" x2="560" y2="480" stroke="#8ac0e8" strokeWidth="0.3" opacity="0.1" />
          <line x1="1320" y1="480" x2="1360" y2="480" stroke="#8ac0e8" strokeWidth="0.3" opacity="0.1" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <h1 ref={titleRef} style={{ fontSize: '68px', fontWeight: 300, letterSpacing: '0.03em', lineHeight: 1.3, color: '#c0d8f0', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '24px', fontWeight: 300, color: '#6a8ab0', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '750px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineSapphire: TemplateConfig = {
  id: 'coverLineSapphire',
  name: '蓝宝石封面',
  description: '蓝宝石封面，切割面线条与深蓝底色，标题居中',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineSapphire, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineSapphire'),
};
