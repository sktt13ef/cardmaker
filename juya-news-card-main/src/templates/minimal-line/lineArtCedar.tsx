import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtCedarProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtCedar: React.FC<LineArtCedarProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f4f0ea' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <line x1="9" y1="2" x2="9" y2="16" stroke={index <= config.activeIndex ? '#6a4a2a' : '#d0c8b8'} strokeWidth="2" />
                <line x1="4" y1="8" x2="14" y2="8" stroke={index <= config.activeIndex ? '#6a4a2a' : '#d0c8b8'} strokeWidth="1" />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 400, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const bark = '#6a4a2a';
  const wood = '#8a6a4a';
  const grain = '#b89870';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f4f0ea' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Wood grain lines - vertical flowing */}
          <path d="M100 0 Q110 200 95 400 Q80 600 100 800 Q115 950 100 1080" stroke={bark} strokeWidth="1.5" fill="none" opacity="0.04" strokeLinecap="round" />
          <path d="M140 0 Q150 180 135 380 Q120 580 140 780 Q155 940 140 1080" stroke={wood} strokeWidth="1" fill="none" opacity="0.03" strokeLinecap="round" />
          <path d="M1800 0 Q1810 200 1795 400 Q1780 600 1800 800 Q1815 950 1800 1080" stroke={bark} strokeWidth="1.5" fill="none" opacity="0.04" strokeLinecap="round" />
          <path d="M1840 0 Q1850 180 1835 380 Q1820 580 1840 780" stroke={grain} strokeWidth="1" fill="none" opacity="0.03" strokeLinecap="round" />
          {/* Wood knot shapes */}
          <ellipse cx="120" cy="500" rx="20" ry="15" stroke={bark} strokeWidth="1" fill="none" opacity="0.04" />
          <ellipse cx="1810" cy="600" rx="18" ry="12" stroke={wood} strokeWidth="0.8" fill="none" opacity="0.03" />
          {/* Horizontal grain lines */}
          <path d="M0 300 Q200 290 400 300 Q600 310 800 300" stroke={grain} strokeWidth="0.5" fill="none" opacity="0.03" />
          <path d="M1120 700 Q1320 690 1520 700 Q1720 710 1920 700" stroke={wood} strokeWidth="0.5" fill="none" opacity="0.03" />
          {/* Warm wood wash */}
          <rect x="0" y="0" width="200" height="1080" fill={bark} opacity="0.008" />
          <rect x="1720" y="0" width="200" height="1080" fill={wood} opacity="0.008" />
        </svg>

        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0 }}>
            <rect x="18" y="4" width="20" height="48" stroke={bark} strokeWidth="2" fill={bark} fillOpacity="0.04" rx="2" />
            <line x1="18" y1="18" x2="38" y2="18" stroke={wood} strokeWidth="1" opacity="0.4" />
            <line x1="18" y1="32" x2="38" y2="32" stroke={wood} strokeWidth="1" opacity="0.3" />
            <ellipse cx="28" cy="25" rx="5" ry="3" stroke={grain} strokeWidth="0.8" fill="none" opacity="0.3" />
          </svg>
          <div>
            <svg width="180" height="10" viewBox="0 0 180 10" fill="none" style={{ marginBottom: 6 }}>
              <path d="M0 5 Q45 3 90 5 Q135 7 180 5" stroke={bark} strokeWidth="2" fill="none" opacity="0.25" strokeLinecap="round" />
            </svg>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const colors = [bark, wood, grain];
            const c = colors[i % 3];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 8, border: '1.5px solid rgba(106,74,42,0.12)', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
                    <rect x="12" y="4" width="12" height="28" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.04" rx="1" />
                    <line x1="12" y1="14" x2="24" y2="14" stroke={c} strokeWidth="0.8" opacity="0.4" />
                    <line x1="12" y1="22" x2="24" y2="22" stroke={c} strokeWidth="0.8" opacity="0.3" />
                    <text x="18" y="32" textAnchor="middle" fontSize="8" fontWeight="400" fill={c}>{String(i + 1).padStart(2, '0')}</text>
                  </svg>
                  <svg width="100%" height="6" viewBox="0 0 200 6" fill="none" style={{ flex: 1 }}>
                    <path d="M0 3 Q50 2 100 3 Q150 4 200 3" stroke={c} strokeWidth="1.5" fill="none" opacity="0.18" strokeLinecap="round" />
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

export const lineArtCedar: TemplateConfig = {
  id: 'lineArtCedar',
  name: '雪松',
  description: '木纹线条棕色系，自然温暖',
  icon: 'park',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtCedar, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtCedar'),
};
