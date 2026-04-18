import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineDotlineProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineDotline: React.FC<LineDotlineProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#fdf7f9' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="36" height="12" viewBox="0 0 36 12" fill="none">
                <circle cx="4" cy="6" r="4" fill={index <= config.activeIndex ? '#db7790' : '#e5d0d6'} opacity={index <= config.activeIndex ? 0.7 : 0.3} />
                <line x1="10" y1="6" x2="26" y2="6" stroke={index <= config.activeIndex ? '#db7790' : '#e5d0d6'} strokeWidth="1.5" opacity={index <= config.activeIndex ? 0.6 : 0.3} />
                <circle cx="32" cy="6" r="4" fill={index <= config.activeIndex ? '#db7790' : '#e5d0d6'} opacity={index <= config.activeIndex ? 0.7 : 0.3} />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 500, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const accentColor = '#db7790';
  const innerPadding = isSingleCard ? '40px 64px' : '32px 56px';
  const topMargin = isSingleCard ? '32px' : '28px';
  const cardPadding = isSingleCard ? '32px 36px' : '24px 28px';
  const gridGap = isSingleCard ? '28px' : '24px';

  return (
    <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#fdf7f9' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: innerPadding, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 20, left: 0, width: 80, height: '100%', opacity: 0.15 }}>
          <svg viewBox="0 0 80 800" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <React.Fragment key={i}>
                <circle cx="20" cy={40 + i * 80} r="6" fill={accentColor} opacity={0.4 - i * 0.03} />
                <line x1="26" y1={40 + i * 80} x2="56" y2={40 + i * 80} stroke={accentColor} strokeWidth="1" opacity={0.3 - i * 0.02} />
                <circle cx="60" cy={40 + i * 80} r="4" fill={accentColor} opacity={0.3 - i * 0.02} />
              </React.Fragment>
            ))}
          </svg>
        </div>
        <div style={{ position: 'absolute', top: 24, right: 36, opacity: 0.12 }}>
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
            {[0, 1, 2].map((i) => (
              <React.Fragment key={i}>
                <circle cx={12 + i * 24} cy="12" r="8" stroke={accentColor} strokeWidth="0.8" fill="none" />
                <circle cx={12 + i * 24} cy="36" r="6" stroke={accentColor} strokeWidth="0.6" fill="none" />
                <circle cx={12 + i * 24} cy="60" r="4" stroke={accentColor} strokeWidth="0.4" fill="none" />
              </React.Fragment>
            ))}
          </svg>
        </div>

        <div style={{ marginBottom: topMargin, position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, width: '56px', display: 'flex', alignItems: 'center', gap: 4, transform: 'translateY(-50%)' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: accentColor, opacity: 0.6 }} />
            <div style={{ flex: 1, height: '1.5px', background: accentColor, opacity: 0.4 }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: accentColor, opacity: 0.6 }} />
          </div>
          <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0, paddingLeft: '76px' }}>{data.mainTitle}</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: gridGap, alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: cardPadding, background: '#FFFFFF', borderRadius: '20px', boxShadow: '0 1px 4px rgba(219,119,144,0.06)', border: '1px solid rgba(219,119,144,0.12)', borderLeft: `4px solid ${accentColor}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', border: `2px solid ${accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: isSingleCard ? '14px' : '12px', fontWeight: 600, color: accentColor }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div style={{ flex: 1, height: '1px', background: `rgba(219,119,144,0.15)` }} />
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

export const lineDotline: TemplateConfig = {
  id: 'lineDotline',
  name: '点线组合',
  description: '圆点与线条交替，柔和灵动',
  icon: 'blur_on',
  render: (data, scale, progressBarConfig) => React.createElement(LineDotline, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineDotline'),
};
