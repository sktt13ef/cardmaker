import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtKandinskyProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtKandinsky: React.FC<LineArtKandinskyProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f9f7fc' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="11" stroke={index <= config.activeIndex ? '#5b3a8c' : '#d5c8e8'} strokeWidth="2" fill="none" />
                <circle cx="14" cy="14" r="5" fill={index <= config.activeIndex ? '#e85d75' : '#e0d5d8'} opacity={index <= config.activeIndex ? 0.8 : 0.3} />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 500, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const purple = '#5b3a8c';
  const coral = '#e85d75';
  const teal = '#2a9d8f';
  const gold = '#d4a843';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f9f7fc' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Kandinsky full-screen concentric circles and crossing lines */}
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Large concentric circles - top right */}
          <circle cx="1700" cy="200" r="180" stroke={purple} strokeWidth="2" fill="none" opacity="0.08" />
          <circle cx="1700" cy="200" r="140" stroke={coral} strokeWidth="1.5" fill="none" opacity="0.1" />
          <circle cx="1700" cy="200" r="100" stroke={teal} strokeWidth="1.5" fill="none" opacity="0.12" />
          <circle cx="1700" cy="200" r="60" stroke={gold} strokeWidth="1" fill="none" opacity="0.15" />
          <circle cx="1700" cy="200" r="25" fill={purple} opacity="0.06" />
          {/* Crossing lines through circles */}
          <line x1="1520" y1="20" x2="1880" y2="380" stroke={coral} strokeWidth="1.5" opacity="0.08" />
          <line x1="1880" y1="20" x2="1520" y2="380" stroke={teal} strokeWidth="1.5" opacity="0.08" />
          {/* Medium circles - bottom left */}
          <circle cx="200" cy="850" r="120" stroke={teal} strokeWidth="1.5" fill="none" opacity="0.1" />
          <circle cx="200" cy="850" r="80" stroke={purple} strokeWidth="1" fill="none" opacity="0.12" />
          <circle cx="200" cy="850" r="40" stroke={coral} strokeWidth="1" fill="none" opacity="0.15" />
          <circle cx="200" cy="850" r="15" fill={teal} opacity="0.08" />
          {/* Crossing lines bottom left */}
          <line x1="80" y1="730" x2="320" y2="970" stroke={gold} strokeWidth="1" opacity="0.1" />
          <line x1="320" y1="730" x2="80" y2="970" stroke={purple} strokeWidth="1" opacity="0.08" />
          {/* Scattered small circles across the background */}
          <circle cx="960" cy="100" r="30" stroke={gold} strokeWidth="1" fill="none" opacity="0.06" />
          <circle cx="960" cy="100" r="12" fill={coral} opacity="0.05" />
          <circle cx="400" cy="150" r="20" stroke={coral} strokeWidth="0.8" fill="none" opacity="0.08" />
          <circle cx="1400" cy="900" r="25" stroke={purple} strokeWidth="0.8" fill="none" opacity="0.07" />
          <circle cx="1400" cy="900" r="8" fill={gold} opacity="0.06" />
          {/* Diagonal lines across mid-section */}
          <line x1="500" y1="500" x2="700" y2="400" stroke={teal} strokeWidth="1" opacity="0.06" />
          <line x1="1200" y1="600" x2="1500" y2="500" stroke={coral} strokeWidth="0.8" opacity="0.06" />
          {/* Small triangle accent */}
          <polygon points="1800,700 1830,750 1770,750" stroke={teal} strokeWidth="1" fill="none" opacity="0.08" />
          {/* Small rectangle accent */}
          <rect x="100" y="400" width="30" height="30" stroke={gold} strokeWidth="0.8" fill="none" opacity="0.08" transform="rotate(20 115 415)" />
        </svg>

        {/* Title with concentric circle decoration */}
        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 24 }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="32" cy="32" r="28" stroke={purple} strokeWidth="2" fill="none" />
            <circle cx="32" cy="32" r="18" stroke={coral} strokeWidth="1.5" fill="none" />
            <circle cx="32" cy="32" r="9" fill={teal} opacity="0.4" />
            <line x1="4" y1="32" x2="60" y2="32" stroke={gold} strokeWidth="0.8" opacity="0.5" />
            <line x1="32" y1="4" x2="32" y2="60" stroke={gold} strokeWidth="0.8" opacity="0.5" />
          </svg>
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 16, height: 16, borderRadius: '50%', background: purple, opacity: 0.5 }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: coral, opacity: 0.5 }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: teal, opacity: 0.5 }} />
            </div>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        {/* Cards with circular number indicators and colorful accents */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const colors = [purple, coral, teal, gold];
            const c = colors[i % 4];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 20, boxShadow: '0 2px 12px rgba(91,58,140,0.06)', border: '1px solid rgba(91,58,140,0.1)', position: 'relative', overflow: 'hidden' }}>
                {/* Decorative circle in top-right of card */}
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ position: 'absolute', top: -15, right: -15, opacity: 0.08 }}>
                  <circle cx="40" cy="40" r="36" stroke={c} strokeWidth="2" fill="none" />
                  <circle cx="40" cy="40" r="20" stroke={c} strokeWidth="1" fill="none" />
                </svg>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Circular number indicator with concentric rings */}
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="18" cy="18" r="16" stroke={c} strokeWidth="2" fill="none" />
                    <circle cx="18" cy="18" r="10" stroke={c} strokeWidth="0.8" fill="none" opacity="0.4" />
                    <circle cx="18" cy="18" r="4" fill={c} opacity="0.35" />
                    <text x="18" y="22" textAnchor="middle" fontSize="11" fontWeight="600" fill={c}>{String(i + 1).padStart(2, '0')}</text>
                  </svg>
                  {/* Colorful separator line */}
                  <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, ' + c + ' 0%, transparent 100%)', opacity: 0.25 }} />
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

export const lineArtKandinsky: TemplateConfig = {
  id: 'lineArtKandinsky',
  name: '康定斯基圆环',
  description: '同心圆与线条，抽象韵律',
  icon: 'circle',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtKandinsky, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtKandinsky'),
};
