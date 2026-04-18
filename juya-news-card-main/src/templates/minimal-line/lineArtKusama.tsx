import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtKusamaProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtKusama: React.FC<LineArtKusamaProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#fef8f8' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: index <= config.activeIndex ? '#e63946' : 'transparent', border: '2px solid ' + (index <= config.activeIndex ? '#e63946' : '#e0e0e0'), opacity: index <= config.activeIndex ? 0.8 : 0.3 }} />
              <span style={{ fontSize: '26px', fontWeight: 500, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const red = '#e63946';
  const darkRed = '#b5202d';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#fef8f8' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Kusama full-screen dot array decoration */}
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Top-right large dot cluster */}
          <circle cx="1700" cy="80" r="40" fill={red} opacity="0.06" />
          <circle cx="1780" cy="120" r="28" fill={red} opacity="0.08" />
          <circle cx="1640" cy="140" r="20" fill={red} opacity="0.1" />
          <circle cx="1750" cy="200" r="35" fill={red} opacity="0.05" />
          <circle cx="1680" cy="220" r="15" fill={red} opacity="0.12" />
          <circle cx="1820" cy="60" r="12" fill={red} opacity="0.1" />
          <circle cx="1600" cy="60" r="18" fill={red} opacity="0.07" />
          {/* Bottom-left dot cluster */}
          <circle cx="120" cy="880" r="50" fill={red} opacity="0.05" />
          <circle cx="200" cy="920" r="30" fill={red} opacity="0.08" />
          <circle cx="80" cy="960" r="22" fill={red} opacity="0.1" />
          <circle cx="180" cy="1000" r="16" fill={red} opacity="0.12" />
          <circle cx="260" cy="880" r="12" fill={red} opacity="0.09" />
          <circle cx="60" cy="840" r="18" fill={red} opacity="0.06" />
          {/* Scattered dots across entire background - systematic grid-like pattern */}
          <circle cx="300" cy="200" r="8" fill={red} opacity="0.06" />
          <circle cx="500" cy="150" r="12" fill={red} opacity="0.05" />
          <circle cx="700" cy="80" r="6" fill={red} opacity="0.08" />
          <circle cx="900" cy="120" r="10" fill={red} opacity="0.04" />
          <circle cx="1100" cy="60" r="14" fill={red} opacity="0.05" />
          <circle cx="1300" cy="100" r="8" fill={red} opacity="0.06" />
          <circle cx="1500" cy="140" r="10" fill={red} opacity="0.04" />
          <circle cx="400" cy="500" r="6" fill={red} opacity="0.05" />
          <circle cx="600" cy="600" r="10" fill={red} opacity="0.04" />
          <circle cx="1400" cy="700" r="8" fill={red} opacity="0.05" />
          <circle cx="1600" cy="600" r="12" fill={red} opacity="0.04" />
          <circle cx="800" cy="950" r="10" fill={red} opacity="0.06" />
          <circle cx="1000" cy="900" r="14" fill={red} opacity="0.05" />
          <circle cx="1200" cy="980" r="8" fill={red} opacity="0.04" />
          <circle cx="1500" cy="950" r="6" fill={red} opacity="0.06" />
          {/* Medium dot row across middle */}
          <circle cx="200" cy="540" r="4" fill={red} opacity="0.08" />
          <circle cx="400" cy="540" r="6" fill={red} opacity="0.06" />
          <circle cx="600" cy="540" r="4" fill={red} opacity="0.08" />
          <circle cx="800" cy="540" r="6" fill={red} opacity="0.06" />
          <circle cx="1000" cy="540" r="4" fill={red} opacity="0.08" />
          <circle cx="1200" cy="540" r="6" fill={red} opacity="0.06" />
          <circle cx="1400" cy="540" r="4" fill={red} opacity="0.08" />
          <circle cx="1600" cy="540" r="6" fill={red} opacity="0.06" />
          <circle cx="1800" cy="540" r="4" fill={red} opacity="0.08" />
        </svg>

        {/* Title with dot decoration */}
        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            {[6, 10, 14, 10, 6].map((s, idx) => (
              <div key={idx} style={{ width: s, height: s, borderRadius: '50%', background: red, opacity: 0.4 + idx * 0.08 }} />
            ))}
          </div>
          <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
            {[4, 6, 8, 6, 4].map((s, idx) => (
              <div key={idx} style={{ width: s, height: s, borderRadius: '50%', background: red, opacity: 0.25 + idx * 0.05 }} />
            ))}
          </div>
        </div>

        {/* Cards with dot-style numbering and dot decorations */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 8, boxShadow: '0 1px 6px rgba(230,57,70,0.06)', border: '1px solid rgba(230,57,70,0.12)', position: 'relative' }}>
              {/* Dot decoration in card corners */}
              <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 4 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: red, opacity: 0.2 }} />
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: red, opacity: 0.15 }} />
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: red, opacity: 0.1 }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Dot-circle number indicator */}
                <div style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid ' + red, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: -3, right: -3, width: 8, height: 8, borderRadius: '50%', background: red, opacity: 0.5 }} />
                  <span style={{ fontSize: isSingleCard ? '14px' : '12px', fontWeight: 600, color: red }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                {/* Dot-pattern separator */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {[...Array(12)].map((_, j) => (
                    <div key={j} style={{ width: 3, height: 3, borderRadius: '50%', background: red, opacity: 0.12 + (j < 4 ? 0.08 : 0) }} />
                  ))}
                </div>
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

export const lineArtKusama: TemplateConfig = {
  id: 'lineArtKusama',
  name: '草间弥生点',
  description: '无限圆点阵列，迷幻沉浸',
  icon: 'bubble_chart',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtKusama, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtKusama'),
};
