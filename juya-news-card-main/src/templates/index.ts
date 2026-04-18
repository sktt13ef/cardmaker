import { TemplateMap, TemplateConfig } from './types';

// 已有主题 (5个)
import { newsCardTemplate } from './newsCard';
import { appleEventTemplate } from './appleEvent';
import { googleMaterialTemplate } from './googleMaterial';
import { blogGlassTemplate } from './blogGlass';
import { microsoftFluentTemplate } from './microsoftFluent';

// A类：产品级设计语言 (11个)
import { ibmCarbonTemplate } from './ibmCarbon';
import { salesforceLightningTemplate } from './salesforceLightning';
import { atlassianDesignTemplate } from './atlassianDesign';
import { shopifyPolarisTemplate } from './shopifyPolaris';
import { sapFioriTemplate } from './sapFiori';
import { adobeSpectrumTemplate } from './adobeSpectrum';
import { githubPrimerTemplate } from './githubPrimer';
import { antDesignTemplate } from './antDesign';
import { bootstrapTemplate } from './bootstrap';
import { tailwindCssTemplate } from './tailwindCss';
import { govukDesignTemplate } from './govukDesign';

// B1类：UI材质与界面审美 (5个)
import { flatDesignTemplate } from './flatDesign';
import { skeuomorphismTemplate } from './skeuomorphism';
import { neumorphismTemplate } from './neumorphism';
import { brutalismTemplate } from './brutalism';
import { glassmorphismTemplate } from './glassmorphism';

// B2类：视觉与材质 (6个)
import { swissStyleTemplate } from './swissStyle';
import { bauhausTemplate } from './bauhaus';
import { memphisTemplate } from './memphis';
import { minimalismTemplate } from './minimalism';
import { auroraTemplate } from './aurora';
import { claymorphismTemplate } from './claymorphism';

// B3类：复古与时代感 (5个)
import { y2kStyleTemplate } from './y2kStyle';
import { vaporwaveTemplate } from './vaporwave';
import { pixelArtTemplate } from './pixelArt';
import { terminalCliTemplate } from './terminalCli';
import { synthwaveTemplate } from './synthwave';

// B4类：排版与信息表达 (2个)
import { editorialMagazineTemplate } from './editorialMagazine';
import { wireframeTemplate } from './wireframe';

// C类：流行趋势类 (4个) - 新增
import { neoBrutalismTemplate } from './neoBrutalism';
import { bentoGridTemplate } from './bentoGrid';
import { kawaiiCuteTemplate } from './kawaiiCute';
import { grainNoiseTemplate } from './grainNoise';

// D类：科技未来类 (4个) - 新增
import { holographicIridescentTemplate } from './holographicIridescent';
import { liquidBlobmorphismTemplate } from './liquidBlobmorphism';
import { sciFiHudTemplate } from './sciFiHud';
import { generativeParametricTemplate } from './generativeParametric';

// E类：复古怀旧类 (4个) - 新增
import { frutigerAeroTemplate } from './frutigerAero';
import { aquaGlossyTemplate } from './aquaGlossy';
import { retroWin95Template } from './retroWin95';
import { web1GeocitiesTemplate } from './web1Geocities';

// F类：其他风格 (4个) - 新增
import { swissPunkTemplate } from './swissPunk';
import { warmCardTemplate } from './warmCard';
import { claudeStyleTemplate } from './claudeStyle';
import { collageScrapbookTemplate } from './collageScrapbook';
import { outlineStrokeTemplate } from './outlineStroke';
import { hyperMinimalTemplate } from './hyperMinimal';
import { springFestivalStyleTemplate } from './springFestival';

// 极简线条模板 - 8个
import { lineFineTemplate } from './minimal-line/lineFine';
import { lineDashedTemplate } from './minimal-line/lineDashed';
import { lineCornerTemplate } from './minimal-line/lineCorner';
import { lineOrbitTemplate } from './minimal-line/lineOrbit';
import { lineFlowTemplate } from './minimal-line/lineFlow';
import { lineGridTemplate } from './minimal-line/lineGrid';
import { lineCrossTemplate } from './minimal-line/lineCross';
import { lineParallelTemplate } from './minimal-line/lineParallel';

