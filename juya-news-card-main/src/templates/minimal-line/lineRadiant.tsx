import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineRadiantProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineRadiant: React.FC<LineRadiantProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#fefcf6' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="4" fill={index <= config.activeIndex ? '#bf9443' : '#e0d5b8'} opacity={index <= config.activeIndex ? 0.8 : 0.3} />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <line key={i} x1="12" y1="3" x2="12" y2="7" stroke={index <= config.activeIndex ? '#bf9443' : '#e0d5b8'} strokeWidth="1" transform={`rotate(${angle} 12 12)`} opacity={index <= config.activeIndex ? 0.6 : 0.2} />
                ))}
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 500, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const accentColor = '#bf9443';
  const innerPadding = isSingleCard ? '40px 64px' : '32px 56px';
  const topMargin = isSingleCard ? '32px' : '28px';
  const cardPadding = isSingleCard ? '32px 36px' : '24px 28px';
  const gridGap = isSingleCard ? '28px' : '24px';

  return (
    <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#fefcf6' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: innerPadding, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.06 }}>
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <line key={i} x1="100" y1="10" x2="100" y2="190" stroke={accentColor} strokeWidth="1" transform={`rotate(${angle} 100 100)`} />
            ))}
            <circle cx="100" cy="100" r="30" stroke={accentColor} strokeWidth="1" fill="none" />
            <circle cx="100" cy="100" r="60" stroke={accentColor} strokeWidth="0.5" fill="none" />
          </svg>
        </div>
        <div style={{ position: 'absolute', top: 16, right: 24, opacity: 0.15 }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            {[0, 30, 60, 90, 120, 150].map((angle, i) => (
              <line key={i} x1="32" y1="4" x2="32" y2="28" stroke={accentColor} strokeWidth="0.8" transform={`rotate(${angle} 32 32)`} />
            ))}
          </svg>
        </div>

        <div style={{ marginBottom: topMargin, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '56px', height: '3px', background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
          <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0, paddingLeft: '0', paddingTop: '16px' }}>{data.mainTitle}</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: gridGap, alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: cardPadding, background: '#FFFFFF', borderRadius: '2px', boxShadow: '0 1px 4px rgba(191,148,67,0.06)', border: '1px solid rgba(191,148,67,0.15)', borderTop: `3px solid ${accentColor}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: isSingleCard ? '13px' : '11px', fontWeight: 700, color: '#ffffff' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div style={{ flex: 1, height: '1px', background: `rgba(191,148,67,0.2)` }} />
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

export const lineRadiant: TemplateConfig = {
  id: 'lineRadiant',
  name: '放射光芒',
  description: '放射状线条，温暖光芒',
  icon: 'wb_sunny',
  render: (data, scale, progressBarConfig) => React.createElement(LineRadiant, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineRadiant'),
};
