import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from './types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../utils/template';
import { getStandardTitleConfig } from '../utils/layout-calculator';
import { ProgressBarConfig } from '../types/progress-bar';

interface LineDividerProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineDivider: React.FC<LineDividerProps> = ({ data, scale, progressBarConfig }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const N = data.cards.length;
  const isSingleCard = N === 1;
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
      while (title.scrollWidth > 1600 && size > titleConfig.minFontSize && guard < 100) {
        size -= 1;
        title.style.fontSize = size + 'px';
        guard++;
      }
    };
    fitTitle();

    const fitViewport = () => {
      const maxH = 1040;
      const contentH = wrapper.scrollHeight;
      if (contentH > maxH) {
        const nextScale = Math.max(0.6, maxH / contentH);
        wrapper.style.transform = `scale(${nextScale})`;
        return;
      }
      wrapper.style.transform = '';
    };

    const timer = window.setTimeout(fitViewport, 50);
    return () => window.clearTimeout(timer);
  }, [data, titleConfig]);

  const numberSize = isSingleCard ? '140px' : '90px';
  const numberFontSize = isSingleCard ? '64px' : '40px';
  const titleSize = isSingleCard ? '80px' : '44px';
  const descSize = isSingleCard ? '48px' : '28px';

  // 进度条样式
  const topConfig = progressBarConfig?.top;
  const bottomConfig = progressBarConfig?.bottom;

  const renderProgressBar = (position: 'top' | 'bottom') => {
    const config = position === 'top' ? topConfig : bottomConfig;
    if (!config?.show) return null;
    const { segmentCount, segmentLabels, activeIndex } = config;

    return (
      <div style={{
        width: '100%',
        padding: position === 'top' ? '24px 140px 16px' : '16px 140px 24px',
        background: '#fff',
        borderBottom: position === 'top' ? '1px solid #e5e7eb' : undefined,
        borderTop: position === 'bottom' ? '1px solid #e5e7eb' : undefined,
      }}>
        {/* 进度条轨道 */}
        <div style={{
          width: '100%',
          height: 4,
          background: '#e5e7eb',
          borderRadius: 2,
          display: 'flex',
          position: 'relative',
        }}>
          {/* 已完成部分 */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${((activeIndex + 1) / segmentCount) * 100}%`,
            background: '#000',
            borderRadius: 2,
            transition: 'width 0.3s ease',
          }} />
          {/* 分段标记 */}
          {Array.from({ length: segmentCount - 1 }, (_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${((i + 1) / segmentCount) * 100}%`,
                top: 0,
                width: 2,
                height: '100%',
                background: '#fff',
                transform: 'translateX(-50%)',
              }}
            />
          ))}
        </div>
        {/* 标签 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 12,
        }}>
          {segmentLabels.slice(0, segmentCount).map((label, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: isSingleCard ? '18px' : '14px',
                fontWeight: 500,
                color: index <= activeIndex ? '#000' : '#9ca3af',
                transition: 'color 0.3s ease',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* 顶部进度条 */}
      {renderProgressBar('top')}

      <div ref={wrapperRef} style={{ 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
        background: '#fff',
        padding: isSingleCard ? '100px 180px' : '80px 140px', 
        display: 'flex', 
        flexDirection: 'column', 
        flex: 1,
        justifyContent: isSingleCard ? 'center' : 'flex-start',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ marginBottom: isSingleCard ? '60px' : '50px', paddingBottom: '30px', borderBottom: '4px solid #000' }}>
          <h1 ref={titleRef} style={{ 
            fontSize: isSingleCard ? '96px' : (titleConfig.initialFontSize + 'px'),
            fontWeight: 700, 
            letterSpacing: '-0.02em', 
            lineHeight: 1.1, 
            color: '#000',
            margin: 0
          }}>{data.mainTitle}</h1>
        </div>

        {/* List Items */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: isSingleCard ? 0 : 1 }}>
          {data.cards.slice(0, N).map((card, i) => (
            <div key={i} style={{ 
              display: 'flex',
              gap: isSingleCard ? '50px' : '40px',
              padding: isSingleCard ? '50px 0' : '35px 0',
              borderBottom: i < N - 1 ? '3px solid #e0e0e0' : 'none',
              alignItems: isSingleCard ? 'center' : 'flex-start'
            }}>
              {/* Number Badge */}
              <div style={{
                flexShrink: 0,
                width: numberSize,
                height: numberSize,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: numberFontSize,
                fontWeight: 700,
                color: '#fff',
                background: '#000',
                borderRadius: '20px'
              }}>{i + 1}</div>
              
              {/* Content */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: isSingleCard ? '20px' : '12px', paddingTop: isSingleCard ? '0' : '8px' }}>
                {/* Title */}
                <h3 style={{
                  fontSize: titleSize,
                  fontWeight: 700,
                  color: '#000',
                  margin: 0,
                  lineHeight: 1.2
                }}>{card.title}</h3>
                
                {/* Description */}
                <p style={{
                  fontSize: descSize,
                  color: '#333',
                  lineHeight: 1.6,
                  margin: 0
                }} dangerouslySetInnerHTML={{ __html: card.desc }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部进度条 */}
      {renderProgressBar('bottom')}
    </div>
  );
};

export const lineDividerTemplate: TemplateConfig = {
  id: 'lineDivider',
  name: '线条分割',
  description: '垂直线条分割，纵向列表布局，清晰条理',
  icon: 'vertical_split',
  render: (data, scale, progressBarConfig) => React.createElement(LineDivider, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineDivider'),
};
