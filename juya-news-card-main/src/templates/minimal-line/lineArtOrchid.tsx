import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtOrchidProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtOrchid: React.FC<LineArtOrchidProps> = ({ data, scale, progressBarConfig }) => {
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
    const fitTitle = () => { let size = titleConfig.initialFontSize; title.style.fontSize = size + 'px'; let guard = 0; while (title.scrollWidth > 1700 && size > titleConfig.minFontSize && guard < 100) { size -= 1; title.style.fontSize = size + 'px'; guard++; } };
    fitTitle();
    const fitViewport = () => { const maxH = 1040; if (wrapper.scrollHeight > maxH) { wrapper.style.transform = 'scale(' + Math.max(0.6, maxH / wrapper.scrollHeight) + ')'; } else { wrapper.style.transform = ''; } };
    const timer = window.setTimeout(fitViewport, 50);
    return () => window.clearTimeout(timer);
  }, [data, titleConfig]);

  const topConfig = progressBarConfig?.top;
  const bottomConfig = progressBarConfig?.bottom;

  const renderProgressBar = (position: 'top' | 'bottom') => {
    const config = position === 'top' ? topConfig : bottomConfig;
    if (!config?.show) return null;
    return (
      <div style={{ width: '100%', padding: '16px 48px', background: '#f8f2f6' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4 Q14 8 12 12 Q10 16 8 12 Q6 8 10 4" stroke={index <= config.activeIndex ? '#9a4a7a' : '#d8c0d0'} strokeWidth="1.5" fill="none" />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 300, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const orchid = '#9a4a7a';
  const mauve = '#c070a0';
  const blush = '#e0a0c8';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f8f2f6' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Orchid petal curves - top right */}
          <path d="M1700 60 Q1740 20 1780 60 Q1800 100 1760 120 Q1720 100 1700 60" stroke={orchid} strokeWidth="1.5" fill={orchid} fillOpacity="0.02" opacity="0.08" />
          <path d="M1720 80 Q1760 40 1800 80 Q1820 120 1780 140" stroke={mauve} strokeWidth="1" fill="none" opacity="0.06" />
          <path d="M1680 100 Q1700 60 1740 80" stroke={blush} strokeWidth="0.8" fill="none" opacity="0.05" />
          {/* Orchid petal curves - bottom left */}
          <path d="M120 880 Q160 840 200 880 Q220 920 180 940 Q140 920 120 880" stroke={orchid} strokeWidth="1.5" fill={orchid} fillOpacity="0.02" opacity="0.07" />
          <path d="M140 900 Q180 860 220 900" stroke={mauve} strokeWidth="1" fill="none" opacity="0.05" />
          {/* Scattered petal curves */}
          <path d="M800 60 Q820 40 840 60 Q850 80 830 90" stroke={mauve} strokeWidth="0.8" fill="none" opacity="0.04" />
          <path d="M1200 980 Q1220 960 1240 980" stroke={orchid} strokeWidth="0.8" fill="none" opacity="0.04" />
          {/* Flowing stem lines */}
          <path d="M1760 120 Q1750 200 1770 300 Q1790 400 1760 500" stroke={orchid} strokeWidth="1" fill="none" opacity="0.04" strokeLinecap="round" />
          <path d="M180 940 Q170 860 190 780" stroke={mauve} strokeWidth="0.8" fill="none" opacity="0.03" strokeLinecap="round" />
          {/* Soft wash */}
          <ellipse cx="1700" cy="200" rx="150" ry="100" fill={orchid} opacity="0.012" />
          <ellipse cx="200" cy="880" rx="120" ry="80" fill={mauve} opacity="0.012" />
        </svg>

        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0 }}>
            <path d="M28 8 Q36 16 32 28 Q28 36 24 28 Q20 16 28 8" stroke={orchid} strokeWidth="1.5" fill={orchid} fillOpacity="0.06" />
            <path d="M28 20 Q38 24 36 32 Q28 36 20 32 Q18 24 28 20" stroke={mauve} strokeWidth="1" fill="none" opacity="0.5" />
            <circle cx="28" cy="28" r="3" fill={blush} opacity="0.4" />
          </svg>
          <div>
            <svg width="180" height="10" viewBox="0 0 180 10" fill="none" style={{ marginBottom: 6 }}>
              <path d="M0 5 Q30 2 60 5 Q90 8 120 5 Q150 2 180 5" stroke={orchid} strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
            </svg>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const colors = [orchid, mauve, blush];
            const c = colors[i % 3];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 18, border: '1px solid rgba(154,74,122,0.1)', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M18 6 Q24 12 22 20 Q18 26 14 20 Q12 12 18 6" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.05" />
                    <circle cx="18" cy="18" r="3" fill={c} opacity="0.2" />
                    <text x="18" y="32" textAnchor="middle" fontSize="9" fontWeight="300" fill={c}>{String(i + 1).padStart(2, '0')}</text>
                  </svg>
                  <svg width="100%" height="6" viewBox="0 0 200 6" fill="none" style={{ flex: 1 }}>
                    <path d="M0 3 Q50 1 100 3 Q150 5 200 3" stroke={c} strokeWidth="1.2" fill="none" opacity="0.2" strokeLinecap="round" />
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

export const lineArtOrchid: TemplateConfig = {
  id: 'lineArtOrchid',
  name: '兰花',
  description: '紫粉花瓣曲线，优雅精致',
  icon: 'local_florist',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtOrchid, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtOrchid'),
};
