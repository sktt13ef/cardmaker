import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineElegantProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineElegant: React.FC<CoverLineElegantProps> = ({ data, scale, progressBarConfig }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitle = data.cards.length > 0 ? data.cards[0].desc : '';

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!titleRef.current) return;
    const title = titleRef.current;
    let size = 68;
    title.style.fontSize = size + 'px';
    let guard = 0;
    while (title.scrollWidth > 1400 && size > 34 && guard < 100) { size -= 1; title.style.fontSize = size + 'px'; guard++; }
  }, [data]);

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#faf8f2' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 精致细线 - 外框 */}
          <rect x="140" y="100" width="1640" height="880" stroke="#8b7355" strokeWidth="0.5" fill="none" opacity="0.1" />
          {/* 内框 */}
          <rect x="180" y="140" width="1560" height="800" stroke="#8b7355" strokeWidth="0.3" fill="none" opacity="0.08" />
          {/* 顶部优雅曲线装饰 */}
          <path d="M400,140 C500,100 600,120 700,100 C800,80 900,110 960,95 C1020,80 1120,110 1220,100 C1320,90 1420,110 1520,140" stroke="#8b7355" strokeWidth="0.8" fill="none" opacity="0.15" />
          {/* 底部优雅曲线装饰 */}
          <path d="M400,940 C500,980 600,960 700,980 C800,1000 900,970 960,985 C1020,1000 1120,970 1220,980 C1320,990 1420,970 1520,940" stroke="#8b7355" strokeWidth="0.8" fill="none" opacity="0.15" />
          {/* 左侧优雅曲线 */}
          <path d="M180,300 C160,380 170,440 155,500 C140,560 160,620 170,700 C180,780 175,830 180,880" stroke="#8b7355" strokeWidth="0.5" fill="none" opacity="0.1" />
          {/* 右侧优雅曲线 */}
          <path d="M1740,300 C1760,380 1750,440 1765,500 C1780,560 1760,620 1750,700 C1740,780 1745,830 1740,880" stroke="#8b7355" strokeWidth="0.5" fill="none" opacity="0.1" />
          {/* 中心装饰 - 优雅花饰 */}
          <path d="M960,440 C980,420 1010,430 1020,450 C1030,470 1010,490 990,485 C970,480 960,460 960,440" stroke="#8b7355" strokeWidth="0.5" fill="none" opacity="0.15" />
          <path d="M960,440 C940,420 910,430 900,450 C890,470 910,490 930,485 C950,480 960,460 960,440" stroke="#8b7355" strokeWidth="0.5" fill="none" opacity="0.15" />
          <path d="M960,640 C980,660 1010,650 1020,630 C1030,610 1010,590 990,595 C970,600 960,620 960,640" stroke="#8b7355" strokeWidth="0.5" fill="none" opacity="0.15" />
          <path d="M960,640 C940,660 910,650 900,630 C890,610 910,590 930,595 C950,600 960,620 960,640" stroke="#8b7355" strokeWidth="0.5" fill="none" opacity="0.15" />
          {/* 中心连接线 */}
          <line x1="960" y1="485" x2="960" y2="595" stroke="#8b7355" strokeWidth="0.3" opacity="0.1" />
          {/* 四角优雅卷曲 */}
          <path d="M180,140 C200,160 220,155 230,175 C240,195 220,210 200,200" stroke="#8b7355" strokeWidth="0.5" fill="none" opacity="0.12" />
          <path d="M1740,140 C1720,160 1700,155 1690,175 C1680,195 1700,210 1720,200" stroke="#8b7355" strokeWidth="0.5" fill="none" opacity="0.12" />
          <path d="M180,940 C200,920 220,925 230,905 C240,885 220,870 200,880" stroke="#8b7355" strokeWidth="0.5" fill="none" opacity="0.12" />
          <path d="M1740,940 C1720,920 1700,925 1690,905 C1680,885 1700,870 1720,880" stroke="#8b7355" strokeWidth="0.5" fill="none" opacity="0.12" />
          {/* 小圆点装饰 */}
          <circle cx="960" cy="440" r="1.5" fill="#8b7355" opacity="0.2" />
          <circle cx="960" cy="640" r="1.5" fill="#8b7355" opacity="0.2" />
          <circle cx="400" cy="140" r="1.5" fill="#8b7355" opacity="0.15" />
          <circle cx="1520" cy="140" r="1.5" fill="#8b7355" opacity="0.15" />
          <circle cx="400" cy="940" r="1.5" fill="#8b7355" opacity="0.15" />
          <circle cx="1520" cy="940" r="1.5" fill="#8b7355" opacity="0.15" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <h1 ref={titleRef} style={{ fontSize: '68px', fontWeight: 300, letterSpacing: '0.04em', lineHeight: 1.3, color: '#3d2e1e', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '24px', fontWeight: 300, color: '#8b7a60', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '750px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineElegant: TemplateConfig = {
  id: 'coverLineElegant',
  name: '优雅封面',
  description: '优雅封面，精致细线与优雅卷曲装饰，标题居中',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineElegant, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineElegant'),
};
