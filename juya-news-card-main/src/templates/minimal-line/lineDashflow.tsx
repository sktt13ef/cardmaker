import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineDashflowProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineDashflow: React.FC<LineDashflowProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f7fbfb' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 4, borderLeft: `2px dashed ${index <= config.activeIndex ? '#0a7e8c' : '#cccccc'}`, opacity: index <= config.activeIndex ? 0.8 : 0.3 }} />
              <span style={{ fontSize: '26px', fontWeight: 500, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const accentColor = '#0a7e8c';
  const innerPadding = isSingleCard ? '40px 64px' : '32px 56px';
  const topMargin = isSingleCard ? '32px' : '28px';
  const cardPadding = isSingleCard ? '32px 36px' : '24px 28px';
  const gridGap = isSingleCard ? '28px' : '24px';

  return (
    <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f7fbfb' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: innerPadding, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: 80, height: 80, opacity: 0.2 }}>
          <svg viewBox="0 0 80 80" fill="none">
            <circle cx="10" cy="10" r="5" stroke={accentColor} strokeWidth="0.8" strokeDasharray="2 1.5" />
            <circle cx="30" cy="20" r="4" stroke={accentColor} strokeWidth="0.8" strokeDasharray="2 1.5" />
            <circle cx="50" cy="10" r="5" stroke={accentColor} strokeWidth="0.8" strokeDasharray="2 1.5" />
            <circle cx="70" cy="30" r="4" stroke={accentColor} strokeWidth="0.8" strokeDasharray="2 1.5" />
            <circle cx="20" cy="40" r="5" stroke={accentColor} strokeWidth="0.8" strokeDasharray="2 1.5" />
            <circle cx="60" cy="50" r="4" stroke={accentColor} strokeWidth="0.8" strokeDasharray="2 1.5" />
            <circle cx="40" cy="60" r="5" stroke={accentColor} strokeWidth="0.8" strokeDasharray="2 1.5" />
          </svg>
        </div>
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 80, height: 80, opacity: 0.15 }}>
          <svg viewBox="0 0 80 80" fill="none">
            <line x1="4" y1="16" x2="76" y2="16" stroke={accentColor} strokeWidth="0.8" strokeDasharray="3 2" />
            <line x1="4" y1="32" x2="76" y2="32" stroke={accentColor} strokeWidth="0.8" strokeDasharray="3 2" />
            <line x1="4" y1="48" x2="76" y2="48" stroke={accentColor} strokeWidth="0.8" strokeDasharray="3 2" />
            <line x1="4" y1="64" x2="76" y2="64" stroke={accentColor} strokeWidth="0.8" strokeDasharray="3 2" />
          </svg>
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 160, height: 160, opacity: 0.08 }}>
          <svg viewBox="0 0 160 160" fill="none">
            <path d="M10 20 Q40 10 70 20 Q100 30 130 20" stroke={accentColor} strokeWidth="1" strokeDasharray="4 2" />
            <path d="M10 40 Q40 30 70 40 Q100 50 130 40" stroke={accentColor} strokeWidth="1" strokeDasharray="4 2" />
            <path d="M10 60 Q40 50 70 60 Q100 70 130 60" stroke={accentColor} strokeWidth="1" strokeDasharray="4 2" />
            <path d="M10 80 Q40 70 70 80 Q100 90 130 80" stroke={accentColor} strokeWidth="1" strokeDasharray="4 2" />
          </svg>
        </div>

        <div style={{ marginBottom: topMargin, position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, width: '48px', height: '2px', background: accentColor, opacity: 0.5 }} />
          <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0, paddingLeft: '64px' }}>{data.mainTitle}</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: gridGap, alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: cardPadding, background: '#FFFFFF', borderRadius: '4px', boxShadow: '0 1px 4px rgba(10,126,140,0.06)', border: '1px solid rgba(10,126,140,0.12)', position: 'relative' }}>
              <div style={{ position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%)', width: 4, height: 32, borderLeft: `2px dashed ${accentColor}`, opacity: 0.6 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: 28, height: 28, border: `2px dashed ${accentColor}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: isSingleCard ? '14px' : '12px', fontWeight: 600, color: accentColor }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div style={{ flex: 1, height: '1px', background: `rgba(10,126,140,0.15)` }} />
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

export const lineDashflow: TemplateConfig = {
  id: 'lineDashflow',
  name: '流动虚线',
  description: '流动虚线装饰，清新通透',
  icon: 'horizontal_distribute',
  render: (data, scale, progressBarConfig) => React.createElement(LineDashflow, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineDashflow'),
};
