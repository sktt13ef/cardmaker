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
 * MaterialYou 模板 - 材质设计
 * 设计理念：
 * - 柔和：圆润的边角，舒适的视觉
 * - 层次：微妙的阴影创造深度
 * - 统一：一致的间距和圆角
 * - 亲和：友好的视觉语言
 */
interface MaterialYouProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const MaterialYou: React.FC<MaterialYouProps> = ({ data, scale, progressBarConfig }) => {
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
        background: '#f3edf7',
        borderBottom: position === 'top' ? '1px solid #e5e7eb' : undefined,
        borderTop: position === 'bottom' ? '1px solid #e5e7eb' : undefined,
      }}>
        <div style={{ width: '100%', height: 4, background: '#e5e7eb', borderRadius: 2, display: 'flex', position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, height: '100%',
            width: `${((activeIndex + 1) / segmentCount) * 100}%`,
            background: '#6750a4', borderRadius: 2, transition: 'width 0.3s ease',
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
              color: index <= activeIndex ? '#6750a4' : '#9ca3af', transition: 'color 0.3s ease',
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
        .material-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Google Sans', 'Roboto', system-ui, sans-serif;
          background: #f3edf7;
        }

        .material-title {
          font-weight: 400;
          letter-spacing: -0.01em;
          line-height: 1.2;
          color: #1d1b20;
        }

        .material-title-pill {
          background: #e8def8;
          border-radius: 100px;
          padding: 20px 48px;
          display: inline-block;
        }

        .material-card {
          background: #ffffff;
          border-radius: 24px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03), 0 2px 8px rgba(0, 0, 0, 0.04);
          transition: all 0.2s ease;
        }

        .material-card:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05), 0 8px 24px rgba(0, 0, 0, 0.06);
        }

        .material-icon {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          background: #f3edf7;
          color: #6750a4;
        }

        .material-card-title {
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: 0;
          line-height: 1.3;
          color: #1d1b20;
        }

        .material-desc {
          font-size: 24px;
          line-height: 1.7;
          color: #4a4a4a;
        }

        .material-desc code {
          background: #f3edf7;
          padding: 0.15em 0.4em;
          border-radius: 6px;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.9em;
          color: #6750a4;
        }

        .material-desc strong {
          font-weight: 500;
          color: #1d1b20;
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

      <div className="material-container relative box-border w-full h-full overflow-hidden flex flex-col items-center justify-center" style={{ flex: 1 }}>
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
            <div className="material-title-pill">
              <h1
                ref={titleRef}
                className={`material-title ${layout.titleSizeClass}`}
                style={{ fontSize: titleConfig.initialFontSize + 'px' }}
              >
                {data.mainTitle}
              </h1>
            </div>
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
                  className={`material-card flex flex-col ${layout.cardWidthClass}`}
                  style={{ padding: layout.cardPadding }}
                >
                  <div className="card-header flex items-center gap-4 mb-5">
                    <div className="material-icon">
                      <span className="material-symbols-rounded">{card.icon}</span>
                    </div>
                    <h3 className={`material-card-title ${layout.descSizeClass}`}>
                      {card.title}
                    </h3>
                  </div>
                  <p
                    className={`material-desc ${layout.descSizeClass}`}
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

export const materialYouTemplate: TemplateConfig = {
  id: 'materialYou',
  name: '材质设计',
  description: '圆润柔和的材质设计风格，现代亲切',
  icon: 'layers',
  render: (data, scale, progressBarConfig) => React.createElement(MaterialYou, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'materialYou'),
};
