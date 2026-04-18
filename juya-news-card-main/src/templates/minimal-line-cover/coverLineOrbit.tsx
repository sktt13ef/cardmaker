import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineOrbitProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineOrbit: React.FC<CoverLineOrbitProps> = ({ data, scale, progressBarConfig }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitle = data.cards.length > 0 ? data.cards[0].desc : '';

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!titleRef.current) return;
    const title = titleRef.current;
    let size = 66;
    title.style.fontSize = size + 'px';
    let guard = 0;
    while (title.scrollWidth > 1200 && size > 30 && guard < 100) { size -= 1; title.style.fontSize = size + 'px'; guard++; }
  }, [data]);

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#0a1628' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 最外层椭圆轨道 */}
          <ellipse cx="960" cy="540" rx="880" ry="440" stroke="#4a7ab5" strokeWidth="0.6" fill="none" opacity="0.12" />
          {/* 第二层椭圆轨道 - 倾斜 */}
          <ellipse cx="960" cy="540" rx="780" ry="380" stroke="#4a7ab5" strokeWidth="0.8" fill="none" opacity="0.15" transform="rotate(-15 960 540)" />
          {/* 第三层椭圆轨道 */}
          <ellipse cx="960" cy="540" rx="680" ry="320" stroke="#4a7ab5" strokeWidth="1" fill="none" opacity="0.18" transform="rotate(10 960 540)" />
          {/* 第四层椭圆轨道 - 倾斜 */}
          <ellipse cx="960" cy="540" rx="560" ry="260" stroke="#4a7ab5" strokeWidth="1.2" fill="none" opacity="0.22" transform="rotate(-25 960 540)" />
          {/* 第五层椭圆轨道 */}
          <ellipse cx="960" cy="540" rx="440" ry="200" stroke="#4a7ab5" strokeWidth="1" fill="none" opacity="0.25" transform="rotate(20 960 540)" />
          {/* 第六层椭圆轨道 */}
          <ellipse cx="960" cy="540" rx="320" ry="150" stroke="#4a7ab5" strokeWidth="0.8" fill="none" opacity="0.2" transform="rotate(-10 960 540)" />
          {/* 最内层椭圆轨道 */}
          <ellipse cx="960" cy="540" rx="200" ry="100" stroke="#4a7ab5" strokeWidth="0.6" fill="none" opacity="0.15" transform="rotate(30 960 540)" />
          {/* 中心恒星 */}
          <circle cx="960" cy="540" r="8" fill="#7ab5e0" opacity="0.4" />
          <circle cx="960" cy="540" r="4" fill="#a0d0f0" opacity="0.6" />
          <circle cx="960" cy="540" r="16" stroke="#7ab5e0" strokeWidth="0.5" fill="none" opacity="0.2" />
          {/* 轨道上的行星 */}
          <circle cx="960" cy="100" r="5" fill="#7ab5e0" opacity="0.35" />
          <circle cx="1740" cy="540" r="4" fill="#7ab5e0" opacity="0.3" />
          <circle cx="400" cy="300" r="3.5" fill="#7ab5e0" opacity="0.25" />
          <circle cx="1500" cy="700" r="4.5" fill="#7ab5e0" opacity="0.3" />
          <circle cx="600" cy="750" r="3" fill="#7ab5e0" opacity="0.2" />
          {/* 星星散布 */}
          <circle cx="150" cy="120" r="1.5" fill="#7ab5e0" opacity="0.3" />
          <circle cx="1780" cy="200" r="1" fill="#7ab5e0" opacity="0.25" />
          <circle cx="300" cy="900" r="1.5" fill="#7ab5e0" opacity="0.2" />
          <circle cx="1650" cy="950" r="1" fill="#7ab5e0" opacity="0.25" />
          <circle cx="100" cy="600" r="1" fill="#7ab5e0" opacity="0.2" />
          <circle cx="1820" cy="400" r="1.5" fill="#7ab5e0" opacity="0.15" />
          <circle cx="500" cy="80" r="1" fill="#7ab5e0" opacity="0.2" />
          <circle cx="1400" cy="1000" r="1.5" fill="#7ab5e0" opacity="0.15" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
          <h1 ref={titleRef} style={{ fontSize: '66px', fontWeight: 300, letterSpacing: '0.02em', lineHeight: 1.3, color: '#e0eef8', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '24px', fontWeight: 300, color: '#7a9ab8', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '650px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineOrbit: TemplateConfig = {
  id: 'coverLineOrbit',
  name: '轨道封面',
  description: '轨道封面，椭圆轨道环绕中心，标题在轨道中心',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineOrbit, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineOrbit'),
};
