const fs = require('fs');
const path = require('path');
const BASE = path.join(__dirname, '..');

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return r + ',' + g + ',' + b;
}

const CT = [
  { id:'lineArtMondrian', name:'蒙德里安色块', desc:'红蓝黄几何色块，风格派经典', accent:'#c3282d', bg:'#faf8f5', icon:'grid_on' },
  { id:'lineArtKandinsky', name:'康定斯基圆环', desc:'同心圆与线条，抽象韵律', accent:'#5b3a8c', bg:'#f9f7fc', icon:'circle' },
  { id:'lineArtMartin', name:'阿格尼丝网格', desc:'极细网格线条，冥想宁静', accent:'#a0a8b0', bg:'#fafafa', icon:'grid_4x4' },
  { id:'lineArtRiley', name:'莱利视幻', desc:'波动线条视错觉，动态韵律', accent:'#1a1a2e', bg:'#fcfcfc', icon:'waves' },
  { id:'lineArtNewman', name:'纽曼拉链', desc:'垂直拉链线条，崇高庄严', accent:'#c41e3a', bg:'#fefefe', icon:'vertical_align_center' },
  { id:'lineArtStella', name:'斯特拉几何', desc:'同心几何嵌套，精确秩序', accent:'#b87333', bg:'#fdfaf6', icon:'hexagon' },
  { id:'lineArtKusama', name:'草间弥生点', desc:'无限圆点阵列，迷幻沉浸', accent:'#e63946', bg:'#fef8f8', icon:'bubble_chart' },
  { id:'lineArtKlee', name:'克利童趣', desc:'童趣色块线条，诗意天真', accent:'#d4a843', bg:'#fdfcf5', icon:'palette' },
  { id:'lineArtMiro', name:'米罗有机', desc:'有机曲线符号，梦幻诗意', accent:'#1e3a5f', bg:'#f7f9fc', icon:'gesture' },
  { id:'lineArtArp', name:'阿普生物', desc:'生物形态轮廓，自然有机', accent:'#5a7d5a', bg:'#f8faf7', icon:'nature' },
  { id:'lineArtDeco', name:'装饰艺术', desc:'Art Deco几何线条，奢华经典', accent:'#c9a84c', bg:'#fdfcf6', icon:'diamond' },
  { id:'lineArtNouveau', name:'新艺术', desc:'Art Nouveau曲线，优雅浪漫', accent:'#2d8a6e', bg:'#f7faf8', icon:'local_florist' },
  { id:'lineArtConstruct', name:'构成主义', desc:'红色斜线构成，革命先锋', accent:'#cc2936', bg:'#faf8f7', icon:'change_history' },
  { id:'lineArtDeStijl', name:'风格派', desc:'De Stijl直线色块，理性纯粹', accent:'#1c5ba0', bg:'#fafcfe', icon:'crop_square' },
  { id:'lineArtOpArt', name:'欧普艺术', desc:'光学幻觉线条，动感视幻', accent:'#8b2fc9', bg:'#fbf8fd', icon:'blur_circular' },
  { id:'lineArtInkWash', name:'水墨渲染', desc:'水墨晕染效果，东方意境', accent:'#2c2c2c', bg:'#faf9f6', icon:'brush' },
  { id:'lineArtCalligraphy', name:'书法笔触', desc:'毛笔书法线条，气韵生动', accent:'#b22222', bg:'#fdf8f4', icon:'gesture' },
  { id:'lineArtBamboo', name:'竹节清韵', desc:'竹节线条装饰，清雅脱俗', accent:'#4a7c59', bg:'#f8faf7', icon:'park' },
  { id:'lineArtLandscape', name:'远山淡影', desc:'淡远山形轮廓，空灵悠远', accent:'#6b8fa3', bg:'#f8fafb', icon:'landscape' },
  { id:'lineArtCoral', name:'珊瑚暖调', desc:'珊瑚色温暖线条，柔美亲和', accent:'#e07a5f', bg:'#fef9f7', icon:'coral' },
  { id:'lineArtSapphire', name:'蓝宝石', desc:'蓝宝石深邃线条，沉稳高贵', accent:'#0f52ba', bg:'#f7f9fc', icon:'diamond' },
  { id:'lineArtAmethyst', name:'紫水晶', desc:'紫水晶神秘线条，优雅神秘', accent:'#7b5ea7', bg:'#faf7fc', icon:'auto_awesome' },
  { id:'lineArtTopaz', name:'托帕石', desc:'托帕石金色线条，温暖明亮', accent:'#c7852e', bg:'#fdfaf5', icon:'wb_sunny' },
  { id:'lineArtTerracotta', name:'陶土暖意', desc:'陶土色质朴线条，温暖自然', accent:'#c4623a', bg:'#fdf8f5', icon:'architecture' },
  { id:'lineArtSage', name:'鼠尾草绿', desc:'鼠尾草绿柔线条，清新治愈', accent:'#7d9b76', bg:'#f8faf7', icon:'eco' },
  { id:'lineArtSlate', name:'石板灰调', desc:'石板灰冷峻线条，理性克制', accent:'#5a6570', bg:'#f9fafb', icon:'layers' },
  { id:'lineArtOrchid', name:'兰花紫韵', desc:'兰花紫优雅线条，高贵淡雅', accent:'#9b6b9e', bg:'#faf7fb', icon:'local_florist' },
  { id:'lineArtCedar', name:'雪松棕调', desc:'雪松棕沉稳线条，厚重可靠', accent:'#6b4e3d', bg:'#faf8f5', icon:'forest' },
  { id:'lineArtIndigo', name:'靛蓝深邃', desc:'靛蓝深邃线条，沉静内敛', accent:'#2e4a7a', bg:'#f7f9fc', icon:'nightlight' },
  { id:'lineArtRose', name:'玫瑰金韵', desc:'玫瑰金精致线条，柔美奢华', accent:'#b76e79', bg:'#fdf8f9', icon:'favorite' },
];