// 极简线条模板 - 新增10个
import { lineDiamond } from './minimal-line/lineDiamond';
import { lineSpiral } from './minimal-line/lineSpiral';
import { lineRadiant } from './minimal-line/lineRadiant';
import { lineMountain } from './minimal-line/lineMountain';
import { lineDotline } from './minimal-line/lineDotline';
import { lineWavecut } from './minimal-line/lineWavecut';
import { lineFrameArt } from './minimal-line/lineFrame';
import { lineDotmatrix } from './minimal-line/lineDotmatrix';
import { lineDashflow } from './minimal-line/lineDashflow';
import { lineZigzag } from './minimal-line/lineZigzag';

// 极简线条GLM版 - 30个
import { lineArtMondrian } from './minimal-line/lineArtMondrian';
import { lineArtKandinsky } from './minimal-line/lineArtKandinsky';
import { lineArtMartin } from './minimal-line/lineArtMartin';
import { lineArtRiley } from './minimal-line/lineArtRiley';
import { lineArtNewman } from './minimal-line/lineArtNewman';
import { lineArtStella } from './minimal-line/lineArtStella';
import { lineArtKusama } from './minimal-line/lineArtKusama';
import { lineArtKlee } from './minimal-line/lineArtKlee';
import { lineArtMiro } from './minimal-line/lineArtMiro';
import { lineArtArp } from './minimal-line/lineArtArp';
import { lineArtDeco } from './minimal-line/lineArtDeco';
import { lineArtNouveau } from './minimal-line/lineArtNouveau';
import { lineArtConstruct } from './minimal-line/lineArtConstruct';
import { lineArtDeStijl } from './minimal-line/lineArtDeStijl';
import { lineArtOpArt } from './minimal-line/lineArtOpArt';
import { lineArtInkWash } from './minimal-line/lineArtInkWash';
import { lineArtCalligraphy } from './minimal-line/lineArtCalligraphy';
import { lineArtBamboo } from './minimal-line/lineArtBamboo';
import { lineArtLandscape } from './minimal-line/lineArtLandscape';
import { lineArtCoral } from './minimal-line/lineArtCoral';
import { lineArtSapphire } from './minimal-line/lineArtSapphire';
import { lineArtAmethyst } from './minimal-line/lineArtAmethyst';
import { lineArtTopaz } from './minimal-line/lineArtTopaz';
import { lineArtTerracotta } from './minimal-line/lineArtTerracotta';
import { lineArtSage } from './minimal-line/lineArtSage';
import { lineArtSlate } from './minimal-line/lineArtSlate';
import { lineArtOrchid } from './minimal-line/lineArtOrchid';
import { lineArtCedar } from './minimal-line/lineArtCedar';
import { lineArtIndigo } from './minimal-line/lineArtIndigo';
import { lineArtRose } from './minimal-line/lineArtRose';

// 极简线条封面 - 30个
import { coverLineMinimal } from './minimal-line-cover/coverLineMinimal';
import { coverLineElegant } from './minimal-line-cover/coverLineElegant';
import { coverLineBold } from './minimal-line-cover/coverLineBold';
import { coverLineCenter } from './minimal-line-cover/coverLineCenter';
import { coverLineLeft } from './minimal-line-cover/coverLineLeft';
import { coverLineSplit } from './minimal-line-cover/coverLineSplit';
import { coverLineFrame } from './minimal-line-cover/coverLineFrame';
import { coverLineDiamond } from './minimal-line-cover/coverLineDiamond';
import { coverLineCircle } from './minimal-line-cover/coverLineCircle';
import { coverLineWave } from './minimal-line-cover/coverLineWave';
import { coverLineMountain } from './minimal-line-cover/coverLineMountain';
import { coverLineZigzag } from './minimal-line-cover/coverLineZigzag';
import { coverLineDot } from './minimal-line-cover/coverLineDot';
import { coverLineDash } from './minimal-line-cover/coverLineDash';
import { coverLineCross } from './minimal-line-cover/coverLineCross';
import { coverLineSpiral } from './minimal-line-cover/coverLineSpiral';
import { coverLineRadiant } from './minimal-line-cover/coverLineRadiant';
import { coverLineParallel } from './minimal-line-cover/coverLineParallel';
import { coverLineGrid } from './minimal-line-cover/coverLineGrid';
import { coverLineFlow } from './minimal-line-cover/coverLineFlow';
import { coverLineOrbit } from './minimal-line-cover/coverLineOrbit';
import { coverLineCorner } from './minimal-line-cover/coverLineCorner';
import { coverLineNouveau } from './minimal-line-cover/coverLineNouveau';
import { coverLineDeco } from './minimal-line-cover/coverLineDeco';
import { coverLineInk } from './minimal-line-cover/coverLineInk';
import { coverLineCalligraphy } from './minimal-line-cover/coverLineCalligraphy';
import { coverLineBamboo } from './minimal-line-cover/coverLineBamboo';
import { coverLineCoral } from './minimal-line-cover/coverLineCoral';
import { coverLineSapphire } from './minimal-line-cover/coverLineSapphire';
import { coverLineRose } from './minimal-line-cover/coverLineRose';

