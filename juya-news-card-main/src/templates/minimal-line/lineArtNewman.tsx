import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtNewmanProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtNewman: React.FC<LineArtNewmanProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f0f0f2' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 4, height: 24, background: index <= config.activeIndex ? '#c04030' : '#d0d0d0', opacity: index <= config.activeIndex ? 0.7 : 0.3 }} />
              <span style={{ fontSize: '26px', fontWeight: 300, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const zipRed = '#c04030';
  const deepBlue = '#1a2a5a';
  const warmWhite = '#f0f0f2';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: warmWhite }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Newman full-screen vertical color bands, large color fields, minimal */}
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Zip - vertical red band left */}
          <rect x="200" y="0" width="6" height="1080" fill={zipRed} opacity="0.08" />
          {/* Zip - vertical blue band right */}
          <rect x="1700" y="0" width="6" height="1080" fill={deepBlue} opacity="0.06" />
          {/* Subtle color field - left */}
          <rect x="0" y="0" width="200" height="1080" fill={deepBlue} opacity="0.02" />
          {/* Subtle color field - right */}
          <rect x="1706" y="0" width="214" height="1080" fill={zipRed} opacity="0.02" />
          {/* Additional zips */}
          <rect x="960" y="0" width="4" height="1080" fill={zipRed} opacity="0.04" />
          <rect x="500" y="0" width="3" height="1080" fill={deepBlue} opacity="0.03" />
          <rect x="1400" y="0" width="3" height="1080" fill={zipRed} opacity="0.03" />
          {/* Subtle horizontal bands */}
          <rect x="0" y="300" width="1920" height="2" fill={deepBlue} opacity="0.02" />
          <rect x="0" y="750" width="1920" height="2" fill={zipRed} opacity="0.02" />
        </svg>

        {/* Title with zip decoration */}
        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 6, height: 60, background: zipRed, opacity: 0.6, flexShrink: 0 }} />
          <div style={{ width: 16, height: 60, background: deepBlue, opacity: 0.15, flexShrink: 0 }} />
          <div style={{ width: 4, height: 60, background: zipRed, opacity: 0.4, flexShrink: 0, marginRight: 8 }} />
          <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
        </div>

        {/* Cards with Newman minimal style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const zipColor = i % 2 === 0 ? zipRed : deepBlue;
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 0, border: '1px solid rgba(0,0,0,0.06)', position: 'relative' }}>
                {/* Zip line on left of card */}
                <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: zipColor, opacity: 0.5 }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Vertical line number indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 3, height: 28, background: zipColor, opacity: 0.5 }} />
                    <span style={{ fontSize: isSingleCard ? '14px' : '12px', fontWeight: 300, color: '#111122', letterSpacing: '0.05em' }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  {/* Minimal separator */}
                  <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.08)' }} />
                </div>
                <h3 style={{ fontSize: isSingleCard ? '48px' : '34px', fontWeight: 300, color: '#111122', margin: 0, lineHeight: 1.4 }}>{card.title}</h3>
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

export const lineArtNewman: TemplateConfig = {
  id: 'lineArtNewman',
  name: '纽曼拉链',
  description: '垂直色带大色域，极简冥想',
  icon: 'view_stream',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtNewman, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtNewman'),
};
