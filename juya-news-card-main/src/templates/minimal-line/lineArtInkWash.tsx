import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtInkWashProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtInkWash: React.FC<LineArtInkWashProps> = ({ data, scale, progressBarConfig }) => {
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
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: index <= config.activeIndex ? 'rgba(40,40,50,0.15)' : 'transparent', border: '1px solid ' + (index <= config.activeIndex ? 'rgba(40,40,50,0.3)' : '#d8d4cc') }} />
              <span style={{ fontSize: '26px', fontWeight: 300, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const darkInk = '#282832';
  const midInk = '#5a5a68';
  const lightInk = '#9a9aa0';
  const rice = '#f8f6f2';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: rice }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Ink Wash full-screen ink gradients, bleeding effects, white space */}
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Large ink wash area - top right */}
          <ellipse cx="1700" cy="200" rx="250" ry="180" fill={darkInk} opacity="0.03" />
          <ellipse cx="1700" cy="200" rx="180" ry="120" fill={midInk} opacity="0.03" />
          <ellipse cx="1700" cy="200" rx="100" ry="60" fill={darkInk} opacity="0.04" />
          {/* Ink wash - bottom left */}
          <ellipse cx="200" cy="850" rx="200" ry="150" fill={midInk} opacity="0.025" />
          <ellipse cx="200" cy="850" rx="120" ry="80" fill={darkInk} opacity="0.03" />
          {/* Soft ink bleeding edges */}
          <ellipse cx="900" cy="100" rx="80" ry="40" fill={lightInk} opacity="0.02" />
          <ellipse cx="1400" cy="900" rx="100" ry="50" fill={midInk} opacity="0.02" />
          {/* Ink drip marks */}
          <path d="M100 300 Q102 400 98 500 Q96 550 100 580" stroke={darkInk} strokeWidth="1.5" fill="none" opacity="0.03" strokeLinecap="round" />
          <path d="M1800 400 Q1802 500 1798 600" stroke={midInk} strokeWidth="1" fill="none" opacity="0.02" strokeLinecap="round" />
          {/* Subtle wash areas */}
          <rect x="600" y="700" width="300" height="200" fill={lightInk} opacity="0.015" rx="20" />
          <rect x="1100" y="200" width="250" height="150" fill={midInk} opacity="0.015" rx="15" />
        </svg>

        {/* Title with ink wash decoration */}
        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" style={{ flexShrink: 0 }}>
            <ellipse cx="30" cy="30" rx="24" ry="22" fill={darkInk} opacity="0.06" />
            <ellipse cx="30" cy="30" rx="16" ry="14" fill={midInk} opacity="0.08" />
            <ellipse cx="30" cy="30" rx="8" ry="6" fill={darkInk} opacity="0.1" />
          </svg>
          <div>
            {/* Ink wash line above title */}
            <svg width="200" height="8" viewBox="0 0 200 8" fill="none" style={{ marginBottom: 6 }}>
              <ellipse cx="100" cy="4" rx="100" ry="4" fill={darkInk} opacity="0.06" />
              <ellipse cx="100" cy="4" rx="60" ry="2" fill={midInk} opacity="0.08" />
            </svg>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '0.04em', lineHeight: 1.2, color: darkInk, margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        {/* Cards with ink wash style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const inks = [darkInk, midInk, lightInk];
            const c = inks[i % 3];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: 'rgba(255,255,255,0.85)', borderRadius: 2, border: '1px solid rgba(40,40,50,0.06)', position: 'relative' }}>
                {/* Ink wash decoration in card */}
                <svg width="50" height="30" viewBox="0 0 50 30" fill="none" style={{ position: 'absolute', top: 4, right: 6, opacity: 0.06 }}>
                  <ellipse cx="25" cy="15" rx="22" ry="12" fill={c} />
                </svg>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Ink circle number indicator */}
                  <div style={{ width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: c, opacity: 0.1, position: 'relative' }}>
                    <span style={{ fontSize: isSingleCard ? '14px' : '12px', fontWeight: 300, color: darkInk, opacity: 0.8 }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  {/* Ink wash separator */}
                  <svg width="100%" height="4" viewBox="0 0 200 4" fill="none" style={{ flex: 1 }}>
                    <ellipse cx="100" cy="2" rx="100" ry="2" fill={c} opacity="0.08" />
                  </svg>
                </div>
                <h3 style={{ fontSize: isSingleCard ? '48px' : '34px', fontWeight: 300, color: darkInk, margin: 0, lineHeight: 1.4 }}>{card.title}</h3>
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

export const lineArtInkWash: TemplateConfig = {
  id: 'lineArtInkWash',
  name: '水墨晕染',
  description: '墨色渐变晕染效果，留白意境',
  icon: 'water_drop',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtInkWash, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtInkWash'),
};
