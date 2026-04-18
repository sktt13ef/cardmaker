import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtSageProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtSage: React.FC<LineArtSageProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f2f4f0' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4 Q14 8 12 12 Q10 16 8 12 Q6 8 10 4" stroke={index <= config.activeIndex ? '#6b8c5a' : '#c8d4c0'} strokeWidth="1.5" fill="none" />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 300, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const sage = '#6b8c5a';
  const olive = '#8aa070';
  const mint = '#a8c898';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f2f4f0' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Plant stem lines - right side */}
          <path d="M1800 0 Q1780 100 1800 200 Q1820 300 1790 400 Q1770 500 1800 600" stroke={sage} strokeWidth="2" fill="none" opacity="0.05" strokeLinecap="round" />
          <path d="M1800 200 Q1840 180 1860 200 Q1870 220 1850 230" stroke={olive} strokeWidth="1" fill="none" opacity="0.04" strokeLinecap="round" />
          <path d="M1790 400 Q1750 380 1740 400 Q1735 420 1755 425" stroke={mint} strokeWidth="0.8" fill="none" opacity="0.04" strokeLinecap="round" />
          {/* Plant stem - left side */}
          <path d="M80 1080 Q100 960 80 840 Q60 720 80 600" stroke={sage} strokeWidth="1.5" fill="none" opacity="0.04" strokeLinecap="round" />
          <path d="M80 840 Q40 820 30 800" stroke={olive} strokeWidth="0.8" fill="none" opacity="0.03" strokeLinecap="round" />
          <path d="M80 720 Q120 700 130 680" stroke={mint} strokeWidth="0.8" fill="none" opacity="0.03" strokeLinecap="round" />
          {/* Leaf shapes scattered */}
          <path d="M600 80 Q620 60 640 80 Q620 100 600 80" stroke={sage} strokeWidth="0.8" fill={sage} fillOpacity="0.03" opacity="0.06" />
          <path d="M1300 950 Q1320 930 1340 950 Q1320 970 1300 950" stroke={olive} strokeWidth="0.6" fill="none" opacity="0.04" />
          {/* Gentle green wash */}
          <ellipse cx="1700" cy="300" rx="180" ry="120" fill={sage} opacity="0.012" />
          <ellipse cx="200" cy="800" rx="150" ry="100" fill={olive} opacity="0.012" />
        </svg>

        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0 }}>
            <path d="M28 48 Q28 30 28 20" stroke={sage} strokeWidth="2" strokeLinecap="round" />
            <path d="M28 30 Q18 22 14 28 Q18 34 28 30" stroke={olive} strokeWidth="1.5" fill={olive} fillOpacity="0.1" />
            <path d="M28 20 Q38 12 42 18 Q38 24 28 20" stroke={mint} strokeWidth="1.5" fill={mint} fillOpacity="0.1" />
          </svg>
          <div>
            <svg width="180" height="10" viewBox="0 0 180 10" fill="none" style={{ marginBottom: 6 }}>
              <path d="M0 5 Q30 2 60 5 Q90 8 120 5 Q150 2 180 5" stroke={sage} strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
            </svg>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const colors = [sage, olive, mint];
            const c = colors[i % 3];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 14, border: '1px solid rgba(107,140,90,0.12)', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M18 30 Q18 20 18 14" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M18 22 Q12 16 10 20 Q12 24 18 22" stroke={c} strokeWidth="1" fill={c} fillOpacity="0.08" />
                    <path d="M18 16 Q24 10 26 14 Q24 18 18 16" stroke={c} strokeWidth="1" fill={c} fillOpacity="0.06" />
                    <text x="18" y="34" textAnchor="middle" fontSize="9" fontWeight="300" fill={c}>{String(i + 1).padStart(2, '0')}</text>
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

export const lineArtSage: TemplateConfig = {
  id: 'lineArtSage',
  name: '鼠尾草绿',
  description: '柔和绿色植物线条，自然清新',
  icon: 'eco',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtSage, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtSage'),
};
