import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineDashedProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineDashed: React.FC<LineDashedProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#FFFFFF', borderTop: position === 'top' ? 'none' : 'none', borderBottom: position === 'bottom' ? 'none' : 'none' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ flex: 1, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', fontWeight: 500, letterSpacing: '0.02em', color: index <= config.activeIndex ? '#111122' : '#888899', transition: 'all 0.3s ease', position: 'relative' }}>
              {label}
              <div style={{ position: 'absolute', bottom: 0, left: '15%', right: '15%', height: '2px', borderStyle: 'dashed', borderWidth: '0 0 2px 0', borderColor: index <= config.activeIndex ? '#48bb78' : 'transparent' }} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const accentColor = '#48bb78';
  const innerPadding = isSingleCard ? '40px 64px' : '32px 56px';
  const topMargin = isSingleCard ? '32px' : '28px';
  const cardPadding = isSingleCard ? '32px 36px' : '24px 28px';
  const gridGap = isSingleCard ? '28px' : '24px';

  return (
    <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f7fafc' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: innerPadding, display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: topMargin, display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ width: '4px', height: isSingleCard ? '56px' : '44px', background: `repeating-linear-gradient(to bottom, ${accentColor}, ${accentColor} 8px, transparent 8px, transparent 14px)`, borderRadius: '2px' }} />
          <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#2d3748', margin: 0 }}>{data.mainTitle}</h1>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: gridGap, alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: cardPadding, background: '#FFFFFF', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px dashed rgba(72,187,120,0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: isSingleCard ? '14px' : '12px', fontWeight: 500, color: accentColor, letterSpacing: '0.1em' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ flex: 1, height: '1px', borderStyle: 'dashed', borderWidth: '0 0 1px 0', borderColor: `rgba(72,187,120,0.2)` }} />
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

export const lineDashedTemplate: TemplateConfig = {
  id: 'lineDashed',
  name: '虚线分隔',
  description: '柔和虚线分割，轻盈而有序',
  icon: 'horizontal_distribute',
  render: (data, scale, progressBarConfig) => React.createElement(LineDashed, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineDashed'),
};
