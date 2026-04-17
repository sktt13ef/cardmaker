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
import { md3Colors } from './theme/md3-theme';
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

const SIDEBAR_WIDTH = 520;
const TEMPLATE_SELECTOR_WIDTH = 280;
const MOCK_SCENARIOS = mockData as GeneratedContent[];
const EXAMPLE_TEXT = `DeepSeek-V3 是一款拥有 6710 亿参数的混合专家（MoE）语言模型，每 token 激活参数为 370 亿。它在高达 14.8 万亿 token 的数据集上进行了训练。在训练过程中，采用多头潜在注意力机制（MLA）来提高推理效率，并利用 DeepSeekMoE 架构进行具有辅助无损负载均衡的训练。
DeepSeek-V3 在多个基准测试中表现出色，性能与某些顶尖的闭源模型相当。在数学代码、长文本处理等领域有显著优势。
该模型现已在 Hugging Face 上开源，允许研究和商业用途（需遵循相关许可证）。开发者还通过其 API 平台提供服务。
成本方面，DeepSeek-V3 仅耗费 278.8 万 H800 GPU 小时，总训练成本约 557.6 万美元，远低于同类顶级模型。`;

const App: React.FC = () => {
  const { showToast } = useExportToast();
  // 初始不加载示例数据，等待用户输入
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
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [globalSettings, setGlobalSettings] = useState<AppGlobalSettings>(() => loadGlobalSettings());
  const [backendLlmConfig, setBackendLlmConfig] = useState<BackendLlmRuntimeConfig | null>(null);
  const [backendLlmConfigLoading, setBackendLlmConfigLoading] = useState(false);
  const [backendLlmConfigError, setBackendLlmConfigError] = useState<string | null>(null);
  const sourceContentRef = useRef<GeneratedContent | null>(initialData);
  // 用于保存原始完整数据，不被卡片数量选择影响
  const originalContentRef = useRef<GeneratedContent | null>(initialData);
  const cdnIconList = useCdnIconList(
    Boolean(globalSettings.iconMapping?.enabled),
    globalSettings.iconMapping?.cdnUrl || ''
  );
  const containerRef = useRef<HTMLDivElement>(null);

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
      // 只有完整数据才保存到 originalContentRef
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

  // 根据当前数据生成不同卡片数量的预览
  // 逻辑：第1张是总览（全部内容），第N张是第(N-1)个分点
  const handleSelectCardCount = useCallback((count: number) => {
    // 使用 originalContentRef 获取完整原始数据
    const sourceData = originalContentRef.current;
    if (!sourceData || sourceData.cards.length === 0) return;
    
    // 确保至少有2张卡片（1张总览 + 至少1张分点）
    if (sourceData.cards.length < 2) return;
    
    // 第1张是总览，后面的是分点
    // count=1: 显示全部卡片（总览完整内容）
    // count=2: 只显示第1个分点
    // count=3: 只显示第2个分点
    const detailCards = sourceData.cards.slice(1); // 去掉总览后的分点卡片
    
    let selectedCards: CardData[];
    
    if (count === 1) {
      // 显示全部卡片（总览完整内容）
      selectedCards = sourceData.cards;
    } else {
      // 只显示对应的分点（count-2 是因为 count=2 对应第1个分点）
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
    
    setSelectedMockIndex(count - 1); // 用 count-1 作为选中标识
    // isOriginal=false 表示这是截取的数据，不更新 originalContentRef
    updateContent(slicedData, false);
  }, [updateContent]);

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

      // Log structured trace for debugging
      if (result.metadata.attemptTrace.length > 0) {
        console.info('[export] attempt trace:', result.metadata.attemptTrace);
      }

      // Show fallback notification if applicable
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
      bgcolor: md3Colors.surface.surface,
      overflow: 'hidden'
    }}>
      {/* 主题选择器 */}
      <TemplateSelector
        currentTemplate={templateId}
        onTemplateChange={setTemplateId}
        hasData={!!data}
        templates={templateSummaries}
      />

      {/* 输入侧边栏 */}
      <Box
        sx={{
          width: showSidebar ? SIDEBAR_WIDTH : 0,
          flexShrink: 0,
          bgcolor: md3Colors.surface.surfaceContainerLow,
          borderRight: '1px solid',
          borderColor: md3Colors.surface.outlineVariant,
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
        }}
      >
        {showSidebar && (
          <>
            {/* Header */}
            <Box sx={{ p: 2, pb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: md3Colors.primary.main,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Style sx={{ color: '#FFFFFF', fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 500, color: md3Colors.surface.onSurface }}
                  >
                    NewsCard AI
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: md3Colors.surface.onSurfaceVariant }}
                  >
                    Visual summary generator
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* 输入区 - 占据剩余空间 */}
            <Box sx={{
              px: 2,
              py: 2,
              flex: '1 1 0',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              minHeight: 0,
              overflow: 'hidden',
            }}>
              {/* Input Text - 占一半 */}
              <Box sx={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, py: 0.5 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 500,
                      color: md3Colors.surface.onSurfaceVariant,
                      letterSpacing: '0.5px',
                    }}
                  >
                    INPUT TEXT
                  </Typography>
                  <Box sx={{ flex: 1 }} />
                  <Chip
                    label="Example"
                    size="small"
                    onClick={() => { setInputText(EXAMPLE_TEXT); setSelectedMockIndex(null); }}
                    sx={{ cursor: 'pointer', height: 24, fontSize: 12 }}
                  />
                  <Chip
                    label="Clear"
                    size="small"
                    variant="outlined"
                    onClick={() => { setInputText(''); setGeneratedText(''); setData(null); setSelectedMockIndex(null); }}
                    sx={{ cursor: 'pointer', height: 24, fontSize: 12 }}
                  />
                  <Chip
                    label="Generate"
                    size="small"
                    color="primary"
                    icon={loading ? <CircularProgress size={14} color="inherit" /> : <AutoAwesome sx={{ fontSize: 14 }} />}
                    onClick={handleGenerate}
                    disabled={loading || !inputText.trim()}
                    sx={{ cursor: 'pointer', height: 24, fontSize: 12, minWidth: 80 }}
                  />
                  <Tooltip title={copiedJsonPrompt ? 'JSON 提示词已复制' : '复制 JSON 提示词'}>
                    <Chip
                      label={copiedJsonPrompt ? '已复制' : 'JSON 提示'}
                      size="small"
                      variant="outlined"
                      icon={copiedJsonPrompt ? <CheckCircle sx={{ fontSize: 14 }} /> : <TextSnippet sx={{ fontSize: 14 }} />}
                      onClick={handleCopyJsonPrompt}
                      sx={{ cursor: 'pointer', height: 24, fontSize: 12 }}
                    />
                  </Tooltip>
                  <Tooltip title={copiedMarkdownPrompt ? 'Markdown 提示词已复制' : '复制 Markdown 提示词'}>
                    <Chip
                      label={copiedMarkdownPrompt ? '已复制' : 'MD 提示'}
                      size="small"
                      variant="outlined"
                      icon={copiedMarkdownPrompt ? <CheckCircle sx={{ fontSize: 14 }} /> : <TextSnippet sx={{ fontSize: 14 }} />}
                      onClick={handleCopyMarkdownPrompt}
                      sx={{ cursor: 'pointer', height: 24, fontSize: 12 }}
                    />
                  </Tooltip>
                </Box>
                <TextField
                  multiline
                  fullWidth
                  placeholder="Paste your article or text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  sx={{
                    flex: 1,
                    '& .MuiInputBase-root': {
                      height: '100%',
                      fontSize: 12,
                      lineHeight: 1.5,
                      alignItems: 'flex-start',
                      p: 0,
                    },
                    '& .MuiInputBase-input': {
                      height: '100% !important',
                      overflow: 'auto !important',
                      resize: 'none',
                      p: 1.5,
                      boxSizing: 'border-box',
                    },
                  }}
                  inputProps={{
                    style: { overflow: 'auto' }
                  }}
                />
              </Box>

              {/* Generated Text - 占一半 */}
              <Box sx={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, py: 0.5 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 500,
                      color: md3Colors.surface.onSurfaceVariant,
                      letterSpacing: '0.5px',
                    }}
                  >
                    GENERATED CONTENT
                  </Typography>
                  <Box sx={{ flex: 1 }} />
                  <Chip
                    label="Apply"
                    size="small"
                    color="primary"
                    variant="outlined"
                    icon={<PlayArrow sx={{ fontSize: 14 }} />}
                    onClick={handleApply}
                    disabled={!generatedText.trim()}
                    sx={{ cursor: 'pointer', height: 24, fontSize: 12 }}
                  />
                </Box>
                <TextField
                  multiline
                  fullWidth
                  placeholder="Generated content will appear here..."
                  value={generatedText}
                  onChange={(e) => setGeneratedText(e.target.value)}
                  sx={{
                    flex: 1,
                    '& .MuiInputBase-root': {
                      height: '100%',
                      fontSize: 12,
                      lineHeight: 1.5,
                      alignItems: 'flex-start',
                      bgcolor: md3Colors.surface.surfaceContainer,
                      fontFamily: 'monospace',
                      p: 0,
                    },
                    '& .MuiInputBase-input': {
                      height: '100% !important',
                      overflow: 'auto !important',
                      resize: 'none',
                      p: 1.5,
                      boxSizing: 'border-box',
                    },
                  }}
                  inputProps={{
                    style: { overflow: 'auto' }
                  }}
                />
              </Box>
            </Box>

            {/* 底部固定区域 */}
            <Box sx={{ borderTop: '1px solid', borderColor: md3Colors.surface.outlineVariant }}>
              {/* 卡片数量选择 */}
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    color: md3Colors.surface.onSurfaceVariant,
                    mb: 1,
                    display: 'block',
                    letterSpacing: '0.5px',
                  }}
                >
                  卡片数量：点击切换显示前 N 张卡片。
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {originalContentRef.current && originalContentRef.current.cards.length >= 2 
                    ? (() => {
                        // 计算可用的按钮数量：总览 + 分点
                        // 如果有 N 张卡片（1张总览 + N-1张分点），显示 N 个按钮
                        const totalCards = originalContentRef.current!.cards.length;
                        const maxButtons = Math.min(totalCards, 8); // 最多8个按钮
                        
                        return Array.from({ length: maxButtons }, (_, i) => i + 1).map((count) => (
                          <Chip
                            key={count}
                            label={count === 1 ? '总览' : `分点${count-1}`}
                            size="small"
                            variant={selectedMockIndex === count - 1 ? 'filled' : 'outlined'}
                            color={selectedMockIndex === count - 1 ? 'primary' : 'default'}
                            onClick={() => handleSelectCardCount(count)}
                            sx={{ cursor: 'pointer' }}
                          />
                        ));
                      })()
                    : [1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                      <Chip
                        key={count}
                        label={count === 1 ? '总览' : `分点${count-1}`}
                        size="small"
                        variant="outlined"
                        disabled
                        sx={{ cursor: 'not-allowed', opacity: 0.5 }}
                      />
                    ))
                  }
                </Box>
              </Box>

              {/* Download 按钮 */}
              <Box sx={{ p: 2, pt: 1, display: 'flex', gap: 1 }}>
                <Button
                  sx={{ flex: 1 }}
                  variant="text"
                  size="medium"
                  disabled={!data || !canDownloadCurrentTemplate || downloadingHtml || downloadingImage}
                  onClick={handleDownload}
                  startIcon={downloadingHtml ? <Refresh sx={{ animation: 'spin 1s linear infinite' }} /> : <Download />}
                >
                  {downloadingHtml ? 'Preparing...' : 'Download HTML'}
                </Button>
                <Button
                  sx={{ flex: 1 }}
                  variant="contained"
                  size="medium"
                  disabled={!data || !canDownloadCurrentTemplate || downloadingImage || downloadingHtml}
                  onClick={handleDownloadImage}
                  startIcon={downloadingImage ? <Refresh sx={{ animation: 'spin 1s linear infinite' }} /> : <ImageIcon />}
                >
                  {downloadingImage ? 'Rendering...' : `Download ${globalSettings.exportFormat.toUpperCase()}`}
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>

      {/* 侧边栏切换按钮 - MD3 FAB style */}
      <IconButton
        onClick={() => setShowSidebar(!showSidebar)}
        title={showSidebar ? 'Collapse sidebar' : 'Expand sidebar'}
        sx={{
          position: 'absolute',
          left: TEMPLATE_SELECTOR_WIDTH + (showSidebar ? SIDEBAR_WIDTH - 20 : -20),
          top: 12,
          zIndex: 1200,
          width: 32,
          height: 32,
          bgcolor: md3Colors.surface.surfaceContainerHigh,
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            bgcolor: md3Colors.surface.surfaceContainerHighest,
          },
        }}
      >
        <ChevronRight
          sx={{
            fontSize: 18,
            color: md3Colors.primary.main,
            transform: showSidebar ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s',
          }}
        />
      </IconButton>

      {/* 预览区 - MD3 Surface Container */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: md3Colors.surface.surfaceContainer,
          position: 'relative',
        }}
      >
        {/* 状态栏 - MD3 Top App Bar style */}
        <Box
          sx={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            px: 3,
            bgcolor: md3Colors.surface.surfaceContainerLow,
            borderBottom: '1px solid',
            borderColor: md3Colors.surface.outlineVariant,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: md3Colors.surface.onSurfaceVariant }}
          >
            Canvas 1920 × 1080
          </Typography>
          <Chip
            label={`${Math.round(scale * 100)}%`}
            size="small"
            sx={{
              ml: 1.5,
              height: 24,
              fontSize: '0.75rem',
              bgcolor: md3Colors.surface.surfaceContainerHigh,
            }}
          />
          {data && (
            <Chip
              icon={<CheckCircle sx={{ fontSize: 14 }} />}
              label="Generated"
              size="small"
              color="success"
              variant="outlined"
              sx={{ ml: 1.5, height: 28 }}
            />
          )}
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Tooltip title="Global settings panel · Ctrl/Cmd+Enter Generate · Shift+Alt+←/→ Template · Shift+Alt+↑/↓ Mock">
              <IconButton
                size="small"
                onClick={() => setShowSettingsPanel(true)}
                sx={{ width: 28, height: 28 }}
              >
                <Tune sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
            <Typography
              variant="body2"
              sx={{ color: md3Colors.surface.onSurfaceVariant }}
            >
              {templateDisplayName}
            </Typography>
            <Tooltip title="Copy template ID">
              <IconButton
                size="small"
                onClick={() => navigator.clipboard.writeText(templateId)}
                sx={{ width: 28, height: 28 }}
              >
                <ContentCopy sx={{ fontSize: 14 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Canvas Container */}
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
                borderRadius: 0,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: md3Colors.surface.outlineVariant,
                bgcolor: md3Colors.surface.surfaceContainerLowest,
              }}
          >
            {currentTemplate ? (
              <Canvas
                data={data}
                template={currentTemplate}
                scale={scale}
                bottomReservedPx={globalSettings.bottomReservedPx}
              />
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: md3Colors.surface.onSurfaceVariant,
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <CircularProgress size={22} />
                <Typography variant="caption">
                  {templateLoadError ? `Template load failed: ${templateLoadError}` : 'Loading template...'}
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>

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
