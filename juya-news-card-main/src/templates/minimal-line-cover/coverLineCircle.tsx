import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineCircleProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineCircle: React.FC<CoverLineCircleProps> = ({ data, scale, progressBarConfig }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitle = data.cards.length > 0 ? data.cards[0].desc : '';

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!titleRef.current) return;
    const title = titleRef.current;
    let size = 66;
    title.style.fontSize = size + 'px';
    let guard = 0;
    while (title.scrollWidth > 1100 && size > 30 && guard < 100) { size -= 1; title.style.fontSize = size + 'px'; guard++; }
  }, [data]);

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f2f2f5' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 最外层大圆 */}
          <circle cx="960" cy="540" r="480" stroke="#444466" strokeWidth="0.6" fill="none" opacity="0.1" />
          {/* 同心圆 - 第二层 */}
          <circle cx="960" cy="540" r="420" stroke="#444466" strokeWidth="0.6" fill="none" opacity="0.13" />
          {/* 同心圆 - 第三层 */}
          <circle cx="960" cy="540" r="360" stroke="#444466" strokeWidth="0.7" fill="none" opacity="0.16" />
          {/* 同心圆 - 第四层 */}
          <circle cx="960" cy="540" r="300" stroke="#444466" strokeWidth="0.7" fill="none" opacity="0.2" />
          {/* 同心圆 - 第五层 - 主圆环 */}
          <circle cx="960" cy="540" r="240" stroke="#444466" strokeWidth="1.2" fill="none" opacity="0.3" />
          {/* 同心圆 - 第六层 */}
          <circle cx="960" cy="540" r="180" stroke="#444466" strokeWidth="0.8" fill="none" opacity="0.22" />
          {/* 同心圆 - 第七层 */}
          <circle cx="960" cy="540" r="120" stroke="#444466" strokeWidth="0.6" fill="none" opacity="0.15" />
          {/* 同心圆 - 最内层 */}
          <circle cx="960" cy="540" r="60" stroke="#444466" strokeWidth="0.5" fill="none" opacity="0.1" />
          {/* 水平切线 */}
          <line x1="480" y1="540" x2="1440" y2="540" stroke="#444466" strokeWidth="0.3" opacity="0.08" />
          {/* 垂直切线 */}
          <line x1="960" y1="60" x2="960" y2="1020" stroke="#444466" strokeWidth="0.3" opacity="0.08" />
          {/* 对角线 */}
          <line x1="620" y1="200" x2="1300" y2="880" stroke="#444466" strokeWidth="0.2" opacity="0.06" />
          <line x1="1300" y1="200" x2="620" y2="880" stroke="#444466" strokeWidth="0.2" opacity="0.06" />
          {/* 左上角小圆装饰 */}
          <circle cx="200" cy="180" r="40" stroke="#444466" strokeWidth="0.4" fill="none" opacity="0.1" />
          <circle cx="200" cy="180" r="25" stroke="#444466" strokeWidth="0.3" fill="none" opacity="0.08" />
          {/* 右下角小圆装饰 */}
          <circle cx="1720" cy="900" r="40" stroke="#444466" strokeWidth="0.4" fill="none" opacity="0.1" />
          <circle cx="1720" cy="900" r="25" stroke="#444466" strokeWidth="0.3" fill="none" opacity="0.08" />
          {/* 右上角小圆装饰 */}
          <circle cx="1700" cy="160" r="30" stroke="#444466" strokeWidth="0.3" fill="none" opacity="0.08" />
          {/* 左下角小圆装饰 */}
          <circle cx="220" cy="920" r="30" stroke="#444466" strokeWidth="0.3" fill="none" opacity="0.08" />
          {/* 主圆环上的刻度点 */}
          <circle cx="960" cy="300" r="2.5" fill="#444466" opacity="0.25" />
          <circle cx="960" cy="780" r="2.5" fill="#444466" opacity="0.25" />
          <circle cx="720" cy="540" r="2.5" fill="#444466" opacity="0.25" />
          <circle cx="1200" cy="540" r="2.5" fill="#444466" opacity="0.25" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
          <h1 ref={titleRef} style={{ fontSize: '66px', fontWeight: 300, letterSpacing: '0.02em', lineHeight: 1.3, color: '#222233', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '24px', fontWeight: 300, color: '#666688', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '650px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineCircle: TemplateConfig = {
  id: 'coverLineCircle',
  name: '圆环标题',
  description: '圆环标题，大圆环包围标题，同心圆层层装饰',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineCircle, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineCircle'),
};
