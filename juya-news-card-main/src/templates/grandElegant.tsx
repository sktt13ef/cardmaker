import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from './types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../utils/template';
import {
  calculateStandardLayout,
  getStandardTitleConfig,
  generateTitleFitScript,
  generateViewportFitScript,
} from '../utils/layout-calculator';
import { ProgressBarConfig } from '../types/progress-bar';

/**
 * GrandElegant 模板 - 大气优雅
 * 设计理念：
 * - 简洁：纯白背景，去除多余装饰
 * - 大气：大字号标题，充足留白
 * - 易读：清晰的层次，舒适的行距
 * - 优雅：克制的配色，精致的细节
 */
interface GrandElegantProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

// 克制的配色方案 - 仅使用灰度 + 一个强调色
const ELEGANT_COLORS = {
  background: '#ffffff',
  textPrimary: '#1a1a1a',
  textSecondary: '#4a4a4a',
  textMuted: '#6b6b6b',
  accent: '#2563eb', // 克制的蓝色
  border: '#e5e5e5',
  cardBg: '#fafafa',
};

const GrandElegant: React.FC<GrandElegantProps> = ({ data, scale, progressBarConfig }) => {
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
        background: '#fff',
        borderBottom: position === 'top' ? '1px solid #e5e7eb' : undefined,
        borderTop: position === 'bottom' ? '1px solid #e5e7eb' : undefined,
      }}>
        <div style={{ width: '100%', height: 4, background: '#e5e7eb', borderRadius: 2, display: 'flex', position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, height: '100%',
            width: `${((activeIndex + 1) / segmentCount) * 100}%`,
            background: '#2563eb', borderRadius: 2, transition: 'width 0.3s ease',
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
              color: index <= activeIndex ? '#2563eb' : '#9ca3af', transition: 'color 0.3s ease',
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
        .grand-container {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', system-ui, sans-serif;
          background: ${ELEGANT_COLORS.background};
        }

        .grand-title {
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: ${ELEGANT_COLORS.textPrimary};
        }

        .grand-card {
          background: ${ELEGANT_COLORS.cardBg};
          border: 1px solid ${ELEGANT_COLORS.border};
          border-radius: 12px;
          transition: all 0.2s ease;
        }

        .grand-card:hover {
          border-color: ${ELEGANT_COLORS.accent};
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }

        .grand-icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          background: ${ELEGANT_COLORS.background};
          border: 1px solid ${ELEGANT_COLORS.border};
          color: ${ELEGANT_COLORS.accent};
        }

        .grand-card-title {
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: -0.01em;
          line-height: 1.3;
          color: ${ELEGANT_COLORS.textPrimary};
        }

        .grand-desc {
          font-size: 24px;
          line-height: 1.7;
          color: ${ELEGANT_COLORS.textSecondary};
        }

        .grand-desc code {
          background: ${ELEGANT_COLORS.cardBg};
          padding: 0.15em 0.4em;
          border-radius: 4px;
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 0.9em;
          color: ${ELEGANT_COLORS.accent};
          border: 1px solid ${ELEGANT_COLORS.border};
        }

        .grand-desc strong {
          font-weight: 600;
          color: ${ELEGANT_COLORS.textPrimary};
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

      <div className="grand-container relative box-border w-full h-full overflow-hidden flex flex-col items-center justify-center" style={{ flex: 1 }}>
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
              className={`grand-title ${layout.titleSizeClass}`}
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
                  className={`grand-card flex flex-col ${layout.cardWidthClass}`}
                  style={{ padding: layout.cardPadding }}
                >
                  <div className="card-header flex items-center gap-4 mb-5">
                    <div className="grand-icon">
                      <span className="material-symbols-rounded">{card.icon}</span>
                    </div>
                    <h3 className={`grand-card-title ${layout.descSizeClass}`}>
                      {card.title}
                    </h3>
                  </div>
                  <p
                    className={`grand-desc ${layout.descSizeClass}`}
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

export const grandElegantTemplate: TemplateConfig = {
  id: 'grandElegant',
  name: '大气优雅',
  description: '简洁大气的优雅风格，纯白背景配克制配色，清晰易读',
  icon: 'star',
  render: (data, scale, progressBarConfig) => React.createElement(GrandElegant, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'grandElegant'),
};
