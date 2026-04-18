import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtCalligraphyProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtCalligraphy: React.FC<LineArtCalligraphyProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f5f2ee' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 20 Q8 8 12 4 Q14 8 12 16 Q16 12 20 8" stroke={index <= config.activeIndex ? '#2a2018' : '#c8c0b8'} strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 400, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ink = '#2a2018';
  const lightInk = '#6a5a48';
  const paper = '#f5f2ee';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: paper }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Calligraphy full-screen brush strokes, ink splashes, Eastern feel */}
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Large brush stroke - top right */}
          <path d="M1400 40 Q1500 20 1650 60 Q1750 90 1800 50 Q1850 30 1900 60" stroke={ink} strokeWidth="4" fill="none" opacity="0.06" strokeLinecap="round" />
          <path d="M1450 80 Q1550 60 1650 100" stroke={ink} strokeWidth="2" fill="none" opacity="0.04" strokeLinecap="round" />
          {/* Ink splash - bottom left */}
          <ellipse cx="150" cy="900" rx="60" ry="30" fill={ink} opacity="0.03" transform="rotate(-15 150 900)" />
          <circle cx="200" cy="880" r="8" fill={ink} opacity="0.04" />
          <circle cx="120" cy="920" r="5" fill={ink} opacity="0.03" />
          {/* Flowing brush stroke - left side */}
          <path d="M60 200 Q80 300 50 400 Q30 500 60 600" stroke={ink} strokeWidth="3" fill="none" opacity="0.04" strokeLinecap="round" />
          {/* Dry brush stroke - right side */}
          <path d="M1860 400 Q1880 500 1860 600 Q1840 700 1870 800" stroke={lightInk} strokeWidth="2" fill="none" opacity="0.04" strokeLinecap="round" strokeDasharray="8 4" />
          {/* Small calligraphic marks */}
          <path d="M800 60 Q820 40 840 60 Q830 80 810 70" stroke={ink} strokeWidth="1.5" fill="none" opacity="0.05" strokeLinecap="round" />
          <path d="M1100 1000 Q1120 980 1140 1000" stroke={ink} strokeWidth="1" fill="none" opacity="0.04" strokeLinecap="round" />
          {/* Ink dots scattered */}
          <circle cx="500" cy="150" r="3" fill={ink} opacity="0.05" />
          <circle cx="1400" cy="900" r="4" fill={ink} opacity="0.04" />
          <circle cx="900" cy="50" r="2" fill={ink} opacity="0.05" />
        </svg>

        {/* Title with brush stroke decoration */}
        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" style={{ flexShrink: 0 }}>
            <path d="M10 50 Q15 30 25 20 Q30 15 35 20 Q40 30 30 40 Q20 50 10 50" stroke={ink} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M35 20 Q45 10 55 15" stroke={ink} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
            <circle cx="15" cy="45" r="3" fill={ink} opacity="0.2" />
          </svg>
          <div>
            {/* Brush stroke above title */}
            <svg width="200" height="10" viewBox="0 0 200 10" fill="none" style={{ marginBottom: 6 }}>
              <path d="M0 6 Q40 2 80 6 Q120 10 160 5 Q190 2 200 4" stroke={ink} strokeWidth="2" fill="none" opacity="0.3" strokeLinecap="round" />
            </svg>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '0.05em', lineHeight: 1.2, color: ink, margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        {/* Cards with calligraphy brush stroke style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 4, boxShadow: '0 1px 4px rgba(42,32,24,0.04)', border: '1px solid rgba(42,32,24,0.1)', position: 'relative' }}>
              {/* Brush stroke decoration in card */}
              <svg width="40" height="20" viewBox="0 0 40 20" fill="none" style={{ position: 'absolute', top: 6, right: 8, opacity: 0.08 }}>
                <path d="M2 16 Q10 4 20 8 Q30 12 38 4" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Brush stroke number indicator */}
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M8 28 Q12 12 18 8 Q22 12 18 22 Q14 28 8 28" stroke={ink} strokeWidth="1.5" fill={ink} fillOpacity="0.04" strokeLinecap="round" />
                  <text x="22" y="24" fontSize="11" fontWeight="400" fill={ink} opacity="0.7">{String(i + 1).padStart(2, '0')}</text>
                </svg>
                {/* Brush stroke separator */}
                <svg width="100%" height="6" viewBox="0 0 200 6" fill="none" style={{ flex: 1 }}>
                  <path d="M0 3 Q50 1 100 3 Q150 5 200 3" stroke={ink} strokeWidth="1.5" fill="none" opacity="0.15" strokeLinecap="round" />
                </svg>
              </div>
              <h3 style={{ fontSize: isSingleCard ? '48px' : '34px', fontWeight: 400, color: ink, margin: 0, lineHeight: 1.4 }}>{card.title}</h3>
              <p style={{ fontSize: isSingleCard ? '32px' : '26px', color: '#444455', lineHeight: 1.8, margin: 0 }} dangerouslySetInnerHTML={{ __html: card.desc }} />
            </div>
          ))}
        </div>
      </div>
      {renderProgressBar('bottom')}
    </div>
  );
};

export const lineArtCalligraphy: TemplateConfig = {
  id: 'lineArtCalligraphy',
  name: '书法线条',
  description: '毛笔笔触墨迹飞白，东方韵味',
  icon: 'brush',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtCalligraphy, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtCalligraphy'),
};
