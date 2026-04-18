import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineMinimalProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineMinimal: React.FC<CoverLineMinimalProps> = ({ data, scale, progressBarConfig }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitle = data.cards.length > 0 ? data.cards[0].desc : '';

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!titleRef.current) return;
    const title = titleRef.current;
    let size = 72;
    title.style.fontSize = size + 'px';
    let guard = 0;
    while (title.scrollWidth > 1600 && size > 36 && guard < 100) { size -= 1; title.style.fontSize = size + 'px'; guard++; }
  }, [data]);

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#ffffff' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 主水平细线 - 贯穿画面 */}
          <line x1="160" y1="480" x2="1760" y2="480" stroke="#222222" strokeWidth="0.8" opacity="0.35" />
          {/* 左侧短装饰线 */}
          <line x1="160" y1="460" x2="320" y2="460" stroke="#222222" strokeWidth="0.5" opacity="0.2" />
          {/* 右侧短装饰线 */}
          <line x1="1600" y1="460" x2="1760" y2="460" stroke="#222222" strokeWidth="0.5" opacity="0.2" />
          {/* 极细辅助线 */}
          <line x1="400" y1="500" x2="1520" y2="500" stroke="#222222" strokeWidth="0.3" opacity="0.12" />
          {/* 左端小圆点 */}
          <circle cx="160" cy="480" r="2.5" fill="#222222" opacity="0.25" />
          {/* 右端小圆点 */}
          <circle cx="1760" cy="480" r="2.5" fill="#222222" opacity="0.25" />
          {/* 中心小菱形标记 */}
          <polygon points="960,472 968,480 960,488 952,480" stroke="#222222" strokeWidth="0.5" fill="none" opacity="0.2" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, marginTop: 40 }}>
          <h1 ref={titleRef} style={{ fontSize: '72px', fontWeight: 200, letterSpacing: '-0.02em', lineHeight: 1.3, color: '#111122', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '26px', fontWeight: 300, color: '#666677', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '800px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineMinimal: TemplateConfig = {
  id: 'coverLineMinimal',
  name: '极简细线',
  description: '极简细线，一条水平细线贯穿画面，标题在线下方居中',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineMinimal, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineMinimal'),
};
