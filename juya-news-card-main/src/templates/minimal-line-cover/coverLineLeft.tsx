import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineLeftProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineLeft: React.FC<CoverLineLeftProps> = ({ data, scale, progressBarConfig }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitle = data.cards.length > 0 ? data.cards[0].desc : '';

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!titleRef.current) return;
    const title = titleRef.current;
    let size = 70;
    title.style.fontSize = size + 'px';
    let guard = 0;
    while (title.scrollWidth > 1200 && size > 34 && guard < 100) { size -= 1; title.style.fontSize = size + 'px'; guard++; }
  }, [data]);

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f0f5f0' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', paddingLeft: 200 }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 左侧粗竖线 */}
          <line x1="120" y1="80" x2="120" y2="1000" stroke="#2d6b4a" strokeWidth="3" opacity="0.2" />
          {/* 左侧细竖线 */}
          <line x1="150" y1="120" x2="150" y2="960" stroke="#2d6b4a" strokeWidth="1" opacity="0.15" />
          {/* 左侧更细竖线 */}
          <line x1="170" y1="160" x2="170" y2="920" stroke="#2d6b4a" strokeWidth="0.5" opacity="0.1" />
          {/* 水平短线装饰 */}
          <line x1="120" y1="200" x2="200" y2="200" stroke="#2d6b4a" strokeWidth="0.8" opacity="0.15" />
          <line x1="120" y1="350" x2="180" y2="350" stroke="#2d6b4a" strokeWidth="0.5" opacity="0.12" />
          <line x1="120" y1="540" x2="220" y2="540" stroke="#2d6b4a" strokeWidth="1" opacity="0.18" />
          <line x1="120" y1="730" x2="180" y2="730" stroke="#2d6b4a" strokeWidth="0.5" opacity="0.12" />
          <line x1="120" y1="880" x2="200" y2="880" stroke="#2d6b4a" strokeWidth="0.8" opacity="0.15" />
          {/* 小圆点装饰 */}
          <circle cx="120" cy="200" r="2.5" fill="#2d6b4a" opacity="0.25" />
          <circle cx="120" cy="540" r="3" fill="#2d6b4a" opacity="0.3" />
          <circle cx="120" cy="880" r="2.5" fill="#2d6b4a" opacity="0.25" />
          {/* 右侧淡装饰 */}
          <line x1="1800" y1="80" x2="1800" y2="1000" stroke="#2d6b4a" strokeWidth="0.3" opacity="0.05" />
          <line x1="1820" y1="200" x2="1820" y2="880" stroke="#2d6b4a" strokeWidth="0.2" opacity="0.04" />
          {/* 底部装饰线 */}
          <line x1="120" y1="1000" x2="1800" y2="1000" stroke="#2d6b4a" strokeWidth="0.3" opacity="0.06" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24, maxWidth: '1200px' }}>
          <h1 ref={titleRef} style={{ fontSize: '70px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.3, color: '#1a3d2a', margin: 0, textAlign: 'left' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '24px', fontWeight: 300, color: '#5a8b6a', lineHeight: 1.6, margin: 0, textAlign: 'left', maxWidth: '700px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineLeft: TemplateConfig = {
  id: 'coverLineLeft',
  name: '左对齐封面',
  description: '左对齐封面，左侧装饰竖线+左对齐标题',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineLeft, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineLeft'),
};
