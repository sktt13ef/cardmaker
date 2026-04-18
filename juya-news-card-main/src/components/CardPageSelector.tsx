import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { ViewAgenda } from '@mui/icons-material';
import { ProgressBarConfig } from '../types/progress-bar';

interface CardPageSelectorProps {
  config: ProgressBarConfig;
  totalCards?: number;
  selectedCardIndex?: number | null;
  onPageProgressBarIndices?: Record<number, { top: number; bottom: number }>;
  onSelectCardWithProgress?: (count: number, topIndex?: number, bottomIndex?: number) => void;
}

const CardPageSelector: React.FC<CardPageSelectorProps> = ({
  config,
  totalCards,
  selectedCardIndex,
  onPageProgressBarIndices,
  onSelectCardWithProgress,
}) => {
  return (
    <Box
      sx={{
        width: 260,
        flexShrink: 0,
        bgcolor: '#FDFCFA',
        borderRight: '1px solid #E8E6E1',
        borderLeft: '1px solid #E8E6E1',
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
            background: 'linear-gradient(135deg, #C4A882, #B8986E)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <ViewAgenda sx={{ color: '#FFFFFF', fontSize: 18 }} />
          </Box>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#2D2A26', letterSpacing: '0.02em' }}>
              页面选择
            </Typography>
            <Typography variant="caption" sx={{ color: '#9E9A94', fontSize: '0.7rem' }}>
              选择卡片与进度位置
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        {onSelectCardWithProgress && totalCards && totalCards >= 2 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
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
                    onClick={() => onSelectCardWithProgress(count)}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      background: isSelected ? 'linear-gradient(135deg, #FFFFFF 0%, #FAFAF8 100%)' : 'transparent',
                      border: `1.5px solid ${isSelected ? '#C4A882' : 'transparent'}`,
                      boxShadow: isSelected ? '0 2px 8px rgba(196,168,130,0.1)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: isSelected ? 'linear-gradient(135deg, #FFFFFF 0%, #FAFAF8 100%)' : '#F5F4F0',
                      },
                    }}
                  >
                    {/* Page label */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box
                        sx={{
                          width: 22,
                          height: 22,
                          borderRadius: '50%',
                          background: isSelected ? 'linear-gradient(135deg, #C4A882, #B8986E)' : '#E8E6E1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 1.25,
                          flexShrink: 0,
                        }}
                      >
                        <Typography sx={{ fontSize: 10, fontWeight: 700, color: isSelected ? '#fff' : '#9E9A94' }}>
                          {count}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontSize: '0.9rem', fontWeight: isSelected ? 600 : 500, color: isSelected ? '#2D2A26' : '#6B6660' }}>
                        {count === 1 ? '总览' : `要点 ${count - 1}`}
                      </Typography>
                    </Box>

                    {/* Progress bar controls */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      {config.top.show && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Typography sx={{ fontSize: 9, fontWeight: 700, color: '#B8A88A', letterSpacing: '0.08em' }}>
                            上
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.3 }}>
                            {Array.from({ length: topSegmentCount }, (_, idx) => (
                              <Box
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSelectCardWithProgress(count, idx, savedIndices.bottom);
                                }}
                                sx={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: '50%',
                                  bgcolor: savedIndices.top === idx ? '#4a90d9' : '#F0EEEA',
                                  border: `1.5px solid ${savedIndices.top === idx ? '#4a90d9' : '#E0DED9'}`,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: 9,
                                  fontWeight: 600,
                                  color: savedIndices.top === idx ? '#fff' : '#9E9A94',
                                  transition: 'all 0.15s ease',
                                  '&:hover': {
                                    bgcolor: savedIndices.top === idx ? '#3a7fc9' : '#E8E6E1',
                                  },
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
                          <Typography sx={{ fontSize: 9, fontWeight: 700, color: '#8A9AB8', letterSpacing: '0.08em' }}>
                            下
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.3 }}>
                            {Array.from({ length: bottomSegmentCount }, (_, idx) => (
                              <Box
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSelectCardWithProgress(count, savedIndices.top, idx);
                                }}
                                sx={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: '50%',
                                  bgcolor: savedIndices.bottom === idx ? '#48bb78' : '#F0EEEA',
                                  border: `1.5px solid ${savedIndices.bottom === idx ? '#48bb78' : '#E0DED9'}`,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: 9,
                                  fontWeight: 600,
                                  color: savedIndices.bottom === idx ? '#fff' : '#9E9A94',
                                  transition: 'all 0.15s ease',
                                  '&:hover': {
                                    bgcolor: savedIndices.bottom === idx ? '#38a868' : '#E8E6E1',
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
                  </Box>
                );
              });
            })()}
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10, gap: 1.5 }}>
            <Box sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              bgcolor: '#F0EEEA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <ViewAgenda sx={{ fontSize: 24, color: '#C4C0BB' }} />
            </Box>
            <Typography variant="body2" sx={{ color: '#9E9A94', textAlign: 'center', fontSize: '0.85rem' }}>
              请先生成内容<br />以显示页面选项
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CardPageSelector;