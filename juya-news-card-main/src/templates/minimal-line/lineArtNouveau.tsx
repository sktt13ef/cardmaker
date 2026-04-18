import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtNouveauProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtNouveau: React.FC<LineArtNouveauProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f8f5f0' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 4 Q18 4 20 10 Q22 16 16 20 Q12 22 8 20 Q2 16 4 10 Q6 4 12 4" stroke={index <= config.activeIndex ? '#6b8c5a' : '#c8d4c0'} strokeWidth="1.5" fill="none" />
                <path d="M12 8 Q15 8 16 11 Q17 14 14 16 Q12 17 10 16 Q7 14 8 11 Q9 8 12 8" fill={index <= config.activeIndex ? '#6b8c5a' : 'transparent'} fillOpacity="0.2" />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 500, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const sage = '#6b8c5a';
  const olive = '#8a7a50';
  const copper = '#a07050';
  const cream = '#f8f5f0';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: cream }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Art Nouveau full-screen flowing curves, plant motifs, vine decorations */}
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Large flowing vine - top right */}
          <path d="M1500 0 Q1540 60 1520 120 Q1500 180 1540 240 Q1580 300 1560 360" stroke={sage} strokeWidth="2" fill="none" opacity="0.08" />
          <path d="M1520 60 Q1560 40 1580 70 Q1590 100 1560 110" stroke={sage} strokeWidth="1" fill="none" opacity="0.06" />
          <path d="M1540 180 Q1580 160 1600 190 Q1610 220 1580 230" stroke={olive} strokeWidth="0.8" fill="none" opacity="0.06" />
          {/* Vine tendril - right side */}
          <path d="M1850 200 Q1880 280 1860 360 Q1840 440 1870 520 Q1900 600 1880 680" stroke={copper} strokeWidth="1.5" fill="none" opacity="0.06" />
          <path d="M1860 360 Q1900 340 1910 370" stroke={copper} strokeWidth="0.8" fill="none" opacity="0.05" />
          <path d="M1870 520 Q1910 500 1920 530" stroke={sage} strokeWidth="0.8" fill="none" opacity="0.04" />
          {/* Large flowing curve - bottom left */}
          <path d="M0 800 Q80 760 160 800 Q240 840 320 800 Q400 760 480 800" stroke={sage} strokeWidth="1.5" fill="none" opacity="0.06" />
          <path d="M80 760 Q100 730 130 740 Q150 750 140 780" stroke={olive} strokeWidth="0.8" fill="none" opacity="0.05" />
          <path d="M240 840 Q260 870 290 860 Q310 850 300 820" stroke={copper} strokeWidth="0.8" fill="none" opacity="0.05" />
          {/* Flower-like shapes */}
          <path d="M1700 900 Q1720 870 1740 900 Q1720 930 1700 900" stroke={sage} strokeWidth="0.8" fill={sage} fillOpacity="0.03" opacity="0.08" />
          <path d="M1720 880 Q1740 850 1760 880 Q1740 910 1720 880" stroke={olive} strokeWidth="0.8" fill="none" opacity="0.06" />
          <path d="M1740 900 Q1760 870 1780 900 Q1760 930 1740 900" stroke={copper} strokeWidth="0.8" fill="none" opacity="0.06" />
          {/* Flowing stem with leaves - left side */}
          <path d="M60 200 Q40 300 60 400 Q80 500 50 600" stroke={sage} strokeWidth="1.5" fill="none" opacity="0.05" />
          <path d="M40 300 Q20 280 30 260 Q40 250 50 270" stroke={olive} strokeWidth="0.8" fill="none" opacity="0.05" />
          <path d="M60 400 Q80 380 90 400 Q85 420 70 410" stroke={sage} strokeWidth="0.8" fill="none" opacity="0.04" />
          <path d="M50 600 Q30 580 40 560 Q50 550 60 570" stroke={copper} strokeWidth="0.8" fill="none" opacity="0.04" />
          {/* Whiplash curve across top */}
          <path d="M300 40 Q500 10 700 40 Q900 70 1100 30" stroke={olive} strokeWidth="0.8" fill="none" opacity="0.04" />
        </svg>

        {/* Title with Art Nouveau vine decoration */}
        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" style={{ flexShrink: 0 }}>
            {/* Flower with petals */}
            <path d="M30 10 Q35 20 30 30 Q25 20 30 10" stroke={sage} strokeWidth="1.2" fill={sage} fillOpacity="0.1" />
            <path d="M30 30 Q40 25 50 30 Q40 35 30 30" stroke={olive} strokeWidth="1.2" fill={olive} fillOpacity="0.1" />
            <path d="M30 30 Q35 40 30 50 Q25 40 30 30" stroke={sage} strokeWidth="1.2" fill={sage} fillOpacity="0.1" />
            <path d="M30 30 Q20 25 10 30 Q20 35 30 30" stroke={olive} strokeWidth="1.2" fill={olive} fillOpacity="0.1" />
            <circle cx="30" cy="30" r="4" fill={copper} opacity="0.3" />
            {/* Stem */}
            <path d="M30 50 Q28 55 30 60" stroke={sage} strokeWidth="1" opacity="0.4" />
          </svg>
          <div>
            {/* Flowing vine line above title */}
            <svg width="200" height="12" viewBox="0 0 200 12" fill="none" style={{ marginBottom: 4 }}>
              <path d="M0 6 Q30 2 60 6 Q90 10 120 6 Q150 2 180 6 Q195 8 200 6" stroke={sage} strokeWidth="1.5" fill="none" opacity="0.4" />
              <path d="M60 4 Q65 0 70 4" stroke={olive} strokeWidth="0.8" fill="none" opacity="0.3" />
              <path d="M120 8 Q125 12 130 8" stroke={olive} strokeWidth="0.8" fill="none" opacity="0.3" />
            </svg>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        {/* Cards with Art Nouveau flowing style */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const colors = [sage, olive, copper];
            const c = colors[i % 3];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 16, boxShadow: '0 2px 8px rgba(107,140,90,0.05)', border: '1.5px solid rgba(107,140,90,0.12)', position: 'relative' }}>
                {/* Small vine decoration in card */}
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" style={{ position: 'absolute', top: 6, right: 8, opacity: 0.1 }}>
                  <path d="M15 2 Q20 8 15 14 Q10 8 15 2" stroke={c} strokeWidth="0.8" fill={c} fillOpacity="0.15" />
                  <path d="M15 14 Q22 12 28 15 Q22 18 15 16" stroke={c} strokeWidth="0.6" fill="none" />
                </svg>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Flower-petal number indicator */}
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M18 6 Q21 12 18 18 Q15 12 18 6" stroke={c} strokeWidth="1.2" fill={c} fillOpacity="0.06" />
                    <path d="M18 18 Q24 15 30 18 Q24 21 18 18" stroke={c} strokeWidth="1.2" fill={c} fillOpacity="0.06" />
                    <path d="M18 18 Q21 24 18 30 Q15 24 18 18" stroke={c} strokeWidth="1.2" fill={c} fillOpacity="0.06" />
                    <path d="M18 18 Q12 15 6 18 Q12 21 18 18" stroke={c} strokeWidth="1.2" fill={c} fillOpacity="0.06" />
                    <circle cx="18" cy="18" r="3" fill={c} opacity="0.3" />
                    <text x="18" y="21" textAnchor="middle" fontSize="9" fontWeight="600" fill={c}>{String(i + 1).padStart(2, '0')}</text>
                  </svg>
                  {/* Flowing vine separator */}
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

export const lineArtNouveau: TemplateConfig = {
  id: 'lineArtNouveau',
  name: '新艺术',
  description: '流畅曲线植物纹样，藤蔓装饰',
  icon: 'local_florist',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtNouveau, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtNouveau'),
};
