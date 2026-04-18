import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtSlateProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtSlate: React.FC<LineArtSlateProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f0f0f2' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 18, height: 18, background: index <= config.activeIndex ? '#4a4a5a' : 'transparent', border: '1px solid ' + (index <= config.activeIndex ? '#4a4a5a' : '#c8c8d0'), opacity: index <= config.activeIndex ? 0.6 : 0.3 }} />
              <span style={{ fontSize: '26px', fontWeight: 400, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const slate = '#4a4a5a';
  const steel = '#6a6a7a';
  const silver = '#9a9aa8';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f0f0f2' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Stone texture lines - horizontal stratification */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <line key={'h' + i} x1="0" y1={100 + i * 180} x2="300" y2={100 + i * 180} stroke={slate} strokeWidth="0.8" opacity="0.04" />
          ))}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <line key={'hr' + i} x1="1620" y1={100 + i * 180} x2="1920" y2={100 + i * 180} stroke={slate} strokeWidth="0.8" opacity="0.04" />
          ))}
          {/* Stone block shapes */}
          <rect x="1660" y="60" width="200" height="120" stroke={slate} strokeWidth="1" fill="none" opacity="0.04" />
          <rect x="1680" y="80" width="160" height="80" stroke={steel} strokeWidth="0.6" fill="none" opacity="0.03" />
          <rect x="40" y="840" width="180" height="100" stroke={slate} strokeWidth="1" fill="none" opacity="0.04" />
          {/* Subtle stone wash */}
          <rect x="0" y="0" width="250" height="1080" fill={slate} opacity="0.008" />
          <rect x="1670" y="0" width="250" height="1080" fill={steel} opacity="0.008" />
        </svg>

        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0 }}>
            <rect x="6" y="6" width="44" height="44" stroke={slate} strokeWidth="2" fill={slate} fillOpacity="0.04" />
            <rect x="14" y="14" width="28" height="28" stroke={steel} strokeWidth="1" fill="none" opacity="0.4" />
            <line x1="6" y1="28" x2="50" y2="28" stroke={silver} strokeWidth="0.5" opacity="0.3" />
          </svg>
          <div>
            <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
              {[0, 1, 2, 3, 4].map(j => (
                <div key={j} style={{ width: 30, height: 2, background: slate, opacity: 0.15 + j * 0.03 }} />
              ))}
            </div>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const colors = [slate, steel, silver];
            const c = colors[i % 3];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 2, border: '1px solid rgba(74,74,90,0.12)', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: 34, height: 34, background: c, opacity: 0.1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: isSingleCard ? '14px' : '12px', fontWeight: 400, color: slate }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div style={{ flex: 1, display: 'flex', gap: 3, alignItems: 'center' }}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(j => (
                      <div key={j} style={{ flex: 1, height: '1.5px', background: c, opacity: 0.1 }} />
                    ))}
                  </div>
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

export const lineArtSlate: TemplateConfig = {
  id: 'lineArtSlate',
  name: '石板灰',
  description: '灰色调石材纹理，沉稳大气',
  icon: 'crop_square',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtSlate, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtSlate'),
};
