import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineDiamondProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineDiamond: React.FC<LineDiamondProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#fdf8fa' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                <polygon points="16,1 31,11 16,11 1,11" fill={index <= config.activeIndex ? '#8b4563' : '#e0d5d8'} opacity={index <= config.activeIndex ? 0.8 : 0.3} />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 500, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const accentColor = '#8b4563';
  const innerPadding = isSingleCard ? '40px 64px' : '32px 56px';
  const topMargin = isSingleCard ? '32px' : '28px';
  const cardPadding = isSingleCard ? '32px 36px' : '24px 28px';
  const gridGap = isSingleCard ? '28px' : '24px';

  return (
    <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#fdf8fa' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: innerPadding, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Decorations */}
        <div style={{ position: 'absolute', top: 20, right: 40, opacity: 0.2 }}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <polygon points="40,4 76,40 40,76 4,40" stroke={accentColor} strokeWidth="1" />
            <polygon points="40,16 64,40 40,64 16,40" stroke={accentColor} strokeWidth="0.5" opacity="0.6" />
            <polygon points="40,28 52,40 40,52 28,40" stroke={accentColor} strokeWidth="0.5" opacity="0.4" />
          </svg>
        </div>
        <div style={{ position: 'absolute', bottom: 40, left: 40, opacity: 0.15 }}>
          <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
            <rect x="4" y="4" width="92" height="52" stroke={accentColor} strokeWidth="0.8" />
            <rect x="12" y="12" width="76" height="36" stroke={accentColor} strokeWidth="0.6" opacity="0.6" />
            <rect x="20" y="20" width="60" height="20" stroke={accentColor} strokeWidth="0.4" opacity="0.4" />
          </svg>
        </div>

        {/* Title */}
        <div style={{ marginBottom: topMargin, position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, width: '48px', height: '48px', transform: 'translateY(-50%) rotate(45deg)', border: `1.5px solid ${accentColor}`, opacity: 0.5 }} />
          <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0, paddingLeft: '88px' }}>{data.mainTitle}</h1>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: gridGap, alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: cardPadding, background: '#FFFFFF', borderRadius: '2px', boxShadow: '0 1px 4px rgba(139,69,99,0.06)', border: '1px solid rgba(139,69,99,0.12)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -6, right: 12, width: 12, height: 12, transform: 'rotate(45deg)', background: accentColor, opacity: 0.4 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: 28, height: 28, transform: 'rotate(45deg)', border: `1.5px solid ${accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                  <span style={{ fontSize: isSingleCard ? '14px' : '12px', fontWeight: 600, color: accentColor, transform: 'rotate(-45deg)', letterSpacing: '0' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div style={{ flex: 1, height: '1px', background: `rgba(139,69,99,0.15)` }} />
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

export const lineDiamond: TemplateConfig = {
  id: 'lineDiamond',
  name: '菱形宝石',
  description: '菱形多边形装饰，优雅奢华',
  icon: 'diamond',
  render: (data, scale, progressBarConfig) => React.createElement(LineDiamond, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineDiamond'),
};
