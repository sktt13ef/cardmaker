import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineFrameProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineFrame: React.FC<CoverLineFrameProps> = ({ data, scale, progressBarConfig }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitle = data.cards.length > 0 ? data.cards[0].desc : '';

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!titleRef.current) return;
    const title = titleRef.current;
    let size = 66;
    title.style.fontSize = size + 'px';
    let guard = 0;
    while (title.scrollWidth > 1300 && size > 32 && guard < 100) { size -= 1; title.style.fontSize = size + 'px'; guard++; }
  }, [data]);

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f8f4ee' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 外层画框 */}
          <rect x="80" y="60" width="1760" height="960" stroke="#8b7355" strokeWidth="2" fill="none" opacity="0.25" />
          {/* 内层画框 */}
          <rect x="120" y="100" width="1680" height="880" stroke="#8b7355" strokeWidth="1.5" fill="none" opacity="0.2" />
          {/* 最内层画框 */}
          <rect x="160" y="140" width="1600" height="800" stroke="#8b7355" strokeWidth="1" fill="none" opacity="0.15" />
          {/* 画框内衬 */}
          <rect x="200" y="180" width="1520" height="720" stroke="#8b7355" strokeWidth="0.5" fill="none" opacity="0.1" />
          {/* 左上角装饰 */}
          <path d="M80,60 L80,160 L120,160 L120,100 L180,100 L180,60 Z" stroke="#8b7355" strokeWidth="1" fill="none" opacity="0.2" />
          {/* 右上角装饰 */}
          <path d="M1840,60 L1840,160 L1800,160 L1800,100 L1740,100 L1740,60 Z" stroke="#8b7355" strokeWidth="1" fill="none" opacity="0.2" />
          {/* 左下角装饰 */}
          <path d="M80,1020 L80,920 L120,920 L120,980 L180,980 L180,1020 Z" stroke="#8b7355" strokeWidth="1" fill="none" opacity="0.2" />
          {/* 右下角装饰 */}
          <path d="M1840,1020 L1840,920 L1800,920 L1800,980 L1740,980 L1740,1020 Z" stroke="#8b7355" strokeWidth="1" fill="none" opacity="0.2" />
          {/* 上边中央装饰 */}
          <line x1="860" y1="60" x2="860" y2="100" stroke="#8b7355" strokeWidth="0.5" opacity="0.15" />
          <line x1="1060" y1="60" x2="1060" y2="100" stroke="#8b7355" strokeWidth="0.5" opacity="0.15" />
          <path d="M860,60 L960,90 L1060,60" stroke="#8b7355" strokeWidth="0.8" fill="none" opacity="0.2" />
          {/* 下边中央装饰 */}
          <line x1="860" y1="1020" x2="860" y2="980" stroke="#8b7355" strokeWidth="0.5" opacity="0.15" />
          <line x1="1060" y1="1020" x2="1060" y2="980" stroke="#8b7355" strokeWidth="0.5" opacity="0.15" />
          <path d="M860,1020 L960,990 L1060,1020" stroke="#8b7355" strokeWidth="0.8" fill="none" opacity="0.2" />
          {/* 左边中央装饰 */}
          <circle cx="80" cy="540" r="4" stroke="#8b7355" strokeWidth="0.5" fill="none" opacity="0.2" />
          <circle cx="80" cy="540" r="8" stroke="#8b7355" strokeWidth="0.3" fill="none" opacity="0.12" />
          {/* 右边中央装饰 */}
          <circle cx="1840" cy="540" r="4" stroke="#8b7355" strokeWidth="0.5" fill="none" opacity="0.2" />
          <circle cx="1840" cy="540" r="8" stroke="#8b7355" strokeWidth="0.3" fill="none" opacity="0.12" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <h1 ref={titleRef} style={{ fontSize: '66px', fontWeight: 300, letterSpacing: '0.02em', lineHeight: 1.3, color: '#3d2e1e', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '24px', fontWeight: 300, color: '#8b7355', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '700px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineFrame: TemplateConfig = {
  id: 'coverLineFrame',
  name: '画框封面',
  description: '画框封面，精致画框边框层层嵌套，标题在框内居中',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineFrame, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineFrame'),
};
