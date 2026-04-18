import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtMondrianProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtMondrian: React.FC<LineArtMondrianProps> = ({ data, scale, progressBarConfig }) => {
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
            const blockColors = ['#c3282d', '#0f47af', '#fdd305'];
            return (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 20, height: 20, border: '3px solid #111', background: index <= config.activeIndex ? blockColors[index % 3] : 'transparent', opacity: index <= config.activeIndex ? 1 : 0.3 }} />
                <span style={{ fontSize: '26px', fontWeight: 700, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const red = '#c3282d';
  const blue = '#0f47af';
  const yellow = '#fdd305';
  const black = '#111111';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#faf8f5' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Mondrian full-screen grid decoration */}
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Top-left red block */}
          <rect x="0" y="0" width="240" height="160" fill={red} opacity="0.15" />
          <rect x="0" y="160" width="240" height="6" fill={black} opacity="0.2" />
          <rect x="240" y="0" width="6" height="166" fill={black} opacity="0.2" />
          {/* Top-right yellow block */}
          <rect x="1680" y="0" width="240" height="100" fill={yellow} opacity="0.12" />
          <rect x="1680" y="100" width="240" height="6" fill={black} opacity="0.15" />
          <rect x="1674" y="0" width="6" height="106" fill={black} opacity="0.15" />
          {/* Bottom-left blue block */}
          <rect x="0" y="880" width="300" height="200" fill={blue} opacity="0.1" />
          <rect x="0" y="874" width="300" height="6" fill={black} opacity="0.15" />
          <rect x="300" y="874" width="6" height="206" fill={black} opacity="0.15" />
          {/* Bottom-right small red block */}
          <rect x="1760" y="860" width="160" height="220" fill={red} opacity="0.08" />
          <rect x="1754" y="860" width="6" height="220" fill={black} opacity="0.12" />
          <rect x="1760" y="854" width="160" height="6" fill={black} opacity="0.12" />
          {/* Horizontal lines spanning full width */}
          <rect x="0" y="340" width="1920" height="4" fill={black} opacity="0.06" />
          <rect x="0" y="680" width="1920" height="4" fill={black} opacity="0.06" />
          {/* Vertical lines spanning full height */}
          <rect x="640" y="0" width="4" height="1080" fill={black} opacity="0.05" />
          <rect x="1280" y="0" width="4" height="1080" fill={black} opacity="0.05" />
          {/* Mid-section yellow accent */}
          <rect x="644" y="344" width="120" height="80" fill={yellow} opacity="0.08" />
          <rect x="644" y="424" width="120" height="4" fill={black} opacity="0.08" />
          {/* Mid-section blue accent */}
          <rect x="1284" y="684" width="100" height="60" fill={blue} opacity="0.06" />
        </svg>

        {/* Title area with Mondrian-style vertical bar + color block */}
        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'stretch', gap: 0 }}>
          <div style={{ width: 10, background: black, marginRight: 0, flexShrink: 0 }} />
          <div style={{ width: 40, background: red, marginRight: 0, flexShrink: 0, opacity: 0.7 }} />
          <div style={{ width: 6, background: black, marginRight: 20, flexShrink: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ width: 60, height: 10, background: yellow, marginBottom: 14, opacity: 0.8 }} />
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        {/* Cards with no border-radius, thick black borders, color-block numbering */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const blockColors = [red, blue, yellow];
            const c = blockColors[i % 3];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 0, border: '3px solid ' + black, position: 'relative' }}>
                {/* Color block in top-right corner */}
                <div style={{ position: 'absolute', top: 0, right: 0, width: 28, height: 28, background: c, opacity: 0.65 }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Square color-block number indicator */}
                  <div style={{ width: 36, height: 36, border: '3px solid ' + black, display: 'flex', alignItems: 'center', justifyContent: 'center', background: c, opacity: 0.85 }}>
                    <span style={{ fontSize: isSingleCard ? '14px' : '12px', fontWeight: 700, color: '#fff' }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  {/* Thick black separator line */}
                  <div style={{ flex: 1, height: '3px', background: black, opacity: 0.18 }} />
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

export const lineArtMondrian: TemplateConfig = {
  id: 'lineArtMondrian',
  name: '蒙德里安色块',
  description: '红蓝黄几何色块，风格派经典',
  icon: 'grid_on',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtMondrian, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtMondrian'),
};
