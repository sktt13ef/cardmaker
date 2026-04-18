import React, { useState } from 'react';
import {
  Box,
  Typography,
  Switch,
  TextField,
  Button,
  Chip,
  IconButton,
  Divider,
  Tabs,
  Tab,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Add,
  Remove,
  Restore,
  Settings,
  ContentCopy,
  Upload,
  Download,
  Code,
  AutoAwesome,
} from '@mui/icons-material';
import { md3Colors } from '../theme/md3-theme';
import {
  ProgressBarConfig,
  SingleProgressBarConfig,
  DEFAULT_PROGRESS_BAR_CONFIG,
  PROGRESS_BAR_PRESETS,
} from '../types/progress-bar';

interface ProgressBarSettingsPanelProps {
  config: ProgressBarConfig;
  onChange: (config: ProgressBarConfig) => void;
  totalCards?: number;
  selectedCardIndex?: number | null;
  onPageProgressBarIndices?: Record<number, { top: number; bottom: number }>;
  onSelectCardWithProgress?: (count: number, topIndex?: number, bottomIndex?: number) => void;
}

type TabPosition = 'top' | 'bottom';

const ProgressBarSettingsPanel: React.FC<ProgressBarSettingsPanelProps> = ({
  config,
  onChange,
  totalCards,
  selectedCardIndex,
  onPageProgressBarIndices,
  onSelectCardWithProgress,
}) => {
  const [activeTab, setActiveTab] = useState<TabPosition>('top');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const EXAMPLE_CONFIG: ProgressBarConfig = {
    top: {
      show: true,
      segmentCount: 4,
      segmentLabels: ['背景', '分析', '发现', '总结'],
      activeIndex: 1,
    },
    bottom: {
      show: true,
      segmentCount: 5,
      segmentLabels: ['总览', '要点一', '要点二', '要点三', '总结'],
      activeIndex: 2,
    },
  };

  const updateSingleConfig = (
    position: TabPosition,
    updater: (prev: SingleProgressBarConfig) => SingleProgressBarConfig
  ) => {
    onChange({
      ...config,
      [position]: updater(config[position]),
    });
  };

  const handleToggleShow = (position: TabPosition) => {
    updateSingleConfig(position, prev => ({ ...prev, show: !prev.show }));
  };

  const handleSegmentCountChange = (position: TabPosition, newCount: number) => {
    const validCount = Math.max(2, Math.min(8, newCount));
    updateSingleConfig(position, prev => {
      const newLabels = [...prev.segmentLabels];
      if (validCount > prev.segmentCount) {
        for (let i = prev.segmentCount; i < validCount; i++) {
          newLabels.push(`Step ${i + 1}`);
        }
      } else {
        newLabels.splice(validCount);
      }
      return { ...prev, segmentCount: validCount, segmentLabels: newLabels };
    });
  };

  const handleLabelChange = (position: TabPosition, index: number, value: string) => {
    updateSingleConfig(position, prev => {
      const newLabels = [...prev.segmentLabels];
      newLabels[index] = value;
      return { ...prev, segmentLabels: newLabels };
    });
  };

  const handleActiveIndexChange = (position: TabPosition, index: number) => {
    updateSingleConfig(position, prev => ({ ...prev, activeIndex: index }));
  };

  const handleApplyPreset = (position: TabPosition, preset: typeof PROGRESS_BAR_PRESETS[0]) => {
    updateSingleConfig(position, prev => ({
      ...prev,
      show: true,
      segmentCount: preset.segmentCount,
      segmentLabels: [...preset.defaultLabels],
    }));
  };

  const handleReset = () => {
    onChange({ ...DEFAULT_PROGRESS_BAR_CONFIG });
  };

  const handleCopyExample = () => {
    const jsonStr = JSON.stringify(EXAMPLE_CONFIG, null, 2);
    navigator.clipboard.writeText(jsonStr).then(() => {
      setSnackbarMessage('示例配置已复制到剪贴板');
      setSnackbarOpen(true);
    }).catch(() => {
      setSnackbarMessage('复制失败');
      setSnackbarOpen(true);
    });
  };

  const handleExportConfig = () => {
    const jsonStr = JSON.stringify(config, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'progress-bar-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSnackbarMessage('配置已导出为 JSON');
    setSnackbarOpen(true);
  };

  const handleImportConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string) as ProgressBarConfig;
        if (imported.top && imported.bottom) {
          onChange(imported);
          setSnackbarMessage('配置导入成功');
          setSnackbarOpen(true);
        } else {
          setSnackbarMessage('配置格式无效');
          setSnackbarOpen(true);
        }
      } catch {
        setSnackbarMessage('解析失败');
        setSnackbarOpen(true);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePasteConfig = () => {
    navigator.clipboard.readText().then((text) => {
      try {
        const imported = JSON.parse(text) as ProgressBarConfig;
        if (imported.top && imported.bottom) {
          onChange(imported);
          setSnackbarMessage('已从剪贴板导入');
          setSnackbarOpen(true);
        } else {
          setSnackbarMessage('剪贴板内容无效');
          setSnackbarOpen(true);
        }
      } catch {
        setSnackbarMessage('解析失败');
        setSnackbarOpen(true);
      }
    }).catch(() => {
      setSnackbarMessage('无法读取剪贴板');
      setSnackbarOpen(true);
    });
  };

  const renderSingleProgressBarEditor = (position: TabPosition) => {
    const singleConfig = config[position];
    const isEnabled = singleConfig.show;

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Toggle */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 1.5,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #FAFAF8 0%, #F5F4F0 100%)',
            border: '1px solid #E8E6E1',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <Box sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              bgcolor: position === 'top' ? '#4a90d9' : '#48bb78',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <AutoAwesome sx={{ fontSize: 12, color: '#fff' }} />
            </Box>
            <Typography sx={{ fontWeight: 600, color: '#2D2A26', fontSize: '0.85rem' }}>
              {position === 'top' ? '上方进度条' : '下方进度条'}
            </Typography>
          </Box>
          <Switch
            size="small"
            checked={isEnabled}
            onChange={() => handleToggleShow(position)}
            sx={{ '& .MuiSwitch-thumb': { bgcolor: isEnabled ? '#C4A882' : '#9E9A94' } }}
          />
        </Box>

        {isEnabled && (
          <>
            {/* Presets */}
            <Box>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6660', mb: 1, letterSpacing: '0.02em' }}>
                预设方案
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {PROGRESS_BAR_PRESETS.map((preset) => (
                  <Chip
                    key={preset.id}
                    label={preset.name}
                    size="small"
                    variant={singleConfig.segmentCount === preset.segmentCount ? 'filled' : 'outlined'}
                    onClick={() => handleApplyPreset(position, preset)}
                    sx={{
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: singleConfig.segmentCount === preset.segmentCount ? 600 : 500,
                      height: 26,
                      bgcolor: singleConfig.segmentCount === preset.segmentCount ? '#2D2A26' : 'transparent',
                      color: singleConfig.segmentCount === preset.segmentCount ? '#fff' : '#6B6660',
                      border: '1px solid',
                      borderColor: singleConfig.segmentCount === preset.segmentCount ? '#2D2A26' : '#E8E6E1',
                      '&:hover': { bgcolor: singleConfig.segmentCount === preset.segmentCount ? '#3D3A36' : '#FAFAF8' },
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Active Position */}
            <Box>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6660', mb: 1, letterSpacing: '0.02em' }}>
                激活位置
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => handleActiveIndexChange(position, Math.max(0, singleConfig.activeIndex - 1))}
                  disabled={singleConfig.activeIndex <= 0}
                  sx={{ width: 32, height: 32, bgcolor: '#FAFAF8', border: '1px solid #E8E6E1', '&:hover': { bgcolor: '#F0EEEA' } }}
                >
                  <Remove fontSize="small" sx={{ color: '#2D2A26' }} />
                </IconButton>
                <TextField
                  size="small"
                  type="number"
                  value={singleConfig.activeIndex + 1}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    handleActiveIndexChange(position, Math.max(1, Math.min(val, singleConfig.segmentCount)) - 1);
                  }}
                  inputProps={{ min: 1, max: singleConfig.segmentCount }}
                  sx={{
                    width: 60,
                    '& .MuiInputBase-root': {
                      height: 32,
                      fontSize: '0.9rem',
                      bgcolor: '#FFFFFF',
                      borderRadius: 1.5,
                      border: '1px solid #E8E6E1',
                      fontWeight: 600,
                      color: '#2D2A26',
                    },
                  }}
                />
                <Typography sx={{ color: '#9E9A94', fontSize: '0.8rem' }}>/</Typography>
                <Typography sx={{ color: '#6B6660', fontSize: '0.9rem', fontWeight: 500 }}>{singleConfig.segmentCount}</Typography>
                <IconButton
                  size="small"
                  onClick={() => handleActiveIndexChange(position, Math.min(singleConfig.segmentCount - 1, singleConfig.activeIndex + 1))}
                  disabled={singleConfig.activeIndex >= singleConfig.segmentCount - 1}
                  sx={{ width: 32, height: 32, bgcolor: '#FAFAF8', border: '1px solid #E8E6E1', '&:hover': { bgcolor: '#F0EEEA' } }}
                >
                  <Add fontSize="small" sx={{ color: '#2D2A26' }} />
                </IconButton>
              </Box>
            </Box>

            {/* Segment Count */}
            <Box>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6660', mb: 1, letterSpacing: '0.02em' }}>
                分段数量
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => handleSegmentCountChange(position, singleConfig.segmentCount - 1)}
                  disabled={singleConfig.segmentCount <= 2}
                  sx={{ width: 32, height: 32, bgcolor: '#FAFAF8', border: '1px solid #E8E6E1', '&:hover': { bgcolor: '#F0EEEA' } }}
                >
                  <Remove fontSize="small" sx={{ color: '#2D2A26' }} />
                </IconButton>
                <TextField
                  size="small"
                  type="number"
                  value={singleConfig.segmentCount}
                  onChange={(e) => handleSegmentCountChange(position, parseInt(e.target.value) || 2)}
                  inputProps={{ min: 2, max: 8 }}
                  sx={{
                    width: 60,
                    '& .MuiInputBase-root': {
                      height: 32,
                      fontSize: '0.9rem',
                      bgcolor: '#FFFFFF',
                      borderRadius: 1.5,
                      border: '1px solid #E8E6E1',
                      fontWeight: 600,
                      color: '#2D2A26',
                    },
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleSegmentCountChange(position, singleConfig.segmentCount + 1)}
                  disabled={singleConfig.segmentCount >= 8}
                  sx={{ width: 32, height: 32, bgcolor: '#FAFAF8', border: '1px solid #E8E6E1', '&:hover': { bgcolor: '#F0EEEA' } }}
                >
                  <Add fontSize="small" sx={{ color: '#2D2A26' }} />
                </IconButton>
              </Box>
            </Box>

            {/* Labels */}
            <Box>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6660', mb: 1, letterSpacing: '0.02em' }}>
                分段标签
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                {singleConfig.segmentLabels.slice(0, singleConfig.segmentCount).map((label, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: singleConfig.activeIndex === index ? '#C4A882' : '#FAFAF8',
                        border: `1px solid ${singleConfig.activeIndex === index ? '#C4A882' : '#E8E6E1'}`,
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                      onClick={() => handleActiveIndexChange(position, index)}
                    >
                      <Typography sx={{ fontSize: 11, fontWeight: singleConfig.activeIndex === index ? 700 : 500, color: singleConfig.activeIndex === index ? '#fff' : '#6B6660' }}>
                        {index + 1}
                      </Typography>
                    </Box>
                    <TextField
                      size="small"
                      value={label}
                      onChange={(e) => handleLabelChange(position, index, e.target.value)}
                      placeholder={`Step ${index + 1}`}
                      fullWidth
                      variant="standard"
                      sx={{
                        '& .MuiInputBase-root': {
                          height: 32,
                          fontSize: '0.85rem',
                          color: '#2D2A26',
                          '&:before': { display: 'none' },
                          '&:after': { borderBottom: `2px solid ${singleConfig.activeIndex === index ? '#C4A882' : '#E8E6E1'}` },
                          '&:hover:not(.Mui-disabled):before': { borderBottom: '1px solid #C4A882' },
                        },
                        '& .MuiInputBase-input': {
                          py: 0.5,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </>
        )}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        width: 400,
        flexShrink: 0,
        bgcolor: '#FFFFFF',
        borderLeft: '1px solid',
        borderColor: '#E8E6E1',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2.5, pb: 2, borderBottom: '1px solid #E8E6E1' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{
            width: 32,
            height: 32,
            borderRadius: 2,
            bgcolor: '#C4A882',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Settings sx={{ color: '#FFFFFF', fontSize: 18 }} />
          </Box>
          <Typography sx={{ fontWeight: 600, color: '#2D2A26', letterSpacing: '0.02em' }}>
            进度条设置
          </Typography>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2.5 }}>
        {/* Card Page Selector */}
        {onSelectCardWithProgress && totalCards && totalCards >= 2 && (
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6660', mb: 1.5, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              页面选择
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {(() => {
                const maxButtons = Math.min(totalCards, 8);
                const topSegmentCount = config.top.segmentCount;
                const bottomSegmentCount = config.bottom.segmentCount;

                return Array.from({ length: maxButtons }, (_, i) => i + 1).map((count) => {
                  const pageIndex = count - 1;
                  const isSelected = selectedCardIndex === pageIndex;
                  const savedIndices = onPageProgressBarIndices?.[pageIndex] || { top: 0, bottom: 0 };

                  return (
                    <Box
                      key={count}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        p: 1.25,
                        borderRadius: 2,
                        background: isSelected ? 'linear-gradient(135deg, #F5F4F0 0%, #FAFAF8 100%)' : 'transparent',
                        border: `1px solid ${isSelected ? '#C4A882' : '#E8E6E1'}`,
                        transition: 'all 0.2s ease',
                        '&:hover': { background: '#FAFAF8' },
                      }}
                    >
                      <Chip
                        label={count === 1 ? '总览' : `要点 ${count - 1}`}
                        size="small"
                        variant={isSelected ? 'filled' : 'outlined'}
                        color={isSelected ? 'primary' : 'default'}
                        onClick={() => onSelectCardWithProgress(count)}
                        sx={{
                          cursor: 'pointer',
                          minWidth: 64,
                          fontWeight: isSelected ? 600 : 400,
                          bgcolor: isSelected ? '#2D2A26' : 'transparent',
                          color: isSelected ? '#fff' : '#6B6660',
                          border: isSelected ? '1px solid #2D2A26' : '1px solid #E8E6E1',
                        }}
                      />

                      {config.top.show && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Typography sx={{ fontSize: '0.65rem', color: '#9E9A94', fontWeight: 500 }}>上</Typography>
                          <Box sx={{ display: 'flex', gap: 0.25 }}>
                            {Array.from({ length: topSegmentCount }, (_, idx) => (
                              <Box
                                key={idx}
                                onClick={() => onSelectCardWithProgress(count, idx, savedIndices.bottom)}
                                sx={{
                                  width: 18,
                                  height: 18,
                                  borderRadius: '50%',
                                  bgcolor: savedIndices.top === idx ? '#4a90d9' : '#FAFAF8',
                                  border: `1.5px solid ${savedIndices.top === idx ? '#4a90d9' : '#E8E6E1'}`,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '9px',
                                  fontWeight: 600,
                                  color: savedIndices.top === idx ? '#fff' : '#9E9A94',
                                  '&:hover': { bgcolor: savedIndices.top === idx ? '#3a7fc9' : '#F0EEEA' },
                                }}
                              >
                                {idx + 1}
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      )}

                      {config.bottom.show && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Typography sx={{ fontSize: '0.65rem', color: '#9E9A94', fontWeight: 500 }}>下</Typography>
                          <Box sx={{ display: 'flex', gap: 0.25 }}>
                            {Array.from({ length: bottomSegmentCount }, (_, idx) => (
                              <Box
                                key={idx}
                                onClick={() => onSelectCardWithProgress(count, savedIndices.top, idx)}
                                sx={{
                                  width: 18,
                                  height: 18,
                                  borderRadius: '50%',
                                  bgcolor: savedIndices.bottom === idx ? '#48bb78' : '#FAFAF8',
                                  border: `1.5px solid ${savedIndices.bottom === idx ? '#48bb78' : '#E8E6E1'}`,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '9px',
                                  fontWeight: 600,
                                  color: savedIndices.bottom === idx ? '#fff' : '#9E9A94',
                                  '&:hover': { bgcolor: savedIndices.bottom === idx ? '#38a868' : '#F0EEEA' },
                                }}
                              >
                                {idx + 1}
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      )}
                    </Box>
                  );
                });
              })()}
            </Box>
          </Box>
        )}

        <Divider sx={{ my: 2.5, bgcolor: '#E8E6E1' }} />

        {/* Import/Export */}
        <Box sx={{ mb: 2.5 }}>
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6660', mb: 1.25, letterSpacing: '0.05em' }}>
            导入 / 导出
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0.75 }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<Code fontSize="small" />}
              onClick={handleCopyExample}
              sx={{
                fontSize: '0.72rem',
                borderRadius: 1.5,
                textTransform: 'none',
                fontWeight: 500,
                height: 36,
                borderColor: '#E8E6E1',
                color: '#6B6660',
                '&:hover': { borderColor: '#C4A882', color: '#2D2A26', bgcolor: '#FAFAF8' },
              }}
            >
              复制示例
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<Download fontSize="small" />}
              onClick={handleExportConfig}
              sx={{
                fontSize: '0.72rem',
                borderRadius: 1.5,
                textTransform: 'none',
                fontWeight: 500,
                height: 36,
                borderColor: '#E8E6E1',
                color: '#6B6660',
                '&:hover': { borderColor: '#C4A882', color: '#2D2A26', bgcolor: '#FAFAF8' },
              }}
            >
              导出
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<Upload fontSize="small" />}
              onClick={() => fileInputRef.current?.click()}
              sx={{
                fontSize: '0.72rem',
                borderRadius: 1.5,
                textTransform: 'none',
                fontWeight: 500,
                height: 36,
                borderColor: '#E8E6E1',
                color: '#6B6660',
                '&:hover': { borderColor: '#C4A882', color: '#2D2A26', bgcolor: '#FAFAF8' },
              }}
            >
              导入
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<ContentCopy fontSize="small" />}
              onClick={handlePasteConfig}
              sx={{
                fontSize: '0.72rem',
                borderRadius: 1.5,
                textTransform: 'none',
                fontWeight: 500,
                height: 36,
                borderColor: '#E8E6E1',
                color: '#6B6660',
                '&:hover': { borderColor: '#C4A882', color: '#2D2A26', bgcolor: '#FAFAF8' },
              }}
            >
              粘贴
            </Button>
          </Box>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportConfig}
            style={{ display: 'none' }}
          />
        </Box>

        <Divider sx={{ my: 2.5, bgcolor: '#E8E6E1' }} />

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(_, value) => setActiveTab(value)}
          variant="fullWidth"
          sx={{
            mb: 2.5,
            minHeight: 36,
            '& .MuiTabs-indicator': { bgcolor: '#C4A882', height: 2 },
            '& .MuiTab-root': {
              minHeight: 36,
              fontSize: '0.85rem',
              textTransform: 'none',
              fontWeight: 500,
              color: '#9E9A94',
              '&.Mui-selected': { color: '#2D2A26', fontWeight: 600 },
            },
          }}
        >
          <Tab label="上方进度条" value="top" />
          <Tab label="下方进度条" value="bottom" />
        </Tabs>

        {/* Editor */}
        {activeTab === 'top' && renderSingleProgressBarEditor('top')}
        {activeTab === 'bottom' && renderSingleProgressBarEditor('bottom')}

        <Divider sx={{ my: 2.5, bgcolor: '#E8E6E1' }} />

        {/* Reset */}
        <Button
          size="small"
          startIcon={<Restore fontSize="small" sx={{ color: '#6B6660' }} />}
          onClick={handleReset}
          sx={{
            fontSize: '0.8rem',
            fontWeight: 500,
            textTransform: 'none',
            color: '#6B6660',
            border: '1px solid #E8E6E1',
            borderRadius: 1.5,
            height: 36,
            '&:hover': { bgcolor: '#FAFAF8', borderColor: '#C4A882', color: '#2D2A26' },
          }}
          fullWidth
          variant="outlined"
        >
          恢复默认设置
        </Button>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{
            fontSize: '0.85rem',
            fontWeight: 500,
            bgcolor: '#2D2A26',
            borderRadius: 1.5,
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProgressBarSettingsPanel;
