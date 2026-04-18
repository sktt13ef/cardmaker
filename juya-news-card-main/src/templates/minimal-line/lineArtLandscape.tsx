import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtLandscapeProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtLandscape: React.FC<LineArtLandscapeProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f4f6f2' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
                <path d="M0 12 Q7 4 14 8 Q21 12 28 6" stroke={index <= config.activeIndex ? '#3a5a3a' : '#c0d0c0'} strokeWidth="1.5" fill="none" />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 300, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const mountain = '#3a5a3a';
  const water = '#4a6a8a';
  const mist = '#8aa0a0';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f4f6f2' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Landscape full-screen mountain contours, water ripples, depth layers */}
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Far mountains - light */}
          <path d="M0 300 Q200 200 400 280 Q600 180 800 260 Q1000 160 1200 240 Q1400 180 1600 260 Q1800 200 1920 280" stroke={mist} strokeWidth="1" fill="none" opacity="0.08" />
          {/* Mid mountains */}
          <path d="M0 400 Q150 320 300 380 Q500 280 700 360 Q900 300 1100 380 Q1300 300 1500 370 Q1700 320 1920 400" stroke={mountain} strokeWidth="1.5" fill="none" opacity="0.06" />
          {/* Near mountains - darker */}
          <path d="M0 500 Q100 440 250 480 Q400 400 600 470 Q800 420 1000 490 Q1200 430 1400 480 Q1600 440 1920 500" stroke={mountain} strokeWidth="2" fill="none" opacity="0.05" />
          {/* Water ripples - bottom */}
          <path d="M0 800 Q200 790 400 800 Q600 810 800 800 Q1000 790 1200 800 Q1400 810 1600 800 Q1800 790 1920 800" stroke={water} strokeWidth="1" fill="none" opacity="0.06" />
          <path d="M0 830 Q200 820 400 830 Q600 840 800 830 Q1000 820 1200 830 Q1400 840 1600 830 Q1800 820 1920 830" stroke={water} strokeWidth="0.8" fill="none" opacity="0.05" />
          <path d="M0 860 Q200 850 400 860 Q600 870 800 860 Q1000 850 1200 860 Q1400 870 1600 860 Q1800 850 1920 860" stroke={mist} strokeWidth="0.6" fill="none" opacity="0.04" />
          {/* Distant mist layer */}
          <path d="M0 350 Q480 330 960 350 Q1440 370 1920 350" stroke={mist} strokeWidth="0.5" fill="none" opacity="0.04" />
          {/* Small tree silhouettes */}
          <path d="M100 480 L100 460 Q105 450 110 460 L110 480" stroke={mountain} strokeWidth="0.8" fill="none" opacity="0.04" />
          <path d="M130 490 L130 470 Q135 460 140 470 L140 490" stroke={mountain} strokeWidth="0.6" fill="none" opacity="0.03" />
        </svg>

        {/* Title with mountain contour decoration */}
        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" style={{ flexShrink: 0 }}>
            <path d="M4 56 L20 20 L30 36 L40 12 L56 56" stroke={mountain} strokeWidth="1.5" fill="none" />
            <path d="M0 56 Q15 50 30 56 Q45 50 60 56" stroke={water} strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
          <div>
            {/* Mountain line above title */}
            <svg width="200" height="12" viewBox="0 0 200 12" fill="none" style={{ marginBottom: 6 }}>
              <path d="M0 10 Q40 4 80 8 Q120 2 160 6 Q190 4 200 8" stroke={mountain} strokeWidth="1.5" fill="none" opacity="0.35" />
            </svg>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '0.03em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        {/* Cards with landscape style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const colors = [mountain, water, mist];
            const c = colors[i % 3];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 4, border: '1px solid rgba(58,90,58,0.1)', position: 'relative' }}>
                {/* Mountain contour in card */}
                <svg width="60" height="20" viewBox="0 0 60 20" fill="none" style={{ position: 'absolute', top: 4, right: 6, opacity: 0.08 }}>
                  <path d="M0 18 L15 6 L25 12 L40 2 L60 18" stroke={c} strokeWidth="1" fill="none" />
                </svg>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Mountain peak number indicator */}
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M4 32 L18 6 L32 32" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.04" />
                    <text x="18" y="28" textAnchor="middle" fontSize="11" fontWeight="300" fill={c}>{String(i + 1).padStart(2, '0')}</text>
                  </svg>
                  {/* Water ripple separator */}
                  <svg width="100%" height="6" viewBox="0 0 200 6" fill="none" style={{ flex: 1 }}>
                    <path d="M0 3 Q50 1 100 3 Q150 5 200 3" stroke={c} strokeWidth="1" fill="none" opacity="0.2" />
                  </svg>
                </div>
                <h3 style={{ fontSize: isSingleCard ? '48px' : '34px', fontWeight: 300, color: '#111122', margin: 0, lineHeight: 1.4 }}>{card.title}</h3>
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

export const lineArtLandscape: TemplateConfig = {
  id: 'lineArtLandscape',
  name: '山水线条',
  description: '山峦轮廓水波纹，远近层次',
  icon: 'landscape',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtLandscape, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtLandscape'),
};
