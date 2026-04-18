import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtMartinProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtMartin: React.FC<LineArtMartinProps> = ({ data, scale, progressBarConfig }) => {
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
      if (wrapper.scrollHeight > maxH) { wrapper.style.transform = 'scale(' + Math.max(0.6, maxH / wrapper.scrollHeight) + ')'; }
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f8f6f2' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                {[0, 1, 2, 3].map(j => (
                  <line key={j} x1="2" y1={4 + j * 5} x2="22" y2={4 + j * 5} stroke={index <= config.activeIndex ? '#8a7a6a' : '#d8d4cc'} strokeWidth="0.5" />
                ))}
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 300, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const warmGray = '#8a7a6a';
  const paleGold = '#c8b898';
  const softWhite = '#f8f6f2';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: softWhite }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Agnes Martin full-screen fine line grid, pale colors, meditative */}
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Horizontal fine lines across entire width */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(i => (
            <line key={'h' + i} x1="0" y1={50 + i * 50} x2="1920" y2={50 + i * 50} stroke={warmGray} strokeWidth="0.3" opacity="0.06" />
          ))}
          {/* Vertical fine lines across entire height */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(i => (
            <line key={'v' + i} x1={80 + i * 80} y1="0" x2={80 + i * 80} y2="1080" stroke={warmGray} strokeWidth="0.3" opacity="0.04" />
          ))}
          {/* Pale color wash areas */}
          <rect x="320" y="200" width="400" height="300" fill={paleGold} opacity="0.03" />
          <rect x="1200" y="500" width="400" height="300" fill={warmGray} opacity="0.02" />
        </svg>

        {/* Title with fine line grid decoration */}
        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0 }}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
              <line key={'th' + i} x1="4" y1={4 + i * 7} x2="52" y2={4 + i * 7} stroke={warmGray} strokeWidth="0.5" opacity={0.2 + i * 0.03} />
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
              <line key={'tv' + i} x1={4 + i * 7} y1="4" x2={4 + i * 7} y2="52" stroke={warmGray} strokeWidth="0.3" opacity={0.1 + i * 0.02} />
            ))}
          </svg>
          <div>
            {/* Fine line decoration above title */}
            <svg width="200" height="6" viewBox="0 0 200 6" fill="none" style={{ marginBottom: 8 }}>
              {[0, 1, 2, 3].map(j => (
                <line key={j} x1="0" y1={1 + j * 1.5} x2="200" y2={1 + j * 1.5} stroke={warmGray} strokeWidth="0.5" opacity={0.2 + j * 0.05} />
              ))}
            </svg>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        {/* Cards with fine line meditative style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 0, border: '0.5px solid rgba(138,122,106,0.15)', position: 'relative' }}>
              {/* Fine line grid decoration in card background */}
              <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none' }}>
                {[0, 1, 2, 3, 4, 5, 6, 7].map(j => (
                  <line key={'ch' + j} x1="0" y1={j * 28} x2="400" y2={j * 28} stroke={warmGray} strokeWidth="0.3" />
                ))}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(j => (
                  <line key={'cv' + j} x1={j * 44} y1="0" x2={j * 44} y2="200" stroke={warmGray} strokeWidth="0.3" />
                ))}
              </svg>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
                {/* Fine line number indicator */}
                <div style={{ width: 32, height: 32, border: '0.5px solid ' + warmGray, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.6 }}>
                  <span style={{ fontSize: isSingleCard ? '14px' : '12px', fontWeight: 300, color: warmGray }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                {/* Fine line separator */}
                <svg width="100%" height="4" viewBox="0 0 200 4" fill="none" style={{ flex: 1 }}>
                  <line x1="0" y1="2" x2="200" y2="2" stroke={warmGray} strokeWidth="0.5" opacity="0.2" />
                </svg>
              </div>
              <h3 style={{ fontSize: isSingleCard ? '48px' : '34px', fontWeight: 300, color: '#111122', margin: 0, lineHeight: 1.4, position: 'relative' }}>{card.title}</h3>
              <p style={{ fontSize: isSingleCard ? '32px' : '26px', color: '#444455', lineHeight: 1.8, margin: 0, position: 'relative' }} dangerouslySetInnerHTML={{ __html: card.desc }} />
            </div>
          ))}
        </div>
      </div>
      {renderProgressBar('bottom')}
    </div>
  );
};

export const lineArtMartin: TemplateConfig = {
  id: 'lineArtMartin',
  name: '阿格尼丝马丁',
  description: '细线网格淡雅色彩，冥想感',
  icon: 'grid_on',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtMartin, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtMartin'),
};
