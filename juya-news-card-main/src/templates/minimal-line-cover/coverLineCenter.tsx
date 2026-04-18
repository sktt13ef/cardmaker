import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineCenterProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineCenter: React.FC<CoverLineCenterProps> = ({ data, scale, progressBarConfig }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitle = data.cards.length > 0 ? data.cards[0].desc : '';

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!titleRef.current) return;
    const title = titleRef.current;
    let size = 68;
    title.style.fontSize = size + 'px';
    let guard = 0;
    while (title.scrollWidth > 1300 && size > 32 && guard < 100) { size -= 1; title.style.fontSize = size + 'px'; guard++; }
  }, [data]);

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f0ecf5' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 中心对称图案 - 六边形 */}
          <polygon points="960,340 1140,440 1140,640 960,740 780,640 780,440" stroke="#5a4a8a" strokeWidth="1.2" fill="none" opacity="0.2" />
          {/* 外层六边形 */}
          <polygon points="960,240 1240,390 1240,690 960,840 680,690 680,390" stroke="#5a4a8a" strokeWidth="0.8" fill="none" opacity="0.15" />
          {/* 最外层六边形 */}
          <polygon points="960,140 1340,340 1340,740 960,940 580,740 580,340" stroke="#5a4a8a" strokeWidth="0.5" fill="none" opacity="0.1" />
          {/* 内层六边形 */}
          <polygon points="960,440 1060,490 1060,590 960,640 860,590 860,490" stroke="#5a4a8a" strokeWidth="0.8" fill="none" opacity="0.25" />
          {/* 六边形对角线 */}
          <line x1="960" y1="340" x2="960" y2="740" stroke="#5a4a8a" strokeWidth="0.3" opacity="0.1" />
          <line x1="780" y1="440" x2="1140" y2="640" stroke="#5a4a8a" strokeWidth="0.3" opacity="0.1" />
          <line x1="1140" y1="440" x2="780" y2="640" stroke="#5a4a8a" strokeWidth="0.3" opacity="0.1" />
          {/* 中心点 */}
          <circle cx="960" cy="540" r="3" fill="#5a4a8a" opacity="0.3" />
          {/* 对称装饰 - 上下 */}
          <line x1="960" y1="100" x2="960" y2="140" stroke="#5a4a8a" strokeWidth="0.5" opacity="0.15" />
          <line x1="960" y1="940" x2="960" y2="980" stroke="#5a4a8a" strokeWidth="0.5" opacity="0.15" />
          {/* 对称装饰 - 左右 */}
          <line x1="480" y1="540" x2="580" y2="540" stroke="#5a4a8a" strokeWidth="0.5" opacity="0.15" />
          <line x1="1340" y1="540" x2="1440" y2="540" stroke="#5a4a8a" strokeWidth="0.5" opacity="0.15" />
          {/* 对称小菱形 */}
          <polygon points="960,100 970,110 960,120 950,110" stroke="#5a4a8a" strokeWidth="0.5" fill="none" opacity="0.2" />
          <polygon points="960,960 970,970 960,980 950,970" stroke="#5a4a8a" strokeWidth="0.5" fill="none" opacity="0.2" />
          <polygon points="460,540 470,550 460,560 450,550" stroke="#5a4a8a" strokeWidth="0.5" fill="none" opacity="0.2" />
          <polygon points="1460,540 1470,550 1460,560 1450,550" stroke="#5a4a8a" strokeWidth="0.5" fill="none" opacity="0.2" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
          <h1 ref={titleRef} style={{ fontSize: '68px', fontWeight: 300, letterSpacing: '0.02em', lineHeight: 1.3, color: '#2a1a4a', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '24px', fontWeight: 300, color: '#7a6a9a', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '650px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineCenter: TemplateConfig = {
  id: 'coverLineCenter',
  name: '中心封面',
  description: '中心封面，中心对称六边形图案，标题在正中心',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineCenter, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineCenter'),
};
