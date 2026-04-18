import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtOpArtProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtOpArt: React.FC<LineArtOpArtProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f0f0f0' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[0, 1, 2].map(j => (
                  <div key={j} style={{ width: 4, height: 16, background: index <= config.activeIndex ? (j % 2 === 0 ? '#111' : '#fff') : '#ccc', border: '0.5px solid #999', opacity: index <= config.activeIndex ? 0.8 : 0.3 }} />
                ))}
              </div>
              <span style={{ fontSize: '26px', fontWeight: 500, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const black = '#111111';
  const white = '#ffffff';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f0f0f0' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Op Art full-screen black/white stripes, optical illusion, wavy lines */}
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Vertical stripes - top right area */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => (
            <rect key={'vr' + i} x={1680 + i * 20} y="0" width="10" height="300" fill={black} opacity={i % 2 === 0 ? "0.06" : "0"} />
          ))}
          {/* Horizontal stripes - bottom left area */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <rect key={'hb' + i} x="0" y={780 + i * 16} width="400" height="8" fill={black} opacity={i % 2 === 0 ? "0.06" : "0"} />
          ))}
          {/* Concentric circles illusion - right side */}
          <circle cx="1800" cy="700" r="120" stroke={black} strokeWidth="1.5" fill="none" opacity="0.05" />
          <circle cx="1800" cy="700" r="100" stroke={black} strokeWidth="1.5" fill="none" opacity="0.05" />
          <circle cx="1800" cy="700" r="80" stroke={black} strokeWidth="1.5" fill="none" opacity="0.05" />
          <circle cx="1800" cy="700" r="60" stroke={black} strokeWidth="1.5" fill="none" opacity="0.05" />
          <circle cx="1800" cy="700" r="40" stroke={black} strokeWidth="1.5" fill="none" opacity="0.05" />
          <circle cx="1800" cy="700" r="20" stroke={black} strokeWidth="1.5" fill="none" opacity="0.05" />
          {/* Wavy lines - middle area */}
          <path d="M0 400 Q200 370 400 400 Q600 430 800 400 Q1000 370 1200 400 Q1400 430 1600 400 Q1800 370 1920 400" stroke={black} strokeWidth="1" fill="none" opacity="0.04" />
          <path d="M0 420 Q200 390 400 420 Q600 450 800 420 Q1000 390 1200 420 Q1400 450 1600 420 Q1800 390 1920 420" stroke={black} strokeWidth="1" fill="none" opacity="0.04" />
          <path d="M0 440 Q200 410 400 440 Q600 470 800 440 Q1000 410 1200 440 Q1400 470 1600 440 Q1800 410 1920 440" stroke={black} strokeWidth="1" fill="none" opacity="0.04" />
          {/* Diagonal stripes - top left */}
          <line x1="0" y1="0" x2="200" y2="200" stroke={black} strokeWidth="1" opacity="0.04" />
          <line x1="40" y1="0" x2="240" y2="200" stroke={black} strokeWidth="1" opacity="0.04" />
          <line x1="80" y1="0" x2="280" y2="200" stroke={black} strokeWidth="1" opacity="0.04" />
          <line x1="120" y1="0" x2="320" y2="200" stroke={black} strokeWidth="1" opacity="0.04" />
          <line x1="160" y1="0" x2="360" y2="200" stroke={black} strokeWidth="1" opacity="0.04" />
          {/* Moire-like overlapping circles */}
          <circle cx="300" cy="600" r="80" stroke={black} strokeWidth="0.8" fill="none" opacity="0.03" />
          <circle cx="340" cy="600" r="80" stroke={black} strokeWidth="0.8" fill="none" opacity="0.03" />
          <circle cx="320" cy="560" r="80" stroke={black} strokeWidth="0.8" fill="none" opacity="0.03" />
        </svg>

        {/* Title with optical stripe decoration */}
        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0 }}>
            {/* Concentric squares */}
            <rect x="2" y="2" width="52" height="52" stroke={black} strokeWidth="1.5" fill="none" opacity="0.3" />
            <rect x="10" y="10" width="36" height="36" stroke={black} strokeWidth="1.5" fill="none" opacity="0.25" />
            <rect x="18" y="18" width="20" height="20" stroke={black} strokeWidth="1.5" fill="none" opacity="0.2" />
            <rect x="24" y="24" width="8" height="8" fill={black} opacity="0.15" />
          </svg>
          <div>
            {/* Stripe decoration above title */}
            <div style={{ display: 'flex', gap: 3, marginBottom: 8 }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(j => (
                <div key={j} style={{ width: 6, height: 4, background: j % 2 === 0 ? black : 'transparent', opacity: 0.4 }} />
              ))}
            </div>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, color: black, margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        {/* Cards with optical illusion style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 0, border: '2px solid ' + black, position: 'relative' }}>
              {/* Stripe decoration at top of card */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', height: 4 }}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(j => (
                  <div key={j} style={{ flex: 1, background: j % 2 === 0 ? black : 'transparent', opacity: 0.15 }} />
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Concentric square number indicator */}
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
                  <rect x="1" y="1" width="34" height="34" stroke={black} strokeWidth="1.5" fill="none" />
                  <rect x="6" y="6" width="24" height="24" stroke={black} strokeWidth="1" fill="none" opacity="0.5" />
                  <rect x="11" y="11" width="14" height="14" stroke={black} strokeWidth="0.8" fill="none" opacity="0.3" />
                  <text x="18" y="22" textAnchor="middle" fontSize="11" fontWeight="700" fill={black}>{String(i + 1).padStart(2, '0')}</text>
                </svg>
                {/* Stripe separator */}
                <div style={{ flex: 1, display: 'flex', gap: 2, alignItems: 'center' }}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(j => (
                    <div key={j} style={{ flex: 1, height: '2px', background: j % 2 === 0 ? black : 'transparent', opacity: 0.15 }} />
                  ))}
                </div>
              </div>
              <h3 style={{ fontSize: isSingleCard ? '48px' : '34px', fontWeight: 700, color: black, margin: 0, lineHeight: 1.4 }}>{card.title}</h3>
              <p style={{ fontSize: isSingleCard ? '32px' : '26px', color: '#444455', lineHeight: 1.8, margin: 0 }} dangerouslySetInnerHTML={{ __html: card.desc }} />
            </div>
          ))}
        </div>
      </div>
      {renderProgressBar('bottom')}
    </div>
  );
};

export const lineArtOpArt: TemplateConfig = {
  id: 'lineArtOpArt',
  name: '欧普艺术',
  description: '黑白条纹视觉错觉，波浪线',
  icon: 'visibility',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtOpArt, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtOpArt'),
};