// 极简线条GLM版 - 30个
// 极简线条封面 - 30个
// 极简线条GLM版 - 30个
// 极简线条封面 - 30个
// 极简线条GLM版 - 30个
// 极简线条封面 - 30个
// 简约线条模板
import { lineMinimalTemplate } from './lineMinimal';
import { lineGridCardTemplate } from './lineGridCard';
import { lineFrameTemplate } from './lineFrame';
import { lineAccentTemplate } from './lineAccent';
import { lineBoxTemplate } from './lineBox';
import { lineDividerTemplate } from './lineDivider';

// G1类：摄影与视觉叙事 (5个) - 新增
import { cinematicFilmTemplate } from './cinematicFilm';
import { filmGrainAnalogTemplate } from './filmGrainAnalog';
import { blackWhiteEditorialTemplate } from './blackWhiteEditorial';
import { highLowKeyTemplate } from './highLowKey';
import { duotonePhotographyTemplate } from './duotonePhotography';

// G2类：字体与排版语言 (5个) - 新增
import { serifClassicTemplate } from './serifClassic';
import { variableTypographyTemplate } from './variableTypography';
import { expressiveTypeTemplate } from './expressiveType';
import { monospaceLedTemplate } from './monospaceLed';
import { gridPosterTemplate } from './gridPoster';

// G3类：交互与动效 (4个) - 新增
import { microInteractionTemplate } from './microInteraction';
import { scrollStoryTemplate } from './scrollStory';
import { skeuomorphicMotionTemplate } from './skeuomorphicMotion';
import { motionBrandingTemplate } from './motionBranding';

// G4类：3D与空间 (5个) - 新增
import { render3DTemplate } from './3dProductRender';
import { lowPoly3DTemplate } from './lowPoly3d';
import { isometric3DTemplate } from './isometric3D';
import { claySoft3DTemplate } from './claySoft3d';
import { vector3DTemplate } from './vector3d';

// G5类：图形与装饰 (5个) - 新增
import { patternDrivenTemplate } from './patternDriven';
import { geometricMinimalTemplate } from './geometricMinimal';
import { risographTemplate } from './risograph';
import { halftoneComicTemplate } from './halftoneComic';
import { stickerBombTemplate } from './stickerBomb';

// G6类：信息密度 (4个) - 新增
import { denseProductivityTemplate } from './denseProductivity';
import { whitespaceLuxuryTemplate } from './whitespaceLuxury';
import { cardFirstTemplate } from './cardFirst';
import { onePageHeroTemplate } from './onePageHero';

// H1类：操作系统UI历史 - 1980s-1990s 早期 GUI (8个) - 新增
import { amigaWorkbenchTemplate } from './amigaWorkbench';
import { motifChiseledTemplate } from './motifChiseled';
import { nextstepTemplate } from './nextstep';
import { cdeDesktopTemplate } from './cdeDesktop';
import { windows95Template } from './windows95';
import { beosTemplate } from './beos';
import { palmOsTemplate } from './palmOs';
import { os2WarpTemplate } from './os2Warp';

// H2类：操作系统UI历史 - 拟物化时代 (2个) - 新增
import { system7MacTemplate } from './system7Mac';
import { windowsXpLunaTemplate } from './windowsXpLuna';

