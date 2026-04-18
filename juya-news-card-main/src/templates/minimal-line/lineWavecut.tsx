import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineWavecutProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineWavecut: React.FC<LineWavecutProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f7fafb' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="36" height="12" viewBox="0 0 36 12" fill="none">
                <path d="M2 6 Q9 0 18 6 Q27 12 34 6" stroke={index <= config.activeIndex ? '#388098' : '#c0d8df'} strokeWidth="1.5" fill="none" opacity={index <= config.activeIndex ? 0.8 : 0.3} />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 500, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const accentColor = '#388098';
  const innerPadding = isSingleCard ? '40px 64px' : '32px 56px';
  const topMargin = isSingleCard ? '32px' : '28px';
  const cardPadding = isSingleCard ? '32px 36px' : '24px 28px';
  const gridGap = isSingleCard ? '28px' : '24px';

  return (
    <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f7fafb' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: innerPadding, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 60, opacity: 0.1 }}>
          <svg viewBox="0 0 1920 60" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0 30 Q240 10 480 30 Q720 50 960 30 Q1200 10 1440 30 Q1680 50 1920 30" stroke={accentColor} strokeWidth="1.5" fill="none" />
            <path d="M0 30 Q240 50 480 30 Q720 10 960 30 Q1200 50 1440 30 Q1680 10 1920 30" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.6" />
          </svg>
        </div>
        <div style={{ position: 'absolute', bottom: 30, right: 40, opacity: 0.08 }}>
          <svg width="160" height="80" viewBox="0 0 160 80" fill="none">
            <path d="M0 40 Q20 20 40 40 Q60 60 80 40 Q100 20 120 40 Q140 60 160 40" stroke={accentColor} strokeWidth="2" fill="none" />
            <path d="M0 40 Q20 60 40 40 Q60 20 80 40 Q100 60 120 40 Q140 20 160 40" stroke={accentColor} strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        <div style={{ marginBottom: topMargin, position: 'relative' }}>
          <svg width="56" height="12" viewBox="0 0 56 12" fill="none" style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}>
            <path d="M2 6 Q15 0 28 6 Q41 12 54 6" stroke={accentColor} strokeWidth="2" fill="none" />
          </svg>
          <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0, paddingLeft: '76px' }}>{data.mainTitle}</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: gridGap, alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: cardPadding, background: '#FFFFFF', borderRadius: 0, boxShadow: '0 1px 4px rgba(56,128,152,0.06)', border: `1.5px solid rgba(56,128,152,0.15)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                  <path d="M2 6 Q8 0 16 6 Q24 12 30 6" stroke={accentColor} strokeWidth="2" fill="none" />
                </svg>
                <div style={{ flex: 1, height: '1px', background: `rgba(56,128,152,0.15)` }} />
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

export const lineWavecut: TemplateConfig = {
  id: 'lineWavecut',
  name: '曲线分割',
  description: '波浪曲线分隔，清澈流动',
  icon: 'waves',
  render: (data, scale, progressBarConfig) => React.createElement(LineWavecut, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineWavecut'),
};
