import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtRileyProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtRiley: React.FC<LineArtRileyProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f4f0f8' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
                <path d="M0 8 Q7 2 14 8 Q21 14 28 8" stroke={index <= config.activeIndex ? '#5a3e8a' : '#d0c8e0'} strokeWidth="2" fill="none" />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 500, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const purple = '#5a3e8a';
  const teal = '#2a8a8a';
  const rose = '#c0507a';
  const amber = '#c89030';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f4f0f8' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Riley full-screen wave stripes, color gradients, flowing feel */}
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Wave stripes - top section, flowing curves */}
          <path d="M0 60 Q240 30 480 60 Q720 90 960 60 Q1200 30 1440 60 Q1680 90 1920 60" stroke={purple} strokeWidth="2" fill="none" opacity="0.06" />
          <path d="M0 90 Q240 60 480 90 Q720 120 960 90 Q1200 60 1440 90 Q1680 120 1920 90" stroke={teal} strokeWidth="2" fill="none" opacity="0.05" />
          <path d="M0 120 Q240 90 480 120 Q720 150 960 120 Q1200 90 1440 120 Q1680 150 1920 120" stroke={rose} strokeWidth="1.5" fill="none" opacity="0.05" />
          <path d="M0 150 Q240 120 480 150 Q720 180 960 150 Q1200 120 1440 150 Q1680 180 1920 150" stroke={amber} strokeWidth="1.5" fill="none" opacity="0.04" />
          {/* Wave stripes - bottom section */}
          <path d="M0 880 Q240 850 480 880 Q720 910 960 880 Q1200 850 1440 880 Q1680 910 1920 880" stroke={teal} strokeWidth="2" fill="none" opacity="0.05" />
          <path d="M0 910 Q240 880 480 910 Q720 940 960 910 Q1200 880 1440 910 Q1680 940 1920 910" stroke={purple} strokeWidth="1.5" fill="none" opacity="0.05" />
          <path d="M0 940 Q240 910 480 940 Q720 970 960 940 Q1200 910 1440 940 Q1680 970 1920 940" stroke={rose} strokeWidth="1.5" fill="none" opacity="0.04" />
          <path d="M0 970 Q240 940 480 970 Q720 1000 960 970 Q1200 940 1440 970 Q1680 1000 1920 970" stroke={amber} strokeWidth="1" fill="none" opacity="0.04" />
          {/* Flowing vertical wave - right side */}
          <path d="M1800 0 Q1770 180 1800 360 Q1830 540 1800 720 Q1770 900 1800 1080" stroke={purple} strokeWidth="1.5" fill="none" opacity="0.04" />
          <path d="M1840 0 Q1810 180 1840 360 Q1870 540 1840 720 Q1810 900 1840 1080" stroke={teal} strokeWidth="1" fill="none" opacity="0.03" />
          {/* Flowing vertical wave - left side */}
          <path d="M80 0 Q110 180 80 360 Q50 540 80 720 Q110 900 80 1080" stroke={rose} strokeWidth="1" fill="none" opacity="0.03" />
          <path d="M120 0 Q150 180 120 360 Q90 540 120 720 Q150 900 120 1080" stroke={amber} strokeWidth="0.8" fill="none" opacity="0.03" />
          {/* Mid-section flowing waves */}
          <path d="M0 500 Q320 470 640 500 Q960 530 1280 500 Q1600 470 1920 500" stroke={purple} strokeWidth="0.8" fill="none" opacity="0.03" />
          <path d="M0 530 Q320 500 640 530 Q960 560 1280 530 Q1600 500 1920 530" stroke={teal} strokeWidth="0.8" fill="none" opacity="0.03" />
        </svg>

        {/* Title with wave decoration */}
        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" style={{ flexShrink: 0 }}>
            <path d="M4 30 Q15 15 30 30 Q45 45 56 30" stroke={purple} strokeWidth="2" fill="none" />
            <path d="M4 38 Q15 23 30 38 Q45 53 56 38" stroke={teal} strokeWidth="1.5" fill="none" opacity="0.6" />
            <path d="M4 22 Q15 7 30 22 Q45 37 56 22" stroke={rose} strokeWidth="1" fill="none" opacity="0.4" />
          </svg>
          <div>
            {/* Wave decoration above title */}
            <svg width="240" height="10" viewBox="0 0 240 10" fill="none" style={{ marginBottom: 6 }}>
              <path d="M0 5 Q30 2 60 5 Q90 8 120 5 Q150 2 180 5 Q210 8 240 5" stroke={purple} strokeWidth="1.5" fill="none" opacity="0.4" />
              <path d="M0 5 Q30 8 60 5 Q90 2 120 5 Q150 8 180 5 Q210 2 240 5" stroke={teal} strokeWidth="1" fill="none" opacity="0.3" />
            </svg>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        {/* Cards with wave stripe style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const colors = [purple, teal, rose, amber];
            const c = colors[i % 4];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 14, boxShadow: '0 2px 8px rgba(90,62,138,0.05)', border: '1.5px solid rgba(90,62,138,0.1)', position: 'relative' }}>
                {/* Wave decoration at top of card */}
                <svg width="100%" height="8" viewBox="0 0 400 8" fill="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, opacity: 0.12 }}>
                  <path d="M0 4 Q50 1 100 4 Q150 7 200 4 Q250 1 300 4 Q350 7 400 4" stroke={c} strokeWidth="1.5" fill="none" />
                </svg>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Wave-circle number indicator */}
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="18" cy="18" r="16" stroke={c} strokeWidth="1.5" fill="none" />
                    <path d="M4 18 Q10 12 18 18 Q26 24 32 18" stroke={c} strokeWidth="1" fill="none" opacity="0.4" />
                    <text x="18" y="22" textAnchor="middle" fontSize="11" fontWeight="600" fill={c}>{String(i + 1).padStart(2, '0')}</text>
                  </svg>
                  {/* Wave separator */}
                  <svg width="100%" height="6" viewBox="0 0 200 6" fill="none" style={{ flex: 1 }}>
                    <path d="M0 3 Q25 1 50 3 Q75 5 100 3 Q125 1 150 3 Q175 5 200 3" stroke={c} strokeWidth="1.2" fill="none" opacity="0.2" />
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

export const lineArtRiley: TemplateConfig = {
  id: 'lineArtRiley',
  name: '布里奇特莱利',
  description: '波浪条纹色彩渐变，流动感',
  icon: 'waves',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtRiley, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtRiley'),
};
