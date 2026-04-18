import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from './types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../utils/template';
import { getStandardTitleConfig } from '../utils/layout-calculator';
import { ProgressBarConfig } from '../types/progress-bar';

interface LineFrameProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const LineFrame: React.FC<LineFrameProps> = ({ data, scale, progressBarConfig }) => {
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
      while (title.scrollWidth > 1500 && size > titleConfig.minFontSize && guard < 100) {
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

  const numberSize = isSingleCard ? '140px' : '100px';
  const numberFontSize = isSingleCard ? '64px' : '48px';
  const titleSize = isSingleCard ? '80px' : '40px';
  const descSize = isSingleCard ? '48px' : '26px';

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
        padding: position === 'top' ? '24px 120px 16px' : '16px 120px 24px',
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
        padding: isSingleCard ? '100px 120px' : '80px 100px', 
        display: 'flex', 
        flexDirection: 'column', 
        flex: 1,
        justifyContent: isSingleCard ? 'center' : 'flex-start',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ marginBottom: isSingleCard ? '80px' : '60px', paddingBottom: '30px', borderBottom: '4px solid #000' }}>
          <h1 ref={titleRef} style={{ 
            fontSize: isSingleCard ? '96px' : (titleConfig.initialFontSize + 'px'),
            fontWeight: 700, 
            letterSpacing: '-0.02em', 
            lineHeight: 1.1, 
            color: '#000',
            margin: 0
          }}>{data.mainTitle}</h1>
        </div>

        {/* Cards Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${cols}, 1fr)`, 
          gap: isSingleCard ? '60px' : '40px', 
          flex: isSingleCard ? 0 : 1,
          alignItems: isSingleCard ? 'center' : 'stretch'
        }}>
          {data.cards.slice(0, N).map((card, i) => (
            <div key={i} style={{ 
              display: isSingleCard ? 'flex' : 'flex',
              flexDirection: isSingleCard ? 'row' : 'column',
              gap: isSingleCard ? '40px' : '20px',
              padding: isSingleCard ? '50px' : '40px',
              border: '4px solid #000',
              borderRadius: '8px',
              position: 'relative',
              background: '#fff',
              alignItems: isSingleCard ? 'center' : 'stretch'
            }}>
              {/* Number Badge */}
              <div style={{
                width: numberSize,
                height: numberSize,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: numberFontSize,
                fontWeight: 700,
                color: '#fff',
                background: '#000',
                borderRadius: isSingleCard ? '20px' : '4px',
                flexShrink: 0
              }}>{i + 1}</div>
              
              {/* Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
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

export const lineFrameTemplate: TemplateConfig = {
  id: 'lineFrame',
  name: '线条框',
  description: '线条边框装饰，框线结构，精致古典',
  icon: 'crop_square',
  render: (data, scale, progressBarConfig) => React.createElement(LineFrame, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'lineFrame'),
};
