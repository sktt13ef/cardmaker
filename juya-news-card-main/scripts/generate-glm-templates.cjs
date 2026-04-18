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
  { id:'lineArtMondrian', name:'蒙德里安色块', desc:'红蓝黄几何色块，风格派经典', accent:'#c3282d', bg:'#faf8f5', icon:'grid_on',
    svg1:`<rect x="2" y="2" width="28" height="28" stroke="{a}" strokeWidth="1.5" fill="none"/><rect x="32" y="2" width="28" height="14" fill="{a}" opacity="0.15"/><line x1="30" y1="2" x2="30" y2="60" stroke="{a}" strokeWidth="1.5"/><line x1="2" y1="32" x2="60" y2="32" stroke="{a}" strokeWidth="1.5"/>`,
    svg2:`<rect x="2" y="2" width="56" height="56" stroke="{a}" strokeWidth="1" fill="none"/><line x1="30" y1="2" x2="30" y2="58" stroke="{a}" strokeWidth="0.6" opacity="0.5"/><line x1="2" y1="30" x2="58" y2="30" stroke="{a}" strokeWidth="0.6" opacity="0.5"/>`,
    titleDeco:`width: 48, height: 4, background: accentColor`, cardBorder:`'3px solid ' + accentColor`, cardRadius:0, numStyle:'square' },
  { id:'lineArtKandinsky', name:'康定斯基圆环', desc:'同心圆与线条，抽象韵律', accent:'#5b3a8c', bg:'#f9f7fc', icon:'circle',
    svg1:`<circle cx="32" cy="32" r="26" stroke="{a}" strokeWidth="1" fill="none"/><circle cx="32" cy="32" r="16" stroke="{a}" strokeWidth="0.7" fill="none" opacity="0.6"/><circle cx="32" cy="32" r="6" fill="{a}" opacity="0.2"/><line x1="58" y1="6" x2="6" y2="58" stroke="{a}" strokeWidth="0.5" opacity="0.3"/>`,
    svg2:`<circle cx="30" cy="30" r="20" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.4"/><circle cx="30" cy="30" r="10" stroke="{a}" strokeWidth="0.5" fill="none" opacity="0.3"/>`,
    titleDeco:`width: 40, height: 40, borderRadius: '50%', border: '2px solid ' + accentColor`, cardBorder:`'1px solid rgba(' + rgb + ',0.15)'`, cardRadius:20, numStyle:'circle' },
  { id:'lineArtMartin', name:'阿格尼丝网格', desc:'极细网格线条，冥想宁静', accent:'#a0a8b0', bg:'#fafafa', icon:'grid_4x4',
    svg1:`<line x1="10" y1="0" x2="10" y2="60" stroke="{a}" strokeWidth="0.3" opacity="0.5"/><line x1="22" y1="0" x2="22" y2="60" stroke="{a}" strokeWidth="0.3" opacity="0.5"/><line x1="34" y1="0" x2="34" y2="60" stroke="{a}" strokeWidth="0.3" opacity="0.5"/><line x1="46" y1="0" x2="46" y2="60" stroke="{a}" strokeWidth="0.3" opacity="0.5"/><line x1="0" y1="12" x2="60" y2="12" stroke="{a}" strokeWidth="0.3" opacity="0.5"/><line x1="0" y1="24" x2="60" y2="24" stroke="{a}" strokeWidth="0.3" opacity="0.5"/><line x1="0" y1="36" x2="60" y2="36" stroke="{a}" strokeWidth="0.3" opacity="0.5"/><line x1="0" y1="48" x2="60" y2="48" stroke="{a}" strokeWidth="0.3" opacity="0.5"/>`,
    svg2:`<line x1="15" y1="0" x2="15" y2="60" stroke="{a}" strokeWidth="0.4" opacity="0.3"/><line x1="30" y1="0" x2="30" y2="60" stroke="{a}" strokeWidth="0.4" opacity="0.3"/><line x1="45" y1="0" x2="45" y2="60" stroke="{a}" strokeWidth="0.4" opacity="0.3"/><line x1="0" y1="15" x2="60" y2="15" stroke="{a}" strokeWidth="0.4" opacity="0.3"/><line x1="0" y1="30" x2="60" y2="30" stroke="{a}" strokeWidth="0.4" opacity="0.3"/><line x1="0" y1="45" x2="60" y2="45" stroke="{a}" strokeWidth="0.4" opacity="0.3"/>`,
    titleDeco:`width: 48, height: 1, background: accentColor`, cardBorder:`'1px solid rgba(' + rgb + ',0.2)'`, cardRadius:2, numStyle:'line' },
  { id:'lineArtRiley', name:'莱利视幻', desc:'波动线条视错觉，动态韵律', accent:'#1a1a2e', bg:'#fcfcfc', icon:'waves',
    svg1:`<path d="M0 8 Q15 4 30 8 Q45 12 60 8" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.7"/><path d="M0 20 Q15 16 30 20 Q45 24 60 20" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.6"/><path d="M0 32 Q15 28 30 32 Q45 36 60 32" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.5"/><path d="M0 44 Q15 40 30 44 Q45 48 60 44" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.4"/><path d="M0 56 Q15 52 30 56 Q45 60 60 56" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.3"/>`,
    svg2:`<path d="M0 12 Q15 8 30 12 Q45 16 60 12" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.4"/><path d="M0 30 Q15 26 30 30 Q45 34 60 30" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.3"/><path d="M0 48 Q15 44 30 48 Q45 52 60 48" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.2"/>`,
    titleDeco:`width: 48, height: 2, background: accentColor`, cardBorder:`'1px solid rgba(' + rgb + ',0.12)'`, cardRadius:0, numStyle:'line' },
  { id:'lineArtNewman', name:'纽曼拉链', desc:'垂直拉链线条，崇高庄严', accent:'#c41e3a', bg:'#fefefe', icon:'vertical_align_center',
    svg1:`<line x1="30" y1="0" x2="30" y2="60" stroke="{a}" strokeWidth="2.5"/><line x1="27" y1="10" x2="27" y2="22" stroke="{a}" strokeWidth="0.5" opacity="0.4"/><line x1="33" y1="38" x2="33" y2="50" stroke="{a}" strokeWidth="0.5" opacity="0.4"/>`,
    svg2:`<line x1="30" y1="0" x2="30" y2="60" stroke="{a}" strokeWidth="2" opacity="0.4"/>`,
    titleDeco:`width: 3, height: 48, background: accentColor`, cardBorder:`'1px solid rgba(' + rgb + ',0.12)'`, cardRadius:2, numStyle:'line' },
  { id:'lineArtStella', name:'斯特拉几何', desc:'同心几何嵌套，精确秩序', accent:'#b87333', bg:'#fdfaf6', icon:'hexagon',
    svg1:`<polygon points="30,2 56,16 56,44 30,58 4,44 4,16" stroke="{a}" strokeWidth="1" fill="none"/><polygon points="30,14 44,22 44,38 30,46 16,38 16,22" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.5"/><polygon points="30,24 36,28 36,34 30,38 24,34 24,28" stroke="{a}" strokeWidth="0.4" fill="none" opacity="0.3"/>`,
    svg2:`<rect x="6" y="6" width="48" height="48" stroke="{a}" strokeWidth="0.8" fill="none" transform="rotate(15 30 30)"/><rect x="14" y="14" width="32" height="32" stroke="{a}" strokeWidth="0.5" fill="none" opacity="0.4" transform="rotate(15 30 30)"/>`,
    titleDeco:`width: 40, height: 40, border: '2px solid ' + accentColor, transform: 'rotate(45deg)'`, cardBorder:`'1px solid rgba(' + rgb + ',0.15)'`, cardRadius:2, numStyle:'square' },
  { id:'lineArtKusama', name:'草间弥生点', desc:'无限圆点阵列，迷幻沉浸', accent:'#e63946', bg:'#fef8f8', icon:'bubble_chart',
    svg1:`<circle cx="10" cy="10" r="5" fill="{a}" opacity="0.35"/><circle cx="30" cy="10" r="4" fill="{a}" opacity="0.3"/><circle cx="50" cy="10" r="5" fill="{a}" opacity="0.25"/><circle cx="20" cy="26" r="4" fill="{a}" opacity="0.3"/><circle cx="40" cy="26" r="5" fill="{a}" opacity="0.25"/><circle cx="10" cy="42" r="5" fill="{a}" opacity="0.25"/><circle cx="30" cy="42" r="4" fill="{a}" opacity="0.2"/><circle cx="50" cy="42" r="5" fill="{a}" opacity="0.15"/><circle cx="20" cy="56" r="4" fill="{a}" opacity="0.2"/><circle cx="40" cy="56" r="5" fill="{a}" opacity="0.15"/>`,
    svg2:`<circle cx="15" cy="15" r="3" fill="{a}" opacity="0.2"/><circle cx="30" cy="15" r="3" fill="{a}" opacity="0.15"/><circle cx="45" cy="15" r="3" fill="{a}" opacity="0.1"/><circle cx="15" cy="35" r="3" fill="{a}" opacity="0.15"/><circle cx="30" cy="35" r="3" fill="{a}" opacity="0.1"/><circle cx="45" cy="35" r="3" fill="{a}" opacity="0.08"/><circle cx="15" cy="55" r="3" fill="{a}" opacity="0.1"/><circle cx="30" cy="55" r="3" fill="{a}" opacity="0.08"/><circle cx="45" cy="55" r="3" fill="{a}" opacity="0.05"/>`,
    titleDeco:`width: 40, height: 40, display: 'grid', gridTemplateColumns: 'repeat(3, 6px)', gap: 3`, cardBorder:`'1px solid rgba(' + rgb + ',0.12)'`, cardRadius:24, numStyle:'circle' },
  { id:'lineArtKlee', name:'克利童趣', desc:'童趣色块线条，诗意天真', accent:'#d4a843', bg:'#fdfcf5', icon:'palette',
    svg1:`<rect x="4" y="4" width="20" height="20" fill="{a}" opacity="0.2" rx="2"/><rect x="28" y="4" width="20" height="20" fill="{a}" opacity="0.15" rx="2"/><rect x="16" y="28" width="20" height="20" fill="{a}" opacity="0.25" rx="2"/><circle cx="50" cy="42" r="8" stroke="{a}" strokeWidth="1" fill="none" opacity="0.4"/>`,
    svg2:`<circle cx="20" cy="20" r="12" stroke="{a}" strokeWidth="0.8" fill="{a}" fillOpacity="0.08"/><rect x="32" y="32" width="20" height="20" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.25" rx="4"/>`,
    titleDeco:`width: 40, height: 8, background: 'linear-gradient(90deg, ' + accentColor + ', transparent)', borderRadius: 4`, cardBorder:`'1px solid rgba(' + rgb + ',0.15)'`, cardRadius:12, numStyle:'circle' },
  { id:'lineArtMiro', name:'米罗有机', desc:'有机曲线符号，梦幻诗意', accent:'#1e3a5f', bg:'#f7f9fc', icon:'gesture',
    svg1:`<path d="M10 30 Q20 10 30 30 Q40 50 50 30" stroke="{a}" strokeWidth="1.2" fill="none"/><circle cx="15" cy="15" r="5" stroke="{a}" strokeWidth="0.8" fill="none"/><circle cx="48" cy="12" r="3" fill="{a}" opacity="0.3"/><line x1="5" y1="50" x2="25" y2="45" stroke="{a}" strokeWidth="0.6" opacity="0.5"/>`,
    svg2:`<path d="M10 20 Q30 5 50 20 Q30 35 10 20" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.3"/><circle cx="30" cy="30" r="4" fill="{a}" opacity="0.15"/>`,
    titleDeco:`width: 48, height: 2, background: accentColor, borderRadius: 1`, cardBorder:`'1px solid rgba(' + rgb + ',0.12)'`, cardRadius:16, numStyle:'circle' },
  { id:'lineArtArp', name:'阿普生物', desc:'生物形态轮廓，自然有机', accent:'#5a7d5a', bg:'#f8faf7', icon:'nature',
    svg1:`<path d="M30 5 Q50 15 45 35 Q40 55 25 50 Q5 40 15 20 Q20 5 30 5" stroke="{a}" strokeWidth="1" fill="none"/><path d="M35 20 Q42 25 38 35" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.5"/>`,
    svg2:`<path d="M20 10 Q40 5 45 30 Q50 55 25 50 Q5 45 20 10" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.25"/>`,
    titleDeco:`width: 44, height: 3, background: accentColor, borderRadius: 2`, cardBorder:`'1px solid rgba(' + rgb + ',0.12)'`, cardRadius:20, numStyle:'circle' },
  { id:'lineArtDeco', name:'装饰艺术', desc:'Art Deco几何线条，奢华经典', accent:'#c9a84c', bg:'#fdfcf6', icon:'diamond',
    svg1:`<polygon points="30,2 58,30 30,58 2,30" stroke="{a}" strokeWidth="1.2" fill="none"/><line x1="30" y1="2" x2="30" y2="58" stroke="{a}" strokeWidth="0.5" opacity="0.5"/><line x1="2" y1="30" x2="58" y2="30" stroke="{a}" strokeWidth="0.5" opacity="0.5"/><polygon points="30,14 46,30 30,46 14,30" stroke="{a}" strokeWidth="0.5" fill="none" opacity="0.4"/>`,
    svg2:`<line x1="0" y1="30" x2="60" y2="30" stroke="{a}" strokeWidth="1.2"/><line x1="30" y1="0" x2="30" y2="60" stroke="{a}" strokeWidth="1.2"/><polygon points="30,10 50,30 30,50 10,30" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.25"/>`,
    titleDeco:`width: 48, height: 48, border: '2px solid ' + accentColor, transform: 'rotate(45deg)'`, cardBorder:`'1px solid rgba(' + rgb + ',0.2)'`, cardRadius:0, numStyle:'square' },
  { id:'lineArtNouveau', name:'新艺术', desc:'Art Nouveau曲线，优雅浪漫', accent:'#2d8a6e', bg:'#f7faf8', icon:'local_florist',
    svg1:`<path d="M10 50 Q10 20 30 10 Q50 20 50 50" stroke="{a}" strokeWidth="1" fill="none"/><path d="M20 50 Q25 35 30 25 Q35 35 40 50" stroke="{a}" strokeWidth="0.7" fill="none" opacity="0.6"/><circle cx="30" cy="15" r="4" fill="{a}" opacity="0.2"/>`,
    svg2:`<path d="M5 55 Q15 20 30 10 Q45 20 55 55" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.25"/>`,
    titleDeco:`width: 48, height: 3, background: 'linear-gradient(90deg, transparent, ' + accentColor + ', transparent)'`, cardBorder:`'1px solid rgba(' + rgb + ',0.12)'`, cardRadius:24, numStyle:'circle' },
  { id:'lineArtConstruct', name:'构成主义', desc:'红色斜线构成，革命先锋', accent:'#cc2936', bg:'#faf8f7', icon:'change_history',
    svg1:`<line x1="0" y1="60" x2="60" y2="0" stroke="{a}" strokeWidth="2"/><line x1="0" y1="40" x2="40" y2="0" stroke="{a}" strokeWidth="1" opacity="0.5"/><circle cx="45" cy="45" r="12" stroke="{a}" strokeWidth="1" fill="none" opacity="0.4"/>`,
    svg2:`<line x1="0" y1="55" x2="55" y2="0" stroke="{a}" strokeWidth="1.2" opacity="0.25"/><rect x="30" y="30" width="20" height="20" fill="{a}" opacity="0.08"/>`,
    titleDeco:`width: 48, height: 3, background: accentColor, transform: 'skewX(-20deg)'`, cardBorder:`'2px solid rgba(' + rgb + ',0.15)'`, cardRadius:0, numStyle:'square' },
  { id:'lineArtDeStijl', name:'风格派', desc:'De Stijl直线色块，理性纯粹', accent:'#1c5ba0', bg:'#fafcfe', icon:'crop_square',
    svg1:`<rect x="2" y="2" width="24" height="16" fill="{a}" opacity="0.15"/><rect x="2" y="20" width="24" height="38" stroke="{a}" strokeWidth="1" fill="none"/><line x1="28" y1="2" x2="28" y2="58" stroke="{a}" strokeWidth="1.5"/><rect x="30" y="2" width="28" height="28" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.5"/>`,
    svg2:`<rect x="2" y="2" width="56" height="56" stroke="{a}" strokeWidth="0.8" fill="none"/><line x1="20" y1="2" x2="20" y2="58" stroke="{a}" strokeWidth="0.5" opacity="0.4"/><line x1="2" y1="20" x2="58" y2="20" stroke="{a}" strokeWidth="0.5" opacity="0.4"/>`,
    titleDeco:`width: 48, height: 4, background: accentColor`, cardBorder:`'1px solid rgba(' + rgb + ',0.15)'`, cardRadius:0, numStyle:'square' },
  { id:'lineArtOpArt', name:'欧普艺术', desc:'光学幻觉线条，动感视幻', accent:'#8b2fc9', bg:'#fbf8fd', icon:'blur_circular',
    svg1:`<circle cx="30" cy="30" r="4" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.8"/><circle cx="30" cy="30" r="10" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.65"/><circle cx="30" cy="30" r="16" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.5"/><circle cx="30" cy="30" r="22" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.35"/><circle cx="30" cy="30" r="28" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.2"/>`,
    svg2:`<circle cx="30" cy="30" r="8" stroke="{a}" strokeWidth="0.4" fill="none" opacity="0.3"/><circle cx="30" cy="30" r="18" stroke="{a}" strokeWidth="0.4" fill="none" opacity="0.2"/><circle cx="30" cy="30" r="28" stroke="{a}" strokeWidth="0.4" fill="none" opacity="0.1"/>`,
    titleDeco:`width: 40, height: 40, borderRadius: '50%', border: '2px solid ' + accentColor`, cardBorder:`'1px solid rgba(' + rgb + ',0.12)'`, cardRadius:16, numStyle:'circle' },
  { id:'lineArtInkWash', name:'水墨渲染', desc:'水墨晕染效果，东方意境', accent:'#2c2c2c', bg:'#faf9f6', icon:'brush',
    svg1:`<ellipse cx="30" cy="30" rx="25" ry="20" fill="{a}" opacity="0.04"/><ellipse cx="25" cy="25" rx="15" ry="12" fill="{a}" opacity="0.06"/><path d="M10 40 Q25 20 40 35 Q50 45 55 30" stroke="{a}" strokeWidth="1" fill="none" opacity="0.5"/>`,
    svg2:`<ellipse cx="30" cy="30" rx="20" ry="15" fill="{a}" opacity="0.03"/><path d="M10 35 Q30 15 50 40" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.25"/>`,
    titleDeco:`width: 48, height: 2, background: 'linear-gradient(90deg, ' + accentColor + ', transparent)'`, cardBorder:`'1px solid rgba(' + rgb + ',0.1)'`, cardRadius:4, numStyle:'line' },
  { id:'lineArtCalligraphy', name:'书法笔触', desc:'毛笔书法线条，气韵生动', accent:'#b22222', bg:'#fdf8f4', icon:'gesture',
    svg1:`<path d="M5 15 Q15 5 30 12 Q45 5 55 18" stroke="{a}" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M10 30 Q25 25 40 32 Q50 35 55 28" stroke="{a}" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round"/>`,
    svg2:`<path d="M5 20 Q20 10 35 22 Q50 30 55 18" stroke="{a}" strokeWidth="1.5" fill="none" opacity="0.25" strokeLinecap="round"/>`,
    titleDeco:`width: 48, height: 3, background: accentColor, borderRadius: '0 2px 2px 0'`, cardBorder:`'1px solid rgba(' + rgb + ',0.12)'`, cardRadius:2, numStyle:'line' },
  { id:'lineArtBamboo', name:'竹节清韵', desc:'竹节线条装饰，清雅脱俗', accent:'#4a7c59', bg:'#f8faf7', icon:'park',
    svg1:`<line x1="20" y1="0" x2="20" y2="60" stroke="{a}" strokeWidth="1.5"/><line x1="20" y1="15" x2="20" y2="15" stroke="{a}" strokeWidth="3" strokeLinecap="round"/><line x1="20" y1="35" x2="20" y2="35" stroke="{a}" strokeWidth="3" strokeLinecap="round"/><path d="M20 15 Q30 10 40 5" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.5"/><path d="M20 35 Q10 30 5 20" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.5"/>`,
    svg2:`<line x1="30" y1="0" x2="30" y2="60" stroke="{a}" strokeWidth="1" opacity="0.25"/><line x1="30" y1="20" x2="30" y2="20" stroke="{a}" strokeWidth="2" strokeLinecap="round" opacity="0.25"/>`,
    titleDeco:`width: 3, height: 48, background: accentColor, borderRadius: 2`, cardBorder:`'1px solid rgba(' + rgb + ',0.12)'`, cardRadius:2, numStyle:'line' },
  { id:'lineArtLandscape', name:'远山淡影', desc:'淡远山形轮廓，空灵悠远', accent:'#6b8fa3', bg:'#f8fafb', icon:'landscape',
    svg1:`<path d="M0 50 Q15 20 30 35 Q45 15 60 50" stroke="{a}" strokeWidth="1" fill="none" opacity="0.5"/><path d="M0 55 Q20 30 35 40 Q50 25 60 55" stroke="{a}" strokeWidth="0.7" fill="none" opacity="0.3"/>`,
    svg2:`<path d="M0 40 Q20 15 40 35 Q55 20 60 40" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.2"/>`,
    titleDeco:`width: 48, height: 2, background: 'linear-gradient(90deg, transparent, ' + accentColor + ')'`, cardBorder:`'1px solid rgba(' + rgb + ',0.12)'`, cardRadius:4, numStyle:'line' },
  { id:'lineArtCoral', name:'珊瑚暖调', desc:'珊瑚色温暖线条，柔美亲和', accent:'#e07a5f', bg:'#fef9f7', icon:'coral',
    svg1:`<circle cx="20" cy="20" r="12" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.4"/><circle cx="40" cy="35" r="8" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.3"/><path d="M20 32 Q30 28 40 35" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.5"/>`,
    svg2:`<circle cx="30" cy="30" r="15" stroke="{a}" strokeWidth="0.5" fill="none" opacity="0.2"/>`,
    titleDeco:`width: 40, height: 40, borderRadius: '50%', border: '2px solid ' + accentColor`, cardBorder:`'1px solid rgba(' + rgb + ',0.12)'`, cardRadius:16, numStyle:'circle' },
  { id:'lineArtSapphire', name:'蓝宝石', desc:'蓝宝石深邃线条，沉稳高贵', accent:'#0f52ba', bg:'#f7f9fc', icon:'diamond',
    svg1:`<polygon points="30,4 54,20 54,44 30,58 6,44 6,20" stroke="{a}" strokeWidth="1" fill="none"/><polygon points="30,14 44,24 44,40 30,48 16,40 16,24" stroke="{a}" strokeWidth="0.5" fill="none" opacity="0.5"/>`,
    svg2:`<polygon points="30,8 52,22 52,42 30,56 8,42 8,22" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.2"/>`,
    titleDeco:`width: 40, height: 40, border: '2px solid ' + accentColor, transform: 'rotate(45deg)'`, cardBorder:`'1px solid rgba(' + rgb + ',0.12)'`, cardRadius:4, numStyle:'square' },
  { id:'lineArtAmethyst', name:'紫水晶', desc:'紫水晶神秘线条，优雅神秘', accent:'#7b5ea7', bg:'#faf7fc', icon:'auto_awesome',
    svg1:`<polygon points="30,8 48,22 42,46 18,46 12,22" stroke="{a}" strokeWidth="1" fill="none"/><polygon points="30,16 40,24 36,40 24,40 20,24" stroke="{a}" strokeWidth="0.5" fill="none" opacity="0.5"/><polygon points="30,24 34,28 32,36 28,36 26,28" stroke="{a}" strokeWidth="0.3" fill="none" opacity="0.3"/>`,
    svg2:`<polygon points="30,10 48,25 42,45 18,45 12,25" stroke="{a}" strokeWidth="0.5" fill="none" opacity="0.2"/>`,
    titleDeco:`width: 40, height: 40, border: '2px solid ' + accentColor, transform: 'rotate(45deg)'`, cardBorder:`'1px solid rgba(' + rgb + ',0.12)'`, cardRadius:8, numStyle:'square' },
  { id:'lineArtTopaz', name:'托帕石', desc:'托帕石金色线条，温暖明亮', accent:'#c7852e', bg:'#fdfaf5', icon:'wb_sunny',
    svg1:`<polygon points="30,4 38,22 58,24 42,38 46,58 30,48 14,58 18,38 2,24 22,22" stroke="{a}" strokeWidth="1" fill="none"/><polygon points="30,16 34,26 44,27 36,34 38,44 30,39 22,44 24,34 16,27 26,26" stroke="{a}" strokeWidth="0.4" fill="none" opacity="0.5"/>`,
    svg2:`<polygon points="30,8 36,22 52,24 40,34 42,50 30,42 18,50 20,34 8,24 24,22" stroke="{a}" strokeWidth="0.5" fill="none" opacity="0.2"/>`,
    titleDeco:`width: 48, height: 3, background: accentColor`, cardBorder:`'1px solid rgba(' + rgb + ',0.15)'`, cardRadius:2, numStyle:'square' },
  { id:'lineArtTerracotta', name:'陶土暖意', desc:'陶土色质朴线条，温暖自然', accent:'#c4623a', bg:'#fdf8f5', icon:'architecture',
    svg1:`<rect x="8" y="8" width="44" height="44" stroke="{a}" strokeWidth="1" fill="none" rx="2"/><line x1="8" y1="30" x2="52" y2="30" stroke="{a}" strokeWidth="0.6" opacity="0.5"/><line x1="30" y1="8" x2="30" y2="52" stroke="{a}" strokeWidth="0.6" opacity="0.5"/><circle cx="30" cy="30" r="8" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.4"/>`,
    svg2:`<rect x="10" y="10" width="40" height="40" stroke="{a}" strokeWidth="0.5" fill="none" opacity="0.2" rx="2"/>`,
    titleDeco:`width: 48, height: 3, background: accentColor`, cardBorder:`'1px solid rgba(' + rgb + ',0.12)'`, cardRadius:2, numStyle:'square' },
  { id:'lineArtSage', name:'鼠尾草绿', desc:'鼠尾草绿柔线条，清新治愈', accent:'#7d9b76', bg:'#f8faf7', icon:'eco',
    svg1:`<path d="M30 8 Q40 16 40 30 Q40 44 30 52 Q20 44 20 30 Q20 16 30 8" stroke="{a}" strokeWidth="1" fill="none"/><line x1="30" y1="20" x2="30" y2="52" stroke="{a}" strokeWidth="0.8" opacity="0.5"/><path d="M30 28 Q38 24 42 20" stroke="{a}" strokeWidth="0.6" fill="none" opacity="0.4"/>`,
    svg2:`<path d="M30 12 Q36 20 36 30 Q36 40 30 48" stroke="{a}" strokeWidth="0.5" fill="none" opacity="0.2"/>`,
    titleDeco:`width: 48, height: 2, background: accentColor, borderRadius: 1`, cardBorder:`'1px solid rgba(' + rgb + ',0.12)'`, cardRadius:12, numStyle:'circle' },
  { id:'lineArtSlate', name:'石板灰调', desc:'石板灰冷峻线条，理性克制', accent:'#5a6570', bg:'#f9fafb', icon:'layers',
    svg1:`<rect x="4" y="4" width="52" height="16" stroke="{a}" strokeWidth="0.8" fill="none"/><rect x="4" y="24" width="52" height="16" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.6"/><rect x="4" y="44" width="52" height="12" stroke="{a}" strokeWidth="0.8" fill="none" opacity="0.3"/>`,
    svg2:`<line x1="4" y1="10" x2="56" y2="10" stroke="{a}" strokeWidth="0.4" opacity="0.25"/><line x1="4" y1="30" x2="56" y2="30" stroke="{a}" strokeWidth="0.4" opacity="0.15"/><line x1="4" y1="50" x2="56" y2="50" stroke="{a}" strokeWidth="0.4" opacity="0.1"/>`,
    titleDeco:`width: 48, height: 2, background: accentColor`, cardBorder:`'1px solid rgba(' + rgb + ',0.12)'`, cardRadius:2, numStyle:'line' },
  { id:'lineArtOrchid', name:'兰花紫韵', desc:'兰花紫优雅线条，高贵淡雅', accent:'#9b6b9e', bg:'#faf7fb', icon:'local_florist',
    svg1:`<path d="M30 10 Q45 15 45 30 Q45 45 30 50 Q15 45 15 30 Q15 15 30 10" stroke="{a}" strokeWidth="0.8" fill="none"/><path d="M30 20 Q38 22 38 30 Q38 38 30 40 Q22 38 22 30 Q22 22 30 20" stroke="{a}" strokeWidth="0.5" fill="none" opacity="0.5"/><circle cx="30" cy="30" r="3" fill="{a}" opacity="0.3"/>`,
    svg2:`<path d="M30 15 Q40 20 40 30 Q40 40 30 45" stroke="{a}" strokeWidth="0.4" fill="none" opacity="0.2"/>`,
    titleDeco:`width: 40, height: 40, borderRadius: '50%', border: '2px solid ' + accentColor`, cardBorder:`'1px solid rgba(' + rgb + ',0.12)'`, cardRadius:16, numStyle:'circle' },
  { id:'lineArtCedar', name:'雪松棕调', desc:'雪松棕沉稳线条，厚重可靠', accent:'#6b4e3d', bg:'#faf8f5', icon:'forest',
    svg1:`<polygon points="30,4 50,28 46,56 14,56 10,28" stroke="{a}" strokeWidth="1" fill="none"/><line x1="30" y1="4" x2="30" y2="56" stroke="{a}" strokeWidth="0.5" opacity="0.4"/><line x1="10" y1="28" x2="50" y2="28" stroke="{a}" strokeWidth="0.5" opacity="0.4"/>`,
    svg2:`<polygon points="30,10 45,28 42,50 18,50 15,28" stroke="{a}" strokeWidth="0.5" fill="none" opacity="0.2"/>`,
    titleDeco:`width: 48, height: 3, background: accentColor`, cardBorder:`'1px solid rgba(' + rgb + ',0.12)'`, cardRadius:2, numStyle:'square' },
  { id:'lineArtIndigo', name:'靛蓝深邃', desc:'靛蓝深邃线条，沉静内敛', accent:'#2e4a7a', bg:'#f7f9fc', icon:'nightlight',
    svg1:`<circle cx="30" cy="30" r="24" stroke="{a}" strokeWidth="0.8" fill="none"/><circle cx="30" cy="30" r="16" stroke="{a}" strokeWidth="0.5" fill="none" opacity="0.5"/><circle cx="30" cy="30" r="8" fill="{a}" opacity="0.1"/><line x1="30" y1="2" x2="30" y2="58" stroke="{a}" strokeWidth="0.3" opacity="0.3"/>`,
    svg2:`<circle cx="30" cy="30" r="20" stroke="{a}" strokeWidth="0.4" fill="none" opacity="0.15"/>`,
    titleDeco:`width: 40, height: 40, borderRadius: '50%', border: '2px solid ' + accentColor`, cardBorder:`'1px solid rgba(' + rgb + ',0.12)'`, cardRadius:8, numStyle:'circle' },
  { id:'lineArtRose', name:'玫瑰金韵', desc:'玫瑰金精致线条，柔美奢华', accent:'#b76e79', bg:'#fdf8f9', icon:'favorite',
    svg1:`<path d="M30 12 Q42 8 46 20 Q50 32 38 38 Q30 42 22 38 Q10 32 14 20 Q18 8 30 12" stroke="{a}" strokeWidth="1" fill="none"/><circle cx="30" cy="26" r="6" stroke="{a}" strokeWidth="0.5" fill="none" opacity="0.4"/>`,
    svg2:`<path d="M30 16 Q38 14 40 22 Q42 30 34 34 Q30 36 26 34 Q18 30 20 22 Q22 14 30 16" stroke="{a}" strokeWidth="0.4" fill="none" opacity="0.2"/>`,
    titleDeco:`width: 40, height: 40, borderRadius: '50%', border: '2px solid ' + accentColor`, cardBorder:`'1px solid rgba(' + rgb + ',0.12)'`, cardRadius:20, numStyle:'circle' },
];

