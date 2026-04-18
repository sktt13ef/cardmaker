import React, { useLayoutEffect, useRef } from 'react';
import { TemplateConfig } from '../types';
import { GeneratedContent } from '../types';
import { generateDownloadableHtml } from '../../utils/template';
import { ProgressBarConfig } from '../../types/progress-bar';

interface CoverLineCalligraphyProps {
  data: GeneratedContent;
  scale: number;
  progressBarConfig?: ProgressBarConfig;
}

const CoverLineCalligraphy: React.FC<CoverLineCalligraphyProps> = ({ data, scale, progressBarConfig }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitle = data.cards.length > 0 ? data.cards[0].desc : '';

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!titleRef.current) return;
    const title = titleRef.current;
    let size = 72;
    title.style.fontSize = size + 'px';
    let guard = 0;
    while (title.scrollWidth > 1600 && size > 36 && guard < 100) { size -= 1; title.style.fontSize = size + 'px'; guard++; }
  }, [data]);

  const accentColor = '#b22222';

  return (
    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", Roboto, sans-serif', background: '#fdf8f4' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', paddingLeft: '120px', position: 'relative' }}>
        <svg viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <line x1="760" y1="400" x2="1160" y2="400" stroke={accentColor} strokeWidth="0.8" opacity="0.3" />
          <line x1="810" y1="405" x2="1110" y2="405" stroke={accentColor} strokeWidth="0.4" opacity="0.15" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <h1 ref={titleRef} style={{ fontSize: '72px', fontWeight: 200, letterSpacing: '-0.02em', lineHeight: 1.3, color: '#111122', margin: 0,  }}>{data.mainTitle}</h1>
          {subtitle && <p style={{ fontSize: '28px', fontWeight: 400, color: '#555566', lineHeight: 1.6, margin: 0, maxWidth: '800px' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
    </div>
  );
};

export const coverLineCalligraphy: TemplateConfig = {
  id: 'coverLineCalligraphy',
  name: '书法标题',
  description: '毛笔书法标题，气韵生动',
  icon: 'horizontal_rule',
  render: (data, scale, progressBarConfig) => React.createElement(CoverLineCalligraphy, { data, scale, progressBarConfig }),
  generateHtml: (data) => generateDownloadableHtml(data, 'coverLineCalligraphy'),
};
