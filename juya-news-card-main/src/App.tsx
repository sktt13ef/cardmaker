import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  AutoAwesome,
  Download,
  Refresh,
  Style,
  CheckCircle,
  ChevronRight,
  ContentCopy,
  PlayArrow,
  Tune,
  Image as ImageIcon,
  TextSnippet,
} from '@mui/icons-material';
import { generateCardContent } from './services/openaiService';
import { JSON_SYSTEM_PROMPT, MARKDOWN_SYSTEM_PROMPT } from './services/llm-prompt';
import {
  fetchBackendLlmRuntimeConfig,
  type BackendLlmRuntimeConfig,
} from './services/backend-config-service';
import { GeneratedContent, CardData } from './types';
import Canvas from './components/Canvas';
import GlobalSettingsDrawer from './components/GlobalSettingsDrawer';
import { useExportToast } from './components/ExportToastProvider';
import TemplateSelector from './components/TemplateSelector';
import type { TemplateConfig } from './templates/types';
import {
  DEFAULT_TEMPLATE,
  getTemplateIds,
  getTemplateSummaries,
  loadTemplateConfig,
} from './templates/client-registry';
import { contentToMarkdown, parseMarkdownToContent } from './utils/markdown-content';
import type { AppGlobalSettings } from './utils/global-settings';
import {
  createDefaultGlobalSettings,
  loadGlobalSettings,
  saveGlobalSettings,
} from './utils/global-settings';
import { applyIconMappingToContent } from './utils/icon-resolution';
import { useAppKeyboardShortcuts } from './hooks/use-app-keyboard-shortcuts';
import { useCdnIconList } from './hooks/use-cdn-icon-list';
import mockData from '../tests/mock-data.json';
import ProgressBarSettingsPanel from './components/ProgressBarSettingsPanel';
import CardPageSelector from './components/CardPageSelector';
import { ProgressBarConfig, DEFAULT_PROGRESS_BAR_CONFIG } from './types/progress-bar';
import { md3Colors } from './theme/md3-theme';

const SIDEBAR_WIDTH = 520;
const TEMPLATE_SELECTOR_WIDTH = 320;
const MOCK_SCENARIOS = mockData as GeneratedContent[];
const EXAMPLE_TEXT = `DeepSeek-V3 是一款拥有 6710 亿参数的混合专家（MoE）语言模型，每 token 激活参数为 370 亿。它在高达 14.8 万亿 token 的数据集上进行了训练。在训练过程中，采用多头潜在注意力机制（MLA）来提高推理效率，并利用 DeepSeekMoE 架构进行具有辅助无损负载均衡的训练。
DeepSeek-V3 在多个基准测试中表现出色，性能与某些顶尖的闭源模型相当。在数学代码、长文本处理等领域有显著优势。
该模型现已在 Hugging Face 上开源，允许研究和商业用途（需遵循相关许可证）。开发者还通过其 API 平台提供服务。
成本方面，DeepSeek-V3 仅耗费 278.8 万 H800 GPU 小时，总训练成本约 557.6 万美元，远低于同类顶级模型。`;

