import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtIndigoProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtIndigo: React.FC<LineArtIndigoProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f0f0f6' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 16, height: 16, borderRadius: 2, background: index <= config.activeIndex ? '#2a2a6a' : 'transparent', border: '1.5px solid ' + (index <= config.activeIndex ? '#2a2a6a' : '#c0c0d8'), opacity: index <= config.activeIndex ? 0.6 : 0.3 }} />
              <span style={{ fontSize: '26px', fontWeight: 400, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const indigo = '#2a2a6a';
  const navy = '#3a3a8a';
  const periwinkle = '#7070b0';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f0f0f6' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Indigo dye pattern - resist dye geometric shapes */}
          <rect x="1660" y="40" width="120" height="80" stroke={indigo} strokeWidth="1.5" fill={indigo} fillOpacity="0.02" opacity="0.07" />
          <rect x="1680" y="60" width="80" height="40" stroke={navy} strokeWidth="0.8" fill="none" opacity="0.05" />
          {/* Repeating pattern blocks - bottom left */}
          <rect x="40" y="840" width="60" height="60" stroke={indigo} strokeWidth="1" fill={indigo} fillOpacity="0.015" opacity="0.06" />
          <rect x="110" y="840" width="60" height="60" stroke={navy} strokeWidth="0.8" fill="none" opacity="0.04" />
          <rect x="40" y="910" width="60" height="60" stroke={periwinkle} strokeWidth="0.6" fill="none" opacity="0.04" />
          {/* Shibori-style circle patterns */}
          <circle cx="1750" cy="400" r="60" stroke={indigo} strokeWidth="1" fill="none" opacity="0.04" />
          <circle cx="1750" cy="400" r="40" stroke={navy} strokeWidth="0.8" fill="none" opacity="0.03" />
          <circle cx="1750" cy="400" r="20" stroke={periwinkle} strokeWidth="0.6" fill={indigo} fillOpacity="0.01" opacity="0.03" />
          {/* Stitch resist lines */}
          <path d="M0 300 Q100 280 200 300 Q300 320 400 300" stroke={indigo} strokeWidth="0.8" fill="none" opacity="0.03" strokeDasharray="8 4" />
          <path d="M1520 700 Q1620 680 1720 700 Q1820 720 1920 700" stroke={navy} strokeWidth="0.8" fill="none" opacity="0.03" strokeDasharray="8 4" />
          {/* Deep indigo wash */}
          <rect x="0" y="0" width="200" height="1080" fill={indigo} opacity="0.01" />
          <rect x="1720" y="0" width="200" height="1080" fill={indigo} opacity="0.01" />
        </svg>

        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0 }}>
            <rect x="8" y="8" width="40" height="40" stroke={indigo} strokeWidth="2" fill={indigo} fillOpacity="0.04" />
            <rect x="16" y="16" width="24" height="24" stroke={navy} strokeWidth="1" fill="none" opacity="0.4" />
            <circle cx="28" cy="28" r="6" stroke={periwinkle} strokeWidth="0.8" fill="none" opacity="0.4" />
          </svg>
          <div>
            <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
              {[0, 1, 2, 3, 4, 5].map(j => (
                <div key={j} style={{ width: 20, height: 3, background: indigo, opacity: 0.1 + j * 0.04 }} />
              ))}
            </div>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 400, letterSpacing: '0.02em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const colors = [indigo, navy, periwinkle];
            const c = colors[i % 3];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 4, border: '1.5px solid rgba(42,42,106,0.1)', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 2, border: '1.5px solid ' + c, display: 'flex', alignItems: 'center', justifyContent: 'center', background: c, opacity: 0.08 }}>
                    <span style={{ fontSize: isSingleCard ? '14px' : '12px', fontWeight: 400, color: c }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div style={{ flex: 1, height: '1.5px', background: c, opacity: 0.12, strokeDasharray: '4 2' }} />
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

export const lineArtIndigo: TemplateConfig = {
  id: 'lineArtIndigo',
  name: '靛蓝',
  description: '深蓝靛蓝染料质感，民族风',
  icon: 'checkroom',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtIndigo, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtIndigo'),
};
