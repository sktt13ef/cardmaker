import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from './types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../utils/template';
import {
  calculateStandardLayout,
  getStandardTitleConfig,
} from '../utils/layout-calculator';

/**
 * MinimalClean 模板 - 极简纯净
 * 设计理念：
 * - 极简：去除一切非必要元素
 * - 纯净：大量留白，呼吸感
 * - 专注：内容为王，无干扰
 * - 克制：单色调，无装饰
 */
interface MinimalCleanProps {
  data: GeneratedContent;
  scale: number;
}

const MinimalClean: React.FC<MinimalCleanProps> = ({ data, scale }) => {
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
        .minimal-container {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif;
          background: #ffffff;
        }

        .minimal-title {
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: #000000;
        }

        .minimal-divider {
          width: 60px;
          height: 2px;
          background: #000000;
          margin: 0 auto;
        }

        .minimal-card {
          background: #ffffff;
          border: none;
          border-radius: 0;
          padding: 0;
        }

        .minimal-card + .minimal-card {
          border-top: 1px solid #e0e0e0;
        }

        .minimal-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #000000;
          opacity: 0.6;
        }

        .minimal-card-title {
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: -0.01em;
          line-height: 1.3;
          color: #000000;
        }

        .minimal-desc {
          font-size: 24px;
          line-height: 1.7;
          color: #333333;
        }

        .minimal-desc code {
          font-family: 'SF Mono', monospace;
          font-size: 0.9em;
          color: #000000;
          background: #f5f5f5;
          padding: 0.1em 0.3em;
          border-radius: 3px;
        }

        .minimal-desc strong {
          font-weight: 600;
          color: #000000;
        }

        .text-5-5xl { font-size: 3.5rem; line-height: 1.1; }
        .text-4-5xl { font-size: 2.75rem; line-height: 1.15; }
        .text-3-5xl { font-size: 2.125rem; line-height: 1.2; }
        .text-2-5xl { font-size: 1.875rem; line-height: 1.25; }

        .card-width-2col { width: calc((100% - var(--container-gap)) / 2 - 1px); }
        .card-width-3col { width: calc((100% - var(--container-gap) * 2) / 3 - 1px); }
        .card-width-4col { width: calc((100% - var(--container-gap) * 3) / 4 - 1px); }

        .content-scale { transform-origin: center center; }
      `}</style>

      <div className="minimal-container relative box-border w-full h-full overflow-hidden flex flex-col items-center justify-center">
        <div
          ref={wrapperRef}
          className="content-wrapper w-full flex flex-col items-center px-40 box-border content-scale"
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
              className={`minimal-title ${layout.titleSizeClass}`}
              style={{ fontSize: titleConfig.initialFontSize + 'px' }}
            >
              {data.mainTitle}
            </h1>
            <div className="minimal-divider mt-6"></div>
          </div>

          {/* 卡片区域 */}
          <div className="card-zone flex-none w-full">
            <div
              className="w-full flex flex-wrap justify-center content-start"
              style={{
                gap: layout.containerGap,
                '--container-gap': layout.containerGap
              } as React.CSSProperties}
            >
              {data.cards.map((card, idx) => (
                <div
                  key={idx}
                  className={`minimal-card flex flex-col ${layout.cardWidthClass}`}
                  style={{ padding: layout.cardPadding }}
                >
                  <div className="card-header flex items-center gap-4 mb-4">
                    <div className="minimal-icon">
                      <span className="material-symbols-rounded">{card.icon}</span>
                    </div>
                    <h3 className={`minimal-card-title ${layout.descSizeClass}`}>
                      {card.title}
                    </h3>
                  </div>
                  <p
                    className={`minimal-desc ${layout.descSizeClass}`}
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

export const minimalCleanTemplate: TemplateConfig = {
  id: 'minimalClean',
  name: '极简纯净',
  description: '去除一切非必要元素，专注内容呈现，大量留白',
  icon: 'minimalism',
  render: (data, scale) => React.createElement(MinimalClean, { data, scale }),
  generateHtml: (data) => generateDownloadableHtml(data, 'minimalClean'),
};
