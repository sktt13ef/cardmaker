import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineSpiralProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineSpiral: React.FC<LineSpiralProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f8fafc' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="10" stroke={index <= config.activeIndex ? '#265578' : '#d0dce5'} strokeWidth="2" fill="none" opacity={index <= config.activeIndex ? 0.8 : 0.3} />
                <circle cx="14" cy="14" r="5" fill={index <= config.activeIndex ? '#265578' : '#d0dce5'} opacity={index <= config.activeIndex ? 0.5 : 0.2} />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 500, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const accentColor = '#265578';
  const innerPadding = isSingleCard ? '40px 64px' : '32px 56px';
  const topMargin = isSingleCard ? '32px' : '28px';
  const cardPadding = isSingleCard ? '32px 36px' : '24px 28px';
  const gridGap = isSingleCard ? '28px' : '24px';

  return (
    <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f8fafc' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: innerPadding, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 10, right: 30, opacity: 0.12 }}>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <path d="M60 10 C90 10 110 30 110 60 C110 90 90 110 60 110 C30 110 10 90 10 60 C10 30 30 10 60 10" stroke={accentColor} strokeWidth="0.8" />
            <path d="M60 25 C80 25 95 40 95 60 C95 80 80 95 60 95 C40 95 25 80 25 60 C25 40 40 25 60 25" stroke={accentColor} strokeWidth="0.6" opacity="0.7" />
            <path d="M60 40 C70 40 80 50 80 60 C80 70 70 80 60 80 C50 80 40 70 40 60 C40 50 50 40 60 40" stroke={accentColor} strokeWidth="0.4" opacity="0.5" />
            <circle cx="60" cy="60" r="8" stroke={accentColor} strokeWidth="0.6" opacity="0.4" />
          </svg>
        </div>
        <div style={{ position: 'absolute', bottom: 30, left: 30, opacity: 0.1 }}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <path d="M40 8 Q60 16 60 40 Q60 64 40 68 Q20 64 20 40 Q20 16 40 8" stroke={accentColor} strokeWidth="1" fill="none" />
            <circle cx="40" cy="40" r="12" stroke={accentColor} strokeWidth="0.6" fill="none" opacity="0.6" />
          </svg>
        </div>

        <div style={{ marginBottom: topMargin, position: 'relative' }}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}>
            <path d="M28 4 C42 4 52 14 52 28 C52 42 42 52 28 52 C14 52 4 42 4 28 C4 14 14 4 28 4" stroke={accentColor} strokeWidth="1.2" fill="none" />
            <circle cx="28" cy="28" r="8" fill={accentColor} opacity="0.3" />
          </svg>
          <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0, paddingLeft: '76px' }}>{data.mainTitle}</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: gridGap, alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: cardPadding, background: '#FFFFFF', borderRadius: '24px', boxShadow: '0 1px 4px rgba(38,85,120,0.06)', border: '1px solid rgba(38,85,120,0.12)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -10, left: 20, width: 20, height: 20, borderRadius: '50%', background: accentColor, opacity: 0.3 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', border: `2px solid ${accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: isSingleCard ? '14px' : '12px', fontWeight: 600, color: accentColor }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div style={{ flex: 1, height: '1px', background: `rgba(38,85,120,0.15)` }} />
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

export const lineSpiral: TemplateConfig = {
  id: 'lineSpiral',
  name: '螺旋优雅',
  description: '螺旋曲线装饰，流动优雅',
  icon: 'circle',
  render: (data, scale, progressBarConfig) => React.createElement(LineSpiral, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineSpiral'),
};