// H3类：操作系统UI历史 - 玻璃感与卡片 (2个) - 新增
import { vistaAeroTemplate } from './vistaAero';
import { webosCardsTemplate } from './webosCards';

// H4类：操作系统UI历史 - 排版极简 (4个) - 新增
import { metroModernTemplate } from './metroModern';
import { gnome3AdwaitaTemplate } from './gnome3Adwaita';
import { androidHoloTemplate } from './androidHolo';
import { windows8StartTemplate } from './windows8Start';

// H5类：操作系统UI历史 - 扁平化成熟期 (3个) - 新增
import { ios7FlatTemplate } from './ios7Flat';
import { yosemiteFlatTemplate } from './yosemiteFlat';
import { breezeFlatTemplate } from './breezeFlat';

// H6类：操作系统UI历史 - 现代设计 (5个) - 新增
import { materialYouTemplate } from './materialYou';
import { windows11Template } from './windows11';
import { chromeosMaterialYouTemplate } from './chromeosMaterialYou';
import { liquidGlassTemplate } from './liquidGlass';
import { material3ExpressiveTemplate } from './material3Expressive';

// I类：建筑与空间设计 (5个) - 新增
import { wabiSabiTemplate } from './wabiSabi';
import { japandiTemplate } from './japandi';
import { midCenturyModernTemplate } from './midCenturyModern';
import { biophilicDesignTemplate } from './biophilicDesign';
import { deconstructivismTemplate } from './deconstructivism';

// J类：工业设计与产品家族 (4个) - 新增
import { braunFunctionalTemplate } from './braunFunctional';
import { mujiAnonymousTemplate } from './mujiAnonymous';
import { modularRepairableTemplate } from './modularRepairable';
import { materialHonestyTemplate } from './materialHonesty';

// K类：品牌识别系统 (3个) - 新增
import { dynamicIdentityTemplate } from './dynamicIdentity';
import { monogramSignatureTemplate } from './monogramSignature';
import { pictogramLanguageTemplate } from './pictogramLanguage';

// L类：信息设计与导视系统 (3个) - 新增
import { wayfindingSignageTemplate } from './wayfindingSignage';
import { transitMapAbstractTemplate } from './transitMapAbstract';
import { instructionalManualTemplate } from './instructionalManual';

// M类：服务设计 (4个) - 新增
import { serviceBlueprintTemplate } from './serviceBlueprint';
import { inclusiveDesignTemplate } from './inclusiveDesign';
import { behavioralNudgeTemplate } from './behavioralNudge';
import { calmTechnologyTemplate } from './calmTechnology';

// N类：交互形态 (3个) - 新增
import { tangibleUiTemplate } from './tangibleUi';
import { spatialXrUiTemplate } from './spatialXrUi';
import { ambientUiTemplate } from './ambientUi';

// O类：中国绘画体系 (10个) - 新增
import { gongbiStyleTemplate } from './gongbiStyle';
import { baimiaoStyleTemplate } from './baimiaoStyle';
import { xieyiStyleTemplate } from './xieyiStyle';
import { pomoStyleTemplate } from './pomoStyle';
import { moguStyleTemplate } from './moguStyle';
import { inkLandscapeTemplate } from './inkLandscape';
import { blueGreenLandscapeTemplate } from './blueGreenLandscape';
import { flowerBirdTemplate } from './flowerBird';
import { woodblockPrintTemplate } from './woodblockPrint';
import { paperCutTemplate } from './paperCut';

// P类：日本美术体系 (4个) - 新增
import { ukiyoPrintTemplate } from './ukiyoPrint';
import { rinpaSchoolTemplate } from './rinpaSchool';
import { sumiStyleTemplate } from './sumiStyle';
import { japaneseFolkTemplate } from './japaneseFolk';

// Q类：西方绘画体系 (8个) - 新增
import { impressionismTemplate } from './impressionism';
import { pointillismTemplate } from './pointillism';
import { fauvismTemplate } from './fauvism';
import { expressionismTemplate } from './expressionism';
import { cubismTemplate } from './cubism';
import { surrealismTemplate } from './surrealism';
import { abstractArtTemplate } from './abstractArt';
import { popArtTemplate } from './popArt';

