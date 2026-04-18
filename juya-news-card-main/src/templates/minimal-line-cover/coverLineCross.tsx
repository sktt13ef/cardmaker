import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineCrossProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineCross: React.FC<CoverLineCrossProps> = ({ data, scale, progressBarConfig }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitle = data.cards.length > 0 ? data.cards[0].desc : '';

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!titleRef.current) return;
    const title = titleRef.current;
    let size = 70;
    title.style.fontSize = size + 'px';
    let guard = 0;
    while (title.scrollWidth > 1400 && size > 34 && guard < 100) { size -= 1; title.style.fontSize = size + 'px'; guard++; }
  }, [data]);

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f0f0f0' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 主十字 - 垂直 */}
          <line x1="960" y1="0" x2="960" y2="1080" stroke="#2a2a3a" strokeWidth="2" opacity="0.2" />
          {/* 主十字 - 水平 */}
          <line x1="0" y1="540" x2="1920" y2="540" stroke="#2a2a3a" strokeWidth="2" opacity="0.2" />
          {/* 辅助十字 - 偏移 */}
          <line x1="720" y1="0" x2="720" y2="1080" stroke="#2a2a3a" strokeWidth="0.5" opacity="0.08" />
          <line x1="1200" y1="0" x2="1200" y2="1080" stroke="#2a2a3a" strokeWidth="0.5" opacity="0.08" />
          <line x1="0" y1="360" x2="1920" y2="360" stroke="#2a2a3a" strokeWidth="0.5" opacity="0.08" />
          <line x1="0" y1="720" x2="1920" y2="720" stroke="#2a2a3a" strokeWidth="0.5" opacity="0.08" />
          {/* 交叉点装饰 - 中心大圆 */}
          <circle cx="960" cy="540" r="20" stroke="#2a2a3a" strokeWidth="1" fill="none" opacity="0.2" />
          <circle cx="960" cy="540" r="40" stroke="#2a2a3a" strokeWidth="0.5" fill="none" opacity="0.12" />
          <circle cx="960" cy="540" r="60" stroke="#2a2a3a" strokeWidth="0.3" fill="none" opacity="0.08" />
          {/* 四象限小十字 */}
          <line x1="360" y1="170" x2="360" y2="190" stroke="#2a2a3a" strokeWidth="0.5" opacity="0.15" />
          <line x1="350" y1="180" x2="370" y2="180" stroke="#2a2a3a" strokeWidth="0.5" opacity="0.15" />
          <line x1="1560" y1="170" x2="1560" y2="190" stroke="#2a2a3a" strokeWidth="0.5" opacity="0.15" />
          <line x1="1550" y1="180" x2="1570" y2="180" stroke="#2a2a3a" strokeWidth="0.5" opacity="0.15" />
          <line x1="360" y1="890" x2="360" y2="910" stroke="#2a2a3a" strokeWidth="0.5" opacity="0.15" />
          <line x1="350" y1="900" x2="370" y2="900" stroke="#2a2a3a" strokeWidth="0.5" opacity="0.15" />
          <line x1="1560" y1="890" x2="1560" y2="910" stroke="#2a2a3a" strokeWidth="0.5" opacity="0.15" />
          <line x1="1550" y1="900" x2="1570" y2="900" stroke="#2a2a3a" strokeWidth="0.5" opacity="0.15" />
          {/* 对角辅助线 */}
          <line x1="0" y1="0" x2="200" y2="200" stroke="#2a2a3a" strokeWidth="0.3" opacity="0.06" />
          <line x1="1920" y1="0" x2="1720" y2="200" stroke="#2a2a3a" strokeWidth="0.3" opacity="0.06" />
          <line x1="0" y1="1080" x2="200" y2="880" stroke="#2a2a3a" strokeWidth="0.3" opacity="0.06" />
          <line x1="1920" y1="1080" x2="1720" y2="880" stroke="#2a2a3a" strokeWidth="0.3" opacity="0.06" />
          {/* 象限编号标记 */}
          <text x="480" y="300" fontSize="14" fill="#2a2a3a" opacity="0.1" fontFamily="monospace">I</text>
          <text x="1440" y="300" fontSize="14" fill="#2a2a3a" opacity="0.1" fontFamily="monospace">II</text>
          <text x="480" y="780" fontSize="14" fill="#2a2a3a" opacity="0.1" fontFamily="monospace">III</text>
          <text x="1440" y="780" fontSize="14" fill="#2a2a3a" opacity="0.1" fontFamily="monospace">IV</text>
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, marginTop: -30 }}>
          <h1 ref={titleRef} style={{ fontSize: '70px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.3, color: '#1a1a2a', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '25px', fontWeight: 300, color: '#555566', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '800px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineCross: TemplateConfig = {
  id: 'coverLineCross',
  name: '十字封面',
  description: '十字封面，大十字线条分割画面四象限，标题在交叉点附近',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineCross, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineCross'),
};