const CV = [
  { id:'coverLineMinimal', name:'极简细线', desc:'极简单线标题，至简至美', accent:'#333333', bg:'#ffffff', layout:'center' },
  { id:'coverLineElegant', name:'优雅金线', desc:'金色优雅标题，高端精致', accent:'#c9a84c', bg:'#fdfcf6', layout:'center' },
  { id:'coverLineBold', name:'大气粗线', desc:'粗线大气标题，力量感强', accent:'#1a1a2e', bg:'#fafafa', layout:'left' },
  { id:'coverLineCenter', name:'居中对称', desc:'居中对称布局，庄重典雅', accent:'#4a4a5a', bg:'#fcfcfc', layout:'center' },
  { id:'coverLineLeft', name:'左对齐雅致', desc:'左对齐标题，简洁干练', accent:'#2d5a45', bg:'#f8faf8', layout:'left' },
  { id:'coverLineSplit', name:'分割双线', desc:'双线分割标题，层次分明', accent:'#64748b', bg:'#f8f9fa', layout:'center' },
  { id:'coverLineFrame', name:'框线标题', desc:'矩形框线围合，结构感强', accent:'#a07850', bg:'#fdfbf8', layout:'center' },
  { id:'coverLineDiamond', name:'菱形标题', desc:'菱形装饰标题，几何美感', accent:'#8b4563', bg:'#fdf8fa', layout:'center' },
  { id:'coverLineCircle', name:'圆环标题', desc:'圆环围绕标题，包容完整', accent:'#265578', bg:'#f8fafc', layout:'center' },
  { id:'coverLineWave', name:'波浪标题', desc:'波浪曲线标题，流动韵律', accent:'#388098', bg:'#f7fafb', layout:'center' },
  { id:'coverLineMountain', name:'山形标题', desc:'山形轮廓标题，沉稳大气', accent:'#6b8fa3', bg:'#f8fafb', layout:'center' },
  { id:'coverLineZigzag', name:'锯齿标题', desc:'锯齿折线标题，锐利节奏', accent:'#2d5a45', bg:'#f8fafa', layout:'center' },
  { id:'coverLineDot', name:'点阵标题', desc:'点阵装饰标题，现代科技', accent:'#324678', bg:'#f9fafc', layout:'center' },
  { id:'coverLineDash', name:'虚线标题', desc:'虚线装饰标题，轻盈通透', accent:'#0a7e8c', bg:'#f7fbfb', layout:'center' },
  { id:'coverLineCross', name:'十字标题', desc:'十字交叉标题，对称秩序', accent:'#cc2936', bg:'#faf8f7', layout:'center' },
  { id:'coverLineSpiral', name:'螺旋标题', desc:'螺旋曲线标题，优雅旋转', accent:'#5b3a8c', bg:'#f9f7fc', layout:'center' },
  { id:'coverLineRadiant', name:'放射标题', desc:'放射线条标题，光芒四射', accent:'#bf9443', bg:'#fefcf6', layout:'center' },
  { id:'coverLineParallel', name:'平行标题', desc:'平行线标题，节奏韵律', accent:'#7d9b76', bg:'#f8faf7', layout:'left' },
  { id:'coverLineGrid', name:'网格标题', desc:'网格线条标题，结构秩序', accent:'#5a6570', bg:'#f9fafb', layout:'center' },
  { id:'coverLineFlow', name:'流动标题', desc:'流动曲线标题，自然流畅', accent:'#db7790', bg:'#fdf7f9', layout:'center' },
  { id:'coverLineOrbit', name:'轨道标题', desc:'椭圆轨道标题，宇宙韵律', accent:'#1e3a5f', bg:'#f7f9fc', layout:'center' },
  { id:'coverLineCorner', name:'折角标题', desc:'L形折角标题，几何结构', accent:'#b87333', bg:'#fdfaf6', layout:'left' },
  { id:'coverLineNouveau', name:'新艺术标题', desc:'Art Nouveau曲线标题', accent:'#2d8a6e', bg:'#f7faf8', layout:'center' },
  { id:'coverLineDeco', name:'装饰标题', desc:'Art Deco几何标题', accent:'#c9a84c', bg:'#fdfcf6', layout:'center' },
  { id:'coverLineInk', name:'水墨标题', desc:'水墨晕染标题，东方意境', accent:'#2c2c2c', bg:'#faf9f6', layout:'center' },
  { id:'coverLineCalligraphy', name:'书法标题', desc:'毛笔书法标题，气韵生动', accent:'#b22222', bg:'#fdf8f4', layout:'left' },
  { id:'coverLineBamboo', name:'竹韵标题', desc:'竹节线条标题，清雅脱俗', accent:'#4a7c59', bg:'#f8faf7', layout:'left' },
  { id:'coverLineCoral', name:'珊瑚标题', desc:'珊瑚暖色标题，温暖亲和', accent:'#e07a5f', bg:'#fef9f7', layout:'center' },
  { id:'coverLineSapphire', name:'蓝宝标题', desc:'蓝宝石标题，深邃高贵', accent:'#0f52ba', bg:'#f7f9fc', layout:'center' },
  { id:'coverLineRose', name:'玫瑰标题', desc:'玫瑰金标题，柔美精致', accent:'#b76e79', bg:'#fdf8f9', layout:'center' },
];

