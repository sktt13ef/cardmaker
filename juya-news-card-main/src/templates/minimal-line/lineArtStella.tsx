import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtStellaProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtStella: React.FC<LineArtStellaProps> = ({ data, scale, progressBarConfig }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const N = data.cards.length;
  const isSingleCard = N === 1;
  const cols = isSingleCard ? 1 : (N <= 2 ? 2 : N <= 3 ? 3 : 4);
  const titleConfig = getStandardTitleConfig(N);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!wrapperRef.current || !titleRef.current) return;
    const wrapper = wrapperRef.current;
    const title = titleRef.current;
    const fitTitle = () => {
      let size = titleConfig.initialFontSize;
      title.style.fontSize = size + 'px';
      let guard = 0;
      while (title.scrollWidth > 1700 && size > titleConfig.minFontSize && guard < 100) { size -= 1; title.style.fontSize = size + 'px'; guard++; }
    };
    fitTitle();
    const fitViewport = () => {
      const maxH = 1040;
      if (wrapper.scrollHeight > maxH) { wrapper.style.transform = 'scale(' + Math.max(0.6, maxH / wrapper.scrollHeight) + ')'; }
      else { wrapper.style.transform = ''; }
    };
    const timer = window.setTimeout(fitViewport, 50);
    return () => window.clearTimeout(timer);
  }, [data, titleConfig]);

  const topConfig = progressBarConfig?.top;
  const bottomConfig = progressBarConfig?.bottom;

  const renderProgressBar = (position: 'top' | 'bottom') => {
    const config = position === 'top' ? topConfig : bottomConfig;
    if (!config?.show) return null;
    return (
      <div style={{ width: '100%', padding: '16px 48px', background: '#f2f0f4' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <polygon points="12,2 22,12 12,22 2,12" stroke={index <= config.activeIndex ? '#2a2a4a' : '#c8c8d8'} strokeWidth="1.5" fill="none" />
                <polygon points="12,6 18,12 12,18 6,12" stroke={index <= config.activeIndex ? '#2a2a4a' : '#c8c8d8'} strokeWidth="1" fill={index <= config.activeIndex ? '#2a2a4a' : 'transparent'} fillOpacity="0.15" />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 500, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const navy = '#2a2a4a';
  const steel = '#5a6a7a';
  const copper = '#8a5a3a';
  const silver = '#a0a8b0';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f2f0f4' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Stella full-screen concentric geometry, V-patterns, hard edge */}
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Concentric rectangles - top right */}
          <rect x="1560" y="20" width="340" height="240" stroke={navy} strokeWidth="2" fill="none" opacity="0.06" />
          <rect x="1600" y="50" width="260" height="180" stroke={steel} strokeWidth="1.5" fill="none" opacity="0.06" />
          <rect x="1640" y="80" width="180" height="120" stroke={copper} strokeWidth="1" fill="none" opacity="0.06" />
          <rect x="1680" y="110" width="100" height="60" stroke={navy} strokeWidth="0.8" fill="none" opacity="0.06" />
          {/* V-pattern - bottom left */}
          <polyline points="20,960 120,820 220,960" stroke={navy} strokeWidth="2" fill="none" opacity="0.06" />
          <polyline points="60,960 120,860 180,960" stroke={steel} strokeWidth="1.5" fill="none" opacity="0.05" />
          <polyline points="90,960 120,900 150,960" stroke={copper} strokeWidth="1" fill="none" opacity="0.05" />
          {/* Concentric diamonds - left area */}
          <polygon points="100,400 180,340 260,400 180,460" stroke={navy} strokeWidth="1.5" fill="none" opacity="0.05" />
          <polygon points="120,400 180,355 240,400 180,445" stroke={steel} strokeWidth="1" fill="none" opacity="0.04" />
          <polygon points="140,400 180,370 220,400 180,430" stroke={copper} strokeWidth="0.8" fill="none" opacity="0.04" />
          {/* V-pattern - right side */}
          <polyline points="1750,500 1820,400 1890,500" stroke={navy} strokeWidth="1.5" fill="none" opacity="0.05" />
          <polyline points="1770,500 1820,430 1870,500" stroke={steel} strokeWidth="1" fill="none" opacity="0.04" />
          {/* Hard edge lines */}
          <line x1="0" y1="540" x2="300" y2="540" stroke={navy} strokeWidth="1" opacity="0.04" />
          <line x1="1620" y1="540" x2="1920" y2="540" stroke={navy} strokeWidth="1" opacity="0.04" />
          {/* Concentric chevrons */}
          <polyline points="900,60 960,20 1020,60" stroke={navy} strokeWidth="1" fill="none" opacity="0.04" />
          <polyline points="920,60 960,30 1000,60" stroke={steel} strokeWidth="0.8" fill="none" opacity="0.03" />
        </svg>

        {/* Title with concentric diamond decoration */}
        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0 }}>
            <polygon points="28,2 54,28 28,54 2,28" stroke={navy} strokeWidth="2" fill="none" />
            <polygon points="28,12 44,28 28,44 12,28" stroke={steel} strokeWidth="1.5" fill="none" opacity="0.6" />
            <polygon points="28,20 36,28 28,36 20,28" stroke={copper} strokeWidth="1" fill={copper} fillOpacity="0.1" opacity="0.5" />
          </svg>
          <div>
            {/* V-shape decoration above title */}
            <svg width="160" height="12" viewBox="0 0 160 12" fill="none" style={{ marginBottom: 6 }}>
              <polyline points="0,2 80,10 160,2" stroke={navy} strokeWidth="1.5" fill="none" opacity="0.4" />
              <polyline points="20,4 80,9 140,4" stroke={steel} strokeWidth="1" fill="none" opacity="0.3" />
            </svg>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        {/* Cards with hard-edge geometric style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const colors = [navy, steel, copper, silver];
            const c = colors[i % 4];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 0, border: '2px solid ' + c, position: 'relative' }}>
                {/* Hard edge accent at top */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: c, opacity: 0.4 }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Diamond number indicator */}
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
                    <polygon points="18,2 34,18 18,34 2,18" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.06" />
                    <polygon points="18,8 28,18 18,28 8,18" stroke={c} strokeWidth="0.8" fill="none" opacity="0.3" />
                    <text x="18" y="22" textAnchor="middle" fontSize="11" fontWeight="600" fill={c}>{String(i + 1).padStart(2, '0')}</text>
                  </svg>
                  {/* Hard edge separator */}
                  <div style={{ flex: 1, height: '2px', background: c, opacity: 0.15 }} />
                </div>
                <h3 style={{ fontSize: isSingleCard ? '48px' : '34px', fontWeight: 400, color: '#111122', margin: 0, lineHeight: 1.4 }}>{card.title}</h3>
                <p style={{ fontSize: isSingleCard ? '32px' : '26px', color: '#444455', lineHeight: 1.8, margin: 0 }} dangerouslySetInnerHTML={{ __html: card.desc }} />
              </div>
            );
          })}
        </div>
      </div>
      {renderProgressBar('bottom')}
    </div>
  );
};

export const lineArtStella: TemplateConfig = {
  id: 'lineArtStella',
  name: '斯特拉几何',
  description: '同心几何V形图案，硬边风格',
  icon: 'hexagon',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtStella, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtStella'),
};
