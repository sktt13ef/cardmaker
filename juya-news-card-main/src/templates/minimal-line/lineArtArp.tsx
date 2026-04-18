import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtArpProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtArp: React.FC<LineArtArpProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f6f4f0' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                <path d="M14 2 Q22 2 26 10 Q28 18 20 18 Q12 18 8 12 Q4 6 10 3 Z" stroke={index <= config.activeIndex ? '#7a6b5d' : '#d8d0c4'} strokeWidth="1.5" fill={index <= config.activeIndex ? '#b8a088' : 'transparent'} fillOpacity="0.3" />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 500, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const earth = '#7a6b5d';
  const sand = '#b8a088';
  const moss = '#6b7a5d';
  const clay = '#a08068';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f6f4f0' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Arp full-screen organic biomorphic shapes, irregular curves */}
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Large biomorphic shape - top right */}
          <path d="M1600 60 Q1720 20 1800 80 Q1880 160 1820 260 Q1740 320 1640 280 Q1540 220 1560 120 Q1570 70 1600 60" stroke={earth} strokeWidth="1.5" fill={sand} fillOpacity="0.04" opacity="0.12" />
          {/* Smaller organic shape inside */}
          <path d="M1640 100 Q1720 80 1770 120 Q1810 170 1770 220 Q1710 260 1650 230 Q1600 190 1620 140 Z" stroke={moss} strokeWidth="1" fill="none" opacity="0.08" />
          {/* Biomorph - bottom left */}
          <path d="M80 820 Q160 780 240 820 Q300 880 260 940 Q200 1000 120 960 Q40 920 50 860 Z" stroke={clay} strokeWidth="1.5" fill={clay} fillOpacity="0.04" opacity="0.1" />
          <path d="M120 860 Q170 840 210 870 Q240 910 210 940 Q170 960 130 930 Q100 900 120 860" stroke={earth} strokeWidth="0.8" fill="none" opacity="0.06" />
          {/* Floating organic shapes across background */}
          <path d="M400 120 Q450 90 500 120 Q530 160 490 190 Q440 200 410 170 Q390 140 400 120" stroke={sand} strokeWidth="0.8" fill={sand} fillOpacity="0.03" opacity="0.1" />
          <path d="M1300 100 Q1360 70 1400 110 Q1420 160 1370 180 Q1310 170 1290 130 Z" stroke={moss} strokeWidth="0.8" fill="none" opacity="0.06" />
          <path d="M700 900 Q760 870 810 910 Q830 960 780 990 Q720 980 700 940 Z" stroke={earth} strokeWidth="0.8" fill={earth} fillOpacity="0.03" opacity="0.08" />
          <path d="M1500 750 Q1550 720 1590 760 Q1600 810 1550 830 Q1500 810 1490 780 Z" stroke={clay} strokeWidth="0.8" fill="none" opacity="0.06" />
          {/* Wavy irregular lines */}
          <path d="M0 400 Q100 380 200 410 Q350 450 500 400 Q650 350 800 390" stroke={earth} strokeWidth="0.8" fill="none" opacity="0.04" />
          <path d="M1100 600 Q1250 560 1400 600 Q1550 640 1700 590 Q1850 550 1920 580" stroke={sand} strokeWidth="0.8" fill="none" opacity="0.04" />
          {/* Small floating blob */}
          <path d="M960 200 Q990 180 1020 200 Q1030 230 1000 240 Q970 230 960 200" stroke={moss} strokeWidth="0.6" fill={moss} fillOpacity="0.03" opacity="0.08" />
        </svg>

        {/* Title with organic blob decoration */}
        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" style={{ flexShrink: 0 }}>
            <path d="M30 4 Q48 4 54 20 Q60 38 48 50 Q34 60 18 52 Q4 42 6 24 Q10 8 30 4" stroke={earth} strokeWidth="1.5" fill={sand} fillOpacity="0.15" />
            <path d="M30 16 Q40 16 44 26 Q46 36 38 42 Q28 46 22 38 Q18 28 24 20 Z" stroke={moss} strokeWidth="0.8" fill="none" opacity="0.4" />
          </svg>
          <div>
            {/* Soft organic line above title */}
            <svg width="180" height="8" viewBox="0 0 180 8" fill="none" style={{ marginBottom: 6 }}>
              <path d="M0 4 Q30 2 60 4 Q90 6 120 4 Q150 2 180 4" stroke={clay} strokeWidth="1.5" fill="none" opacity="0.4" />
            </svg>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        {/* Cards with soft rounded organic style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const colors = [earth, moss, sand, clay];
            const c = colors[i % 4];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 28, boxShadow: '0 2px 10px rgba(122,107,93,0.05)', border: '1.5px solid rgba(122,107,93,0.1)', position: 'relative' }}>
                {/* Organic blob decoration in card */}
                <svg width="40" height="30" viewBox="0 0 40 30" fill="none" style={{ position: 'absolute', top: 6, right: 10, opacity: 0.08 }}>
                  <path d="M20 2 Q32 2 38 12 Q40 22 30 26 Q18 28 10 20 Q4 10 14 4 Z" stroke={c} strokeWidth="0.8" fill={c} fillOpacity="0.15" />
                </svg>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Organic blob number indicator */}
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M18 3 Q30 3 33 14 Q36 26 26 32 Q14 36 6 28 Q0 18 8 8 Q12 3 18 3" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.06" />
                    <text x="18" y="22" textAnchor="middle" fontSize="12" fontWeight="600" fill={c}>{String(i + 1).padStart(2, '0')}</text>
                  </svg>
                  {/* Soft organic separator */}
                  <svg width="100%" height="6" viewBox="0 0 200 6" fill="none" style={{ flex: 1 }}>
                    <path d="M0 3 Q50 1 100 3 Q150 5 200 3" stroke={c} strokeWidth="1.2" fill="none" opacity="0.2" />
                  </svg>
                </div>
                <h3 style={{ fontSize: isSingleCard ? '48px' : '34px', fontWeight: 400, color: '#111122', margin: 0, lineHeight: 1.4 }}>{card.title}</h3>
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

export const lineArtArp: TemplateConfig = {
  id: 'lineArtArp',
  name: '阿尔普形',
  description: '有机生物形态，柔和圆融',
  icon: 'nature',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtArp, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtArp'),
};
