import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineFrameProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineFrame: React.FC<LineFrameProps> = ({ data, scale, progressBarConfig }) => {
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
      if (wrapper.scrollHeight > maxH) { wrapper.style.transform = `scale(${Math.max(0.6, maxH / wrapper.scrollHeight)})`; }
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#fdfbf8' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" stroke={index <= config.activeIndex ? '#a07850' : '#d8c8b0'} strokeWidth="1.5" fill="none" opacity={index <= config.activeIndex ? 0.8 : 0.3} />
                <rect x="6" y="6" width="12" height="12" stroke={index <= config.activeIndex ? '#a07850' : '#d8c8b0'} strokeWidth="1" fill="none" opacity={index <= config.activeIndex ? 0.6 : 0.2} />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 500, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const accentColor = '#a07850';
  const innerPadding = isSingleCard ? '40px 64px' : '32px 56px';
  const topMargin = isSingleCard ? '32px' : '28px';
  const cardPadding = isSingleCard ? '32px 36px' : '24px 28px';
  const gridGap = isSingleCard ? '28px' : '24px';

  return (
    <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#fdfbf8' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: innerPadding, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 16, right: 32, opacity: 0.12 }}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <rect x="2" y="2" width="76" height="76" stroke={accentColor} strokeWidth="1" />
            <rect x="10" y="10" width="60" height="60" stroke={accentColor} strokeWidth="0.7" opacity="0.6" />
            <rect x="18" y="18" width="44" height="44" stroke={accentColor} strokeWidth="0.4" opacity="0.4" />
            <rect x="26" y="26" width="28" height="28" stroke={accentColor} strokeWidth="0.3" opacity="0.3" />
          </svg>
        </div>
        <div style={{ position: 'absolute', bottom: 24, left: 32, opacity: 0.1 }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <rect x="0" y="0" width="64" height="64" stroke={accentColor} strokeWidth="1.2" />
            <rect x="8" y="8" width="48" height="48" stroke={accentColor} strokeWidth="0.8" />
            <rect x="16" y="16" width="32" height="32" stroke={accentColor} strokeWidth="0.4" />
          </svg>
        </div>

        <div style={{ marginBottom: topMargin, position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}>
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <rect x="2" y="2" width="52" height="52" stroke={accentColor} strokeWidth="1.2" />
              <rect x="8" y="8" width="40" height="40" stroke={accentColor} strokeWidth="0.8" opacity="0.6" />
            </svg>
          </div>
          <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0, paddingLeft: '76px' }}>{data.mainTitle}</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: gridGap, alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: cardPadding, background: '#FFFFFF', borderRadius: 0, boxShadow: '0 1px 4px rgba(160,120,80,0.06)', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, border: `1px solid rgba(160,120,80,0.2)`, borderRadius: 0, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: 4, border: `0.5px solid rgba(160,120,80,0.1)`, borderRadius: 0, pointerEvents: 'none' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: 32, height: 32, border: `2px solid ${accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: isSingleCard ? '14px' : '12px', fontWeight: 600, color: accentColor }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div style={{ flex: 1, height: '1px', background: `rgba(160,120,80,0.15)` }} />
              </div>
              <h3 style={{ fontSize: isSingleCard ? '48px' : '34px', fontWeight: 400, color: '#111122', margin: 0, lineHeight: 1.4 }}>{card.title}</h3>
              <p style={{ fontSize: isSingleCard ? '32px' : '26px', color: '#444455', lineHeight: 1.8, margin: 0 }} dangerouslySetInnerHTML={{ __html: card.desc }} />
            </div>
          ))}
        </div>
      </div>
      {renderProgressBar('bottom')}
    </div>
  );
};

export const lineFrameArt: TemplateConfig = {
  id: 'lineFrameArt',
  name: '极简边框',
  description: '嵌套矩形边框，古铜质感',
  icon: 'crop_square',
  render: (data, scale, progressBarConfig) => React.createElement(LineFrame, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineFrameArt'),
};