function genContent(t) {
  const compName = t.id.charAt(0).toUpperCase() + t.id.slice(1);
  const rgb = hexToRgb(t.accent);
  const a = t.accent;
  return "import React, { useLayoutEffect, useRef } from 'react';\n" +
    "import { TemplateConfig } from '../types';\n" +
    "import { GeneratedContent } from '../types';\n" +
    "import { generateDownloadableHtml } from '../../utils/template';\n" +
    "import { getStandardTitleConfig } from '../../utils/layout-calculator';\n" +
    "import { ProgressBarConfig } from '../../types/progress-bar';\n\n" +
    "interface " + compName + "Props {\n  data: GeneratedContent;\n  scale: number;\n  progressBarConfig?: ProgressBarConfig;\n}\n\n" +
    "const " + compName + ": React.FC<" + compName + "Props> = ({ data, scale, progressBarConfig }) => {\n" +
    "  const wrapperRef = useRef<HTMLDivElement>(null);\n" +
    "  const titleRef = useRef<HTMLHeadingElement>(null);\n" +
    "  const N = data.cards.length;\n" +
    "  const isSingleCard = N === 1;\n" +
    "  const cols = isSingleCard ? 1 : (N <= 2 ? 2 : N <= 3 ? 3 : 4);\n" +
    "  const titleConfig = getStandardTitleConfig(N);\n\n" +
    "  useLayoutEffect(() => {\n" +
    "    if (typeof window === 'undefined') return;\n" +
    "    if (!wrapperRef.current || !titleRef.current) return;\n" +
    "    const wrapper = wrapperRef.current;\n" +
    "    const title = titleRef.current;\n" +
    "    const fitTitle = () => {\n" +
    "      let size = titleConfig.initialFontSize;\n" +
    "      title.style.fontSize = size + 'px';\n" +
    "      let guard = 0;\n" +
    "      while (title.scrollWidth > 1700 && size > titleConfig.minFontSize && guard < 100) { size -= 1; title.style.fontSize = size + 'px'; guard++; }\n" +
    "    };\n" +
    "    fitTitle();\n" +
    "    const fitViewport = () => {\n" +
    "      const maxH = 1040;\n" +
    "      if (wrapper.scrollHeight > maxH) { wrapper.style.transform = 'scale(' + Math.max(0.6, maxH / wrapper.scrollHeight) + ')'; }\n" +
    "      else { wrapper.style.transform = ''; }\n" +
    "    };\n" +
    "    const timer = window.setTimeout(fitViewport, 50);\n" +
    "    return () => window.clearTimeout(timer);\n" +
    "  }, [data, titleConfig]);\n\n" +
    "  const topConfig = progressBarConfig?.top;\n" +
    "  const bottomConfig = progressBarConfig?.bottom;\n" +
    "  const renderProgressBar = (position: 'top' | 'bottom') => {\n" +
    "    const config = position === 'top' ? topConfig : bottomConfig;\n" +
    "    if (!config?.show) return null;\n" +
    "    return (\n" +
    "      <div style={{ width: '100%', padding: '16px 48px', background: '" + t.bg + "' }}>\n" +
    "        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>\n" +
    "          {config.segmentLabels.slice(0, config.segmentCount).map((label, index) => (\n" +
    "            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>\n" +
    "              <div style={{ width: 24, height: 4, borderRadius: 2, background: index <= config.activeIndex ? '" + a + "' : '#e0e0e0', opacity: index <= config.activeIndex ? 0.8 : 0.3 }} />\n" +
    "              <span style={{ fontSize: '26px', fontWeight: 500, color: index <= config.activeIndex ? '#111122' : '#888899' }}>{label}</span>\n" +
    "            </div>\n" +
    "          ))}\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    );\n" +
    "  };\n\n" +
    "  const accentColor = '" + a + "';\n" +
    "  const innerPadding = isSingleCard ? '40px 64px' : '32px 56px';\n" +
    "  const topMargin = isSingleCard ? '32px' : '28px';\n" +
    "  const cardPadding = isSingleCard ? '32px 36px' : '24px 28px';\n" +
    "  const gridGap = isSingleCard ? '28px' : '24px';\n\n" +
    "  return (\n" +
    "    <div style={{ width: 1920, height: 1080, transform: 'scale(' + scale + ')', transformOrigin: 'top left', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Noto Sans SC\", Roboto, sans-serif', background: '" + t.bg + "' }}>\n" +
    "      {renderProgressBar('top')}\n" +
    "      <div ref={wrapperRef} style={{ flex: 1, padding: innerPadding, display: 'flex', flexDirection: 'column', position: 'relative' }}>\n" +
    "        <div style={{ position: 'absolute', top: 20, right: 40, opacity: 0.15 }}>\n" +
    "          <svg width=\"64\" height=\"64\" viewBox=\"0 0 64 64\" fill=\"none\">\n" +
    "            <circle cx=\"32\" cy=\"32\" r=\"28\" stroke={accentColor} strokeWidth=\"0.8\" fill=\"none\" />\n" +
    "            <circle cx=\"32\" cy=\"32\" r=\"16\" stroke={accentColor} strokeWidth=\"0.5\" fill=\"none\" opacity=\"0.5\" />\n" +
    "          </svg>\n" +
    "        </div>\n" +
    "        <div style={{ position: 'absolute', bottom: 30, left: 40, opacity: 0.1 }}>\n" +
    "          <svg width=\"64\" height=\"64\" viewBox=\"0 0 64 64\" fill=\"none\">\n" +
    "            <line x1=\"4\" y1=\"32\" x2=\"60\" y2=\"32\" stroke={accentColor} strokeWidth=\"0.8\" />\n" +
    "            <line x1=\"32\" y1=\"4\" x2=\"32\" y2=\"60\" stroke={accentColor} strokeWidth=\"0.5\" opacity=\"0.5\" />\n" +
    "          </svg>\n" +
    "        </div>\n" +
    "        <div style={{ marginBottom: topMargin, display: 'flex', alignItems: 'center', gap: 16 }}>\n" +
    "          <div style={{ width: 48, height: 2, background: accentColor, flexShrink: 0 }} />\n" +
    "          <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>\n" +
    "        </div>\n" +
    "        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: gridGap, alignItems: 'start' }}>\n" +
    "          {data.cards.slice(0, N).map((card, i) => (\n" +
    "            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: cardPadding, background: '#FFFFFF', borderRadius: 4, boxShadow: '0 1px 4px rgba(" + rgb + ",0.06)', border: '1px solid rgba(" + rgb + ",0.12)' }}>\n" +
    "              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>\n" +
    "                <div style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid ' + accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>\n" +
    "                  <span style={{ fontSize: isSingleCard ? '14px' : '12px', fontWeight: 600, color: accentColor }}>{String(i + 1).padStart(2, '0')}</span>\n" +
    "                </div>\n" +
    "                <div style={{ flex: 1, height: '1px', background: 'rgba(" + rgb + ",0.15)' }} />\n" +
    "              </div>\n" +
    "              <h3 style={{ fontSize: isSingleCard ? '48px' : '34px', fontWeight: 400, color: '#111122', margin: 0, lineHeight: 1.4 }}>{card.title}</h3>\n" +
    "              <p style={{ fontSize: isSingleCard ? '32px' : '26px', color: '#444455', lineHeight: 1.8, margin: 0 }} dangerouslySetInnerHTML={{ __html: card.desc }} />\n" +
    "            </div>\n" +
    "          ))}\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      {renderProgressBar('bottom')}\n" +
    "    </div>\n" +
    "  );\n" +
    "};\n\n" +
    "export const " + t.id + ": TemplateConfig = {\n" +
    "  id: '" + t.id + "',\n" +
    "  name: '" + t.name + "',\n" +
    "  description: '" + t.desc + "',\n" +
    "  icon: '" + t.icon + "',\n" +
    "  render: (data, scale, progressBarConfig) => React.createElement(" + compName + ", { data, scale, progressBarConfig }),\n" +
    "  generateHtml: (data) => generateDownloadableHtml(data, '" + t.id + "'),\n" +
    "};\n";
}

