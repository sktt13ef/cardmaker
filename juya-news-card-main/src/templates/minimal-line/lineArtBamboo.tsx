import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtBambooProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtBamboo: React.FC<LineArtBambooProps> = ({ data, scale, progressBarConfig }) => {
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
    const fitTitle = () => { let size = titleConfig.initialFontSize; title.style.fontSize = size + 'px'; let guard = 0; while (title.scrollWidth > 1700 && size > titleConfig.minFontSize && guard < 100) { size -= 1; title.style.fontSize = size + 'px'; guard++; } };
    fitTitle();
    const fitViewport = () => { const maxH = 1040; if (wrapper.scrollHeight > maxH) { wrapper.style.transform = 'scale(' + Math.max(0.6, maxH / wrapper.scrollHeight) + ')'; } else { wrapper.style.transform = ''; } };
    const timer = window.setTimeout(fitViewport, 50);
    return () => window.clearTimeout(timer);
  }, [data, titleConfig]);

  const topConfig = progressBarConfig?.top;
  const bottomConfig = progressBarConfig?.bottom;

  const renderProgressBar = (position: 'top' | 'bottom') => {
    const config = position === 'top' ? topConfig : bottomConfig;
    if (!config?.show) return null;
    return (
      <div style={{ width: '100%', padding: '16px 48px', background: '#f2f4ee' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                <line x1="8" y1="0" x2="8" y2="20" stroke={index <= config.activeIndex ? '#4a6a3a' : '#c8d0b8'} strokeWidth="2" />
                <line x1="3" y1="6" x2="13" y2="6" stroke={index <= config.activeIndex ? '#4a6a3a' : '#c8d0b8'} strokeWidth="1" />
                <line x1="3" y1="14" x2="13" y2="14" stroke={index <= config.activeIndex ? '#4a6a3a' : '#c8d0b8'} strokeWidth="1" />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 300, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const bamboo = '#4a6a3a';
  const leaf = '#6a8a4a';
  const stalk = '#8aaa6a';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f2f4ee' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Bamboo stalks - right side */}
          <line x1="1780" y1="0" x2="1780" y2="1080" stroke={bamboo} strokeWidth="3" opacity="0.05" />
          <line x1="1780" y1="200" x2="1780" y2="200" stroke={bamboo} strokeWidth="6" opacity="0.06" />
          <line x1="1780" y1="450" x2="1780" y2="450" stroke={bamboo} strokeWidth="6" opacity="0.06" />
          <line x1="1780" y1="700" x2="1780" y2="700" stroke={bamboo} strokeWidth="6" opacity="0.06" />
          {/* Bamboo node rings */}
          <ellipse cx="1780" cy="200" rx="5" ry="3" stroke={bamboo} strokeWidth="1" fill="none" opacity="0.06" />
          <ellipse cx="1780" cy="450" rx="5" ry="3" stroke={bamboo} strokeWidth="1" fill="none" opacity="0.06" />
          <ellipse cx="1780" cy="700" rx="5" ry="3" stroke={bamboo} strokeWidth="1" fill="none" opacity="0.06" />
          {/* Second bamboo stalk */}
          <line x1="1830" y1="100" x2="1830" y2="1080" stroke={leaf} strokeWidth="2.5" opacity="0.04" />
          <ellipse cx="1830" cy="350" rx="4" ry="2.5" stroke={leaf} strokeWidth="0.8" fill="none" opacity="0.05" />
          <ellipse cx="1830" cy="600" rx="4" ry="2.5" stroke={leaf} strokeWidth="0.8" fill="none" opacity="0.05" />
          <ellipse cx="1830" cy="850" rx="4" ry="2.5" stroke={leaf} strokeWidth="0.8" fill="none" opacity="0.05" />
          {/* Bamboo leaves - right side */}
          <path d="M1780 200 Q1760 180 1740 190" stroke={leaf} strokeWidth="1" fill="none" opacity="0.05" strokeLinecap="round" />
          <path d="M1780 200 Q1760 210 1740 200" stroke={stalk} strokeWidth="0.8" fill="none" opacity="0.04" strokeLinecap="round" />
          <path d="M1780 450 Q1800 430 1820 440" stroke={leaf} strokeWidth="1" fill="none" opacity="0.05" strokeLinecap="round" />
          <path d="M1780 700 Q1760 680 1740 690" stroke={stalk} strokeWidth="0.8" fill="none" opacity="0.04" strokeLinecap="round" />
          {/* Bamboo stalks - left side */}
          <line x1="100" y1="0" x2="100" y2="1080" stroke={bamboo} strokeWidth="2.5" opacity="0.04" />
          <ellipse cx="100" cy="300" rx="4" ry="2.5" stroke={bamboo} strokeWidth="0.8" fill="none" opacity="0.05" />
          <ellipse cx="100" cy="550" rx="4" ry="2.5" stroke={bamboo} strokeWidth="0.8" fill="none" opacity="0.05" />
          <ellipse cx="100" cy="800" rx="4" ry="2.5" stroke={bamboo} strokeWidth="0.8" fill="none" opacity="0.05" />
          {/* Bamboo leaves - left side */}
          <path d="M100 300 Q120 280 140 290" stroke={leaf} strokeWidth="0.8" fill="none" opacity="0.04" strokeLinecap="round" />
          <path d="M100 300 Q80 280 60 290" stroke={stalk} strokeWidth="0.8" fill="none" opacity="0.04" strokeLinecap="round" />
          <path d="M100 550 Q120 530 140 540" stroke={leaf} strokeWidth="0.8" fill="none" opacity="0.04" strokeLinecap="round" />
          {/* Scattered bamboo leaves */}
          <path d="M600 60 Q580 40 560 50" stroke={leaf} strokeWidth="0.6" fill="none" opacity="0.03" strokeLinecap="round" />
          <path d="M1300 1020 Q1320 1000 1340 1010" stroke={stalk} strokeWidth="0.6" fill="none" opacity="0.03" strokeLinecap="round" />
          {/* Zen garden lines */}
          <path d="M0 900 Q200 890 400 900 Q600 910 800 900" stroke={bamboo} strokeWidth="0.5" fill="none" opacity="0.03" />
        </svg>

        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0 }}>
            <line x1="28" y1="4" x2="28" y2="52" stroke={bamboo} strokeWidth="3" />
            <ellipse cx="28" cy="18" rx="5" ry="3" stroke={bamboo} strokeWidth="1" fill="none" />
            <ellipse cx="28" cy="36" rx="5" ry="3" stroke={bamboo} strokeWidth="1" fill="none" />
            <path d="M28 18 Q16 10 10 16" stroke={leaf} strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M28 18 Q40 10 46 16" stroke={leaf} strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M28 36 Q18 28 12 32" stroke={stalk} strokeWidth="1" fill="none" opacity="0.6" strokeLinecap="round" />
          </svg>
          <div>
            <svg width="180" height="10" viewBox="0 0 180 10" fill="none" style={{ marginBottom: 6 }}>
              <line x1="0" y1="5" x2="180" y2="5" stroke={bamboo} strokeWidth="1.5" opacity="0.25" />
              <line x1="60" y1="2" x2="60" y2="8" stroke={bamboo} strokeWidth="1" opacity="0.2" />
              <line x1="120" y1="2" x2="120" y2="8" stroke={bamboo} strokeWidth="1" opacity="0.15" />
            </svg>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '0.04em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const colors = [bamboo, leaf, stalk];
            const c = colors[i % 3];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 4, border: '1px solid rgba(74,106,58,0.1)', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
                    <line x1="18" y1="4" x2="18" y2="32" stroke={c} strokeWidth="2" />
                    <ellipse cx="18" cy="12" rx="3" ry="2" stroke={c} strokeWidth="0.8" fill="none" opacity="0.5" />
                    <ellipse cx="18" cy="24" rx="3" ry="2" stroke={c} strokeWidth="0.8" fill="none" opacity="0.4" />
                    <text x="18" y="34" textAnchor="middle" fontSize="8" fontWeight="300" fill={c}>{String(i + 1).padStart(2, '0')}</text>
                  </svg>
                  <svg width="100%" height="6" viewBox="0 0 200 6" fill="none" style={{ flex: 1 }}>
                    <line x1="0" y1="3" x2="200" y2="3" stroke={c} strokeWidth="1" opacity="0.15" />
                    <line x1="50" y1="1" x2="50" y2="5" stroke={c} strokeWidth="0.5" opacity="0.12" />
                    <line x1="150" y1="1" x2="150" y2="5" stroke={c} strokeWidth="0.5" opacity="0.1" />
                  </svg>
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

export const lineArtBamboo: TemplateConfig = {
  id: 'lineArtBamboo',
  name: '竹子',
  description: '竹节线条竹叶装饰，东方禅意',
  icon: 'spa',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtBamboo, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtBamboo'),
};
