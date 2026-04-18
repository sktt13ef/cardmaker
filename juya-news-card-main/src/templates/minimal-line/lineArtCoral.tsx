import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtCoralProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtCoral: React.FC<LineArtCoralProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#faf5f2' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2 Q14 6 12 10 Q16 8 18 12 Q14 14 10 18 Q6 14 2 12 Q4 8 8 10 Q6 6 10 2" stroke={index <= config.activeIndex ? '#e07060' : '#e0c8c0'} strokeWidth="1.5" fill="none" />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 400, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const coral = '#e07060';
  const sand = '#d4a878';
  const seafoam = '#7ab8a8';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#faf5f2' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Coral full-screen branching lines, ocean feel, warm tones */}
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Large coral branch - top right */}
          <path d="M1700 0 Q1680 80 1720 160 Q1740 200 1700 260" stroke={coral} strokeWidth="2" fill="none" opacity="0.08" strokeLinecap="round" />
          <path d="M1720 160 Q1760 140 1800 160 Q1820 180 1800 200" stroke={coral} strokeWidth="1.5" fill="none" opacity="0.06" strokeLinecap="round" />
          <path d="M1700 260 Q1660 280 1640 320" stroke={coral} strokeWidth="1" fill="none" opacity="0.05" strokeLinecap="round" />
          <path d="M1700 260 Q1740 280 1760 320" stroke={sand} strokeWidth="1" fill="none" opacity="0.05" strokeLinecap="round" />
          {/* Coral branch - bottom left */}
          <path d="M100 1080 Q120 980 80 900 Q60 860 90 800" stroke={coral} strokeWidth="2" fill="none" opacity="0.07" strokeLinecap="round" />
          <path d="M80 900 Q40 880 20 840" stroke={sand} strokeWidth="1.5" fill="none" opacity="0.05" strokeLinecap="round" />
          <path d="M80 900 Q120 880 140 840" stroke={seafoam} strokeWidth="1" fill="none" opacity="0.05" strokeLinecap="round" />
          <path d="M90 800 Q60 780 50 740" stroke={coral} strokeWidth="1" fill="none" opacity="0.04" strokeLinecap="round" />
          <path d="M90 800 Q120 780 140 740" stroke={sand} strokeWidth="0.8" fill="none" opacity="0.04" strokeLinecap="round" />
          {/* Small coral branches scattered */}
          <path d="M500 80 Q520 120 500 160 Q480 180 500 200" stroke={seafoam} strokeWidth="1" fill="none" opacity="0.04" strokeLinecap="round" />
          <path d="M1400 900 Q1420 860 1400 820" stroke={coral} strokeWidth="0.8" fill="none" opacity="0.04" strokeLinecap="round" />
          {/* Bubble dots */}
          <circle cx="1750" cy="100" r="6" stroke={seafoam} strokeWidth="0.8" fill="none" opacity="0.06" />
          <circle cx="1780" cy="140" r="4" stroke={seafoam} strokeWidth="0.6" fill="none" opacity="0.05" />
          <circle cx="60" cy="860" r="5" stroke={seafoam} strokeWidth="0.6" fill="none" opacity="0.05" />
          <circle cx="40" cy="830" r="3" stroke={seafoam} strokeWidth="0.5" fill="none" opacity="0.04" />
          {/* Wavy sea floor line */}
          <path d="M0 950 Q200 930 400 950 Q600 970 800 950 Q1000 930 1200 950 Q1400 970 1600 950 Q1800 930 1920 950" stroke={sand} strokeWidth="0.8" fill="none" opacity="0.04" />
        </svg>

        {/* Title with coral branch decoration */}
        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" style={{ flexShrink: 0 }}>
            <path d="M30 56 Q28 40 30 30 Q26 20 20 14" stroke={coral} strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M30 30 Q36 20 42 14" stroke={coral} strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M30 40 Q22 36 16 38" stroke={sand} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M30 40 Q38 36 44 38" stroke={seafoam} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
            <circle cx="20" cy="12" r="3" stroke={seafoam} strokeWidth="0.8" fill="none" opacity="0.5" />
            <circle cx="42" cy="12" r="3" stroke={seafoam} strokeWidth="0.8" fill="none" opacity="0.5" />
          </svg>
          <div>
            <svg width="200" height="10" viewBox="0 0 200 10" fill="none" style={{ marginBottom: 6 }}>
              <path d="M0 5 Q40 2 80 5 Q120 8 160 5 Q190 3 200 5" stroke={coral} strokeWidth="1.5" fill="none" opacity="0.35" strokeLinecap="round" />
            </svg>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        {/* Cards with coral style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const colors = [coral, sand, seafoam];
            const c = colors[i % 3];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 12, boxShadow: '0 2px 8px rgba(224,112,96,0.05)', border: '1px solid rgba(224,112,96,0.1)', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Coral branch number indicator */}
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M18 32 Q16 24 18 18 Q14 12 10 8" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <path d="M18 18 Q22 12 26 8" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <text x="18" y="28" textAnchor="middle" fontSize="10" fontWeight="400" fill={c}>{String(i + 1).padStart(2, '0')}</text>
                  </svg>
                  {/* Branching separator */}
                  <svg width="100%" height="6" viewBox="0 0 200 6" fill="none" style={{ flex: 1 }}>
                    <path d="M0 3 Q50 1 100 3 Q150 5 200 3" stroke={c} strokeWidth="1.2" fill="none" opacity="0.2" strokeLinecap="round" />
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

export const lineArtCoral: TemplateConfig = {
  id: 'lineArtCoral',
  name: '珊瑚色系',
  description: '珊瑚分支线条海洋感，温暖色调',
  icon: 'bubble_chart',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtCoral, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtCoral'),
};
