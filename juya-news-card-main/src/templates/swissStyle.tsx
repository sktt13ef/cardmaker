import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from './types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../utils/template';
import {
  calculateStandardLayout,
  getStandardTitleConfig,
} from '../utils/layout-calculator';

/**
 * SwissStyle 模板 - 瑞士风格
 * 设计理念：
 * - 秩序：严谨的网格系统
 * - 清晰：信息层级分明
 * - 客观：去除主观装饰
 * - 功能：形式服务于功能
 */
interface SwissStyleProps {
  data: GeneratedContent;
  scale: number;
}

const SwissStyle: React.FC<SwissStyleProps> = ({ data, scale }) => {
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
        .swiss-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #ffffff;
        }

        .swiss-title {
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1;
          color: #000000;
          text-transform: uppercase;
        }

        .swiss-divider {
          width: 80px;
          height: 4px;
          background: #ff0000;
          margin: 0 auto;
        }

        .swiss-card {
          background: #ffffff;
          border: 2px solid #000000;
          border-radius: 0;
          transition: all 0.15s ease;
        }

        .swiss-card:hover {
          background: #000000;
        }

        .swiss-card:hover .swiss-card-title,
        .swiss-card:hover .swiss-desc {
          color: #ffffff;
        }

        .swiss-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          background: #ff0000;
          color: #ffffff;
        }

        .swiss-card-title {
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: -0.01em;
          line-height: 1.3;
          color: #000000;
          text-transform: uppercase;
          transition: color 0.15s ease;
        }

        .swiss-desc {
          font-size: 24px;
          line-height: 1.7;
          color: #333333;
          transition: color 0.15s ease;
        }

        .swiss-desc code {
          background: #f5f5f5;
          padding: 0.15em 0.4em;
          border-radius: 0;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
          color: #000000;
        }

        .swiss-card:hover .swiss-desc code {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
        }

        .swiss-desc strong {
          font-weight: 700;
          color: #000000;
        }

        .swiss-card:hover .swiss-desc strong {
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

      <div className="swiss-container relative box-border w-full h-full overflow-hidden flex flex-col items-center justify-center">
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
              className={`swiss-title ${layout.titleSizeClass}`}
              style={{ fontSize: titleConfig.initialFontSize + 'px' }}
            >
              {data.mainTitle}
            </h1>
            <div className="swiss-divider mt-6"></div>
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
                  className={`swiss-card flex flex-col ${layout.cardWidthClass}`}
                  style={{ padding: layout.cardPadding }}
                >
                  <div className="card-header flex items-center gap-4 mb-5">
                    <div className="swiss-icon">
                      <span className="material-symbols-rounded">{card.icon}</span>
                    </div>
                    <h3 className={`swiss-card-title ${layout.descSizeClass}`}>
                      {card.title}
                    </h3>
                  </div>
                  <p
                    className={`swiss-desc ${layout.descSizeClass}`}
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

export const swissStyleTemplate: TemplateConfig = {
  id: 'swissStyle',
  name: '瑞士风格',
  description: '国际主义设计风格，严谨的网格系统，客观清晰',
  icon: 'grid_on',
  render: (data, scale) => React.createElement(SwissStyle, { data, scale }),
  generateHtml: (data) => generateDownloadableHtml(data, 'swissStyle'),
};
