import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtTerracottaProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtTerracotta: React.FC<LineArtTerracottaProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f6f0ea' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 18, height: 18, borderRadius: 4, background: index <= config.activeIndex ? '#a0522d' : 'transparent', border: '1.5px solid ' + (index <= config.activeIndex ? '#a0522d' : '#d8c8b8'), opacity: index <= config.activeIndex ? 0.7 : 0.3 }} />
              <span style={{ fontSize: '26px', fontWeight: 400, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const terra = '#a0522d';
  const clay = '#c87850';
  const sand = '#d8b898';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f6f0ea' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Organic texture lines - top right */}
          <path d="M1500 40 Q1580 60 1620 40 Q1680 20 1740 50 Q1800 80 1860 50" stroke={terra} strokeWidth="2" fill="none" opacity="0.06" strokeLinecap="round" />
          <path d="M1520 80 Q1580 100 1640 80 Q1700 60 1760 90" stroke={clay} strokeWidth="1.5" fill="none" opacity="0.05" strokeLinecap="round" />
          {/* Handmade texture marks - bottom left */}
          <path d="M60 840 Q100 820 140 840 Q180 860 220 840" stroke={terra} strokeWidth="2" fill="none" opacity="0.06" strokeLinecap="round" />
          <path d="M80 880 Q120 860 160 880 Q200 900 240 880" stroke={sand} strokeWidth="1" fill="none" opacity="0.05" strokeLinecap="round" />
          {/* Scattered organic marks */}
          <path d="M800 60 Q840 40 880 60" stroke={clay} strokeWidth="1" fill="none" opacity="0.04" strokeLinecap="round" />
          <path d="M1200 980 Q1240 960 1280 980" stroke={terra} strokeWidth="1" fill="none" opacity="0.04" strokeLinecap="round" />
          {/* Warm earth wash */}
          <ellipse cx="1700" cy="200" rx="200" ry="150" fill={terra} opacity="0.015" />
          <ellipse cx="200" cy="880" rx="180" ry="120" fill={clay} opacity="0.015" />
        </svg>

        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0 }}>
            <rect x="8" y="8" width="40" height="40" rx="4" stroke={terra} strokeWidth="2" fill={terra} fillOpacity="0.06" />
            <path d="M16 28 Q28 20 40 28 Q28 36 16 28" stroke={clay} strokeWidth="1.5" fill="none" opacity="0.5" />
          </svg>
          <div>
            <svg width="180" height="10" viewBox="0 0 180 10" fill="none" style={{ marginBottom: 6 }}>
              <path d="M0 5 Q45 2 90 5 Q135 8 180 5" stroke={terra} strokeWidth="2" fill="none" opacity="0.3" strokeLinecap="round" />
            </svg>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const colors = [terra, clay, sand];
            const c = colors[i % 3];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 6, border: '1.5px solid rgba(160,82,45,0.12)', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 4, border: '1.5px solid ' + c, display: 'flex', alignItems: 'center', justifyContent: 'center', background: c, opacity: 0.1 }}>
                    <span style={{ fontSize: isSingleCard ? '14px' : '12px', fontWeight: 400, color: c, opacity: 8 }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <svg width="100%" height="6" viewBox="0 0 200 6" fill="none" style={{ flex: 1 }}>
                    <path d="M0 3 Q50 1 100 3 Q150 5 200 3" stroke={c} strokeWidth="1.5" fill="none" opacity="0.2" strokeLinecap="round" />
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

export const lineArtTerracotta: TemplateConfig = {
  id: 'lineArtTerracotta',
  name: '陶土',
  description: '赤陶色调手工质感，有机纹理',
  icon: 'cottage',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtTerracotta, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtTerracotta'),
};
