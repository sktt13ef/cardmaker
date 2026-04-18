import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineWaveProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineWave: React.FC<CoverLineWaveProps> = ({ data, scale, progressBarConfig }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitle = data.cards.length > 0 ? data.cards[0].desc : '';

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!titleRef.current) return;
    const title = titleRef.current;
    let size = 72;
    title.style.fontSize = size + 'px';
    let guard = 0;
    while (title.scrollWidth > 1500 && size > 36 && guard < 100) { size -= 1; title.style.fontSize = size + 'px'; guard++; }
  }, [data]);

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#eef5fc' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', position: 'relative', paddingTop: 200 }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* 底部波浪 - 第一层 */}
          <path d="M0,700 C160,650 320,750 480,700 C640,650 800,750 960,700 C1120,650 1280,750 1440,700 C1600,650 1760,750 1920,700 L1920,1080 L0,1080 Z" stroke="#3a7bbf" strokeWidth="1" fill="none" opacity="0.15" />
          {/* 底部波浪 - 第二层 */}
          <path d="M0,760 C160,710 320,810 480,760 C640,710 800,810 960,760 C1120,710 1280,810 1440,760 C1600,710 1760,810 1920,760 L1920,1080 L0,1080 Z" stroke="#3a7bbf" strokeWidth="0.8" fill="none" opacity="0.2" />
          {/* 底部波浪 - 第三层 */}
          <path d="M0,820 C160,770 320,870 480,820 C640,770 800,870 960,820 C1120,770 1280,870 1440,820 C1600,770 1760,870 1920,820 L1920,1080 L0,1080 Z" stroke="#3a7bbf" strokeWidth="0.8" fill="none" opacity="0.25" />
          {/* 底部波浪 - 第四层 */}
          <path d="M0,880 C160,830 320,930 480,880 C640,830 800,930 960,880 C1120,830 1280,930 1440,880 C1600,830 1760,930 1920,880 L1920,1080 L0,1080 Z" stroke="#3a7bbf" strokeWidth="0.6" fill="none" opacity="0.3" />
          {/* 底部波浪 - 第五层 */}
          <path d="M0,940 C160,890 320,990 480,940 C640,890 800,990 960,940 C1120,890 1280,990 1440,940 C1600,890 1760,990 1920,940 L1920,1080 L0,1080 Z" stroke="#3a7bbf" strokeWidth="0.6" fill="none" opacity="0.35" />
          {/* 顶部细波浪装饰 */}
          <path d="M0,120 C160,100 320,140 480,120 C640,100 800,140 960,120 C1120,100 1280,140 1440,120 C1600,100 1760,140 1920,120" stroke="#3a7bbf" strokeWidth="0.4" fill="none" opacity="0.1" />
          <path d="M0,160 C160,140 320,180 480,160 C640,140 800,180 960,160 C1120,140 1280,180 1440,160 C1600,140 1760,180 1920,160" stroke="#3a7bbf" strokeWidth="0.3" fill="none" opacity="0.08" />
          {/* 水面反光线条 */}
          <line x1="200" y1="750" x2="500" y2="750" stroke="#3a7bbf" strokeWidth="0.3" opacity="0.12" />
          <line x1="700" y1="810" x2="1100" y2="810" stroke="#3a7bbf" strokeWidth="0.3" opacity="0.1" />
          <line x1="1300" y1="870" x2="1700" y2="870" stroke="#3a7bbf" strokeWidth="0.3" opacity="0.08" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <h1 ref={titleRef} style={{ fontSize: '72px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.3, color: '#1a3a5c', margin: 0, textAlign: 'center' }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '26px', fontWeight: 300, color: '#5a7a9c', lineHeight: 1.6, margin: 0, textAlign: 'center', maxWidth: '800px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineWave: TemplateConfig = {
  id: 'coverLineWave',
  name: '波浪封面',
  description: '波浪封面，底部层叠波浪线条，标题偏上居中',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineWave, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineWave'),
};
