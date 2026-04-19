import PptxGenJS from 'pptxgenjs';
import type { TemplateConfig } from '../templates/types';
import type { GeneratedContent } from '../types';
import type { ExportFormat, PngExportStrategy } from './global-settings';
import type { ProgressBarConfig } from '../types/progress-bar';

const SLIDE_WIDTH_INCHES = 10;
const SLIDE_HEIGHT_INCHES = 5.625;

interface PptxExportOptions {
  template: TemplateConfig;
  templateId: string;
  originalContent: GeneratedContent;
  format: ExportFormat;
  strategy: PngExportStrategy;
  scale?: number;
  pixelRatio?: number;
  waitForLayoutMs?: number;
  bottomReservedPx?: number;
  progressBarConfig?: ProgressBarConfig;
  pageProgressBarIndices?: Record<number, { top: number; bottom: number }>;
}

function buildPageContent(
  originalContent: GeneratedContent,
  pageIndex: number,
): GeneratedContent {
  if (pageIndex === 0) {
    return originalContent;
  }
  const detailCards = originalContent.cards.slice(1);
  const detailIndex = pageIndex - 1;
  if (detailIndex >= 0 && detailIndex < detailCards.length) {
    return {
      mainTitle: originalContent.mainTitle,
      cards: [detailCards[detailIndex]],
    };
  }
  return originalContent;
}

function buildProgressBarConfigForPage(
  baseConfig: ProgressBarConfig | undefined,
  pageIndex: number,
  pageProgressBarIndices?: Record<number, { top: number; bottom: number }>,
): ProgressBarConfig | undefined {
  if (!baseConfig) return undefined;
  const savedIndices = pageProgressBarIndices?.[pageIndex] || { top: 0, bottom: 0 };
  return {
    top: { ...baseConfig.top, activeIndex: savedIndices.top },
    bottom: { ...baseConfig.bottom, activeIndex: savedIndices.bottom },
  };
}

async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1] || result;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function exportToPptx(options: PptxExportOptions): Promise<void> {
  const {
    template,
    templateId,
    originalContent,
    format,
    strategy,
    scale = 1,
    waitForLayoutMs = 420,
    bottomReservedPx,
    progressBarConfig,
    pageProgressBarIndices,
  } = options;

  const totalPages = originalContent.cards.length;
  if (totalPages === 0) {
    throw new Error('No cards to export');
  }

  const { executeExport } = await import('./export-strategy');

  const pptx = new PptxGenJS();
  pptx.author = 'Juya News Card';
  pptx.title = originalContent.mainTitle || 'News Card';

  for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
    const pageContent = buildPageContent(originalContent, pageIndex);
    const pageProgressBar = buildProgressBarConfigForPage(
      progressBarConfig,
      pageIndex,
      pageProgressBarIndices,
    );

    const exportResult = await executeExport({
      template,
      templateId,
      data: pageContent,
      format: format === 'svg' ? 'png' : format,
      strategy: progressBarConfig ? 'strict-browser' : strategy,
      scale,
      pixelRatio: 1,
      waitForLayoutMs,
      bottomReservedPx,
      progressBarConfig: pageProgressBar,
    });

    const base64Data = await blobToBase64(exportResult.blob);

    const slide = pptx.addSlide();
    slide.addImage({
      data: `image/png;base64,${base64Data}`,
      x: 0,
      y: 0,
      w: SLIDE_WIDTH_INCHES,
      h: SLIDE_HEIGHT_INCHES,
    });
  }

  const filename = `${templateId}-${Date.now()}.pptx`;
  await pptx.writeFile({ fileName: filename });
}
