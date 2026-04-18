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
 * ClaudeStyle 模板 - 暖调卡片
 * 设计理念：
 * - 温暖：柔和的暖色调
 * - 舒适：轻松的视觉氛围
 * - 亲和：友好的设计语言
 * - 平衡：内容与形式的和谐
 */
interface ClaudeStyleProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const ClaudeStyle: React.FC<ClaudeStyleProps> = ({ data, scale, progressBarConfig }) => {
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
        background: '#fbf9f6',
        borderBottom: position === 'top' ? '1px solid #e5e7eb' : undefined,
        borderTop: position === 'bottom' ? '1px solid #e5e7eb' : undefined,
      }}>
        <div style={{ width: '100%', height: 4, background: '#e5e7eb', borderRadius: 2, display: 'flex', position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, height: '100%',
            width: `${((activeIndex + 1) / segmentCount) * 100}%`,
            background: '#c96442', borderRadius: 2, transition: 'width 0.3s ease',
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
              color: index <= activeIndex ? '#c96442' : '#9ca3af', transition: 'color 0.3s ease',
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
        .claude-container {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif;
          background: #fbf9f6;
        }

        .claude-title {
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #c96442;
        }

        .claude-card {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          transition: all 0.2s ease;
        }

        .claude-card:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
        }

        .claude-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          background: #f0eee6;
          color: #c96442;
        }

        .claude-card-title {
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: -0.01em;
          line-height: 1.3;
          color: #4a403a;
        }

        .claude-desc {
          font-size: 24px;
          line-height: 1.7;
          color: #44403c;
        }

        .claude-desc code {
          background: #f0eee6;
          padding: 0.15em 0.4em;
          border-radius: 6px;
          font-family: 'SF Mono', monospace;
          font-size: 0.9em;
          color: #c96442;
        }

        .claude-desc strong {
          font-weight: 600;
          color: #4a403a;
        }

        .text-6xl { font-size: 4rem; line-height: 1.05; }
        .text-5-5xl { font-size: 3.5rem; line-height: 1.1; }
        .text-5xl { font-size: 3.25rem; line-height: 1.15; }
        .text-4-5xl { font-size: 2.75rem; line-height: 1.2; }
        .text-4xl { font-size: 2.5rem; line-height: 1.2; }
        .text-3-5xl { font-size: 2.25rem; line-height: 1.25; }
        .text-3xl { font-size: 2rem; line-height: 1.3; }
        .text-2-5xl { font-size: 1.875rem; line-height: 1.3; }

        .card-width-2col { width: calc((100% - var(--container-gap)) / 2 - 1px); }
        .card-width-3col { width: calc((100% - var(--container-gap) * 2) / 3 - 1px); }
        .card-width-4col { width: calc((100% - var(--container-gap) * 3) / 4 - 1px); }

        .content-scale { transform-origin: center center; }
      `}</style>

      <div className="claude-container relative box-border w-full h-full overflow-hidden flex flex-col items-center justify-center" style={{ flex: 1 }}>
        <div
          ref={wrapperRef}
          className="content-wrapper w-full flex flex-col items-center px-32 box-border content-scale"
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
              className={`claude-title ${layout.titleSizeClass}`}
              style={{ fontSize: titleConfig.initialFontSize + 'px' }}
            >
              {data.mainTitle}
            </h1>
          </div>

          {/* 卡片区域 */}
          <div className="card-zone flex-none w-full">
            <div
              className="w-full flex flex-wrap justify-center content-center"
              style={{
                gap: layout.containerGap,
                '--container-gap': layout.containerGap
              } as React.CSSProperties}
            >
              {data.cards.map((card, idx) => (
                <div
                  key={idx}
                  className={`claude-card flex flex-col ${layout.cardWidthClass}`}
                  style={{ padding: layout.cardPadding }}
                >
                  <div className="card-header flex items-center gap-4 mb-5">
                    <div className="claude-icon">
                      <span className="material-symbols-rounded">{card.icon}</span>
                    </div>
                    <h3 className={`claude-card-title ${layout.descSizeClass}`}>
                      {card.title}
                    </h3>
                  </div>
                  <p
                    className={`claude-desc ${layout.descSizeClass}`}
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

export const claudeStyleTemplate: TemplateConfig = {
  id: 'claudeStyle',
  name: '暖调卡片',
  description: '温暖舒适的卡片风格，暖色调配色，友好亲和',
  icon: 'space_dashboard',
  render: (data, scale, progressBarConfig) => React.createElement(ClaudeStyle, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'claudeStyle'),
};
