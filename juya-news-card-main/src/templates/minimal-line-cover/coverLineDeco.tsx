import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineDecoProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineDeco: React.FC<CoverLineDecoProps> = ({ data, scale, progressBarConfig }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitle = data.cards.length > 0 ? data.cards[0].desc : '';

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!titleRef.current) return;
    const title = titleRef.current;
    let size = 66;
    title.style.fontSize = size + 'px';
    let guard = 0;
    while (title.scrollWidth > 1300 && size > 30 && guard < 100) { size -= 1; title.style.fontSize = size + 'px'; guard++; }
  }, [data]);

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#0d1b2a' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Art Deco 扇形 - 上方大扇 */}
          <path d="M960,540 L660,140 A400,400 0 0,1 1260,140 Z" stroke="#c9a84c" strokeWidth="1.5" fill="none" opacity="0.15" />
          <path d="M960,540 L700,180 A360,360 0 0,1 1220,180 Z" stroke="#c9a84c" strokeWidth="1" fill="none" opacity="0.12" />
          <path d="M960,540 L740,220 A320,320 0 0,1 1180,220 Z" stroke="#c9a84c" strokeWidth="0.8" fill="none" opacity="0.1" />
          {/* 扇形内射线 */}
          <line x1="960" y1="540" x2="680" y2="160" stroke="#c9a84c" strokeWidth="0.3" opacity="0.08" />
          <line x1="960" y1="540" x2="760" y2="160" stroke="#c9a84c" strokeWidth="0.3" opacity="0.08" />
          <line x1="960" y1="540" x2="840" y2="150" stroke="#c9a84c" strokeWidth="0.3" opacity="0.08" />
          <line x1="960" y1="540" x2="960" y2="140" stroke="#c9a84c" strokeWidth="0.3" opacity="0.08" />
          <line x1="960" y1="540" x2="1080" y2="150" stroke="#c9a84c" strokeWidth="0.3" opacity="0.08" />
          <line x1="960" y1="540" x2="1160" y2="160" stroke="#c9a84c" strokeWidth="0.3" opacity="0.08" />
          <line x1="960" y1="540" x2="1240" y2="160" stroke="#c9a84c" strokeWidth="0.3" opacity="0.08" />
          {/* Art Deco 扇形 - 下方 */}
          <path d="M960,540 L660,940 A400,400 0 0,0 1260,940 Z" stroke="#c9a84c" strokeWidth="1.5" fill="none" opacity="0.15" />
          <path d="M960,540 L700,900 A360,360 0 0,0 1220,900 Z" stroke="#c9a84c" strokeWidth="1" fill="none" opacity="0.12" />
          {/* 金色直线装饰 */}
          <line x1="100" y1="540" x2="660" y2="540" stroke="#c9a84c" strokeWidth="0.5" opacity="0.1" />
          <line x1="1260" y1="540" x2="1820" y2="540" stroke="#c9a84c" strokeWidth="0.5" opacity="0.1" />
          {/* 左侧金色竖线 */}
          <line x1="100" y1="200" x2="100" y2="880" stroke="#c9a84c" strokeWidth="1" opacity="0.12" />
          <line x1="120" y1="220" x2="120" y2="860" stroke="#c9a84c" strokeWidth="0.5" opacity="0.08" />
          {/* 右侧金色竖线 */}
          <line x1="1820" y1="200" x2="1820" y2="880" stroke="#c9a84c" strokeWidth="1" opacity="0.12" />
          <line x1="1800" y1="220" x2="1800" y2="860" stroke="#c9a84c" strokeWidth="0.5" opacity="0.08" />
          {/* 菱形装饰 */}
          <polygon points="100,540 140,500 180,540 140,580" stroke="#c9a84c" strokeWidth="0.8" fill="none" opacity="0.15" />
          <polygon points="1820,540 1780,500 1740,540 1780,580" stroke="#c9a84c" strokeWidth="0.8" fill="none" opacity="0.15" />
          {/* 顶部金色横线 */}
          <line x1="100" y1="200" x2="1820" y2="200" stroke="#c9a84c" strokeWidth="0.5" opacity="0.08" />
          {/* 底部金色横线 */}
          <line x1="100" y1="880" x2="1820" y2="880" stroke="#c9a84c" strokeWidth="0.5" opacity="0.08" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
          <h1 ref={titleRef} style={{ fontSize: '66px', fontWeight: 300, letterSpacing: '0.08em', lineHeight: 1.3, color: '#e8d8a8', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '24px', fontWeight: 300, color: '#8a7a5a', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '650px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineDeco: TemplateConfig = {
  id: 'coverLineDeco',
  name: '装饰艺术封面',
  description: '装饰艺术封面，扇形与金色线条，Art Deco风格',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineDeco, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineDeco'),
};