// R类：版画与插画技法 (9个) - 新增
import { woodcutStyleTemplate } from './woodcutStyle';
import { etchingStyleTemplate } from './etchingStyle';
import { silkscreenStyleTemplate } from './silkscreenStyle';
import { lineIllustrationTemplate } from './lineIllustration';
import { flatVectorTemplate } from './flatVector';
import { painterlyStyleTemplate } from './painterlyStyle';
import { watercolorStyleTemplate } from './watercolorStyle';
import { collageStyleTemplate } from './collageStyle';
import { pixelArtStyleTemplate } from './pixelArtStyle';

// S类：漫画风格 (6个) - 新增
import { cleanLineComicTemplate } from './cleanLineComic';
import { heavyInkTemplate } from './heavyInk';
import { celLookComicTemplate } from './celLookComic';
import { painterlyComicTemplate } from './painterlyComic';
import { chibiStyleTemplate } from './chibiStyle';

// T类：动画风格 - 新增
import { ghibliStyleTemplate } from './ghibliStyle';
import { disneyClassicTemplate } from './disneyClassic';
import { limitedAnimationTemplate } from './limitedAnimation';
import { cartoonModernTemplate } from './cartoonModern';
import { digitalEffectsTemplate } from './digitalEffects';
import { photoRealBgTemplate } from './photoRealBg';
import { compositionExperimentalTemplate } from './compositionExperimental';
import { dynamicExplosionTemplate } from './dynamicExplosion';
import { stopMotionTemplate } from './stopMotion';
import { cutoutAnimationTemplate } from './cutoutAnimation';
import { hybrid2D3DTemplate } from './hybrid2D3D';

// U类：简洁现代风格 - 新增
import { minimalCleanTemplate } from './minimalClean';
import { modernCardTemplate } from './modernCard';
import { grandElegantTemplate } from './grandElegant';

/**
 * 模板注册表
 * 所有可用模板的映射表
 */
