const fs = require('fs');
const path = require('path');
const BASE = path.join(__dirname, '..');

const CV = [
  { id:'coverLineMinimal', name:'极简细线', accent:'#333333', bg:'#ffffff', layout:'center',
    svg:`<line x1="860" y1="420" x2="1060" y2="420" stroke="{a}" strokeWidth="1" opacity="0.4"/>`,
    titleStyle:"fontSize: '72px', fontWeight: 200, letterSpacing: '-0.02em'", subBelow:true },
  { id:'coverLineElegant', name:'优雅金线', accent:'#c9a84c', bg:'#fdfcf6', layout:'center',
    svg:`<line x1="760" y1="380" x2="1160" y2="380" stroke="{a}" strokeWidth="0.5" opacity="0.5"/><line x1="810" y1="385" x2="1110" y2="385" stroke="{a}" strokeWidth="0.3" opacity="0.3"/><line x1="860" y1="390" x2="1060" y2="390" stroke="{a}" strokeWidth="0.2" opacity="0.2"/>`,
    titleStyle:"fontSize: '68px', fontWeight: 300, letterSpacing: '0.02em'", subBelow:true },
  { id:'coverLineBold', name:'大气粗线', accent:'#1a1a2e', bg:'#fafafa', layout:'left',
    svg:`<rect x="120" y="440" width="200" height="4" fill="{a}" opacity="0.6"/><rect x="120" y="450" width="120" height="2" fill="{a}" opacity="0.3"/>`,
    titleStyle:"fontSize: '80px', fontWeight: 700, letterSpacing: '-0.03em'", subBelow:false },
  { id:'coverLineCenter', name:'居中对称', accent:'#4a4a5a', bg:'#fcfcfc', layout:'center',
    svg:`<line x1="660" y1="420" x2="960" y2="420" stroke="{a}" strokeWidth="1" opacity="0.4"/><line x1="960" y1="420" x2="1260" y2="420" stroke="{a}" strokeWidth="1" opacity="0.4"/><circle cx="960" cy="420" r="4" fill="{a}" opacity="0.3"/>`,
    titleStyle:"fontSize: '72px', fontWeight: 300, letterSpacing: '0.01em'", subBelow:true },
  { id:'coverLineLeft', name:'左对齐雅致', accent:'#2d5a45', bg:'#f8faf8', layout:'left',
    svg:`<line x1="120" y1="420" x2="500" y2="420" stroke="{a}" strokeWidth="1" opacity="0.5"/><line x1="120" y1="428" x2="360" y2="428" stroke="{a}" strokeWidth="0.5" opacity="0.3"/>`,
    titleStyle:"fontSize: '72px', fontWeight: 300, letterSpacing: '-0.01em'", subBelow:true },
  { id:'coverLineSplit', name:'分割双线', accent:'#64748b', bg:'#f8f9fa', layout:'center',
    svg:`<line x1="760" y1="370" x2="1160" y2="370" stroke="{a}" strokeWidth="0.6" opacity="0.4"/><line x1="800" y1="450" x2="1120" y2="450" stroke="{a}" strokeWidth="0.6" opacity="0.4"/>`,
    titleStyle:"fontSize: '64px', fontWeight: 300, letterSpacing: '0.02em'", subBelow:true },
  { id:'coverLineFrame', name:'框线标题', accent:'#a07850', bg:'#fdfbf8', layout:'center',
    svg:`<rect x="680" y="280" width="560" height="240" stroke="{a}" strokeWidth="1" fill="none" opacity="0.25"/><rect x="690" y="290" width="540" height="220" stroke="{a}" strokeWidth="0.4" fill="none" opacity="0.15"/>`,
    titleStyle:"fontSize: '64px', fontWeight: 300, letterSpacing: '0.02em'", subBelow:true },
  { id:'coverLineDiamond', name:'菱形标题', accent:'#8b4563', bg:'#fdf8fa', layout:'center',
    svg:`<polygon points="960,260 1080,400 960,540 840,400" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.2"/><polygon points="960,300 1040,400 960,500 880,400" stroke="{a}" strokeWidth="0.4" fill="none" opacity="0.12"/>`,
    titleStyle:"fontSize: '68px', fontWeight: 200, letterSpacing: '0.01em'", subBelow:true },
  { id:'coverLineCircle', name:'圆环标题', accent:'#265578', bg:'#f8fafc', layout:'center',
    svg:`<circle cx="960" cy="400" r="140" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.2"/><circle cx="960" cy="400" r="100" stroke="{a}" strokeWidth="0.4" fill="none" opacity="0.12"/><circle cx="960" cy="400" r="60" stroke="{a}" strokeWidth="0.3" fill="none" opacity="0.08"/>`,
    titleStyle:"fontSize: '64px', fontWeight: 200, letterSpacing: '0.01em'", subBelow:true },
  { id:'coverLineWave', name:'波浪标题', accent:'#388098', bg:'#f7fafb', layout:'center',
    svg:`<path d="M660 400 Q810 360 960 400 Q1110 440 1260 400" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.25"/><path d="M710 420 Q835 390 960 420 Q1085 450 1210 420" stroke="{a}" strokeWidth="0.5" fill="none" opacity="0.15"/>`,
    titleStyle:"fontSize: '72px', fontWeight: 200, letterSpacing: '-0.01em'", subBelow:true },
  { id:'coverLineMountain', name:'山形标题', accent:'#6b8fa3', bg:'#f8fafb', layout:'center',
    svg:`<path d="M660 500 Q810 340 960 420 Q1110 300 1260 500" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.2"/><path d="M760 500 Q860 400 960 440 Q1060 360 1160 500" stroke="{a}" strokeWidth="0.5" fill="none" opacity="0.12"/>`,
    titleStyle:"fontSize: '72px', fontWeight: 200, letterSpacing: '-0.01em'", subBelow:true },
  { id:'coverLineZigzag', name:'锯齿标题', accent:'#2d5a45', bg:'#f8fafa', layout:'center',
    svg:`<polyline points="760,400 800,380 840,400 880,380 920,400 960,380 1000,400 1040,380 1080,400 1120,380 1160,400" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.25"/>`,
    titleStyle:"fontSize: '72px', fontWeight: 300, letterSpacing: '-0.01em'", subBelow:true },
  { id:'coverLineDot', name:'点阵标题', accent:'#324678', bg:'#f9fafc', layout:'center',
    svg:`<circle cx="760" cy="400" r="2" fill="{a}" opacity="0.15"/><circle cx="810" cy="400" r="2.5" fill="{a}" opacity="0.2"/><circle cx="860" cy="400" r="3" fill="{a}" opacity="0.25"/><circle cx="910" cy="400" r="3.5" fill="{a}" opacity="0.3"/><circle cx="960" cy="400" r="4" fill="{a}" opacity="0.35"/><circle cx="1010" cy="400" r="3.5" fill="{a}" opacity="0.3"/><circle cx="1060" cy="400" r="3" fill="{a}" opacity="0.25"/><circle cx="1110" cy="400" r="2.5" fill="{a}" opacity="0.2"/><circle cx="1160" cy="400" r="2" fill="{a}" opacity="0.15"/>`,
    titleStyle:"fontSize: '72px', fontWeight: 200, letterSpacing: '-0.01em'", subBelow:true },
  { id:'coverLineDash', name:'虚线标题', accent:'#0a7e8c', bg:'#f7fbfb', layout:'center',
    svg:`<line x1="660" y1="400" x2="1260" y2="400" stroke="{a}" strokeWidth="1" strokeDasharray="8 4" opacity="0.3"/><line x1="760" y1="410" x2="1160" y2="410" stroke="{a}" strokeWidth="0.5" strokeDasharray="4 3" opacity="0.15"/>`,
    titleStyle:"fontSize: '72px', fontWeight: 200, letterSpacing: '-0.01em'", subBelow:true },
  { id:'coverLineCross', name:'十字标题', accent:'#cc2936', bg:'#faf8f7', layout:'center',
    svg:`<line x1="960" y1="280" x2="960" y2="520" stroke="{a}" strokeWidth="0.5" opacity="0.2"/><line x1="760" y1="400" x2="1160" y2="400" stroke="{a}" strokeWidth="0.5" opacity="0.2"/>`,
    titleStyle:"fontSize: '72px', fontWeight: 300, letterSpacing: '0.01em'", subBelow:true },
  { id:'coverLineSpiral', name:'螺旋标题', accent:'#5b3a8c', bg:'#f9f7fc', layout:'center',
    svg:`<path d="M960 400 Q960 370 990 370 Q1020 370 1020 400 Q1020 440 980 440 Q930 440 930 390 Q930 340 980 340 Q1040 340 1040 400" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.2"/>`,
    titleStyle:"fontSize: '68px', fontWeight: 200, letterSpacing: '0.01em'", subBelow:true },
  { id:'coverLineRadiant', name:'放射标题', accent:'#bf9443', bg:'#fefcf6', layout:'center',
    svg:`<line x1="960" y1="400" x2="960" y2="280" stroke="{a}" strokeWidth="0.5" opacity="0.15"/><line x1="960" y1="400" x2="960" y2="520" stroke="{a}" strokeWidth="0.5" opacity="0.15"/><line x1="960" y1="400" x2="840" y2="330" stroke="{a}" strokeWidth="0.5" opacity="0.15"/><line x1="960" y1="400" x2="1080" y2="330" stroke="{a}" strokeWidth="0.5" opacity="0.15"/><line x1="960" y1="400" x2="840" y2="470" stroke="{a}" strokeWidth="0.5" opacity="0.15"/><line x1="960" y1="400" x2="1080" y2="470" stroke="{a}" strokeWidth="0.5" opacity="0.15"/>`,
    titleStyle:"fontSize: '72px', fontWeight: 200, letterSpacing: '-0.01em'", subBelow:true },
  { id:'coverLineParallel', name:'平行标题', accent:'#7d9b76', bg:'#f8faf7', layout:'left',
    svg:`<line x1="120" y1="390" x2="500" y2="390" stroke="{a}" strokeWidth="0.5" opacity="0.3"/><line x1="120" y1="400" x2="500" y2="400" stroke="{a}" strokeWidth="0.8" opacity="0.5"/><line x1="120" y1="410" x2="500" y2="410" stroke="{a}" strokeWidth="0.5" opacity="0.3"/>`,
    titleStyle:"fontSize: '72px', fontWeight: 300, letterSpacing: '-0.01em'", subBelow:true },
  { id:'coverLineGrid', name:'网格标题', accent:'#5a6570', bg:'#f9fafb', layout:'center',
    svg:`<line x1="760" y1="300" x2="760" y2="500" stroke="{a}" strokeWidth="0.3" opacity="0.12"/><line x1="860" y1="300" x2="860" y2="500" stroke="{a}" strokeWidth="0.3" opacity="0.12"/><line x1="960" y1="300" x2="960" y2="500" stroke="{a}" strokeWidth="0.3" opacity="0.12"/><line x1="1060" y1="300" x2="1060" y2="500" stroke="{a}" strokeWidth="0.3" opacity="0.12"/><line x1="1160" y1="300" x2="1160" y2="500" stroke="{a}" strokeWidth="0.3" opacity="0.12"/><line x1="760" y1="340" x2="1160" y2="340" stroke="{a}" strokeWidth="0.3" opacity="0.1"/><line x1="760" y1="400" x2="1160" y2="400" stroke="{a}" strokeWidth="0.3" opacity="0.1"/><line x1="760" y1="460" x2="1160" y2="460" stroke="{a}" strokeWidth="0.3" opacity="0.1"/>`,
    titleStyle:"fontSize: '68px', fontWeight: 300, letterSpacing: '0.02em'", subBelow:true },
  { id:'coverLineFlow', name:'流动标题', accent:'#db7790', bg:'#fdf7f9', layout:'center',
    svg:`<path d="M660 380 Q810 350 960 380 Q1110 410 1260 380" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.2"/><path d="M660 420 Q810 390 960 420 Q1110 450 1260 420" stroke="{a}" strokeWidth="0.5" fill="none" opacity="0.12"/>`,
    titleStyle:"fontSize: '72px', fontWeight: 200, letterSpacing: '-0.01em'", subBelow:true },
  { id:'coverLineOrbit', name:'轨道标题', accent:'#1e3a5f', bg:'#f7f9fc', layout:'center',
    svg:`<ellipse cx="960" cy="400" rx="180" ry="80" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.15" transform="rotate(-20 960 400)"/><ellipse cx="960" cy="400" rx="140" ry="60" stroke="{a}" strokeWidth="0.4" fill="none" opacity="0.1" transform="rotate(20 960 400)"/>`,
    titleStyle:"fontSize: '72px', fontWeight: 200, letterSpacing: '0.01em'", subBelow:true },
  { id:'coverLineCorner', name:'折角标题', accent:'#b87333', bg:'#fdfaf6', layout:'left',
    svg:`<path d="M120 320 L120 480 L400 480" stroke="{a}" strokeWidth="1.5" fill="none" opacity="0.3"/><path d="M130 330 L130 470 L390 470" stroke="{a}" strokeWidth="0.5" fill="none" opacity="0.15"/>`,
    titleStyle:"fontSize: '72px', fontWeight: 300, letterSpacing: '-0.01em'", subBelow:false },
  { id:'coverLineNouveau', name:'新艺术标题', accent:'#2d8a6e', bg:'#f7faf8', layout:'center',
    svg:`<path d="M760 400 Q860 360 960 400 Q1060 440 1160 400" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.25"/><path d="M810 380 Q880 360 960 380 Q1040 400 1110 380" stroke="{a}" strokeWidth="0.5" fill="none" opacity="0.15"/><circle cx="960" cy="400" r="6" fill="{a}" opacity="0.1"/>`,
    titleStyle:"fontSize: '68px', fontWeight: 200, letterSpacing: '0.02em'", subBelow:true },
  { id:'coverLineDeco', name:'装饰标题', accent:'#c9a84c', bg:'#fdfcf6', layout:'center',
    svg:`<polygon points="960,280 1060,400 960,520 860,400" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.15"/><line x1="960" y1="280" x2="960" y2="520" stroke="{a}" strokeWidth="0.3" opacity="0.2"/><line x1="860" y1="400" x2="1060" y2="400" stroke="{a}" strokeWidth="0.3" opacity="0.2"/>`,
    titleStyle:"fontSize: '68px', fontWeight: 300, letterSpacing: '0.03em'", subBelow:true },
  { id:'coverLineInk', name:'水墨标题', accent:'#2c2c2c', bg:'#faf9f6', layout:'center',
    svg:`<ellipse cx="960" cy="400" rx="240" ry="80" fill="{a}" opacity="0.015"/><ellipse cx="960" cy="400" rx="160" ry="50" fill="{a}" opacity="0.02"/><path d="M720 400 Q840 380 960 400 Q1080 420 1200 400" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.2"/>`,
    titleStyle:"fontSize: '76px', fontWeight: 200, letterSpacing: '0.02em'", subBelow:true },
  { id:'coverLineCalligraphy', name:'书法标题', accent:'#b22222', bg:'#fdf8f4', layout:'left',
    svg:`<path d="M120 400 Q280 380 440 400" stroke="{a}" strokeWidth="2.5" fill="none" opacity="0.2" strokeLinecap="round"/><path d="M140 420 Q260 410 380 420" stroke="{a}" strokeWidth="1.5" fill="none" opacity="0.1" strokeLinecap="round"/>`,
    titleStyle:"fontSize: '80px', fontWeight: 200, letterSpacing: '0.03em'", subBelow:false },
  { id:'coverLineBamboo', name:'竹韵标题', accent:'#4a7c59', bg:'#f8faf7', layout:'left',
    svg:`<line x1="160" y1="280" x2="160" y2="540" stroke="{a}" strokeWidth="1.5" opacity="0.2"/><line x1="160" y1="360" x2="160" y2="360" stroke="{a}" strokeWidth="4" strokeLinecap="round" opacity="0.2"/><line x1="160" y1="440" x2="160" y2="440" stroke="{a}" strokeWidth="4" strokeLinecap="round" opacity="0.2"/><path d="M160 360 Q200 340 240 320" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.15"/><path d="M160 440 Q120 420 80 400" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.15"/>`,
    titleStyle:"fontSize: '72px', fontWeight: 300, letterSpacing: '0.02em'", subBelow:false },
  { id:'coverLineCoral', name:'珊瑚标题', accent:'#e07a5f', bg:'#fef9f7', layout:'center',
    svg:`<circle cx="960" cy="400" r="100" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.15"/><circle cx="960" cy="400" r="60" stroke="{a}" strokeWidth="0.4" fill="none" opacity="0.1"/><circle cx="960" cy="400" r="20" fill="{a}" opacity="0.05"/>`,
    titleStyle:"fontSize: '72px', fontWeight: 200, letterSpacing: '-0.01em'", subBelow:true },
  { id:'coverLineSapphire', name:'蓝宝标题', accent:'#0f52ba', bg:'#f7f9fc', layout:'center',
    svg:`<polygon points="960,280 1080,400 960,520 840,400" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.15"/><polygon points="960,330 1030,400 960,470 890,400" stroke="{a}" strokeWidth="0.4" fill="none" opacity="0.1"/>`,
    titleStyle:"fontSize: '68px', fontWeight: 200, letterSpacing: '0.01em'", subBelow:true },
  { id:'coverLineRose', name:'玫瑰标题', accent:'#b76e79', bg:'#fdf8f9', layout:'center',
    svg:`<path d="M960 340 Q1020 340 1020 400 Q1020 460 960 460 Q900 460 900 400 Q900 340 960 340" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.15"/><path d="M960 360 Q1000 360 1000 400 Q1000 440 960 440 Q920 440 920 400 Q920 360 960 360" stroke="{a}" strokeWidth="0.3" fill="none" opacity="0.1"/>`,
    titleStyle:"fontSize: '72px', fontWeight: 200, letterSpacing: '0.01em'", subBelow:true },
];

