import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from './types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../utils/template';
import {
  calculateStandardLayout,
  getStandardTitleConfig,
} from '../utils/layout-calculator';
import { ProgressBarConfig } from '../types/progress-bar';

/**
 * BentoGrid 模板 - 便当格风格
 * 设计理念：
 * - 模块化：清晰的网格分区
 * - 平衡：各卡片大小错落有致
 * - 简洁：去除多余装饰
 * - 现代：Apple/Linear风格的简洁美学
 */
interface BentoGridProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const BentoGrid: React.FC<BentoGridProps> = ({ data, scale, progressBarConfig }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const N = data.cards.length;
  const layout = calculateStandardLayout(N);
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
      while (title.scrollWidth > 1700 && size > titleConfig.minFontSize && guard < 100) {
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

  // Bento Grid 布局逻辑
  const getContainerStyle = (): React.CSSProperties => {
    if (N === 1) return { display: 'flex', justifyContent: 'center', gap: layout.containerGap };
    if (N <= 4) return {
      display: 'grid',
      gridTemplateColumns: N === 2 ? '1fr 1fr' : 'repeat(2, 1fr)',
      gridAutoRows: 'minmax(200px, auto)',
      gap: layout.containerGap
    };
    return {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridAutoRows: 'minmax(180px, auto)',
      gap: layout.containerGap
    };
  };

  const getCardStyle = (idx: number): React.CSSProperties => {
    const style: React.CSSProperties = {};
    if (idx === 0 && N > 2 && N <= 6) {
      if (N === 4) {
        style.gridColumn = 'span 2';
        style.gridRow = 'span 2';
      }
    }
    if (idx === 0 && N > 6) {
      style.gridColumn = 'span 2';
      style.gridRow = 'span 2';
    }
    return style;
  };

  const topConfig = progressBarConfig?.top;
  const bottomConfig = progressBarConfig?.bottom;

  const renderProgressBar = (position: 'top' | 'bottom') => {
    const config = position === 'top' ? topConfig : bottomConfig;
    if (!config?.show) return null;
    const { segmentCount, segmentLabels, activeIndex } = config;

    return (
      <div style={{
        width: '100%',
        padding: position === 'top' ? '20px 60px 12px' : '12px 60px 20px',
        background: '#fafafc',
        borderBottom: position === 'top' ? '1px solid #e5e7eb' : undefined,
        borderTop: position === 'bottom' ? '1px solid #e5e7eb' : undefined,
      }}>
        <div style={{ width: '100%', height: 4, background: '#e5e7eb', borderRadius: 2, display: 'flex', position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, height: '100%',
            width: `${((activeIndex + 1) / segmentCount) * 100}%`,
            background: '#0071e3', borderRadius: 2, transition: 'width 0.3s ease',
          }} />
          {Array.from({ length: segmentCount - 1 }, (_, i) => (
            <div key={i} style={{
              position: 'absolute', left: `${((i + 1) / segmentCount) * 100}%`,
              top: 0, width: 2, height: '100%', background: '#fff', transform: 'translateX(-50%)',
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          {segmentLabels.slice(0, segmentCount).map((label, index) => (
            <div key={index} style={{
              flex: 1, textAlign: 'center', fontSize: '12px', fontWeight: 500,
              color: index <= activeIndex ? '#0071e3' : '#9ca3af', transition: 'color 0.3s ease',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}>{label}</div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {renderProgressBar('top')}
      <style>{`
        .bento-container {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif;
          background: #fafafc;
        }

        .bento-title {
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #1d1d1f;
        }

        .bento-card {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.06);
          transition: all 0.2s ease;
        }

        .bento-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        .bento-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          background: #f5f5f7;
          color: #0071e3;
        }

        .bento-card-title {
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: -0.01em;
          line-height: 1.3;
          color: #1d1d1f;
        }

        .bento-desc {
          font-size: 24px;
          line-height: 1.7;
          color: #424245;
        }

        .bento-desc code {
          background: #f5f5f7;
          padding: 0.15em 0.4em;
          border-radius: 4px;
          font-family: 'SF Mono', monospace;
          font-size: 0.9em;
          color: #0071e3;
        }

        .bento-desc strong {
          font-weight: 600;
          color: #1d1d1f;
        }

        .text-6xl { font-size: 4rem; line-height: 1.05; }
        .text-5-5xl { font-size: 3.5rem; line-height: 1.1; }
        .text-5xl { font-size: 3.25rem; line-height: 1.15; }
        .text-4-5xl { font-size: 2.75rem; line-height: 1.2; }
        .text-4xl { font-size: 2.5rem; line-height: 1.2; }
        .text-3-5xl { font-size: 2.25rem; line-height: 1.25; }
        .text-3xl { font-size: 2rem; line-height: 1.3; }
        .text-2-5xl { font-size: 1.875rem; line-height: 1.3; }

        .content-scale { transform-origin: center center; }
      `}</style>

      <div className="bento-container relative box-border w-full h-full overflow-hidden flex flex-col items-center justify-center" style={{ flex: 1 }}>
        <div
          ref={wrapperRef}
          className="content-wrapper w-full flex flex-col items-center px-24 box-border content-scale"
          style={{
            gap: layout.wrapperGap,
            paddingLeft: layout.wrapperPaddingX || undefined,
            paddingRight: layout.wrapperPaddingX || undefined
          }}
        >
          {/* 标题区域 */}
          <div className="title-zone flex-none w-full text-center">
            <h1
              ref={titleRef}
              className={`bento-title ${layout.titleSizeClass}`}
              style={{ fontSize: titleConfig.initialFontSize + 'px' }}
            >
              {data.mainTitle}
            </h1>
          </div>

          {/* 卡片区域 */}
          <div className="card-zone flex-none w-full max-w-[1400px]">
            <div
              className="w-full"
              style={getContainerStyle()}
            >
              {data.cards.map((card, idx) => (
                <div
                  key={idx}
                  className="bento-card flex flex-col"
                  style={{
                    padding: layout.cardPadding,
                    ...getCardStyle(idx)
                  }}
                >
                  <div className="card-header flex items-center gap-3 mb-4">
                    <div className="bento-icon">
                      <span className="material-symbols-rounded">{card.icon}</span>
                    </div>
                    <h3 className={`bento-card-title ${layout.descSizeClass}`}>
                      {card.title}
                    </h3>
                  </div>
                  <p
                    className={`bento-desc ${layout.descSizeClass}`}
                    dangerouslySetInnerHTML={{ __html: card.desc }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {renderProgressBar('bottom')}
    </div>
  );
};

export const bentoGridTemplate: TemplateConfig = {
  id: 'bentoGrid',
  name: '便当格风格',
  description: '模块化网格布局，Apple/Linear风格的简洁美学',
  icon: 'grid_view',
  render: (data, scale, progressBarConfig) => React.createElement(BentoGrid, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'bentoGrid'),
};
