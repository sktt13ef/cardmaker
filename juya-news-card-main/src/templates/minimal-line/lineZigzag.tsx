import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { getStandardTitleConfig } from '../../utils/layout-calculator';
import { ProgressBarConfig } from '../../types/progress-bar';

interface LineZigzagProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineZigzag: React.FC<LineZigzagProps> = ({ data, scale, progressBarConfig }) => {
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
      if (wrapper.scrollHeight > maxH) { wrapper.style.transform = `scale(${Math.max(0.6, maxH / wrapper.scrollHeight)})`; }
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
      <div style={{ width: '100%', padding: '16px 48px', background: '#f8fafa' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                <polyline points="2,10 8,2 14,10 20,2 26,10 30,4" stroke={index <= config.activeIndex ? '#2d5a45' : '#c0d0c8'} strokeWidth="1.5" fill="none" opacity={index <= config.activeIndex ? 0.8 : 0.3} />
              </svg>
              <span style={{ fontSize: '26px', fontWeight: 500, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const accentColor = '#2d5a45';
  const innerPadding = isSingleCard ? '40px 64px' : '32px 56px';
  const topMargin = isSingleCard ? '32px' : '28px';
  const cardPadding = isSingleCard ? '32px 36px' : '24px 28px';
  const gridGap = isSingleCard ? '28px' : '24px';

  return (
    <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f8fafa' }}>
      {renderProgressBar('top')}
      <div ref={wrapperRef} style={{ flex: 1, padding: innerPadding, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 40, opacity: 0.2 }}>
          <svg viewBox="0 0 1920 40" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <polyline points="0,20 20,4 40,20 60,4 80,20 100,4 120,20 140,4 160,20 180,4 200,20 220,4 240,20 260,4 280,20 300,4 320,20 340,4 360,20 380,4 400,20 420,4 440,20 460,4 480,20 500,4 520,20 540,4 560,20 580,4 600,20 620,4 640,20 660,4 680,20 700,4 720,20 740,4 760,20 780,4 800,20 820,4 840,20 860,4 880,20 900,4 920,20 940,4 960,20 980,4 1000,20 1020,4 1040,20 1060,4 1080,20 1100,4 1120,20 1140,4 1160,20 1180,4 1200,20 1220,4 1240,20 1260,4 1280,20 1300,4 1320,20 1340,4 1360,20 1380,4 1400,20 1420,4 1440,20 1460,4 1480,20 1500,4 1520,20 1540,4 1560,20 1580,4 1600,20 1620,4 1640,20 1660,4 1680,20 1700,4 1720,20 1740,4 1760,20 1780,4 1800,20 1820,4 1840,20 1860,4 1880,20 1900,4 1920,20" stroke={accentColor} strokeWidth="1" fill="none" />
          </svg>
        </div>
        <div style={{ position: 'absolute', bottom: 24, right: 32, opacity: 0.12 }}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <polyline points="0,10 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10" stroke={accentColor} strokeWidth="0.8" fill="none" />
            <polyline points="0,30 10,20 20,30 30,20 40,30 50,20 60,30 70,20 80,30" stroke={accentColor} strokeWidth="0.8" fill="none" opacity="0.7" />
            <polyline points="0,50 10,40 20,50 30,40 40,50 50,40 60,50 70,40 80,50" stroke={accentColor} strokeWidth="0.8" fill="none" opacity="0.5" />
            <polyline points="0,70 10,60 20,70 30,60 40,70 50,60 60,70 70,60 80,70" stroke={accentColor} strokeWidth="0.8" fill="none" opacity="0.3" />
          </svg>
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 180, height: 30, opacity: 0.08 }}>
          <svg viewBox="0 0 180 30" fill="none">
            <polyline points="0,15 15,0 30,15 45,0 60,15 75,0 90,15 105,0 120,15 135,0 150,15 165,0 180,15" stroke={accentColor} strokeWidth="2" fill="none" />
          </svg>
        </div>

        <div style={{ marginBottom: topMargin, position: 'relative' }}>
          <svg width="48" height="20" viewBox="0 0 48 20" fill="none" style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}>
            <polyline points="2,16 10,4 18,14 26,6 34,16 42,8 46,16" stroke={accentColor} strokeWidth="2" fill="none" />
          </svg>
          <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0, paddingLeft: '64px' }}>{data.mainTitle}</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: gridGap, alignItems: 'start' }}>
          {data.cards.slice(0, N).map((card, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: cardPadding, background: '#FFFFFF', borderRadius: 0, boxShadow: '0 1px 2px rgba(45,90,69,0.04)', border: `1px solid rgba(45,90,69,0.12)`, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, overflow: 'hidden' }}>
                <svg viewBox="0 0 300 4" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                  <polyline points="0,4 10,0 20,4 30,0 40,4 50,0 60,4 70,0 80,4 90,0 100,4 110,0 120,4 130,0 140,4 150,0 160,4 170,0 180,4 190,0 200,4 210,0 220,4 230,0 240,4 250,0 260,4 270,0 280,4 290,0 300,4" stroke={accentColor} strokeWidth="2" fill="none" opacity="0.5" />
                </svg>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
                    <polyline points="2,12 8,2 14,12 20,2 26,12" stroke={accentColor} strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <div style={{ flex: 1, height: '1px', background: `rgba(45,90,69,0.15)` }} />
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

export const lineZigzag: TemplateConfig = {
  id: 'lineZigzag',
  name: '锯齿波浪',
  description: '锯齿波浪折线，锐利节奏感',
  icon: 'show_chart',
  render: (data, scale, progressBarConfig) => React.createElement(LineZigzag, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineZigzag'),
};
