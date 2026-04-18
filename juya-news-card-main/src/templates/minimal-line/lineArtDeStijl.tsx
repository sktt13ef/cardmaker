import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtDeStijlProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtDeStijl: React.FC<LineArtDeStijlProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#faf8f5' }}>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => {
            const pColors = ['#d42029', '#0047ab', '#f5c518'];
            return (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 16, height: 16, background: index <= config.activeIndex ? pColors[index % 3] : 'transparent', border: '2px solid #111', opacity: index <= config.activeIndex ? 0.8 : 0.3 }} />
                <span style={{ fontSize: '26px', fontWeight: 700, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const red = '#d42029';
  const blue = '#0047ab';
  const yellow = '#f5c518';
  const black = '#111111';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#faf8f5' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* De Stijl full-screen strict horizontal/vertical lines with primary colors */}
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Top red area with border lines */}
          <rect x="0" y="0" width="320" height="200" fill={red} opacity="0.1" />
          <rect x="0" y="200" width="1920" height="5" fill={black} opacity="0.12" />
          <rect x="320" y="0" width="5" height="200" fill={black} opacity="0.12" />
          {/* Right blue column */}
          <rect x="1700" y="205" width="220" height="400" fill={blue} opacity="0.07" />
          <rect x="1695" y="205" width="5" height="400" fill={black} opacity="0.1" />
          <rect x="1700" y="600" width="220" height="5" fill={black} opacity="0.1" />
          {/* Bottom yellow band */}
          <rect x="0" y="850" width="600" height="230" fill={yellow} opacity="0.08" />
          <rect x="0" y="845" width="600" height="5" fill={black} opacity="0.1" />
          <rect x="600" y="845" width="5" height="235" fill={black} opacity="0.1" />
          {/* Vertical dividers */}
          <rect x="960" y="205" width="4" height="640" fill={black} opacity="0.06" />
          <rect x="480" y="205" width="4" height="640" fill={black} opacity="0.05" />
          <rect x="1440" y="205" width="4" height="640" fill={black} opacity="0.05" />
          {/* Horizontal dividers */}
          <rect x="0" y="420" width="1920" height="4" fill={black} opacity="0.04" />
          <rect x="0" y="640" width="1920" height="4" fill={black} opacity="0.04" />
          {/* Small color accent blocks */}
          <rect x="968" y="424" width="80" height="60" fill={yellow} opacity="0.06" />
          <rect x="968" y="484" width="80" height="3" fill={black} opacity="0.06" />
          <rect x="1448" y="648" width="60" height="50" fill={red} opacity="0.05" />
          <rect x="1448" y="698" width="60" height="3" fill={black} opacity="0.05" />
          {/* Bottom-right small blue block */}
          <rect x="1700" y="860" width="100" height="80" fill={blue} opacity="0.05" />
          <rect x="1695" y="860" width="5" height="80" fill={black} opacity="0.06" />
        </svg>

        {/* Title with pure De Stijl horizontal/vertical composition */}
        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'stretch', gap: 0 }}>
          <div style={{ width: 8, background: black, flexShrink: 0 }} />
          <div style={{ width: 50, background: red, flexShrink: 0, opacity: 0.6 }} />
          <div style={{ width: 5, background: black, flexShrink: 0 }} />
          <div style={{ width: 30, background: yellow, flexShrink: 0, opacity: 0.5 }} />
          <div style={{ width: 5, background: black, marginRight: 20, flexShrink: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
            <div style={{ width: 120, height: 5, background: blue, marginTop: 10, opacity: 0.5 }} />
          </div>
        </div>

        {/* Cards with strict De Stijl borders */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const pColors = [red, blue, yellow];
            const c = pColors[i % 3];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 0, border: '3px solid ' + black, position: 'relative' }}>
                {/* Color block accent at top of card */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: c, opacity: 0.6 }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Square number indicator with color */}
                  <div style={{ width: 34, height: 34, border: '2px solid ' + black, display: 'flex', alignItems: 'center', justifyContent: 'center', background: c, opacity: 0.75 }}>
                    <span style={{ fontSize: isSingleCard ? '14px' : '12px', fontWeight: 700, color: '#fff' }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  {/* Horizontal line separator */}
                  <div style={{ flex: 1, height: '3px', background: black, opacity: 0.15 }} />
                </div>
                <h3 style={{ fontSize: isSingleCard ? '48px' : '34px', fontWeight: 700, color: '#111122', margin: 0, lineHeight: 1.4 }}>{card.title}</h3>
                <p style={{ fontSize: isSingleCard ? '32px' : '26px', color: '#444455', lineHeight: 1.8, margin: 0 }} dangerouslySetInnerHTML={{ __html: card.desc }} />
              </div>
            );
          })}
        </div>
      </div>
      {renderProgressBar('bottom')}
    </div>
  );
};

export const lineArtDeStijl: TemplateConfig = {
  id: 'lineArtDeStijl',
  name: '风格派',
  description: '纯粹水平垂直线条，三原色严格网格',
  icon: 'grid_4x4',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtDeStijl, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtDeStijl'),
};
