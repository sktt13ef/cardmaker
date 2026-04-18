import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtKleeProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtKlee: React.FC<LineArtKleeProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f5f6f0' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <polygon points="12,2 22,20 2,20" stroke={index <= config.activeIndex ? '#8b6914' : '#d8d0b8'} strokeWidth="1.5" fill={index <= config.activeIndex ? '#c4a035' : 'transparent'} fillOpacity="0.3" />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 500, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ochre = '#8b6914';
  const gold = '#c4a035';
  const teal = '#2a7a6e';
  const rust = '#a0522d';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f5f6f0' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Klee full-screen triangle array, arrows, geometric color blocks */}
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Large triangle - top right */}
          <polygon points="1700,40 1840,240 1560,240" stroke={ochre} strokeWidth="2" fill={gold} fillOpacity="0.04" opacity="0.12" />
          <polygon points="1700,80 1810,220 1590,220" stroke={teal} strokeWidth="1" fill="none" opacity="0.08" />
          {/* Arrow pointing right - top area */}
          <line x1="200" y1="60" x2="350" y2="60" stroke={rust} strokeWidth="1.5" opacity="0.08" />
          <polygon points="350,50 370,60 350,70" stroke={rust} strokeWidth="1" fill={rust} fillOpacity="0.06" opacity="0.1" />
          {/* Triangle grid - bottom left */}
          <polygon points="60,860 120,780 180,860" stroke={teal} strokeWidth="1.5" fill={teal} fillOpacity="0.04" opacity="0.1" />
          <polygon points="120,860 180,780 240,860" stroke={gold} strokeWidth="1" fill={gold} fillOpacity="0.03" opacity="0.08" />
          <polygon points="90,920 150,840 210,920" stroke={ochre} strokeWidth="1" fill="none" opacity="0.06" />
          {/* Scattered triangles across background */}
          <polygon points="800,80 830,30 860,80" stroke={gold} strokeWidth="0.8" fill={gold} fillOpacity="0.04" opacity="0.08" />
          <polygon points="1200,150 1230,100 1260,150" stroke={teal} strokeWidth="0.8" fill="none" opacity="0.06" />
          <polygon points="500,800 540,740 580,800" stroke={rust} strokeWidth="1" fill={rust} fillOpacity="0.03" opacity="0.08" />
          <polygon points="1400,850 1440,790 1480,850" stroke={ochre} strokeWidth="0.8" fill="none" opacity="0.06" />
          {/* Arrow pointing down - right side */}
          <line x1="1850" y1="500" x2="1850" y2="650" stroke={teal} strokeWidth="1" opacity="0.06" />
          <polygon points="1840,650 1850,670 1860,650" stroke={teal} strokeWidth="0.8" fill={teal} fillOpacity="0.04" opacity="0.08" />
          {/* Geometric color blocks */}
          <rect x="1600" y="600" width="60" height="60" stroke={gold} strokeWidth="1" fill={gold} fillOpacity="0.04" opacity="0.08" transform="rotate(15 1630 630)" />
          <rect x="100" y="400" width="40" height="40" stroke={rust} strokeWidth="0.8" fill={rust} fillOpacity="0.03" opacity="0.06" transform="rotate(30 120 420)" />
          {/* Small arrow cluster */}
          <line x1="1600" y1="400" x2="1650" y2="380" stroke={ochre} strokeWidth="0.8" opacity="0.06" />
          <polygon points="1650,375 1660,380 1650,385" fill={ochre} opacity="0.06" />
          <line x1="1610" y1="420" x2="1660" y2="400" stroke={gold} strokeWidth="0.8" opacity="0.05" />
          <polygon points="1660,395 1670,400 1660,405" fill={gold} opacity="0.05" />
        </svg>

        {/* Title with triangle decoration */}
        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0 }}>
            <polygon points="28,4 52,48 4,48" stroke={ochre} strokeWidth="2" fill={gold} fillOpacity="0.15" />
            <polygon points="28,16 42,40 14,40" stroke={teal} strokeWidth="1" fill="none" opacity="0.5" />
            <polygon points="28,26 34,38 22,38" stroke={rust} strokeWidth="0.8" fill={rust} fillOpacity="0.1" opacity="0.4" />
          </svg>
          <div>
            {/* Arrow decoration above title */}
            <svg width="160" height="10" viewBox="0 0 160 10" fill="none" style={{ marginBottom: 6 }}>
              <line x1="0" y1="5" x2="140" y2="5" stroke={ochre} strokeWidth="1.5" opacity="0.4" />
              <polygon points="140,1 150,5 140,9" fill={ochre} opacity="0.4" />
            </svg>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        {/* Cards with triangle number indicators */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const colors = [ochre, teal, gold, rust];
            const c = colors[i % 4];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 6, boxShadow: '0 1px 6px rgba(139,105,20,0.05)', border: '1.5px solid rgba(139,105,20,0.1)', position: 'relative' }}>
                {/* Small triangle decoration in card */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ position: 'absolute', top: 8, right: 8, opacity: 0.12 }}>
                  <polygon points="10,2 18,16 2,16" stroke={c} strokeWidth="0.8" fill={c} fillOpacity="0.2" />
                </svg>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Triangle number indicator */}
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" style={{ flexShrink: 0 }}>
                    <polygon points="19,3 35,33 3,33" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.08" />
                    <text x="19" y="27" textAnchor="middle" fontSize="12" fontWeight="600" fill={c}>{String(i + 1).padStart(2, '0')}</text>
                  </svg>
                  {/* Arrow-style separator */}
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ flex: 1, height: '1.5px', background: c, opacity: 0.15 }} />
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <polygon points="0,1 8,4 0,7" fill={c} opacity="0.2" />
                    </svg>
                  </div>
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

export const lineArtKlee: TemplateConfig = {
  id: 'lineArtKlee',
  name: '克利三角',
  description: '三角形阵列与箭头，几何诗意',
  icon: 'change_history',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtKlee, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtKlee'),
};
