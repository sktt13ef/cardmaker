import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineArtTopazProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineArtTopaz: React.FC<LineArtTopazProps> = ({ data, scale, progressBarConfig }) => {
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#faf6f0' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <line x1="10" y1="2" x2="10" y2="18" stroke={index <= config.activeIndex ? '#c89020' : '#e0d8c0'} strokeWidth="2" />
                <line x1="2" y1="10" x2="18" y2="10" stroke={index <= config.activeIndex ? '#c89020' : '#e0d8c0'} strokeWidth="1" />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 400, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const gold = '#c89020';
  const amber = '#e0a830';
  const warm = '#f0d080';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#faf6f0' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: isSingleCard ? '40px 64px' : '32px 56px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Radiating lines from top right */}
          <line x1="1920" y1="0" x2="1500" y2="400" stroke={gold} strokeWidth="1.5" opacity="0.06" />
          <line x1="1920" y1="0" x2="1400" y2="300" stroke={amber} strokeWidth="1" opacity="0.05" />
          <line x1="1920" y1="0" x2="1600" y2="500" stroke={gold} strokeWidth="1" opacity="0.04" />
          <line x1="1920" y1="0" x2="1300" y2="200" stroke={warm} strokeWidth="0.8" opacity="0.04" />
          <line x1="1920" y1="0" x2="1700" y2="600" stroke={amber} strokeWidth="0.8" opacity="0.03" />
          {/* Radiating lines from bottom left */}
          <line x1="0" y1="1080" x2="400" y2="680" stroke={gold} strokeWidth="1.5" opacity="0.05" />
          <line x1="0" y1="1080" x2="500" y2="780" stroke={amber} strokeWidth="1" opacity="0.04" />
          <line x1="0" y1="1080" x2="300" y2="580" stroke={gold} strokeWidth="0.8" opacity="0.03" />
          {/* Sun burst circle */}
          <circle cx="1750" cy="150" r="60" stroke={gold} strokeWidth="1.5" fill={gold} fillOpacity="0.02" opacity="0.08" />
          <circle cx="1750" cy="150" r="40" stroke={amber} strokeWidth="1" fill="none" opacity="0.06" />
          {/* Warm glow areas */}
          <ellipse cx="200" cy="900" rx="150" ry="100" fill={gold} opacity="0.015" />
          <ellipse cx="1700" cy="150" rx="100" ry="80" fill={amber} opacity="0.02" />
        </svg>

        <div style={{ marginBottom: isSingleCard ? '32px' : '28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="28" cy="28" r="8" fill={gold} opacity="0.3" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map(j => (
              <line key={j} x1={28 + 12 * Math.cos(j * Math.PI / 4)} y1={28 + 12 * Math.sin(j * Math.PI / 4)} x2={28 + 24 * Math.cos(j * Math.PI / 4)} y2={28 + 24 * Math.sin(j * Math.PI / 4)} stroke={gold} strokeWidth="1.5" opacity="0.4" />
            ))}
          </svg>
          <div>
            <svg width="180" height="10" viewBox="0 0 180 10" fill="none" style={{ marginBottom: 6 }}>
              <line x1="90" y1="0" x2="90" y2="10" stroke={gold} strokeWidth="1.5" opacity="0.3" />
              <line x1="0" y1="5" x2="180" y2="5" stroke={amber} strokeWidth="1" opacity="0.2" />
            </svg>
            <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: isSingleCard ? '28px' : '24px', alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => {
            const colors = [gold, amber, warm];
            const c = colors[i % 3];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: isSingleCard ? '32px 36px' : '24px 28px', background: '#FFFFFF', borderRadius: 10, boxShadow: '0 2px 8px rgba(200,144,32,0.05)', border: '1px solid rgba(200,144,32,0.12)', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="18" cy="18" r="5" fill={c} opacity="0.25" />
                    {[0, 1, 2, 3].map(j => (
                      <line key={j} x1={18 + 7 * Math.cos(j * Math.PI / 2)} y1={18 + 7 * Math.sin(j * Math.PI / 2)} x2={18 + 15 * Math.cos(j * Math.PI / 2)} y2={18 + 15 * Math.sin(j * Math.PI / 2)} stroke={c} strokeWidth="1" opacity="0.4" />
                    ))}
                    <text x="18" y="22" textAnchor="middle" fontSize="9" fontWeight="600" fill={c}>{String(i + 1).padStart(2, '0')}</text>
                  </svg>
                  <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(90deg, ' + c + ' 0%, transparent 100%)', opacity: 0.2 }} />
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

export const lineArtTopaz: TemplateConfig = {
  id: 'lineArtTopaz',
  name: '黄玉',
  description: '金黄色调放射线条，温暖明亮',
  icon: 'wb_sunny',
  render: (data, scale, progressBarConfig) => React.createElement(LineArtTopaz, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineArtTopaz'),
};
