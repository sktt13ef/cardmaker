import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtMiroProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtMiro: React.FC<LineArtMiroProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f7f9fc' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2 L14 10 L22 10 L16 15 L18 22 L12 18 L6 22 L8 15 L2 10 L10 10 Z" stroke={index <= config.activeIndex ? '#1e3a5f' : '#c8d4e0'} strokeWidth="1.5" fill={index <= config.activeIndex ? '#e85d3a' : 'transparent'} fillOpacity="0.3" />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 500, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const navy = '#1e3a5f';
  const orange = '#e85d3a';
  const yellow = '#f0c040';
  const green = '#3a8c5f';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f7f9fc' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Miro full-screen organic curves, stars, eyes */}
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Large organic curve - top right */}
          <path d="M1500 0 Q1700 200 1920 150" stroke={navy} strokeWidth="2" fill="none" opacity="0.08" />
          <path d="M1600 0 Q1750 150 1920 100" stroke={orange} strokeWidth="1.5" fill="none" opacity="0.06" />
          {/* Star shape - top right area */}
          <path d="M1780 80 L1785 95 L1800 95 L1788 105 L1792 120 L1780 110 L1768 120 L1772 105 L1760 95 L1775 95 Z" stroke={yellow} strokeWidth="1.5" fill={yellow} fillOpacity="0.1" opacity="0.2" />
          {/* Eye shape - bottom left */}
          <ellipse cx="150" cy="900" rx="80" ry="40" stroke={navy} strokeWidth="1.5" fill="none" opacity="0.08" />
          <circle cx="150" cy="900" r="18" fill={navy} opacity="0.06" />
          <circle cx="150" cy="900" r="6" fill={orange} opacity="0.1" />
          {/* Organic curves - bottom */}
          <path d="M0 950 Q200 880 400 950 Q600 1020 800 950" stroke={green} strokeWidth="1.5" fill="none" opacity="0.06" />
          <path d="M800 980 Q1000 920 1200 980" stroke={navy} strokeWidth="1" fill="none" opacity="0.05" />
          {/* Small star - left area */}
          <path d="M80 200 L83 210 L93 210 L85 216 L88 226 L80 220 L72 226 L75 216 L67 210 L77 210 Z" stroke={orange} strokeWidth="1" fill={orange} fillOpacity="0.08" opacity="0.15" />
          {/* Wavy free lines across middle */}
          <path d="M100 500 Q300 460 500 500 Q700 540 900 500" stroke={navy} strokeWidth="1" fill="none" opacity="0.04" />
          <path d="M900 520 Q1100 480 1300 520 Q1500 560 1700 520" stroke={orange} strokeWidth="0.8" fill="none" opacity="0.04" />
          {/* Dot with radiating lines */}
          <circle cx="1800" cy="800" r="5" fill={orange} opacity="0.1" />
          <line x1="1800" y1="780" x2="1800" y2="760" stroke={navy} strokeWidth="0.8" opacity="0.06" />
          <line x1="1820" y1="800" x2="1840" y2="800" stroke={navy} strokeWidth="0.8" opacity="0.06" />
          <line x1="1780" y1="800" x2="1760" y2="800" stroke={navy} strokeWidth="0.8" opacity="0.06" />
          <line x1="1800" y1="820" x2="1800" y2="840" stroke={navy} strokeWidth="0.8" opacity="0.06" />
          {/* Small crescent moon shape */}
          <path d="M300 80 A30 30 0 0 1 300 140 A20 20 0 0 0 300 80" stroke={yellow} strokeWidth="1" fill={yellow} fillOpacity="0.06" opacity="0.12" />
          {/* Organic blob shape */}
          <path d="M1600 700 Q1640 680 1680 700 Q1700 730 1680 760 Q1640 780 1600 760 Q1580 730 1600 700" stroke={green} strokeWidth="1" fill="none" opacity="0.06" />
        </svg>

        {/* Title with Miro-style star and organic line decoration */}
        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0 }}>
            {/* Star shape */}
            <path d="M28 4 L31 20 L48 20 L34 30 L38 46 L28 36 L18 46 L22 30 L8 20 L25 20 Z" stroke={orange} strokeWidth="1.5" fill={yellow} fillOpacity="0.2" />
            {/* Eye in center */}
            <ellipse cx="28" cy="28" rx="8" ry="4" stroke={navy} strokeWidth="1" fill="none" />
            <circle cx="28" cy="28" r="2" fill={navy} opacity="0.5" />
          </svg>
          <div>
            {/* Playful wavy line above title */}
            <svg width="200" height="12" viewBox="0 0 200 12" fill="none" style={{ marginBottom: 4 }}>
              <path d="M0 6 Q25 2 50 6 Q75 10 100 6 Q125 2 150 6 Q175 10 200 6" stroke={green} strokeWidth="1.5" fill="none" opacity="0.5" />
            </svg>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        {/* Cards with playful organic decorations */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const colors = [navy, orange, yellow, green];
            const c = colors[i % 4];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 12, boxShadow: '0 2px 8px rgba(30,58,95,0.05)', border: '1.5px solid rgba(30,58,95,0.1)', position: 'relative' }}>
                {/* Small star decoration in card */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', top: 8, right: 8, opacity: 0.15 }}>
                  <path d="M12 2 L13.5 8.5 L20 8.5 L14.8 12.5 L16.5 19 L12 15 L7.5 19 L9.2 12.5 L4 8.5 L10.5 8.5 Z" stroke={c} strokeWidth="0.8" fill={c} fillOpacity="0.3" />
                </svg>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Organic blob number indicator */}
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M18 2 Q28 4 32 14 Q34 24 28 30 Q20 36 12 32 Q4 28 2 18 Q4 8 14 4 Z" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.08" />
                    <text x="18" y="22" textAnchor="middle" fontSize="12" fontWeight="600" fill={c}>{String(i + 1).padStart(2, '0')}</text>
                  </svg>
                  {/* Wavy separator line */}
                  <svg width="100%" height="6" viewBox="0 0 200 6" fill="none" style={{ flex: 1 }}>
                    <path d="M0 3 Q25 1 50 3 Q75 5 100 3 Q125 1 150 3 Q175 5 200 3" stroke={c} strokeWidth="1" fill="none" opacity="0.2" />
                  </svg>
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

export const lineArtMiro: TemplateConfig = {
  id: 'lineArtMiro',
  name: '米罗有机',
  description: '有机曲线符号，梦幻诗意',
  icon: 'gesture',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtMiro, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtMiro'),
};