function genCover(t) {
  const compName = t.id.charAt(0).toUpperCase() + t.id.slice(1);
  const a = t.accent;
  const isCenter = t.layout === 'center';
  const titleAlign = isCenter ? "textAlign: 'center'" : '';
  const subAlign = isCenter ? "textAlign: 'center', maxWidth: '800px'" : "maxWidth: '800px'";
  const wrapperAlign = isCenter ? "alignItems: 'center', justifyContent: 'center'" : "alignItems: 'flex-start', justifyContent: 'center', paddingLeft: '120px'";
  const flexAlign = isCenter ? ", alignItems: 'center'" : '';

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
    "          <line x1=\"760\" y1=\"400\" x2=\"1160\" y2=\"400\" stroke={accentColor} strokeWidth=\"0.8\" opacity=\"0.3\" />\n" +
    "          <line x1=\"810\" y1=\"405\" x2=\"1110\" y2=\"405\" stroke={accentColor} strokeWidth=\"0.4\" opacity=\"0.15\" />\n" +
    "        </svg>\n" +
    "        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column'" + flexAlign + ", gap: 24 }}>\n" +
    "          <h1 ref={titleRef} style={{ fontSize: '72px', fontWeight: 200, letterSpacing: '-0.02em', lineHeight: 1.3, color: '#111122', margin: 0, " + titleAlign + " }}>{data.mainTitle}</h1>\n" +
    "          {subtitle && <p style={{ fontSize: '28px', fontWeight: 400, color: '#555566', lineHeight: 1.6, margin: 0, " + subAlign + " }} dangerouslySetInnerHTML={{ __html: subtitle }} />}\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  );\n" +
    "};\n\n" +
    "export const " + t.id + ": TemplateConfig = {\n" +
    "  id: '" + t.id + "',\n" +
    "  name: '" + t.name + "',\n" +
    "  description: '" + t.desc + "',\n" +
    "  icon: 'horizontal_rule',\n" +
    "  render: (data, scale, progressBarConfig) => React.createElement(" + compName + ", { data, scale, progressBarConfig }),\n" +
    "  generateHtml: (data) => generateDownloadableHtml(data, '" + t.id + "'),\n" +
    "};\n";
}

