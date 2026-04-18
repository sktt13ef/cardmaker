import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineDotmatrixProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineDotmatrix: React.FC<LineDotmatrixProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f9fafc' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                {[0, 1, 2].map((row) =>
                  [0, 1, 2].map((col) => (
                    <circle key={`${row}-${col}`} cx={4 + col * 8} cy={4 + row * 8} r={2.5} fill={index <= config.activeIndex ? '#324678' : '#c0c8d8'} opacity={index <= config.activeIndex ? (0.7 - (row + col) * 0.05) : (0.3 - (row + col) * 0.03)} />
                  ))
                )}
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 500, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const accentColor = '#324678';
  const innerPadding = isSingleCard ? '40px 64px' : '32px 56px';
  const topMargin = isSingleCard ? '32px' : '28px';
  const cardPadding = isSingleCard ? '32px 36px' : '24px 28px';
  const gridGap = isSingleCard ? '28px' : '24px';

  return (
    <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f9fafc' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: innerPadding, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 20, right: 30, opacity: 0.12 }}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            {[0, 1, 2, 3, 4].map((row) =>
              [0, 1, 2, 3, 4].map((col) => {
                const dist = Math.sqrt((col - 2) ** 2 + (row - 2) ** 2);
                const maxDist = Math.sqrt(8);
                const opacity = 0.6 * (1 - dist / maxDist);
                return (
                  <circle key={`${row}-${col}`} cx={10 + col * 20} cy={10 + row * 20} r={5} fill={accentColor} opacity={opacity} />
                );
              })
            )}
          </svg>
        </div>
        <div style={{ position: 'absolute', bottom: 24, left: 24, opacity: 0.08 }}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            {[0, 1, 2, 3].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <circle key={`${row}-${col}`} cx={10 + col * 20} cy={10 + row * 20} r={3} fill={accentColor} opacity={0.5 - (row + col) * 0.04} />
              ))
            )}
          </svg>
        </div>

        <div style={{ marginBottom: topMargin, position: 'relative' }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}>
            {[0, 1, 2].map((row) =>
              [0, 1, 2].map((col) => (
                <circle key={`${row}-${col}`} cx={8 + col * 16} cy={8 + row * 16} r={4} fill={accentColor} opacity={0.5 - (row + col) * 0.06} />
              ))
            )}
          </svg>
          <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0, paddingLeft: '68px' }}>{data.mainTitle}</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: gridGap, alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: cardPadding, background: '#FFFFFF', borderRadius: '4px', boxShadow: '0 1px 4px rgba(50,70,120,0.06)', border: '1px solid rgba(50,70,120,0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 6px)', gap: 2 }}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
                    <div key={idx} style={{ width: 6, height: 6, borderRadius: '50%', background: accentColor, opacity: i % 2 === idx % 2 ? 0.7 : 0.2 }} />
                  ))}
                </div>
                <div style={{ flex: 1, height: '1px', background: `rgba(50,70,120,0.15)` }} />
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

export const lineDotmatrix: TemplateConfig = {
  id: 'lineDotmatrix',
  name: '点阵装饰',
  description: '渐变点阵布局，深邃稳重',
  icon: 'grid_on',
  render: (data, scale, progressBarConfig) => React.createElement(LineDotmatrix, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineDotmatrix'),
};
