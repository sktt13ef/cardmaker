import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from './types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../utils/template';
import {
  calculateStandardLayout,
  getStandardTitleConfig,
} from '../utils/layout-calculator';

/**
 * FlatDesign 模板 - 扁平设计
 * 设计理念：
 * - 纯粹：纯色无渐变
 * - 简洁：去除阴影和立体效果
 * - 明快：清晰的色彩对比
 * - 直接：信息传达直接有效
 */
interface FlatDesignProps {
  data: GeneratedContent;
  scale: number;
}

const FlatDesign: React.FC<FlatDesignProps> = ({ data, scale }) => {
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

  return (
    <div style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: 'top left', overflow: 'hidden' }}>
      <style>{`
        .flat-container {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif;
          background: #f8fafc;
        }

        .flat-title {
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #1e293b;
        }

        .flat-card {
          background: #ffffff;
          border-radius: 0;
          border: 2px solid #1e293b;
          transition: all 0.15s ease;
        }

        .flat-card:hover {
          background: #1e293b;
        }

        .flat-card:hover .flat-card-title,
        .flat-card:hover .flat-desc {
          color: #ffffff;
        }

        .flat-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          background: #1e293b;
          color: #ffffff;
        }

        .flat-card-title {
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: -0.01em;
          line-height: 1.3;
          color: #1e293b;
          transition: color 0.15s ease;
        }

        .flat-desc {
          font-size: 24px;
          line-height: 1.7;
          color: #475569;
          transition: color 0.15s ease;
        }

        .flat-desc code {
          background: #f1f5f9;
          padding: 0.15em 0.4em;
          border-radius: 0;
          font-family: 'SF Mono', monospace;
          font-size: 0.9em;
          color: #1e293b;
        }

        .flat-card:hover .flat-desc code {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
        }

        .flat-desc strong {
          font-weight: 600;
          color: #1e293b;
        }

        .flat-card:hover .flat-desc strong {
          color: #ffffff;
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

      <div className="flat-container relative box-border w-full h-full overflow-hidden flex flex-col items-center justify-center">
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
              className={`flat-title ${layout.titleSizeClass}`}
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
                  className={`flat-card flex flex-col ${layout.cardWidthClass}`}
                  style={{ padding: layout.cardPadding }}
                >
                  <div className="card-header flex items-center gap-4 mb-5">
                    <div className="flat-icon">
                      <span className="material-symbols-rounded">{card.icon}</span>
                    </div>
                    <h3 className={`flat-card-title ${layout.descSizeClass}`}>
                      {card.title}
                    </h3>
                  </div>
                  <p
                    className={`flat-desc ${layout.descSizeClass}`}
                    dangerouslySetInnerHTML={{ __html: card.desc }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const flatDesignTemplate: TemplateConfig = {
  id: 'flatDesign',
  name: '扁平设计',
  description: '纯色扁平化设计，简洁明快，信息传达直接',
  icon: 'rectangle',
  render: (data, scale) => React.createElement(FlatDesign, { data, scale }),
  generateHtml: (data) => generateDownloadableHtml(data, 'flatDesign'),
};