// Generate content templates
const contentDir = path.join(BASE, 'src', 'templates', 'minimal-line');
CT.forEach(t => {
  fs.writeFileSync(path.join(contentDir, t.id + '.tsx'), genContent(t), 'utf8');
  console.log('Created: ' + t.id + '.tsx');
});

// Generate cover templates
const coverDir = path.join(BASE, 'src', 'templates', 'minimal-line-cover');
if (!fs.existsSync(coverDir)) fs.mkdirSync(coverDir, { recursive: true });
CV.forEach(t => {
  fs.writeFileSync(path.join(coverDir, t.id + '.tsx'), genCover(t), 'utf8');
  console.log('Created: cover/' + t.id + '.tsx');
});

// Cover index.ts
fs.writeFileSync(path.join(coverDir, 'index.ts'),
  CV.map(t => "export { " + t.id + " } from './" + t.id + "';").join('\n') + '\n', 'utf8');
console.log('Created: minimal-line-cover/index.ts');

// Update minimal-line/index.ts
const existingIndex = fs.readFileSync(path.join(contentDir, 'index.ts'), 'utf8');
const newExports = CT.map(t => "export { " + t.id + " } from './" + t.id + "';").join('\n') + '\n';
fs.writeFileSync(path.join(contentDir, 'index.ts'), existingIndex + newExports, 'utf8');
console.log('Updated: minimal-line/index.ts');

