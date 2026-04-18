import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtSapphireProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtSapphire: React.FC<LineArtSapphireProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f0f2f8' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <polygon points="10,1 19,7 19,13 10,19 1,13 1,7" stroke={index <= config.activeIndex ? '#1a3a7a' : '#c0c8e0'} strokeWidth="1.5" fill={index <= config.activeIndex ? '#1a3a7a' : 'transparent'} fillOpacity="0.12" />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 400, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const sapphire = '#1a3a7a';
  const royal = '#2a5aaa';
  const ice = '#7aaad8';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f0f2f8' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Large faceted gem - top right */}
          <polygon points="1700,30 1800,60 1820,140 1760,200 1660,180 1640,100" stroke={sapphire} strokeWidth="2" fill={sapphire} fillOpacity="0.03" opacity="0.1" />
          <line x1="1700" y1="30" x2="1760" y2="200" stroke={ice} strokeWidth="0.5" opacity="0.06" />
          <line x1="1800" y1="60" x2="1660" y2="180" stroke={ice} strokeWidth="0.5" opacity="0.05" />
          <line x1="1640" y1="100" x2="1820" y2="140" stroke={ice} strokeWidth="0.5" opacity="0.04" />
          {/* Gem cluster - bottom left */}
          <polygon points="100,840 160,810 220,840 220,900 160,930 100,900" stroke={sapphire} strokeWidth="1.5" fill={sapphire} fillOpacity="0.02" opacity="0.08" />
          <polygon points="140,860 180,845 220,860 220,890 180,905 140,890" stroke={royal} strokeWidth="0.8" fill="none" opacity="0.05" />
          {/* Facet lines across */}
          <line x1="0" y1="540" x2="300" y2="540" stroke={royal} strokeWidth="0.5" opacity="0.03" />
          <line x1="1620" y1="540" x2="1920" y2="540" stroke={sapphire} strokeWidth="0.5" opacity="0.03" />
          {/* Scattered gem shapes */}
          <polygon points="800,60 830,45 860,60 860,90 830,105 800,90" stroke={ice} strokeWidth="0.6" fill="none" opacity="0.04" />
          <polygon points="1200,950 1230,935 1260,950 1260,980 1230,995 1200,980" stroke={royal} strokeWidth="0.6" fill="none" opacity="0.04" />
          {/* Deep blue wash */}
          <rect x="0" y="0" width="200" height="1080" fill={sapphire} opacity="0.01" />
          <rect x="1720" y="0" width="200" height="1080" fill={sapphire} opacity="0.01" />
        </svg>

        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0 }}>
            <polygon points="28,2 52,14 52,42 28,54 4,42 4,14" stroke={sapphire} strokeWidth="2" fill={sapphire} fillOpacity="0.06" />
            <line x1="28" y1="2" x2="28" y2="54" stroke={ice} strokeWidth="0.5" opacity="0.3" />
            <line x1="4" y1="14" x2="52" y2="42" stroke={ice} strokeWidth="0.5" opacity="0.2" />
            <line x1="52" y1="14" x2="4" y2="42" stroke={ice} strokeWidth="0.5" opacity="0.2" />
          </svg>
          <div>
            <svg width="180" height="10" viewBox="0 0 180 10" fill="none" style={{ marginBottom: 6 }}>
              <line x1="0" y1="5" x2="180" y2="5" stroke={sapphire} strokeWidth="1.5" opacity="0.25" />
              <line x1="0" y1="5" x2="60" y2="5" stroke={royal} strokeWidth="2" opacity="0.15" />
            </svg>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const colors = [sapphire, royal, ice];
            const c = colors[i % 3];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 6, boxShadow: '0 2px 8px rgba(26,58,122,0.05)', border: '1px solid rgba(26,58,122,0.1)', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
                    <polygon points="18,2 34,10 34,26 18,34 2,26 2,10" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.05" />
                    <line x1="18" y1="2" x2="18" y2="34" stroke={c} strokeWidth="0.4" opacity="0.3" />
                    <text x="18" y="22" textAnchor="middle" fontSize="11" fontWeight="600" fill={c}>{String(i + 1).padStart(2, '0')}</text>
                  </svg>
                  <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(90deg, ' + c + ' 0%, transparent 100%)', opacity: 0.18 }} />
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

export const lineArtSapphire: TemplateConfig = {
  id: 'lineArtSapphire',
  name: '蓝宝石',
  description: '深蓝色调切割面线条，高贵感',
  icon: 'diamond',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtSapphire, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtSapphire'),
};