function genCover(t) {
  const compName = t.id.charAt(0).toUpperCase() + t.id.slice(1);
  const a = t.accent;
  const isCenter = t.layout === 'center';
  const svgDeco = t.svg.replace(/\{a\}/g, a);
  const titleAlign = isCenter ? ", textAlign: 'center'" : '';
  const subAlign = isCenter ? ", textAlign: 'center'" : '';
  const wrapperAlign = isCenter ? "alignItems: 'center', justifyContent: 'center'" : "alignItems: 'flex-start', justifyContent: 'center', paddingLeft: '120px'";
  const flexAlign = isCenter ? ", alignItems: 'center'" : '';
  const subMaxW = isCenter ? ", maxWidth: '800px'" : ", maxWidth: '800px'";

  // Title position relative to decoration
  const titleBelowLine = t.subBelow;

  return "import React, { useLayoutEffect, useRef } from 'react';\n" +
    "import { TemplateConfig } from '../types';\n" +
    "import { GeneratedContent } from '../types';\n" +
    "import { generateDownloadableHtml } from '../../utils/template';\n" +
    "import { ProgressBarConfig } from '../../types/progress-bar';\n\n" +
    "interface " + compName + "Props {\n  data: GeneratedContent;\n  scale: number;\n  progressBarConfig?: ProgressBarConfig;\n}\n\n" +
    "const " + compName + ": React.FC<" + compName + "Props> = ({ data, scale, progressBarConfig }) => {\n" +
    "  const titleRef = useRef<HTMLHeadingElement>(null);\n" +
    "  const subtitle = data.cards.length > 0 ? data.cards[0].desc : '';\n\n" +
    "  useLayoutEffect(() => {\n" +
    "    if (typeof window === 'undefined') return;\n" +
    "    if (!titleRef.current) return;\n" +
    "    const title = titleRef.current;\n" +
    "    let size = 72;\n" +
    "    title.style.fontSize = size + 'px';\n" +
    "    let guard = 0;\n" +
    "    while (title.scrollWidth > 1600 && size > 36 && guard < 100) { size -= 1; title.style.fontSize = size + 'px'; guard++; }\n" +
    "  }, [data]);\n\n" +
    "  const accentColor = '" + a + "';\n\n" +
    "  return (\n" +
    "    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Noto Sans SC\", Roboto, sans-serif', background: '" + t.bg + "' }}>\n" +
    "      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', " + wrapperAlign + ", position: 'relative' }}>\n" +
    "        <svg viewBox=\"0 0 1920 1080\" fill=\"none\" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>\n" +
    "          " + svgDeco + "\n" +
    "        </svg>\n" +
    "        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column'" + flexAlign + "', gap: 24 }}>\n" +
    "          <h1 ref={titleRef} style={{ " + t.titleStyle + ", lineHeight: 1.3, color: '#111122', margin: 0" + titleAlign + " }}>{data.mainTitle}</h1>\n" +
    "          {subtitle && <p style={{ fontSize: '28px', fontWeight: 400, color: '#555566', lineHeight: 1.6, margin: 0" + subAlign + subMaxW + " }} dangerouslySetInnerHTML={{ __html: subtitle }} />}\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  );\n" +
    "};\n\n" +
    "export const " + t.id + ": TemplateConfig = {\n" +
    "  id: '" + t.id + "',\n" +
    "  name: '" + t.name + "',\n" +
    "  description: '" + t.name + "，极简线条封面',\n" +
    "  icon: 'horizontal_rule',\n" +
    "  render: (data, scale, progressBarConfig) => React.createElement(" + compName + ", { data, scale, progressBarConfig }),\n" +
    "  generateHtml: (data) => generateDownloadableHtml(data, '" + t.id + "'),\n" +
    "};\n";
}

// Delete old cover files first
const coverDir = path.join(BASE, 'src', 'templates', 'minimal-line-cover');
const oldFiles = fs.readdirSync(coverDir).filter(f => f.endsWith('.tsx'));
for (const f of oldFiles) {
  fs.unlinkSync(path.join(coverDir, f));
}

// Generate new cover templates
CV.forEach(t => {
  fs.writeFileSync(path.join(coverDir, t.id + '.tsx'), genCover(t), 'utf8');
  console.log('Created: ' + t.id + '.tsx');
});

// Regenerate cover index.ts
fs.writeFileSync(path.join(coverDir, 'index.ts'),
  CV.map(t => "export { " + t.id + " } from './" + t.id + "';").join('\n') + '\n', 'utf8');
console.log('Created: minimal-line-cover/index.ts');

console.log('\nDone! Created ' + CV.length + ' unique cover templates.');
