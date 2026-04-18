import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtAmethystProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtAmethyst: React.FC<LineArtAmethystProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f6f2f8' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <polygon points="10,1 18,6 18,14 10,19 2,14 2,6" stroke={index <= config.activeIndex ? '#7b2d8e' : '#d8c8e0'} strokeWidth="1.5" fill={index <= config.activeIndex ? '#7b2d8e' : 'transparent'} fillOpacity="0.15" />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 400, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const amethyst = '#7b2d8e';
  const lavender = '#9a6ab0';
  const crystal = '#c8a0d8';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f6f2f8' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Amethyst full-screen hexagonal crystals, purple gradient, gem facets */}
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Large hexagonal crystal - top right */}
          <polygon points="1700,40 1780,80 1780,160 1700,200 1620,160 1620,80" stroke={amethyst} strokeWidth="2" fill={amethyst} fillOpacity="0.03" opacity="0.1" />
          <polygon points="1700,70 1750,95 1750,145 1700,170 1650,145 1650,95" stroke={lavender} strokeWidth="1" fill="none" opacity="0.06" />
          <line x1="1700" y1="40" x2="1700" y2="200" stroke={crystal} strokeWidth="0.5" opacity="0.06" />
          <line x1="1620" y1="80" x2="1780" y2="160" stroke={crystal} strokeWidth="0.5" opacity="0.04" />
          <line x1="1780" y1="80" x2="1620" y2="160" stroke={crystal} strokeWidth="0.5" opacity="0.04" />
          {/* Crystal cluster - bottom left */}
          <polygon points="120,820 180,790 240,820 240,880 180,910 120,880" stroke={amethyst} strokeWidth="1.5" fill={amethyst} fillOpacity="0.02" opacity="0.08" />
          <polygon points="80,860 130,840 180,860 180,900 130,920 80,900" stroke={lavender} strokeWidth="1" fill="none" opacity="0.05" />
          <polygon points="160,800 200,780 240,800 240,840 200,860 160,840" stroke={crystal} strokeWidth="0.8" fill="none" opacity="0.04" />
          {/* Scattered small hexagons */}
          <polygon points="600,100 630,85 660,100 660,130 630,145 600,130" stroke={lavender} strokeWidth="0.8" fill="none" opacity="0.04" />
          <polygon points="1300,150 1330,135 1360,150 1360,180 1330,195 1300,180" stroke={crystal} strokeWidth="0.6" fill="none" opacity="0.04" />
          <polygon points="900,900 930,885 960,900 960,930 930,945 900,930" stroke={amethyst} strokeWidth="0.8" fill="none" opacity="0.04" />
          {/* Facet lines */}
          <line x1="0" y1="540" x2="200" y2="540" stroke={lavender} strokeWidth="0.5" opacity="0.03" />
          <line x1="1720" y1="540" x2="1920" y2="540" stroke={amethyst} strokeWidth="0.5" opacity="0.03" />
          {/* Crystal shard shapes */}
          <polygon points="1850,600 1880,560 1900,620" stroke={amethyst} strokeWidth="0.8" fill={amethyst} fillOpacity="0.02" opacity="0.05" />
          <polygon points="40,400 70,370 60,430" stroke={lavender} strokeWidth="0.6" fill="none" opacity="0.04" />
        </svg>

        {/* Title with hexagonal crystal decoration */}
        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0 }}>
            <polygon points="28,2 52,16 52,40 28,54 4,40 4,16" stroke={amethyst} strokeWidth="2" fill={amethyst} fillOpacity="0.06" />
            <polygon points="28,12 42,20 42,36 28,44 14,36 14,20" stroke={lavender} strokeWidth="1" fill="none" opacity="0.5" />
            <line x1="28" y1="2" x2="28" y2="54" stroke={crystal} strokeWidth="0.5" opacity="0.3" />
            <line x1="4" y1="16" x2="52" y2="40" stroke={crystal} strokeWidth="0.5" opacity="0.2" />
          </svg>
          <div>
            <svg width="160" height="10" viewBox="0 0 160 10" fill="none" style={{ marginBottom: 6 }}>
              <polygon points="10,5 20,1 30,5 20,9" stroke={amethyst} strokeWidth="0.8" fill="none" opacity="0.35" />
              <line x1="30" y1="5" x2="160" y2="5" stroke={amethyst} strokeWidth="1" opacity="0.2" />
            </svg>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        {/* Cards with crystal hexagonal style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const colors = [amethyst, lavender, crystal];
            const c = colors[i % 3];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 8, boxShadow: '0 2px 8px rgba(123,45,142,0.05)', border: '1px solid rgba(123,45,142,0.1)', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Hexagonal number indicator */}
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
                    <polygon points="18,2 33,10 33,26 18,34 3,26 3,10" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.05" />
                    <text x="18" y="22" textAnchor="middle" fontSize="11" fontWeight="600" fill={c}>{String(i + 1).padStart(2, '0')}</text>
                  </svg>
                  {/* Crystal facet separator */}
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ flex: 1, height: '1px', background: c, opacity: 0.12 }} />
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <polygon points="4,0 8,4 4,8 0,4" fill={c} opacity="0.2" />
                    </svg>
                    <div style={{ flex: 1, height: '1px', background: c, opacity: 0.12 }} />
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

export const lineArtAmethyst: TemplateConfig = {
  id: 'lineArtAmethyst',
  name: '紫水晶',
  description: '六边形晶体紫色渐变，宝石切面',
  icon: 'diamond',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtAmethyst, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtAmethyst'),
};
