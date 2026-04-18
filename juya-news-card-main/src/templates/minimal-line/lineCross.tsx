import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineCrossProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineCross: React.FC<LineCrossProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: 'transparent', borderBottom: position === 'bottom' ? '1px solid rgba(220,38,38,0.15)' : 'none', borderTop: position === 'top' ? '1px solid rgba(220,38,38,0.15)' : 'none' }}>
        <div style={{ display: 'flex', gap: 0 }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <React.Fragment key={index}>
              <div style={{ flex: 1, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '26px', fontWeight: 500, letterSpacing: '0.02em', color: index <= config.activeIndex ? '#111122' : '#888899', transition: 'all 0.3s ease' }}>
                {index <= config.activeIndex && (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <line x1="9" y1="3" x2="9" y2="15" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
                    <line x1="3" y1="9" x2="15" y2="9" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="9" cy="9" r="3" fill="#dc2626" opacity="0.3" />
                  </svg>
                )}
                {label}
              </div>
              {index < config.segmentCount - 1 && (
                <div style={{ width: '1px', height: '36px', background: 'linear-gradient(180deg, transparent, #e0d0d0, transparent)' }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const accentColor = '#dc2626';
  const accentLight = 'rgba(220,38,38,0.08)';
  const innerPadding = isSingleCard ? '40px 64px' : '32px 56px';
  const topMargin = isSingleCard ? '40px' : '32px';
  const cardPadding = isSingleCard ? '36px 40px' : '28px 32px';
  const gridGap = isSingleCard ? '32px' : '28px';

  return (
    <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#fdfbfa' }}>
      {renderProgressBar('top')}
      
      <div ref={wrapperRef} style={{ flex: 1, padding: innerPadding, display: 'flex', flexDirection: 'column' }}>
        {/* Title with cross decoration */}
        <div style={{ marginBottom: topMargin, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '24px', position: 'relative' }}>
            {/* Decorative cross symbol */}
            <svg width={isSingleCard ? '72' : '56'} height={isSingleCard ? '72' : '56'} viewBox="0 0 72 72" fill="none">
              <circle cx="36" cy="36" r="28" stroke={accentColor} strokeWidth="1.5" opacity="0.2" />
              <circle cx="36" cy="36" r="16" stroke={accentColor} strokeWidth="1.5" opacity="0.4" />
              <line x1="36" y1="8" x2="36" y2="64" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="36" x2="64" y2="36" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
              <circle cx="36" cy="8" r="3" fill={accentColor} />
              <circle cx="36" cy="64" r="3" fill={accentColor} />
              <circle cx="8" cy="36" r="3" fill={accentColor} />
              <circle cx="64" cy="36" r="3" fill={accentColor} />
            </svg>
            <h1 ref={titleRef} style={{ 
              fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', 
              fontWeight: 300, 
              letterSpacing: '-0.01em', 
              lineHeight: 1.2, 
              color: '#991b1b', 
              margin: 0 
            }}>
              {data.mainTitle}
            </h1>
          </div>
          {/* Subtle horizontal line under title */}
          <div style={{ 
            width: '120px', 
            height: '2px', 
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`, 
            margin: '16px auto 0' 
          }} />
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
              borderRadius: '12px', 
              boxShadow: '0 2px 8px rgba(220,38,38,0.04)', 
              border: '1px solid rgba(220,38,38,0.08)', 
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Top cross accent line */}
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '1px', background: accentColor, opacity: 0.3 }} />
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <line x1="6" y1="2" x2="6" y2="10" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="2" y1="6" x2="10" y2="6" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div style={{ width: '32px', height: '1px', background: accentColor, opacity: 0.3 }} />
              </div>

              {/* Card number with cross accent */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '8px' }}>
                <span style={{ 
                  fontSize: isSingleCard ? '14px' : '12px', 
                  fontWeight: 600, 
                  color: accentColor, 
                  letterSpacing: '0.12em',
                  position: 'relative',
                  paddingLeft: '20px'
                }}>
                  <span style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <line x1="7" y1="3" x2="7" y2="11" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="3" y1="7" x2="11" y2="7" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${accentColor}20, transparent)` }} />
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
              
              {/* Bottom decorative accent */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '4px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: accentColor, opacity: 0.4 }} />
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: accentColor, opacity: 0.2 }} />
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: accentColor, opacity: 0.4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {renderProgressBar('bottom')}
    </div>
  );
};

export const lineCrossTemplate: TemplateConfig = {
  id: 'lineCross',
  name: '十字对称',
  description: '十字对称装饰，平衡典雅',
  icon: 'border_inner',
  render: (data, scale, progressBarConfig) => React.createElement(LineCross, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineCross'),
};