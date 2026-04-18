import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineParallelProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineParallel: React.FC<LineParallelProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: 'transparent', borderBottom: position === 'bottom' ? '1px solid rgba(45,106,79,0.12)' : 'none', borderTop: position === 'top' ? '1px solid rgba(45,106,79,0.12)' : 'none' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '6px', transition: 'all 0.3s ease' }}>
              <span style={{ fontSize: '26px', fontWeight: 500, letterSpacing: '0.02em', color: index <= config.activeIndex ? '#111122' : '#888899', transition: 'all 0.3s ease' }}>
                {label}
              </span>
              <div style={{ width: '60%', height: '2px', background: index <= config.activeIndex ? '#2d6a4f' : 'transparent', borderRadius: '1px' }} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const accentColor = '#2d6a4f';
  const accentLight = 'rgba(45,106,79,0.06)';
  const innerPadding = isSingleCard ? '40px 64px' : '32px 56px';
  const topMargin = isSingleCard ? '40px' : '32px';
  const cardPadding = isSingleCard ? '36px 40px' : '28px 32px';
  const gridGap = isSingleCard ? '32px' : '28px';

  return (
    <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: 'linear-gradient(180deg, #f7faf8 0%, #ffffff 50%, #f7faf8 100%)' }}>
      {renderProgressBar('top')}
      
      <div ref={wrapperRef} style={{ flex: 1, padding: innerPadding, display: 'flex', flexDirection: 'column' }}>
        {/* Title with parallel lines decoration */}
        <div style={{ marginBottom: topMargin, display: 'flex', alignItems: 'center', gap: '28px' }}>
          <svg width={isSingleCard ? '80' : '64'} height={isSingleCard ? '80' : '64'} viewBox="0 0 80 80" fill="none">
            <line x1="12" y1="16" x2="68" y2="16" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="12" y1="32" x2="68" y2="32" stroke={accentColor} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            <line x1="12" y1="48" x2="68" y2="48" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
            <line x1="12" y1="64" x2="68" y2="64" stroke={accentColor} strokeWidth="1" strokeLinecap="round" opacity="0.15" />
            <circle cx="12" cy="16" r="5" fill={accentColor} />
            <circle cx="12" cy="32" r="4" fill={accentColor} opacity="0.6" />
            <circle cx="12" cy="48" r="3" fill={accentColor} opacity="0.35" />
            <circle cx="12" cy="64" r="2" fill={accentColor} opacity="0.15" />
          </svg>
          <h1 ref={titleRef} style={{ 
            fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', 
            fontWeight: 300, 
            letterSpacing: '-0.01em', 
            lineHeight: 1.2, 
            color: '#1b4332', 
            margin: 0 
          }}>
            {data.mainTitle}
          </h1>
        </div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: gridGap, alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px', 
              padding: cardPadding, 
              background: '#FFFFFF', 
              borderRadius: '14px', 
              boxShadow: '0 2px 8px rgba(45,106,79,0.04)', 
              border: '1px solid rgba(45,106,79,0.08)', 
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Left side parallel accent lines */}
              <div style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ width: '18px', height: '2px', background: accentColor, borderRadius: '1px' }} />
                <div style={{ width: '18px', height: '2px', background: accentColor, borderRadius: '1px', opacity: 0.5 }} />
                <div style={{ width: '18px', height: '2px', background: accentColor, borderRadius: '1px', opacity: 0.25 }} />
              </div>

              {/* Card number with parallel lines */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingLeft: '48px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'center' }}>
                  <div style={{ width: '24px', height: '2px', background: accentColor, borderRadius: '1px' }} />
                  <span style={{ 
                    fontSize: isSingleCard ? '14px' : '12px', 
                    fontWeight: 600, 
                    color: accentColor, 
                    letterSpacing: '0.1em'
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div style={{ width: '24px', height: '2px', background: accentColor, borderRadius: '1px', opacity: 0.4 }} />
                </div>
                <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, rgba(45,106,79,0.15), transparent)` }} />
              </div>

              {/* Card title */}
              <h3 style={{ 
                fontSize: isSingleCard ? '48px' : '34px', 
                fontWeight: 400, 
                color: '#111122', 
                margin: 0, 
                lineHeight: 1.4 
              }}>
                {card.title}
              </h3>

              {/* Card description */}
              <p style={{ 
                fontSize: isSingleCard ? '32px' : '26px', 
                color: '#444455', 
                lineHeight: 1.8, 
                margin: 0 
              }} dangerouslySetInnerHTML={{ __html: card.desc }} />
              
              {/* Bottom parallel accent */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '4px' }}>
                <div style={{ width: '16px', height: '2px', background: accentColor, borderRadius: '1px', opacity: 0.3 }} />
                <div style={{ width: '16px', height: '2px', background: accentColor, borderRadius: '1px', opacity: 0.15 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {renderProgressBar('bottom')}
    </div>
  );
};

export const lineParallelTemplate: TemplateConfig = {
  id: 'lineParallel',
  name: '平行线条',
  description: '平行线条装饰，层次分明',
  icon: 'view_stream',
  render: (data, scale, progressBarConfig) => React.createElement(LineParallel, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineParallel'),
};