function genContent(t) {
  const compName = t.id.charAt(0).toUpperCase() + t.id.slice(1);
  const rgb = hexToRgb(t.accent);
  const a = t.accent;
  const svg1 = t.svg1.replace(/\{a\}/g, a);
  const svg2 = t.svg2.replace(/\{a\}/g, a);
  const numStyleCode = t.numStyle === 'circle'
    ? "width: 28, height: 28, borderRadius: '50%', border: '2px solid ' + accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center'"
    : t.numStyle === 'square'
    ? "width: 28, height: 28, border: '2px solid ' + accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center'"
    : "width: 32, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'flex-start'";

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
    "        <div style={{ position: 'absolute', top: 20, right: 40, opacity: 0.18 }}>\n" +
    "          <svg width=\"64\" height=\"64\" viewBox=\"0 0 64 64\" fill=\"none\">\n" +
    "            " + svg1 + "\n" +
    "          </svg>\n" +
    "        </div>\n" +
    "        <div style={{ position: 'absolute', bottom: 30, left: 40, opacity: 0.12 }}>\n" +
    "          <svg width=\"64\" height=\"64\" viewBox=\"0 0 64 64\" fill=\"none\">\n" +
    "            " + svg2 + "\n" +
    "          </svg>\n" +
    "        </div>\n" +
    "        <div style={{ marginBottom: topMargin, display: 'flex', alignItems: 'center', gap: 16 }}>\n" +
    "          <div style={{ " + t.titleDeco + ", flexShrink: 0 }} />\n" +
    "          <h1 ref={titleRef} style={{ fontSize: isSingleCard ? '80px' : (titleConfig.initialFontSize + 10) + 'px', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, color: '#111122', margin: 0 }}>{data.mainTitle}</h1>\n" +
    "        </div>\n" +
    "        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: gridGap, alignItems: 'start' }}>\n" +
    "          {data.cards.slice(0, N).map((card, i) => (\n" +
    "            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: cardPadding, background: '#FFFFFF', borderRadius: " + t.cardRadius + ", boxShadow: '0 1px 4px rgba(" + rgb + ",0.06)', border: " + t.cardBorder + " }}>\n" +
    "              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>\n" +
    "                <div style={{ " + numStyleCode + " }}>\n" +
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

// Generate content templates
const contentDir = path.join(BASE, 'src', 'templates', 'minimal-line');
CT.forEach(t => {
  fs.writeFileSync(path.join(contentDir, t.id + '.tsx'), genContent(t), 'utf8');
  console.log('Created: ' + t.id + '.tsx');
});

console.log('\nDone! Created ' + CT.length + ' unique content templates with distinct decorations.');
