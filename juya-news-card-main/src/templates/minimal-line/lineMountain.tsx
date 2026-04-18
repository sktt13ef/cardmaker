import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineMountainProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineMountain: React.FC<LineMountainProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f8f9fa' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="36" height="14" viewBox="0 0 36 14" fill="none">
                <polyline points="2,12 10,2 18,10 26,4 34,12" stroke={index <= config.activeIndex ? '#64748b' : '#c8d0d6'} strokeWidth="2" fill="none" opacity={index <= config.activeIndex ? 0.8 : 0.3} />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 500, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const accentColor = '#64748b';
  const innerPadding = isSingleCard ? '40px 64px' : '32px 56px';
  const topMargin = isSingleCard ? '32px' : '28px';
  const cardPadding = isSingleCard ? '32px 36px' : '24px 28px';
  const gridGap = isSingleCard ? '28px' : '24px';

  return (
    <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f8f9fa' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: innerPadding, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 80, opacity: 0.15 }}>
          <svg viewBox="0 0 1920 80" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <polyline points="0,60 120,20 240,40 360,10 480,35 600,15 720,45 840,25 960,50 1080,18 1200,42 1320,12 1440,38 1560,22 1680,48 1800,28 1920,60" stroke={accentColor} strokeWidth="2" fill="none" />
          </svg>
        </div>
        <div style={{ position: 'absolute', top: 20, right: 40, opacity: 0.1 }}>
          <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
            <polyline points="4,48 20,16 36,36 52,8 68,28 84,18 96,48" stroke={accentColor} strokeWidth="1.2" fill="none" />
            <polyline points="4,52 20,24 36,40 52,14 68,32 84,22 96,52" stroke={accentColor} strokeWidth="0.6" fill="none" opacity="0.5" />
          </svg>
        </div>

        <div style={{ marginBottom: topMargin, position: 'relative' }}>
          <svg width="48" height="32" viewBox="0 0 48 32" fill="none" style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}>
            <polyline points="2,28 12,8 24,22 36,4 46,28" stroke={accentColor} strokeWidth="2" fill="none" />
          </svg>
          <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0, paddingLeft: '64px' }}>{data.mainTitle}</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: gridGap, alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: cardPadding, background: '#FFFFFF', borderRadius: '2px', boxShadow: '0 1px 4px rgba(100,116,139,0.06)', border: '1px solid rgba(100,116,139,0.12)', borderBottom: `3px solid ${accentColor}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
                  <polyline points="2,14 10,4 18,12 26,6 30,14" stroke={accentColor} strokeWidth="2" fill="none" />
                </svg>
                <div style={{ flex: 1, height: '1px', background: `rgba(100,116,139,0.15)` }} />
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

export const lineMountain: TemplateConfig = {
  id: 'lineMountain',
  name: '山脉折线',
  description: '山脉折线装饰，稳重内敛',
  icon: 'landscape',
  render: (data, scale, progressBarConfig) => React.createElement(LineMountain, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineMountain'),
};