const App: React.FC = () => {
  const { showToast } = useExportToast();
  const initialData = null;
  const [inputText, setInputText] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloadingHtml, setDownloadingHtml] = useState(false);
  const [downloadingImage, setDownloadingImage] = useState(false);
  const [copiedJsonPrompt, setCopiedJsonPrompt] = useState(false);
  const [copiedMarkdownPrompt, setCopiedMarkdownPrompt] = useState(false);
  const [data, setData] = useState<GeneratedContent | null>(initialData);
  const [scale, setScale] = useState(0.5);
  const [templateId, setTemplateId] = useState(DEFAULT_TEMPLATE);
  const [currentTemplate, setCurrentTemplate] = useState<TemplateConfig | null>(null);
  const [templateLoadError, setTemplateLoadError] = useState<string | null>(null);
  const [selectedMockIndex, setSelectedMockIndex] = useState<number | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showProgressBarPanel, setShowProgressBarPanel] = useState(true);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [globalSettings, setGlobalSettings] = useState<AppGlobalSettings>(() => loadGlobalSettings());
  const [backendLlmConfig, setBackendLlmConfig] = useState<BackendLlmRuntimeConfig | null>(null);
  const [backendLlmConfigLoading, setBackendLlmConfigLoading] = useState(false);
  const [backendLlmConfigError, setBackendLlmConfigError] = useState<string | null>(null);
  const sourceContentRef = useRef<GeneratedContent | null>(initialData);
  const originalContentRef = useRef<GeneratedContent | null>(initialData);
  const cdnIconList = useCdnIconList(
    Boolean(globalSettings.iconMapping?.enabled),
    globalSettings.iconMapping?.cdnUrl || ''
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [progressBarConfig, setProgressBarConfig] = useState<ProgressBarConfig>(DEFAULT_PROGRESS_BAR_CONFIG);
  const [pageProgressBarIndices, setPageProgressBarIndices] = useState<Record<number, { top: number; bottom: number }>>({});

  const updateGlobalSettings = useCallback((updater: (prev: AppGlobalSettings) => AppGlobalSettings) => {
    setGlobalSettings(prev => saveGlobalSettings(updater(prev)));
  }, []);

  const updateIconMappingSetting = useCallback(<K extends keyof AppGlobalSettings['iconMapping']>(key: K, value: AppGlobalSettings['iconMapping'][K]) => {
    updateGlobalSettings(prev => ({
      ...prev,
      iconMapping: {
        ...prev.iconMapping,
        [key]: value,
      } as AppGlobalSettings['iconMapping'],
    }));
  }, [updateGlobalSettings]);

  const updateApiBaseUrl = useCallback((value: string) => {
    updateGlobalSettings(prev => ({
      ...prev,
      llm: {
        ...prev.llm,
        baseURL: value,
      },
    }));
  }, [updateGlobalSettings]);

  const handleResetGlobalSettings = useCallback(() => {
    const resetSettings = saveGlobalSettings(createDefaultGlobalSettings());
    setGlobalSettings(resetSettings);
  }, []);

  const templateSummaries = useMemo(() => getTemplateSummaries(), []);
  const templateIds = useMemo(() => getTemplateIds(), []);
  const currentTemplateIndex = templateIds.indexOf(templateId);
  const cdnIconSet = useMemo(() => new Set(cdnIconList), [cdnIconList]);

  useEffect(() => {
    let canceled = false;
    setTemplateLoadError(null);
    setCurrentTemplate(null);

    loadTemplateConfig(templateId)
      .then(template => {
        if (canceled) return;
        setCurrentTemplate(template);
      })
      .catch(error => {
        if (canceled) return;
        const message = error instanceof Error ? error.message : String(error);
        console.error(`Failed to load template "${templateId}":`, error);
        setTemplateLoadError(message);
      });

    return () => {
      canceled = true;
    };
  }, [templateId]);

  useEffect(() => {
    setGeneratedText(data ? contentToMarkdown(data) : '');
  }, [data]);

  useEffect(() => {
    let canceled = false;
    setBackendLlmConfigLoading(true);
    setBackendLlmConfigError(null);

    fetchBackendLlmRuntimeConfig(globalSettings.llm.baseURL)
      .then(config => {
        if (canceled) return;
        setBackendLlmConfig(config);
      })
      .catch(error => {
        if (canceled) return;
        const message = error instanceof Error ? error.message : String(error);
        setBackendLlmConfig(null);
        setBackendLlmConfigError(`Failed to load backend config: ${message}`);
      })
      .finally(() => {
        if (canceled) return;
        setBackendLlmConfigLoading(false);
      });

    return () => {
      canceled = true;
    };
  }, [globalSettings.llm.baseURL]);

  const currentTemplateSummary = templateSummaries[templateId];
  const templateDisplayName = currentTemplate?.name || currentTemplateSummary?.name || templateId;
  const canDownloadCurrentTemplate = Boolean(currentTemplate?.downloadable);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth - 48;
        const baseWidth = 1920;
        const newScale = Math.min(availableWidth / baseWidth, 1);
        setScale(newScale);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const resolveIcons = useCallback((content: GeneratedContent | null) => {
    if (!content) return content;
    if (!globalSettings.iconMapping?.enabled) return content;
    return applyIconMappingToContent(content, {
      fallbackIcon: globalSettings.iconMapping.fallbackIcon,
      cdnIcons: cdnIconSet,
    });
  }, [cdnIconSet, globalSettings.iconMapping]);

  const updateContent = useCallback((content: GeneratedContent | null, isOriginal: boolean = true) => {
    sourceContentRef.current = content;
    if (isOriginal && content) {
      originalContentRef.current = content;
    }
    setData(resolveIcons(content));
  }, [resolveIcons]);

  useEffect(() => {
    setData((prev) => {
      const source = sourceContentRef.current;
      const resolved = resolveIcons(source);
      if (!resolved) return source;
      if (!prev) return resolved;
      const changed =
        prev.mainTitle !== resolved.mainTitle ||
        prev.cards.length !== resolved.cards.length ||
        prev.cards.some((card, index) => {
          const next = resolved.cards[index];
          return card.title !== next?.title || card.desc !== next?.desc || card.icon !== next?.icon;
        });
      return changed ? resolved : prev;
    });
  }, [resolveIcons]);

  const handleSelectCardCount = useCallback((count: number, topIndex?: number, bottomIndex?: number) => {
    const sourceData = originalContentRef.current;
    if (!sourceData || sourceData.cards.length === 0) return;
    if (sourceData.cards.length < 2) return;
    const detailCards = sourceData.cards.slice(1);
    let selectedCards: CardData[];
    if (count === 1) {
      selectedCards = sourceData.cards;
    } else {
      const detailIndex = count - 2;
      if (detailIndex >= 0 && detailIndex < detailCards.length) {
        selectedCards = [detailCards[detailIndex]];
      } else {
        selectedCards = [];
      }
    }
    const slicedData: GeneratedContent = {
      mainTitle: sourceData.mainTitle,
      cards: selectedCards
    };
    setSelectedMockIndex(count - 1);
    const pageIndex = count - 1;
    const savedIndices = pageProgressBarIndices[pageIndex] || { top: 0, bottom: 0 };
    setPageProgressBarIndices(prev => ({
      ...prev,
      [pageIndex]: {
        top: topIndex !== undefined ? topIndex : savedIndices.top,
        bottom: bottomIndex !== undefined ? bottomIndex : savedIndices.bottom,
      }
    }));
    setProgressBarConfig(prev => ({
      top: { ...prev.top, activeIndex: topIndex !== undefined ? topIndex : savedIndices.top },
      bottom: { ...prev.bottom, activeIndex: bottomIndex !== undefined ? bottomIndex : savedIndices.bottom },
    }));
    updateContent(slicedData, false);
  }, [updateContent, pageProgressBarIndices]);

  const handleGenerate = useCallback(async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    try {
      const result = await generateCardContent(inputText, { baseURL: globalSettings.llm.baseURL });
      updateContent(result);
      setSelectedMockIndex(null);
    } catch (error) {
      console.error(error);
      alert('Error generating content. Please check backend API settings and try again.');
    } finally {
      setLoading(false);
    }
  }, [globalSettings.llm.baseURL, inputText, updateContent]);

  const triggerGenerate = useCallback(() => {
    void handleGenerate();
  }, [handleGenerate]);

  useAppKeyboardShortcuts({
    templateIds,
    currentTemplateIndex,
    selectedMockIndex,
    mockCount: sourceContentRef.current?.cards.length || 8,
    onTemplateChange: setTemplateId,
    onMockChange: (index) => handleSelectCardCount(index + 1),
    onGenerate: triggerGenerate,
  });

  const handleApply = useCallback(() => {
    if (!generatedText.trim()) return;
    const parsed = parseMarkdownToContent(generatedText);
    if (parsed) {
      updateContent(parsed);
      setSelectedMockIndex(null);
    } else {
      alert('无法解析内容，请检查格式是否正确。');
    }
  }, [generatedText, updateContent]);

  const triggerBlobDownload = useCallback((blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }, []);

  const handleDownload = async () => {
    if (!data) return;
    if (!currentTemplate) {
      showToast('模板仍在加载，请稍后重试。', 'warning');
      return;
    }
    if (!currentTemplate.downloadable) {
      showToast(`"${templateDisplayName}" 模板暂不支持下载。`, 'warning');
      return;
    }
    setDownloadingHtml(true);
    try {
      const { generateDownloadableHtmlFromPreview } = await import('./utils/export-preview-html');
      const html = await generateDownloadableHtmlFromPreview({
        template: currentTemplate,
        data,
        scale: 1,
        waitForLayoutMs: 320,
        bottomReservedPx: globalSettings.bottomReservedPx,
      });
      const blob = new Blob([html], { type: 'text/html' });
      triggerBlobDownload(blob, `card-${templateId}-${Date.now()}.html`);
    } finally {
      setDownloadingHtml(false);
    }
  };

  const handleDownloadImage = async () => {
    if (!data) return;
    if (!currentTemplate) {
      showToast('模板仍在加载，请稍后重试。', 'warning');
      return;
    }
    if (!currentTemplate.downloadable) {
      showToast(`"${templateDisplayName}" 模板暂不支持下载。`, 'warning');
      return;
    }
    setDownloadingImage(true);
    try {
      const { executeExport } = await import('./utils/export-strategy');
      const result = await executeExport({
        template: currentTemplate,
        templateId,
        data,
        format: globalSettings.exportFormat,
        strategy: globalSettings.pngExportStrategy,
        scale: 1,
        pixelRatio: 2,
        waitForLayoutMs: 420,
        bottomReservedPx: globalSettings.bottomReservedPx,
      });
      triggerBlobDownload(result.blob, result.filename);
      if (result.metadata.attemptTrace.length > 0) {
        console.info('[export] attempt trace:', result.metadata.attemptTrace);
      }
      if (result.metadata.fallbackReason) {
        const source = result.metadata.renderSource;
        showToast(
          `导出回退：已使用 ${source} 完成导出。原因: ${result.metadata.fallbackReason}`,
          'warning',
        );
      }
    } catch (error) {
      console.error('[export] Image export failed.', error);
      const message = error instanceof Error ? error.message : '未知错误';
      showToast(`导出图片失败: ${message}`, 'error');
    } finally {
      setDownloadingImage(false);
    }
  };

  const handleCopyJsonPrompt = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(JSON_SYSTEM_PROMPT);
      setCopiedJsonPrompt(true);
      showToast('JSON 提示词已复制到剪贴板', 'success');
      setTimeout(() => setCopiedJsonPrompt(false), 2000);
    } catch (error) {
      showToast('复制失败，请手动复制', 'error');
    }
  }, [showToast]);

  const handleCopyMarkdownPrompt = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(MARKDOWN_SYSTEM_PROMPT);
      setCopiedMarkdownPrompt(true);
      showToast('Markdown 提示词已复制到剪贴板', 'success');
      setTimeout(() => setCopiedMarkdownPrompt(false), 2000);
    } catch (error) {
      showToast('复制失败，请手动复制', 'error');
    }
  }, [showToast]);

  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',
      bgcolor: '#F5F4F0',
      overflow: 'hidden',
      fontFamily: '"Inter", "SF Pro Text", "Noto Sans SC", -apple-system, BlinkMacSystemFont, sans-serif',
    }}>
      {/* Template Selector - Far Left */}
      <Box sx={{
        width: TEMPLATE_SELECTOR_WIDTH,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid',
        borderColor: md3Colors.surface.outlineVariant,
      }}>
        <TemplateSelector
          currentTemplate={templateId}
          onTemplateChange={setTemplateId}
          hasData={!!data}
          templates={templateSummaries}
        />
      </Box>

      {/* Input Sidebar */}
      <Box sx={{
        width: showSidebar ? SIDEBAR_WIDTH : 0,
        flexShrink: 0,
        bgcolor: '#FFFFFF',
        borderRight: '1px solid #E8E6E1',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
      }}>
        {showSidebar && (
          <>
            {/* Header */}
            <Box sx={{ px: 2.5, pt: 2.5, pb: 2, borderBottom: '1px solid #E8E6E1' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 1.5,
                  bgcolor: '#2D2A26',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Style sx={{ color: '#FFFFFF', fontSize: 18 }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#2D2A26', letterSpacing: '0.01em' }}>
                    新闻卡片 AI
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#9E9A94', fontSize: '0.7rem' }}>
                    可视化摘要生成器
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Input Area */}
            <Box sx={{
              px: 2.5,
              pt: 2,
              pb: 2,
              flex: '1 1 0',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              minHeight: 0,
              overflow: 'hidden',
            }}>
              {/* 输入文本 */}
              <Box sx={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#6B6660', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.65rem' }}>
                    输入文本
                  </Typography>
                  <Box sx={{ flex: 1 }} />
                  <Chip
                    label="示例"
                    size="small"
                    onClick={() => { setInputText(EXAMPLE_TEXT); setSelectedMockIndex(null); }}
                    sx={{ cursor: 'pointer', height: 22, fontSize: 11, bgcolor: '#F0EEEA', fontWeight: 500 }}
                  />
                  <Chip
                    label="清空"
                    size="small"
                    variant="outlined"
                    onClick={() => { setInputText(''); setGeneratedText(''); setData(null); setSelectedMockIndex(null); }}
                    sx={{ cursor: 'pointer', height: 22, fontSize: 11, fontWeight: 500 }}
                  />
                  <Chip
                    label="生成"
                    size="small"
                    sx={{
                      cursor: 'pointer',
                      height: 22,
                      fontSize: 11,
                      minWidth: 76,
                      fontWeight: 600,
                      bgcolor: '#2D2A26',
                      color: '#FFFFFF',
                      '&:hover': { bgcolor: '#3D3A36' },
                    }}
                    icon={loading ? <CircularProgress size={12} sx={{ color: '#fff' }} /> : <AutoAwesome sx={{ fontSize: 12, color: '#fff' }} />}
                    onClick={handleGenerate}
                    disabled={loading || !inputText.trim()}
                  />
                </Box>
                <TextField
                  multiline
                  fullWidth
                  placeholder="在此粘贴文章或文本..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  sx={{
                    flex: 1,
                    '& .MuiInputBase-root': {
                      height: '100%',
                      fontSize: 13,
                      lineHeight: 1.6,
                      alignItems: 'flex-start',
                      p: 0,
                      bgcolor: '#FAFAF8',
                      borderRadius: 1.5,
                      border: '1px solid #E8E6E1',
                    },
                    '& .MuiInputBase-input': {
                      height: '100% !important',
                      overflow: 'auto !important',
                      resize: 'none',
                      p: 1.75,
                      boxSizing: 'border-box',
                    },
                  }}
                  inputProps={{ style: { overflow: 'auto' } }}
                />
              </Box>

              {/* 生成内容 */}
              <Box sx={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#6B6660', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.65rem' }}>
                    生成内容
                  </Typography>
                  <Box sx={{ flex: 1 }} />
                  <Chip
                    label="应用"
                    size="small"
                    sx={{
                      cursor: 'pointer',
                      height: 22,
                      fontSize: 11,
                      fontWeight: 600,
                      bgcolor: '#C4A882',
                      color: '#FFFFFF',
                      '&:hover': { bgcolor: '#B8986E' },
                    }}
                    icon={<PlayArrow sx={{ fontSize: 12, color: '#fff' }} />}
                    onClick={handleApply}
                    disabled={!generatedText.trim()}
                  />
                </Box>
                <TextField
                  multiline
                  fullWidth
                  placeholder="生成的内容将显示在这里..."
                  value={generatedText}
                  onChange={(e) => setGeneratedText(e.target.value)}
                  sx={{
                    flex: 1,
                    '& .MuiInputBase-root': {
                      height: '100%',
                      fontSize: 13,
                      lineHeight: 1.6,
                      alignItems: 'flex-start',
                      bgcolor: '#FAFAF8',
                      fontFamily: '"SF Mono", "Fira Code", "Fira Mono", monospace',
                      p: 0,
                      borderRadius: 1.5,
                      border: '1px solid #E8E6E1',
                    },
                    '& .MuiInputBase-input': {
                      height: '100% !important',
                      overflow: 'auto !important',
                      resize: 'none',
                      p: 1.75,
                      boxSizing: 'border-box',
                    },
                  }}
                  inputProps={{ style: { overflow: 'auto' } }}
                />
              </Box>
            </Box>

            {/* Bottom Actions */}
            <Box sx={{ borderTop: '1px solid #E8E6E1', px: 2.5, pt: 2, pb: 2.5 }}>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Button
                  sx={{
                    flex: 1,
                    height: 40,
                    borderRadius: 1.5,
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    letterSpacing: '0.01em',
                    bgcolor: '#FAFAF8',
                    color: '#2D2A26',
                    border: '1px solid #E8E6E1',
                    '&:hover': { bgcolor: '#F0EEEA' },
                  }}
                  variant="text"
                  disabled={!data || !canDownloadCurrentTemplate || downloadingHtml || downloadingImage}
                  onClick={handleDownload}
                  startIcon={downloadingHtml ? <Refresh sx={{ animation: 'spin 1s linear infinite' }} /> : <Download />}
                >
                  {downloadingHtml ? '准备中...' : 'HTML'}
                </Button>
                <Button
                  sx={{
                    flex: 1,
                    height: 40,
                    borderRadius: 1.5,
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    letterSpacing: '0.01em',
                    bgcolor: '#2D2A26',
                    color: '#FFFFFF',
                    '&:hover': { bgcolor: '#3D3A36' },
                  }}
                  variant="contained"
                  disabled={!data || !canDownloadCurrentTemplate || downloadingImage || downloadingHtml}
                  onClick={handleDownloadImage}
                  startIcon={downloadingImage ? <Refresh sx={{ animation: 'spin 1s linear infinite' }} /> : <ImageIcon />}
                >
                  {downloadingImage ? '渲染中...' : globalSettings.exportFormat.toUpperCase()}
                </Button>
              </Box>
              {/* Prompt Copy Buttons */}
              <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
                <Button
                  size="small"
                  fullWidth
                  variant="outlined"
                  onClick={handleCopyJsonPrompt}
                  sx={{
                    fontSize: '0.7rem',
                    height: 32,
                    borderRadius: 1.5,
                    textTransform: 'none',
                    fontWeight: 500,
                    borderColor: copiedJsonPrompt ? '#C4A882' : '#E8E6E1',
                    color: copiedJsonPrompt ? '#C4A882' : '#6B6660',
                    bgcolor: copiedJsonPrompt ? '#FAF8F4' : 'transparent',
                    '&:hover': { borderColor: '#C4A882', color: '#C4A882', bgcolor: '#FAF8F4' },
                  }}
                >
                  {copiedJsonPrompt ? '✓ JSON 提示词' : '复制 JSON 提示词'}
                </Button>
                <Button
                  size="small"
                  fullWidth
                  variant="outlined"
                  onClick={handleCopyMarkdownPrompt}
                  sx={{
                    fontSize: '0.7rem',
                    height: 32,
                    borderRadius: 1.5,
                    textTransform: 'none',
                    fontWeight: 500,
                    borderColor: copiedMarkdownPrompt ? '#C4A882' : '#E8E6E1',
                    color: copiedMarkdownPrompt ? '#C4A882' : '#6B6660',
                    bgcolor: copiedMarkdownPrompt ? '#FAF8F4' : 'transparent',
                    '&:hover': { borderColor: '#C4A882', color: '#C4A882', bgcolor: '#FAF8F4' },
                  }}
                >
                  {copiedMarkdownPrompt ? '✓ Markdown 提示词' : '复制 Markdown 提示词'}
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>

      {/* Sidebar Toggle */}
      <IconButton
        onClick={() => setShowSidebar(!showSidebar)}
        title={showSidebar ? 'Collapse sidebar' : 'Expand sidebar'}
        sx={{
          position: 'absolute',
          left: showSidebar ? SIDEBAR_WIDTH + TEMPLATE_SELECTOR_WIDTH - 20 : TEMPLATE_SELECTOR_WIDTH - 20,
          top: 12,
          zIndex: 1200,
          width: 32,
          height: 32,
          bgcolor: '#FFFFFF',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          border: '1px solid #E8E6E1',
          transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': { bgcolor: '#FAFAF8' },
        }}
      >
        <ChevronRight
          sx={{
            fontSize: 18,
            color: '#2D2A26',
            transform: showSidebar ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s',
          }}
        />
      </IconButton>

      {/* 画布预览区域 */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#F5F4F0',
        position: 'relative',
      }}>
        {/* 顶部工具栏 */}
        <Box sx={{
          height: 56,
          display: 'flex',
          alignItems: 'center',
          px: 3,
          bgcolor: '#FFFFFF',
          borderBottom: '1px solid #E8E6E1',
        }}>
          <Typography variant="body2" sx={{ color: '#9E9A94', fontSize: '0.75rem', fontWeight: 500 }}>
            画布 1920 × 1080
          </Typography>
          <Chip
            label={`${Math.round(scale * 100)}%`}
            size="small"
            sx={{
              ml: 1.5,
              height: 22,
              fontSize: '0.7rem',
              bgcolor: '#F0EEEA',
              fontWeight: 500,
            }}
          />
          {data && (
            <Chip
              icon={<CheckCircle sx={{ fontSize: 12 }} />}
              label="就绪"
              size="small"
              sx={{ ml: 1.5, height: 22, fontSize: '0.7rem', fontWeight: 500, bgcolor: '#E8F0E8', color: '#3A7A3A' }}
            />
          )}
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Tooltip title="设置">
              <IconButton
                size="small"
                onClick={() => setShowSettingsPanel(true)}
                sx={{ width: 28, height: 28, color: '#9E9A94' }}
              >
                <Tune sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
            <Typography variant="body2" sx={{ color: '#6B6660', fontSize: '0.8rem', fontWeight: 500 }}>
              {templateDisplayName}
            </Typography>
            <Tooltip title="复制模板ID">
              <IconButton
                size="small"
                onClick={() => navigator.clipboard.writeText(templateId)}
                sx={{ width: 28, height: 28, color: '#9E9A94' }}
              >
                <ContentCopy sx={{ fontSize: 14 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* 画布容器 */}
        <Box
          ref={containerRef}
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'auto',
            p: 3,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: 1920 * scale,
              height: 1080 * scale,
              borderRadius: 1,
              overflow: 'hidden',
              border: '1px solid #E8E6E1',
              bgcolor: '#FFFFFF',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}
          >
            {currentTemplate ? (
              <Canvas
                data={data}
                template={currentTemplate}
                scale={scale}
                bottomReservedPx={globalSettings.bottomReservedPx}
                progressBarConfig={progressBarConfig}
              />
            ) : (
              <Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9E9A94',
                flexDirection: 'column',
                gap: 1,
              }}>
                <CircularProgress size={22} sx={{ color: '#C4A882' }} />
                <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                  {templateLoadError ? `模板加载失败: ${templateLoadError}` : '正在加载模板...'}
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>

      {/* 页面选择器 - 右侧竖栏 */}
      <Box sx={{
        width: showProgressBarPanel ? 260 : 0,
        flexShrink: 0,
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
      }}>
        {showProgressBarPanel && (
          <CardPageSelector
            config={progressBarConfig}
            totalCards={originalContentRef.current?.cards.length}
            selectedCardIndex={selectedMockIndex}
            onPageProgressBarIndices={pageProgressBarIndices}
            onSelectCardWithProgress={handleSelectCardCount}
          />
        )}
      </Box>

      {/* 进度条设置面板 - 最右侧竖栏 */}
      <Box sx={{
        width: showProgressBarPanel ? 400 : 0,
        flexShrink: 0,
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        borderLeft: '1px solid',
        borderColor: md3Colors.surface.outlineVariant,
      }}>
        {showProgressBarPanel && (
          <ProgressBarSettingsPanel
            config={progressBarConfig}
            onChange={setProgressBarConfig}
            totalCards={originalContentRef.current?.cards.length}
            selectedCardIndex={selectedMockIndex}
            onPageProgressBarIndices={pageProgressBarIndices}
            onSelectCardWithProgress={handleSelectCardCount}
          />
        )}
      </Box>

      {/* 进度条面板切换按钮 */}
      <IconButton
        onClick={() => setShowProgressBarPanel(!showProgressBarPanel)}
        title={showProgressBarPanel ? '收起进度条设置' : '展开进度条设置'}
        sx={{
          position: 'absolute',
          right: showProgressBarPanel ? 650 : -20,
          top: 12,
          zIndex: 1200,
          width: 32,
          height: 32,
          bgcolor: md3Colors.surface.surfaceContainerHigh,
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          transition: 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            bgcolor: md3Colors.surface.surfaceContainerHighest,
          },
        }}
      >
        <ChevronRight
          sx={{
            fontSize: 18,
            color: md3Colors.primary.main,
            transform: showProgressBarPanel ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.3s',
          }}
        />
      </IconButton>

      <GlobalSettingsDrawer
        open={showSettingsPanel}
        settings={globalSettings}
        cdnIconCount={cdnIconList.length}
        backendLlmConfig={backendLlmConfig}
        backendLlmConfigLoading={backendLlmConfigLoading}
        backendLlmConfigError={backendLlmConfigError}
        onClose={() => setShowSettingsPanel(false)}
        onReset={handleResetGlobalSettings}
        onUpdateApiBaseUrl={updateApiBaseUrl}
        onUpdateSettings={updateGlobalSettings}
        onUpdateIconMappingSetting={updateIconMappingSetting}
      />
    </Box>
  );
};

export default App;
