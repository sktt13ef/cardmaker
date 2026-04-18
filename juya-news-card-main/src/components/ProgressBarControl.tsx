import React, { useState } from 'react';
import {
  Box,
  Typography,
  Switch,
  TextField,
  Button,
  Chip,
  IconButton,
  Collapse,
  Divider,
  Tabs,
  Tab,
} from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  Add,
  Remove,
  Restore,
} from '@mui/icons-material';
import { md3Colors } from '../theme/md3-theme';
import {
  ProgressBarConfig,
  SingleProgressBarConfig,
  DEFAULT_PROGRESS_BAR_CONFIG,
  PROGRESS_BAR_PRESETS,
} from '../types/progress-bar';

interface ProgressBarControlProps {
  config: ProgressBarConfig;
  onChange: (config: ProgressBarConfig) => void;
  cardCount?: number;
  totalCards?: number;
  onCardCountChange?: (count: number) => void;
  selectedCardIndex?: number | null;
  onPageProgressBarIndices?: Record<number, { top: number; bottom: number }>;
  onSelectCardWithProgress?: (count: number, topIndex?: number, bottomIndex?: number) => void;
}

type TabPosition = 'top' | 'bottom';

const ProgressBarControl: React.FC<ProgressBarControlProps> = ({ 
  config, 
  onChange,
  cardCount,
  totalCards,
  onCardCountChange,
  selectedCardIndex,
  onPageProgressBarIndices,
  onSelectCardWithProgress,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabPosition>('top');

  const isTopEnabled = config.top.show;
  const isBottomEnabled = config.bottom.show;
  const isAnyEnabled = isTopEnabled || isBottomEnabled;

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
          newLabels.push(`步骤${i + 1}`);
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

  const renderSingleProgressBarEditor = (position: TabPosition) => {
    const singleConfig = config[position];
    const isEnabled = singleConfig.show;

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* 显示开关 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 1.5,
            borderRadius: 1,
            backgroundColor: md3Colors.surface.surfaceContainer,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            显示{position === 'top' ? '顶部' : '底部'}进度条
          </Typography>
          <Switch
            size="small"
            checked={isEnabled}
            onChange={() => handleToggleShow(position)}
          />
        </Box>

        {isEnabled && (
          <>
            {/* 预设模板 */}
            <Box>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 500,
                  color: md3Colors.surface.onSurfaceVariant,
                  mb: 1,
                  display: 'block',
                }}
              >
                预设模板
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {PROGRESS_BAR_PRESETS.map((preset) => (
                  <Chip
                    key={preset.id}
                    label={preset.name}
                    size="small"
                    variant={singleConfig.segmentCount === preset.segmentCount ? 'filled' : 'outlined'}
                    onClick={() => handleApplyPreset(position, preset)}
                    sx={{ cursor: 'pointer', fontSize: '11px' }}
                  />
                ))}
              </Box>
            </Box>

            {/* 当前位置 */}
            <Box>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 500,
                  color: md3Colors.surface.onSurfaceVariant,
                  mb: 1,
                  display: 'block',
                }}
              >
                当前位置
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => handleActiveIndexChange(position, Math.max(0, singleConfig.activeIndex - 1))}
                  disabled={singleConfig.activeIndex <= 0}
                  sx={{ width: 32, height: 32 }}
                >
                  <Remove fontSize="small" />
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
                      fontSize: '14px',
                    },
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleActiveIndexChange(position, Math.min(singleConfig.segmentCount - 1, singleConfig.activeIndex + 1))}
                  disabled={singleConfig.activeIndex >= singleConfig.segmentCount - 1}
                  sx={{ width: 32, height: 32 }}
                >
                  <Add fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* 分块数量 */}
            <Box>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 500,
                  color: md3Colors.surface.onSurfaceVariant,
                  mb: 1,
                  display: 'block',
                }}
              >
                分块数量
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => handleSegmentCountChange(position, singleConfig.segmentCount - 1)}
                  disabled={singleConfig.segmentCount <= 2}
                  sx={{ width: 32, height: 32 }}
                >
                  <Remove fontSize="small" />
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
                      fontSize: '14px',
                    },
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleSegmentCountChange(position, singleConfig.segmentCount + 1)}
                  disabled={singleConfig.segmentCount >= 8}
                  sx={{ width: 32, height: 32 }}
                >
                  <Add fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* 分块标签 */}
            <Box>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 500,
                  color: md3Colors.surface.onSurfaceVariant,
                  mb: 1,
                  display: 'block',
                }}
              >
                分块标签（点击数字设置当前位置）
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {singleConfig.segmentLabels.slice(0, singleConfig.segmentCount).map((label, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={index + 1}
                      size="small"
                      color={singleConfig.activeIndex === index ? 'primary' : 'default'}
                      onClick={() => handleActiveIndexChange(position, index)}
                      sx={{ width: 32, height: 24, fontSize: '11px', cursor: 'pointer' }}
                    />
                    <TextField
                      size="small"
                      value={label}
                      onChange={(e) => handleLabelChange(position, index, e.target.value)}
                      placeholder={`步骤${index + 1}`}
                      fullWidth
                      sx={{
                        '& .MuiInputBase-root': {
                          height: 32,
                          fontSize: '13px',
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
    <Box sx={{ borderTop: '1px solid', borderColor: md3Colors.surface.outlineVariant }}>
      {/* 标题栏 */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          '&:hover': { backgroundColor: md3Colors.surface.surfaceContainerHighest },
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              color: md3Colors.surface.onSurface,
              letterSpacing: '0.5px',
            }}
          >
            进度条设置
          </Typography>
          {isTopEnabled && (
            <Chip
              label={`上${config.top.segmentCount}段`}
              size="small"
              color="primary"
              sx={{ height: 18, fontSize: '9px' }}
            />
          )}
          {isBottomEnabled && (
            <Chip
              label={`下${config.bottom.segmentCount}段`}
              size="small"
              color="secondary"
              sx={{ height: 18, fontSize: '9px' }}
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {expanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
        </Box>
      </Box>

      {/* 展开内容 */}
      <Collapse in={expanded}>
        <Box sx={{ px: 2, pb: 2 }}>
          {/* 卡片数量选择 */}
          {onCardCountChange && totalCards && totalCards >= 2 && (
            <Box sx={{ mb: 2 }}>
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
                卡片数量
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
                          p: 1,
                          borderRadius: 1,
                          backgroundColor: isSelected ? md3Colors.surface.surfaceContainerHigh : md3Colors.surface.surfaceContainer,
                          border: isSelected ? `1px solid ${md3Colors.primary.main}` : '1px solid transparent',
                        }}
                      >
                        {/* 页面按钮 */}
                        <Chip
                          label={count === 1 ? '总览' : `分点${count-1}`}
                          size="small"
                          variant={isSelected ? 'filled' : 'outlined'}
                          color={isSelected ? 'primary' : 'default'}
                          onClick={() => onSelectCardWithProgress?.(count)}
                          sx={{ cursor: 'pointer', minWidth: 60 }}
                        />
                        
                        {/* 上进度条位置选择 */}
                        {config.top.show && onSelectCardWithProgress && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Typography variant="caption" sx={{ fontSize: '10px', color: md3Colors.surface.onSurfaceVariant }}>
                              上
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 0.25 }}>
                              {Array.from({ length: topSegmentCount }, (_, idx) => (
                                <Box
                                  key={idx}
                                  onClick={() => onSelectCardWithProgress(count, idx, savedIndices.bottom)}
                                  sx={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: '50%',
                                    backgroundColor: savedIndices.top === idx ? md3Colors.primary.main : md3Colors.surface.surfaceContainerHighest,
                                    border: `1px solid ${savedIndices.top === idx ? md3Colors.primary.main : md3Colors.surface.outlineVariant}`,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '8px',
                                    color: savedIndices.top === idx ? '#fff' : md3Colors.surface.onSurfaceVariant,
                                    '&:hover': {
                                      backgroundColor: savedIndices.top === idx ? md3Colors.primary.dark : md3Colors.surface.surfaceContainerHighest,
                                    },
                                  }}
                                >
                                  {idx + 1}
                                </Box>
                              ))}
                            </Box>
                          </Box>
                        )}
                        
                        {/* 下进度条位置选择 */}
                        {config.bottom.show && onSelectCardWithProgress && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Typography variant="caption" sx={{ fontSize: '10px', color: md3Colors.surface.onSurfaceVariant }}>
                              下
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 0.25 }}>
                              {Array.from({ length: bottomSegmentCount }, (_, idx) => (
                                <Box
                                  key={idx}
                                  onClick={() => onSelectCardWithProgress(count, savedIndices.top, idx)}
                                  sx={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: '50%',
                                    backgroundColor: savedIndices.bottom === idx ? md3Colors.secondary.main : md3Colors.surface.surfaceContainerHighest,
                                    border: `1px solid ${savedIndices.bottom === idx ? md3Colors.secondary.main : md3Colors.surface.outlineVariant}`,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '8px',
                                    color: savedIndices.bottom === idx ? '#fff' : md3Colors.surface.onSurfaceVariant,
                                    '&:hover': {
                                      backgroundColor: savedIndices.bottom === idx ? md3Colors.secondary.dark : md3Colors.surface.surfaceContainerHighest,
                                    },
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

          <Divider sx={{ mb: 2 }} />

          {/* 标签页切换 */}
          <Tabs
            value={activeTab}
            onChange={(_, value) => setActiveTab(value)}
            variant="fullWidth"
            sx={{
              mb: 2,
              minHeight: 36,
              '& .MuiTabs-flexContainer': {
                gap: 1,
              },
            }}
          >
            <Tab
              label={`顶部${isTopEnabled ? ' ✓' : ''}`}
              value="top"
              sx={{
                minHeight: 36,
                fontSize: '13px',
                textTransform: 'none',
              }}
            />
            <Tab
              label={`底部${isBottomEnabled ? ' ✓' : ''}`}
              value="bottom"
              sx={{
                minHeight: 36,
                fontSize: '13px',
                textTransform: 'none',
              }}
            />
          </Tabs>

          {/* 根据标签页显示对应编辑器 */}
          {activeTab === 'top' && renderSingleProgressBarEditor('top')}
          {activeTab === 'bottom' && renderSingleProgressBarEditor('bottom')}

          <Divider sx={{ my: 2, borderColor: md3Colors.surface.outlineVariant }} />

          {/* 重置按钮 */}
          <Button
            size="small"
            startIcon={<Restore fontSize="small" />}
            onClick={handleReset}
            sx={{ alignSelf: 'flex-start', fontSize: '12px' }}
            fullWidth
            variant="outlined"
          >
            重置为默认
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
};

export default ProgressBarControl;