// Update main templates/index.ts
const mainIndexPath = path.join(BASE, 'src', 'templates', 'index.ts');
let mainIndex = fs.readFileSync(mainIndexPath, 'utf8');

const contentImports = CT.map(t => "import { " + t.id + " } from './minimal-line/" + t.id + "';").join('\n');
const coverImports = CV.map(t => "import { " + t.id + " } from './minimal-line-cover/" + t.id + "';").join('\n');

mainIndex = mainIndex.replace(
  "// 简约线条模板",
  "// 极简线条GLM版 - 30个\n" + contentImports + "\n\n// 极简线条封面 - 30个\n" + coverImports + "\n\n// 简约线条模板"
);

const contentRegs = CT.map(t => "  " + t.id + ": " + t.id + ",").join('\n');
const coverRegs = CV.map(t => "  " + t.id + ": " + t.id + ",").join('\n');

mainIndex = mainIndex.replace(
  "  // 简约线条模板\n  lineMinimal:",
  "  // 极简线条GLM版 - 30个\n" + contentRegs + "\n\n  // 极简线条封面 - 30个\n" + coverRegs + "\n\n  // 简约线条模板\n  lineMinimal:"
);

fs.writeFileSync(mainIndexPath, mainIndex, 'utf8');
console.log('Updated: templates/index.ts');

// Update catalog.ts
const catalogPath = path.join(BASE, 'src', 'templates', 'catalog.ts');
let catalog = fs.readFileSync(catalogPath, 'utf8');

const glmIds = CT.map(t => t.id);
const coverIds = CV.map(t => t.id);

catalog = catalog.replace(
  "  // 简约线条",
  "  { id: 'minimal-line-glm', name: '极简线条（GLM版）', icon: 'horizontal_rule', themeIds: ['" + glmIds.join("', '") + "'] },\n  { id: 'minimal-line-cover', name: '极简线条封面', icon: 'title', themeIds: ['" + coverIds.join("', '") + "'] },\n\n  // 简约线条"
);

fs.writeFileSync(catalogPath, catalog, 'utf8');
console.log('Updated: catalog.ts');

// Update meta.json
const metaPath = path.join(BASE, 'src', 'templates', 'meta.json');
let meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

CT.forEach(t => {
  meta.templates[t.id] = {
    modifiedTime: 1776531984,
    filePath: 'src/templates/minimal-line/' + t.id + '.tsx',
    fileSize: 7500,
    name: t.name,
    description: t.desc,
    icon: t.icon,
    downloadable: true,
    ssrReady: true
  };
});

CV.forEach(t => {
  meta.templates[t.id] = {
    modifiedTime: 1776531984,
    filePath: 'src/templates/minimal-line-cover/' + t.id + '.tsx',
    fileSize: 5000,
    name: t.name,
    description: t.desc,
    icon: 'horizontal_rule',
    downloadable: true,
    ssrReady: true
  };
});

fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf8');
console.log('Updated: meta.json');

console.log('\nDone! Created ' + CT.length + ' content templates and ' + CV.length + ' cover templates.');
