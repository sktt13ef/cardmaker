import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtConstructProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtConstruct: React.FC<LineArtConstructProps> = ({ data, scale, progressBarConfig }) => {
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
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <line x1="0" y1="20" x2="20" y2="0" stroke={index <= config.activeIndex ? '#c03020' : '#ccc'} strokeWidth="2" />
                <circle cx="10" cy="10" r="4" stroke={index <= config.activeIndex ? '#2020c0' : '#ccc'} strokeWidth="1" fill="none" />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 500, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const red = '#c03020';
  const blue = '#2020c0';
  const black = '#111111';
  const gray = '#606060';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f0f0f0' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Constructivism full-screen diagonal lines, circle intersections, industrial */}
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Diagonal lines - top left to bottom right */}
          <line x1="0" y1="0" x2="600" y2="600" stroke={red} strokeWidth="2" opacity="0.06" />
          <line x1="200" y1="0" x2="800" y2="600" stroke={black} strokeWidth="1.5" opacity="0.05" />
          <line x1="0" y1="200" x2="400" y2="600" stroke={blue} strokeWidth="1.5" opacity="0.05" />
          {/* Diagonal lines - top right to bottom left */}
          <line x1="1920" y1="0" x2="1320" y2="600" stroke={red} strokeWidth="2" opacity="0.06" />
          <line x1="1720" y1="0" x2="1120" y2="600" stroke={black} strokeWidth="1.5" opacity="0.05" />
          <line x1="1920" y1="200" x2="1520" y2="600" stroke={blue} strokeWidth="1.5" opacity="0.05" />
          {/* Circle intersections */}
          <circle cx="960" cy="300" r="120" stroke={red} strokeWidth="2" fill="none" opacity="0.05" />
          <circle cx="960" cy="300" r="80" stroke={blue} strokeWidth="1.5" fill="none" opacity="0.05" />
          <circle cx="960" cy="300" r="40" stroke={black} strokeWidth="1" fill={red} fillOpacity="0.02" opacity="0.05" />
          {/* Industrial circles - bottom */}
          <circle cx="300" cy="850" r="100" stroke={black} strokeWidth="2" fill="none" opacity="0.04" />
          <circle cx="300" cy="850" r="60" stroke={gray} strokeWidth="1" fill="none" opacity="0.04" />
          <circle cx="1600" cy="800" r="80" stroke={red} strokeWidth="1.5" fill="none" opacity="0.04" />
          {/* Diagonal structural lines */}
          <line x1="0" y1="800" x2="400" y2="1080" stroke={blue} strokeWidth="1.5" opacity="0.04" />
          <line x1="1520" y1="800" x2="1920" y2="1080" stroke={red} strokeWidth="1.5" opacity="0.04" />
          {/* Cross-hatched area */}
          <line x1="1400" y1="100" x2="1500" y2="200" stroke={black} strokeWidth="0.8" opacity="0.04" />
          <line x1="1420" y1="100" x2="1520" y2="200" stroke={black} strokeWidth="0.8" opacity="0.04" />
          <line x1="1440" y1="100" x2="1540" y2="200" stroke={black} strokeWidth="0.8" opacity="0.04" />
          <line x1="1400" y1="120" x2="1500" y2="220" stroke={black} strokeWidth="0.8" opacity="0.04" />
        </svg>

        {/* Title with constructivist diagonal decoration */}
        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0 }}>
            <line x1="0" y1="56" x2="56" y2="0" stroke={red} strokeWidth="2" />
            <circle cx="28" cy="28" r="16" stroke={blue} strokeWidth="1.5" fill="none" />
            <circle cx="28" cy="28" r="6" fill={red} opacity="0.3" />
          </svg>
          <div>
            {/* Diagonal line decoration above title */}
            <svg width="180" height="10" viewBox="0 0 180 10" fill="none" style={{ marginBottom: 6 }}>
              <line x1="0" y1="10" x2="180" y2="0" stroke={red} strokeWidth="1.5" opacity="0.4" />
              <line x1="20" y1="10" x2="180" y2="2" stroke={blue} strokeWidth="1" opacity="0.3" />
            </svg>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        {/* Cards with constructivist industrial style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const colors = [red, blue, black, gray];
            const c = colors[i % 4];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 0, border: '2px solid ' + c, position: 'relative' }}>
                {/* Diagonal accent corner */}
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" style={{ position: 'absolute', top: 0, right: 0, opacity: 0.15 }}>
                  <line x1="30" y1="0" x2="0" y2="30" stroke={c} strokeWidth="2" />
                </svg>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Circle-cross number indicator */}
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="18" cy="18" r="15" stroke={c} strokeWidth="1.5" fill="none" />
                    <line x1="6" y1="30" x2="30" y2="6" stroke={c} strokeWidth="1" opacity="0.4" />
                    <text x="18" y="22" textAnchor="middle" fontSize="11" fontWeight="600" fill={c}>{String(i + 1).padStart(2, '0')}</text>
                  </svg>
                  {/* Diagonal separator */}
                  <svg width="100%" height="8" viewBox="0 0 200 8" fill="none" style={{ flex: 1 }}>
                    <line x1="0" y1="8" x2="200" y2="0" stroke={c} strokeWidth="1" opacity="0.15" />
                  </svg>
                </div>
                <h3 style={{ fontSize: isSingleCard ? '48px' : '34px', fontWeight: 500, color: '#111122', margin: 0, lineHeight: 1.4 }}>{card.title}</h3>
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

export const lineArtConstruct: TemplateConfig = {
  id: 'lineArtConstruct',
  name: '构成主义',
  description: '斜线圆形交叉，工业力量感',
  icon: 'engineering',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtConstruct, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtConstruct'),
};
