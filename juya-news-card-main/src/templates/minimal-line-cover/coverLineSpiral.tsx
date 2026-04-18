import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineSpiralProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineSpiral: React.FC<CoverLineSpiralProps> = ({ data, scale, progressBarConfig }) => {
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
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#f5f0fa' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 螺旋曲线 - 从左上角旋转展开 */}
          <path d="M200,100 C200,100 180,200 250,250 C320,300 350,180 350,150 C350,120 300,80 260,120 C220,160 280,280 360,300 C440,320 460,200 440,160 C420,120 360,60 300,100 C240,140 260,320 380,370 C500,420 540,260 520,200 C500,140 420,60 340,100 C260,140 300,380 440,450 C580,520 640,320 620,250 C600,180 500,60 400,100" stroke="#6b4c8a" strokeWidth="0.8" fill="none" opacity="0.25" />
          {/* 第二圈螺旋 */}
          <path d="M400,100 C400,100 360,280 480,360 C600,440 680,280 660,200 C640,120 540,20 440,80 C340,140 400,440 580,540 C760,640 840,380 800,280 C760,180 640,20 500,80 C360,140 440,520 660,640 C880,760 1000,460 960,340 C920,220 760,20 580,80" stroke="#6b4c8a" strokeWidth="0.6" fill="none" opacity="0.2" />
          {/* 第三圈螺旋 */}
          <path d="M580,80 C580,80 500,380 720,520 C940,660 1100,420 1060,300 C1020,180 840,0 660,80 C480,160 580,600 840,740 C1100,880 1300,540 1240,400 C1180,260 960,0 740,80" stroke="#6b4c8a" strokeWidth="0.5" fill="none" opacity="0.15" />
          {/* 右下角镜像螺旋 */}
          <path d="M1720,980 C1720,980 1740,880 1670,830 C1600,780 1570,900 1570,930 C1570,960 1620,1000 1660,960 C1700,920 1640,800 1560,780 C1480,760 1460,880 1480,920 C1500,960 1560,1020 1620,980 C1680,940 1640,760 1520,710 C1400,660 1360,820 1380,880 C1400,940 1480,1020 1560,980" stroke="#6b4c8a" strokeWidth="0.8" fill="none" opacity="0.2" />
          {/* 螺旋延伸 */}
          <path d="M1520,710 C1520,710 1460,560 1340,520 C1220,480 1180,620 1200,700 C1220,780 1340,880 1440,820 C1540,760 1480,560 1340,500 C1200,440 1100,600 1120,700 C1140,800 1280,920 1400,860" stroke="#6b4c8a" strokeWidth="0.6" fill="none" opacity="0.15" />
          {/* 散落的小螺旋装饰 */}
          <path d="M1600,200 C1620,180 1640,200 1620,220 C1600,240 1580,220 1600,200Z" stroke="#6b4c8a" strokeWidth="0.4" fill="none" opacity="0.2" />
          <path d="M300,800 C320,780 340,800 320,820 C300,840 280,820 300,800Z" stroke="#6b4c8a" strokeWidth="0.4" fill="none" opacity="0.2" />
          <path d="M1500,400 C1520,380 1540,400 1520,420 C1500,440 1480,420 1500,400Z" stroke="#6b4c8a" strokeWidth="0.4" fill="none" opacity="0.15" />
          {/* 小圆点装饰 */}
          <circle cx="200" cy="100" r="2" fill="#6b4c8a" opacity="0.3" />
          <circle cx="1720" cy="980" r="2" fill="#6b4c8a" opacity="0.3" />
          <circle cx="960" cy="540" r="1.5" fill="#6b4c8a" opacity="0.2" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <h1 ref={titleRef} style={{ fontSize: '70px', fontWeight: 300, letterSpacing: '0.01em', lineHeight: 1.3, color: '#2d1b3d', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '25px', fontWeight: 300, color: '#7a6b8a', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '750px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineSpiral: TemplateConfig = {
  id: 'coverLineSpiral',
  name: '螺旋优雅',
  description: '螺旋优雅，螺旋曲线从角落旋转展开，标题居中',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineSpiral, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineSpiral'),
};
