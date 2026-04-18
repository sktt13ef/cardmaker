import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtDecoProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtDeco: React.FC<LineArtDecoProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#1a1520' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2 L22 12 L12 22 L2 12 Z" stroke={index <= config.activeIndex ? '#c9a84c' : '#4a4050'} strokeWidth="1.5" fill={index <= config.activeIndex ? '#c9a84c' : 'transparent'} fillOpacity="0.2" />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 500, color: index <= config.activeIndex ? '#f0e6d0' : '#6a6070' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const gold = '#c9a84c';
  const darkGold = '#a08030';
  const cream = '#f0e6d0';
  const dark = '#1a1520';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: dark }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Art Deco full-screen fan shapes, symmetric geometry, gold lines */}
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Large fan/semicircle - top right */}
          <path d="M1920 0 A300 300 0 0 1 1620 300" stroke={gold} strokeWidth="2" fill="none" opacity="0.1" />
          <path d="M1920 0 A250 250 0 0 1 1670 250" stroke={gold} strokeWidth="1.5" fill="none" opacity="0.08" />
          <path d="M1920 0 A200 200 0 0 1 1720 200" stroke={gold} strokeWidth="1" fill="none" opacity="0.06" />
          <path d="M1920 0 A150 150 0 0 1 1770 150" stroke={gold} strokeWidth="0.8" fill="none" opacity="0.05" />
          {/* Radiating lines from top-right corner */}
          <line x1="1920" y1="0" x2="1600" y2="400" stroke={gold} strokeWidth="0.8" opacity="0.06" />
          <line x1="1920" y1="0" x2="1700" y2="350" stroke={gold} strokeWidth="0.8" opacity="0.05" />
          <line x1="1920" y1="0" x2="1550" y2="300" stroke={gold} strokeWidth="0.6" opacity="0.04" />
          {/* Fan shape - bottom left */}
          <path d="M0 1080 A250 250 0 0 1 250 830" stroke={gold} strokeWidth="1.5" fill="none" opacity="0.08" />
          <path d="M0 1080 A200 200 0 0 1 200 880" stroke={gold} strokeWidth="1" fill="none" opacity="0.06" />
          <path d="M0 1080 A150 150 0 0 1 150 930" stroke={gold} strokeWidth="0.8" fill="none" opacity="0.05" />
          {/* Symmetric chevron patterns - top area */}
          <polyline points="800,0 840,40 880,0" stroke={gold} strokeWidth="1" fill="none" opacity="0.06" />
          <polyline points="820,0 840,20 860,0" stroke={gold} strokeWidth="0.8" fill="none" opacity="0.05" />
          <polyline points="1040,0 1080,40 1120,0" stroke={gold} strokeWidth="1" fill="none" opacity="0.06" />
          <polyline points="1060,0 1080,20 1100,0" stroke={gold} strokeWidth="0.8" fill="none" opacity="0.05" />
          {/* Diamond pattern - right side */}
          <polygon points="1850,500 1880,530 1850,560 1820,530" stroke={gold} strokeWidth="1" fill="none" opacity="0.06" />
          <polygon points="1850,560 1880,590 1850,620 1820,590" stroke={gold} strokeWidth="0.8" fill="none" opacity="0.05" />
          {/* Horizontal gold lines */}
          <line x1="0" y1="540" x2="200" y2="540" stroke={gold} strokeWidth="0.8" opacity="0.04" />
          <line x1="1720" y1="540" x2="1920" y2="540" stroke={gold} strokeWidth="0.8" opacity="0.04" />
          {/* Stepped pyramid shape - left */}
          <polyline points="40,700 40,680 60,680 60,660 80,660 80,640 100,640 100,660 120,660 120,680 140,680 140,700" stroke={gold} strokeWidth="0.8" fill="none" opacity="0.06" />
        </svg>

        {/* Title with Art Deco fan decoration */}
        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 24 }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ flexShrink: 0 }}>
            {/* Fan shape */}
            <path d="M32 60 A28 28 0 0 1 4 32" stroke={gold} strokeWidth="1.5" fill="none" />
            <path d="M32 60 A22 22 0 0 1 10 38" stroke={gold} strokeWidth="1" fill="none" opacity="0.7" />
            <path d="M32 60 A16 16 0 0 1 16 44" stroke={gold} strokeWidth="0.8" fill="none" opacity="0.5" />
            {/* Radiating lines */}
            <line x1="32" y1="60" x2="4" y2="32" stroke={gold} strokeWidth="0.6" opacity="0.4" />
            <line x1="32" y1="60" x2="10" y2="38" stroke={gold} strokeWidth="0.6" opacity="0.3" />
            <line x1="32" y1="60" x2="16" y2="44" stroke={gold} strokeWidth="0.6" opacity="0.3" />
            <line x1="32" y1="60" x2="32" y2="4" stroke={gold} strokeWidth="0.6" opacity="0.3" />
          </svg>
          <div>
            {/* Gold decorative line above title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 40, height: 2, background: gold, opacity: 0.6 }} />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <polygon points="6,0 12,6 6,12 0,6" fill={gold} opacity="0.5" />
              </svg>
              <div style={{ width: 80, height: 2, background: gold, opacity: 0.6 }} />
            </div>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '0.08em', lineHeight: 1.2, color: cream, margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        {/* Cards with Art Deco luxury style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: 'rgba(30,25,35,0.9)', borderRadius: 2, boxShadow: '0 2px 12px rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', position: 'relative' }}>
              {/* Gold corner accents */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ position: 'absolute', top: 0, left: 0 }}>
                <polyline points="0,16 0,0 16,0" stroke={gold} strokeWidth="1.5" opacity="0.4" />
              </svg>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ position: 'absolute', top: 0, right: 0 }}>
                <polyline points="4,0 20,0 20,16" stroke={gold} strokeWidth="1.5" opacity="0.4" />
              </svg>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Diamond number indicator */}
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
                  <polygon points="18,2 34,18 18,34 2,18" stroke={gold} strokeWidth="1.5" fill={gold} fillOpacity="0.08" />
                  <text x="18" y="22" textAnchor="middle" fontSize="12" fontWeight="600" fill={gold}>{String(i + 1).padStart(2, '0')}</text>
                </svg>
                {/* Gold separator with diamond center */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ flex: 1, height: '1px', background: gold, opacity: 0.25 }} />
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <polygon points="4,0 8,4 4,8 0,4" fill={gold} opacity="0.3" />
                  </svg>
                  <div style={{ flex: 1, height: '1px', background: gold, opacity: 0.25 }} />
                </div>
              </div>
              <h3 style={{ fontSize: isSingleCard ? '48px' : '34px', fontWeight: 400, color: cream, margin: 0, lineHeight: 1.4, letterSpacing: '0.02em' }}>{card.title}</h3>
              <p style={{ fontSize: isSingleCard ? '32px' : '26px', color: '#a09888', lineHeight: 1.8, margin: 0 }} dangerouslySetInnerHTML={{ __html: card.desc }} />
            </div>
          ))}
        </div>
      </div>
      {renderProgressBar('bottom')}
    </div>
  );
};

export const lineArtDeco: TemplateConfig = {
  id: 'lineArtDeco',
  name: '装饰艺术',
  description: '扇形对称几何，金色奢华',
  icon: 'diamond',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtDeco, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtDeco'),
};
