import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineDiamondProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineDiamond: React.FC<CoverLineDiamondProps> = ({ data, scale, progressBarConfig }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitle = data.cards.length > 0 ? data.cards[0].desc : '';

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!titleRef.current) return;
    const title = titleRef.current;
    let size = 68;
    title.style.fontSize = size + 'px';
    let guard = 0;
    while (title.scrollWidth > 1200 && size > 32 && guard < 100) { size -= 1; title.style.fontSize = size + 'px'; guard++; }
  }, [data]);

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#fdf6f8' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 最外层大菱形 */}
          <polygon points="960,80 1780,540 960,1000 140,540" stroke="#8b4563" strokeWidth="1.2" fill="none" opacity="0.15" />
          {/* 第二层菱形 */}
          <polygon points="960,160 1680,540 960,920 240,540" stroke="#8b4563" strokeWidth="1" fill="none" opacity="0.2" />
          {/* 第三层菱形 */}
          <polygon points="960,240 1580,540 960,840 340,540" stroke="#8b4563" strokeWidth="0.8" fill="none" opacity="0.25" />
          {/* 第四层菱形 */}
          <polygon points="960,320 1480,540 960,760 440,540" stroke="#8b4563" strokeWidth="0.8" fill="none" opacity="0.3" />
          {/* 内层小菱形 */}
          <polygon points="960,400 1380,540 960,680 540,540" stroke="#8b4563" strokeWidth="0.6" fill="none" opacity="0.35" />
          {/* 最内层菱形 */}
          <polygon points="960,460 1280,540 960,620 640,540" stroke="#8b4563" strokeWidth="0.5" fill="none" opacity="0.4" />
          {/* 菱形对角线延伸 */}
          <line x1="960" y1="80" x2="960" y2="1000" stroke="#8b4563" strokeWidth="0.3" opacity="0.1" />
          <line x1="140" y1="540" x2="1780" y2="540" stroke="#8b4563" strokeWidth="0.3" opacity="0.1" />
          {/* 四角小菱形装饰 */}
          <polygon points="300,180 360,240 300,300 240,240" stroke="#8b4563" strokeWidth="0.5" fill="none" opacity="0.15" />
          <polygon points="1620,180 1680,240 1620,300 1560,240" stroke="#8b4563" strokeWidth="0.5" fill="none" opacity="0.15" />
          <polygon points="300,780 360,840 300,900 240,840" stroke="#8b4563" strokeWidth="0.5" fill="none" opacity="0.15" />
          <polygon points="1620,780 1680,840 1620,900 1560,840" stroke="#8b4563" strokeWidth="0.5" fill="none" opacity="0.15" />
          {/* 顶点小圆 */}
          <circle cx="960" cy="80" r="3" fill="#8b4563" opacity="0.3" />
          <circle cx="1780" cy="540" r="3" fill="#8b4563" opacity="0.3" />
          <circle cx="960" cy="1000" r="3" fill="#8b4563" opacity="0.3" />
          <circle cx="140" cy="540" r="3" fill="#8b4563" opacity="0.3" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <h1 ref={titleRef} style={{ fontSize: '68px', fontWeight: 300, letterSpacing: '0.02em', lineHeight: 1.3, color: '#3d1525', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '24px', fontWeight: 300, color: '#8b6070', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '700px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineDiamond: TemplateConfig = {
  id: 'coverLineDiamond',
  name: '菱形标题',
  description: '菱形标题，大菱形轮廓层层嵌套，标题居中在菱形内',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineDiamond, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineDiamond'),
};