export const TEMPLATES: TemplateMap = {
  // 已有主题
  newsCard: newsCardTemplate,
  appleEvent: appleEventTemplate,
  googleMaterial: googleMaterialTemplate,
  blogGlass: blogGlassTemplate,
  microsoftFluent: microsoftFluentTemplate,

  // A类：产品级设计语言
  ibmCarbon: ibmCarbonTemplate,
  salesforceLightning: salesforceLightningTemplate,
  atlassianDesign: atlassianDesignTemplate,
  shopifyPolaris: shopifyPolarisTemplate,
  sapFiori: sapFioriTemplate,
  adobeSpectrum: adobeSpectrumTemplate,
  githubPrimer: githubPrimerTemplate,
  antDesign: antDesignTemplate,
  bootstrap: bootstrapTemplate,
  tailwindCss: tailwindCssTemplate,
  govukDesign: govukDesignTemplate,

  // B1类：UI材质与界面审美
  flatDesign: flatDesignTemplate,
  skeuomorphism: skeuomorphismTemplate,
  neumorphism: neumorphismTemplate,
  brutalism: brutalismTemplate,
  glassmorphism: glassmorphismTemplate,

  // B2类：视觉与材质
  swissStyle: swissStyleTemplate,
  bauhaus: bauhausTemplate,
  memphis: memphisTemplate,
  minimalism: minimalismTemplate,
  aurora: auroraTemplate,
  claymorphism: claymorphismTemplate,

  // B3类：复古与时代感
  y2kStyle: y2kStyleTemplate,
  vaporwave: vaporwaveTemplate,
  pixelArt: pixelArtTemplate,
  terminalCli: terminalCliTemplate,
  synthwave: synthwaveTemplate,

  // B4类：排版与信息表达
  editorialMagazine: editorialMagazineTemplate,
  wireframe: wireframeTemplate,

  // C类：流行趋势类 - 新增
  neoBrutalism: neoBrutalismTemplate,
  bentoGrid: bentoGridTemplate,
  kawaiiCute: kawaiiCuteTemplate,
  grainNoise: grainNoiseTemplate,

  // D类：科技未来类 - 新增
  holographicIridescent: holographicIridescentTemplate,
  liquidBlobmorphism: liquidBlobmorphismTemplate,
  sciFiHud: sciFiHudTemplate,
  generativeParametric: generativeParametricTemplate,

  // E类：复古怀旧类 - 新增
  frutigerAero: frutigerAeroTemplate,
  aquaGlossy: aquaGlossyTemplate,
  retroWin95: retroWin95Template,
  web1Geocities: web1GeocitiesTemplate,

  // F类：其他风格
  swissPunk: swissPunkTemplate,
  warmCard: warmCardTemplate,
  claudeStyle: claudeStyleTemplate,
  springFestivalStyle: springFestivalStyleTemplate,
  collageScrapbook: collageScrapbookTemplate,
  outlineStroke: outlineStrokeTemplate,
  hyperMinimal: hyperMinimalTemplate,

  // G1类：摄影与视觉叙事 - 新增
  cinematicFilm: cinematicFilmTemplate,
  filmGrainAnalog: filmGrainAnalogTemplate,
  blackWhiteEditorial: blackWhiteEditorialTemplate,
  highLowKey: highLowKeyTemplate,
  duotonePhotography: duotonePhotographyTemplate,

  // G2类：字体与排版语言 - 新增
  serifClassic: serifClassicTemplate,
  variableTypography: variableTypographyTemplate,
  expressiveType: expressiveTypeTemplate,
  monospaceLed: monospaceLedTemplate,
  gridPoster: gridPosterTemplate,

  // G3类：交互与动效 - 新增
  microInteraction: microInteractionTemplate,
  scrollStory: scrollStoryTemplate,
  skeuomorphicMotion: skeuomorphicMotionTemplate,
  motionBranding: motionBrandingTemplate,

  // G4类：3D与空间 - 新增
  render3D: render3DTemplate,
  lowPoly3D: lowPoly3DTemplate,
  isometric3D: isometric3DTemplate,
  claySoft3D: claySoft3DTemplate,
  vector3D: vector3DTemplate,

  // G5类：图形与装饰 - 新增
  patternDriven: patternDrivenTemplate,
  geometricMinimal: geometricMinimalTemplate,
  risograph: risographTemplate,
  halftoneComic: halftoneComicTemplate,
  stickerBomb: stickerBombTemplate,

  // G6类：信息密度 - 新增
  denseProductivity: denseProductivityTemplate,
  whitespaceLuxury: whitespaceLuxuryTemplate,
  cardFirst: cardFirstTemplate,
  onePageHero: onePageHeroTemplate,

  // H1类：操作系统UI历史 - 1980s-1990s 早期 GUI - 新增
  amigaWorkbench: amigaWorkbenchTemplate,
  motifChiseled: motifChiseledTemplate,
  nextstep: nextstepTemplate,
  cdeDesktop: cdeDesktopTemplate,
  windows95: windows95Template,
  beos: beosTemplate,
  palmOs: palmOsTemplate,
  os2Warp: os2WarpTemplate,

  // H2类：操作系统UI历史 - 拟物化时代 - 新增
  system7Mac: system7MacTemplate,
  windowsXpLuna: windowsXpLunaTemplate,

  // H3类：操作系统UI历史 - 玻璃感与卡片 - 新增
  vistaAero: vistaAeroTemplate,
  webosCards: webosCardsTemplate,

  // H4类：操作系统UI历史 - 排版极简 - 新增
  metroModern: metroModernTemplate,
  gnome3Adwaita: gnome3AdwaitaTemplate,
  androidHolo: androidHoloTemplate,
  windows8Start: windows8StartTemplate,

  // H5类：操作系统UI历史 - 扁平化成熟期 - 新增
  ios7Flat: ios7FlatTemplate,
  yosemiteFlat: yosemiteFlatTemplate,
  breezeFlat: breezeFlatTemplate,

  // H6类：操作系统UI历史 - 现代设计 - 新增
  materialYou: materialYouTemplate,
  windows11: windows11Template,
  chromeosMaterialYou: chromeosMaterialYouTemplate,
  liquidGlass: liquidGlassTemplate,
  material3Expressive: material3ExpressiveTemplate,

  // I类：建筑与空间设计 - 新增
  wabiSabi: wabiSabiTemplate,
  japandi: japandiTemplate,
  midCenturyModern: midCenturyModernTemplate,
  biophilicDesign: biophilicDesignTemplate,
  deconstructivism: deconstructivismTemplate,

  // J类：工业设计与产品家族 - 新增
  braunFunctional: braunFunctionalTemplate,
  mujiAnonymous: mujiAnonymousTemplate,
  modularRepairable: modularRepairableTemplate,
  materialHonesty: materialHonestyTemplate,

  // K类：品牌识别系统 - 新增
  dynamicIdentity: dynamicIdentityTemplate,
  monogramSignature: monogramSignatureTemplate,
  pictogramLanguage: pictogramLanguageTemplate,

  // L类：信息设计与导视系统 - 新增
  wayfindingSignage: wayfindingSignageTemplate,
  transitMapAbstract: transitMapAbstractTemplate,
  instructionalManual: instructionalManualTemplate,

  // M类：服务设计 - 新增
  serviceBlueprint: serviceBlueprintTemplate,
  inclusiveDesign: inclusiveDesignTemplate,
  behavioralNudge: behavioralNudgeTemplate,
  calmTechnology: calmTechnologyTemplate,

  // N类：交互形态 - 新增
  tangibleUi: tangibleUiTemplate,
  spatialXrUi: spatialXrUiTemplate,
  ambientUi: ambientUiTemplate,

  // O类：中国绘画体系 - 新增
  gongbiStyle: gongbiStyleTemplate,
  baimiaoStyle: baimiaoStyleTemplate,
  xieyiStyle: xieyiStyleTemplate,
  pomoStyle: pomoStyleTemplate,
  moguStyle: moguStyleTemplate,
  inkLandscape: inkLandscapeTemplate,
  blueGreenLandscape: blueGreenLandscapeTemplate,
  flowerBird: flowerBirdTemplate,
  woodblockPrint: woodblockPrintTemplate,
  paperCut: paperCutTemplate,

  // P类：日本美术体系 - 新增
  ukiyoPrint: ukiyoPrintTemplate,
  rinpaSchool: rinpaSchoolTemplate,
  sumiStyle: sumiStyleTemplate,
  japaneseFolk: japaneseFolkTemplate,

  // Q类：西方绘画体系 - 新增
  impressionism: impressionismTemplate,
  pointillism: pointillismTemplate,
  fauvism: fauvismTemplate,
  expressionism: expressionismTemplate,
  cubism: cubismTemplate,
  surrealism: surrealismTemplate,
  abstractArt: abstractArtTemplate,
  popArt: popArtTemplate,

  // R类：版画与插画技法 - 新增
  woodcutStyle: woodcutStyleTemplate,
  etchingStyle: etchingStyleTemplate,
  silkscreenStyle: silkscreenStyleTemplate,
  lineIllustration: lineIllustrationTemplate,
  flatVector: flatVectorTemplate,
  painterlyStyle: painterlyStyleTemplate,
  watercolorStyle: watercolorStyleTemplate,
  collageStyle: collageStyleTemplate,
  pixelArtStyle: pixelArtStyleTemplate,

  // S类：漫画风格 - 新增
  cleanLineComic: cleanLineComicTemplate,
  heavyInk: heavyInkTemplate,
  celLookComic: celLookComicTemplate,
  painterlyComic: painterlyComicTemplate,
  chibiStyle: chibiStyleTemplate,

  // T类：动画风格 - 新增
  ghibliStyle: ghibliStyleTemplate,
  disneyClassic: disneyClassicTemplate,
  limitedAnimation: limitedAnimationTemplate,
  cartoonModern: cartoonModernTemplate,
  digitalEffects: digitalEffectsTemplate,
  photoRealBg: photoRealBgTemplate,
  compositionExperimental: compositionExperimentalTemplate,
  dynamicExplosion: dynamicExplosionTemplate,
  stopMotion: stopMotionTemplate,
  cutoutAnimation: cutoutAnimationTemplate,
  hybrid2D3D: hybrid2D3DTemplate,

  // U类：简洁现代风格 - 新增
  minimalClean: minimalCleanTemplate,
  modernCard: modernCardTemplate,
  grandElegant: grandElegantTemplate,

  // 极简线条模板 - 8个
  lineFine: lineFineTemplate,
  lineDashed: lineDashedTemplate,
  lineCorner: lineCornerTemplate,
  lineOrbit: lineOrbitTemplate,
  lineFlow: lineFlowTemplate,
  lineGrid: lineGridTemplate,
  lineCross: lineCrossTemplate,
  lineParallel: lineParallelTemplate,

  // 极简线条模板 - 新增10个
  lineDiamond: lineDiamond,
  lineSpiral: lineSpiral,
  lineRadiant: lineRadiant,
  lineMountain: lineMountain,
  lineDotline: lineDotline,
  lineWavecut: lineWavecut,
  lineFrameArt: lineFrameArt,
  lineDotmatrix: lineDotmatrix,
  lineDashflow: lineDashflow,
  lineZigzag: lineZigzag,

  // 极简线条GLM版 - 30个
  lineArtMondrian: lineArtMondrian,
  lineArtKandinsky: lineArtKandinsky,
  lineArtMartin: lineArtMartin,
  lineArtRiley: lineArtRiley,
  lineArtNewman: lineArtNewman,
  lineArtStella: lineArtStella,
  lineArtKusama: lineArtKusama,
  lineArtKlee: lineArtKlee,
  lineArtMiro: lineArtMiro,
  lineArtArp: lineArtArp,
  lineArtDeco: lineArtDeco,
  lineArtNouveau: lineArtNouveau,
  lineArtConstruct: lineArtConstruct,
  lineArtDeStijl: lineArtDeStijl,
  lineArtOpArt: lineArtOpArt,
  lineArtInkWash: lineArtInkWash,
  lineArtCalligraphy: lineArtCalligraphy,
  lineArtBamboo: lineArtBamboo,
  lineArtLandscape: lineArtLandscape,
  lineArtCoral: lineArtCoral,
  lineArtSapphire: lineArtSapphire,
  lineArtAmethyst: lineArtAmethyst,
  lineArtTopaz: lineArtTopaz,
  lineArtTerracotta: lineArtTerracotta,
  lineArtSage: lineArtSage,
  lineArtSlate: lineArtSlate,
  lineArtOrchid: lineArtOrchid,
  lineArtCedar: lineArtCedar,
  lineArtIndigo: lineArtIndigo,
  lineArtRose: lineArtRose,

  // 极简线条封面 - 30个
  coverLineMinimal: coverLineMinimal,
  coverLineElegant: coverLineElegant,
  coverLineBold: coverLineBold,
  coverLineCenter: coverLineCenter,
  coverLineLeft: coverLineLeft,
  coverLineSplit: coverLineSplit,
  coverLineFrame: coverLineFrame,
  coverLineDiamond: coverLineDiamond,
  coverLineCircle: coverLineCircle,
  coverLineWave: coverLineWave,
  coverLineMountain: coverLineMountain,
  coverLineZigzag: coverLineZigzag,
  coverLineDot: coverLineDot,
  coverLineDash: coverLineDash,
  coverLineCross: coverLineCross,
  coverLineSpiral: coverLineSpiral,
  coverLineRadiant: coverLineRadiant,
  coverLineParallel: coverLineParallel,
  coverLineGrid: coverLineGrid,
  coverLineFlow: coverLineFlow,
  coverLineOrbit: coverLineOrbit,
  coverLineCorner: coverLineCorner,
  coverLineNouveau: coverLineNouveau,
  coverLineDeco: coverLineDeco,
  coverLineInk: coverLineInk,
  coverLineCalligraphy: coverLineCalligraphy,
  coverLineBamboo: coverLineBamboo,
  coverLineCoral: coverLineCoral,
  coverLineSapphire: coverLineSapphire,
  coverLineRose: coverLineRose,

  // 简约线条模板
  lineMinimal: lineMinimalTemplate,
  lineGridCard: lineGridCardTemplate,
  lineFrame: lineFrameTemplate,
  lineAccent: lineAccentTemplate,
  lineBox: lineBoxTemplate,
  lineDivider: lineDividerTemplate,
};

export { DEFAULT_TEMPLATE } from './catalog';
