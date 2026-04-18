import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineZigzagProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineZigzag: React.FC<CoverLineZigzagProps> = ({ data, scale, progressBarConfig }) => {
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
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#fdf2e8' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 大锯齿 - 上方 */}
          <polyline points="0,200 160,120 320,200 480,120 640,200 800,120 960,200 1120,120 1280,200 1440,120 1600,200 1760,120 1920,200" stroke="#c4652a" strokeWidth="1.2" fill="none" opacity="0.2" />
          {/* 大锯齿 - 下方 */}
          <polyline points="0,880 160,960 320,880 480,960 640,880 800,960 960,880 1120,960 1280,880 1440,960 1600,880 1760,960 1920,880" stroke="#c4652a" strokeWidth="1.2" fill="none" opacity="0.2" />
          {/* 中锯齿 - 上 */}
          <polyline points="0,300 120,240 240,300 360,240 480,300 600,240 720,300 840,240 960,300 1080,240 1200,300 1320,240 1440,300 1560,240 1680,300 1800,240 1920,300" stroke="#c4652a" strokeWidth="0.8" fill="none" opacity="0.15" />
          {/* 中锯齿 - 下 */}
          <polyline points="0,780 120,840 240,780 360,840 480,780 600,840 720,780 840,840 960,780 1080,840 1200,780 1320,840 1440,780 1560,840 1680,780 1800,840 1920,780" stroke="#c4652a" strokeWidth="0.8" fill="none" opacity="0.15" />
          {/* 小锯齿 - 上 */}
          <polyline points="0,380 80,340 160,380 240,340 320,380 400,340 480,380 560,340 640,380 720,340 800,380 880,340 960,380 1040,340 1120,380 1200,340 1280,380 1360,340 1440,380 1520,340 1600,380 1680,340 1760,380 1840,340 1920,380" stroke="#c4652a" strokeWidth="0.5" fill="none" opacity="0.1" />
          {/* 小锯齿 - 下 */}
          <polyline points="0,700 80,740 160,700 240,740 320,700 400,740 480,700 560,740 640,700 720,740 800,700 880,740 960,700 1040,740 1120,700 1200,740 1280,700 1360,740 1440,700 1520,740 1600,700 1680,740 1760,700 1840,740 1920,700" stroke="#c4652a" strokeWidth="0.5" fill="none" opacity="0.1" />
          {/* 垂直锯齿 - 左 */}
          <polyline points="100,0 60,80 100,160 60,240 100,320 60,400 100,480 60,560 100,640 60,720 100,800 60,880 100,960 60,1040 100,1080" stroke="#c4652a" strokeWidth="0.5" fill="none" opacity="0.08" />
          {/* 垂直锯齿 - 右 */}
          <polyline points="1820,0 1860,80 1820,160 1860,240 1820,320 1860,400 1820,480 1860,560 1820,640 1860,720 1820,800 1860,880 1820,960 1860,1040 1820,1080" stroke="#c4652a" strokeWidth="0.5" fill="none" opacity="0.08" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <h1 ref={titleRef} style={{ fontSize: '68px', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.3, color: '#5a2a10', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '24px', fontWeight: 300, color: '#9b6a45', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '750px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineZigzag: TemplateConfig = {
  id: 'coverLineZigzag',
  name: '锯齿封面',
  description: '锯齿封面，锯齿形线条上下左右环绕，标题居中',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineZigzag, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineZigzag'),
};
