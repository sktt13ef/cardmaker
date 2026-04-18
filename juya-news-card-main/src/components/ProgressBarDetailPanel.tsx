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
} from '@mui/icons-material';
import { md3Colors } from '../theme/md3-theme';
import {
  ProgressBarConfig,
  SingleProgressBarConfig,
  DEFAULT_PROGRESS_BAR_CONFIG,
  PROGRESS_BAR_PRESETS,
} from '../types/progress-bar';

interface ProgressBarDetailPanelProps {
  config: ProgressBarConfig;
  onChange: (config: ProgressBarConfig) => void;
}

type TabPosition = 'top' | 'bottom';

const ProgressBarDetailPanel: React.FC<ProgressBarDetailPanelProps> = ({
  config,
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState<TabPosition>('top');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const EXAMPLE_CONFIG: ProgressBarConfig = {
    top: {
      show: true,
      segmentCount: 4,
      segmentLabels: ['Background', 'Analysis', 'Findings', 'Summary'],
      activeIndex: 1,
    },
    bottom: {
      show: true,
      segmentCount: 5,
      segmentLabels: ['Overview', 'Point 1', 'Point 2', 'Point 3', 'Summary'],
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
      setSnackbarMessage('Example config copied to clipboard');
      setSnackbarOpen(true);
    }).catch(() => {
      setSnackbarMessage('Copy failed');
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
    setSnackbarMessage('Config exported as JSON');
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
          setSnackbarMessage('Config imported successfully');
          setSnackbarOpen(true);
        } else {
          setSnackbarMessage('Invalid config format');
          setSnackbarOpen(true);
        }
      } catch {
        setSnackbarMessage('Parse failed');
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
          setSnackbarMessage('Imported from clipboard');
          setSnackbarOpen(true);
        } else {
          setSnackbarMessage('Invalid clipboard content');
          setSnackbarOpen(true);
        }
      } catch {
        setSnackbarMessage('Parse failed');
        setSnackbarOpen(true);
      }
    }).catch(() => {
      setSnackbarMessage('Cannot read clipboard');
      setSnackbarOpen(true);
    });
  };

  const renderSingleProgressBarEditor = (position: TabPosition) => {
    const singleConfig = config[position];
    const isEnabled = singleConfig.show;

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
            Show {position === 'top' ? 'Top' : 'Bottom'} Bar
          </Typography>
          <Switch
            size="small"
            checked={isEnabled}
            onChange={() => handleToggleShow(position)}
          />
        </Box>

        {isEnabled && (
          <>
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 500, color: md3Colors.surface.onSurfaceVariant, mb: 1, display: 'block' }}>
                Presets
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

            <Box>
              <Typography variant="caption" sx={{ fontWeight: 500, color: md3Colors.surface.onSurfaceVariant, mb: 1, display: 'block' }}>
                Active Position
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
                    '& .MuiInputBase-root': { height: 32, fontSize: '14px' },
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

            <Box>
              <Typography variant="caption" sx={{ fontWeight: 500, color: md3Colors.surface.onSurfaceVariant, mb: 1, display: 'block' }}>
                Segment Count
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
                    '& .MuiInputBase-root': { height: 32, fontSize: '14px' },
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

            <Box>
              <Typography variant="caption" sx={{ fontWeight: 500, color: md3Colors.surface.onSurfaceVariant, mb: 1, display: 'block' }}>
                Segment Labels
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
                      placeholder={`Step ${index + 1}`}
                      fullWidth
                      sx={{
                        '& .MuiInputBase-root': { height: 32, fontSize: '13px' },
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
        width: 360,
        flexShrink: 0,
        bgcolor: md3Colors.surface.surfaceContainerLow,
        borderLeft: '1px solid',
        borderColor: md3Colors.surface.outlineVariant,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 2, pb: 1.5, borderBottom: '1px solid', borderColor: md3Colors.surface.outlineVariant }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Settings sx={{ color: md3Colors.primary.main, fontSize: 20 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: md3Colors.surface.onSurface }}>
            Progress Bar Details
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={{ fontWeight: 500, color: md3Colors.surface.onSurfaceVariant, mb: 1, display: 'block' }}>
            Import / Export
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<Code fontSize="small" />}
              onClick={handleCopyExample}
              sx={{ fontSize: '11px', flex: 1, minWidth: 0 }}
            >
              Copy Example
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<Download fontSize="small" />}
              onClick={handleExportConfig}
              sx={{ fontSize: '11px', flex: 1, minWidth: 0 }}
            >
              Export
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<Upload fontSize="small" />}
              onClick={() => fileInputRef.current?.click()}
              sx={{ fontSize: '11px', flex: 1, minWidth: 0 }}
            >
              Import
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<ContentCopy fontSize="small" />}
              onClick={handlePasteConfig}
              sx={{ fontSize: '11px', flex: 1, minWidth: 0 }}
            >
              Paste
            </Button>
          </Box>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportConfig} style={{ display: 'none' }} />
        </Box>

        <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)} variant="fullWidth" sx={{ mb: 2, minHeight: 36, '& .MuiTabs-flexContainer': { gap: 1 } }}>
          <Tab label="Top Bar" value="top" sx={{ minHeight: 36, fontSize: '13px', textTransform: 'none' }} />
          <Tab label="Bottom Bar" value="bottom" sx={{ minHeight: 36, fontSize: '13px', textTransform: 'none' }} />
        </Tabs>

        {activeTab === 'top' && renderSingleProgressBarEditor('top')}
        {activeTab === 'bottom' && renderSingleProgressBarEditor('bottom')}

        <Divider sx={{ my: 2 }} />

        <Button size="small" startIcon={<Restore fontSize="small" />} onClick={handleReset} sx={{ fontSize: '12px' }} fullWidth variant="outlined">
          Reset to Default
        </Button>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" variant="filled" sx={{ fontSize: '13px' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProgressBarDetailPanel;
