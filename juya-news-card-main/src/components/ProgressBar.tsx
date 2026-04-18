import React from 'react';
import { SingleProgressBarConfig } from '../types/progress-bar';

interface ProgressBarProps {
  config: SingleProgressBarConfig;
  variant?: 'default' | 'minimal' | 'elegant' | 'modern';
  primaryColor?: string;
  backgroundColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  config,
  variant = 'default',
  primaryColor = '#2563eb',
  backgroundColor = '#e5e7eb',
}) => {
  if (!config.show) return null;

  const { segmentCount, segmentLabels, activeIndex } = config;

  const getVariantStyles = () => {
    switch (variant) {
      case 'minimal':
        return {
          container: {
            padding: '16px 40px',
            background: '#fff',
          },
          track: {
            height: 3,
            background: backgroundColor,
            borderRadius: 2,
          },
          segment: {
            borderRadius: 2,
          },
          label: {
            fontSize: '12px',
            fontWeight: 500,
            marginTop: '8px',
          },
        };
      case 'elegant':
        return {
          container: {
            padding: '20px 60px',
            background: 'linear-gradient(180deg, #fafafa 0%, #fff 100%)',
          },
          track: {
            height: 4,
            background: '#f0f0f0',
            borderRadius: 2,
          },
          segment: {
            borderRadius: 2,
          },
          label: {
            fontSize: '13px',
            fontWeight: 400,
            marginTop: '10px',
            letterSpacing: '0.5px',
          },
        };
      case 'modern':
        return {
          container: {
            padding: '24px 80px',
            background: '#fff',
          },
          track: {
            height: 6,
            background: backgroundColor,
            borderRadius: 3,
          },
          segment: {
            borderRadius: 3,
          },
          label: {
            fontSize: '14px',
            fontWeight: 600,
            marginTop: '12px',
          },
        };
      default:
        return {
          container: {
            padding: '20px 60px',
            background: '#fff',
          },
          track: {
            height: 4,
            background: backgroundColor,
            borderRadius: 2,
          },
          segment: {
            borderRadius: 2,
          },
          label: {
            fontSize: '13px',
            fontWeight: 500,
            marginTop: '10px',
          },
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      style={{
        width: '100%',
        boxSizing: 'border-box',
        ...styles.container,
      }}
    >
      {/* 进度条轨道 */}
      <div
        style={{
          width: '100%',
          ...styles.track,
          display: 'flex',
          position: 'relative',
        }}
      >
        {/* 已完成的部分 */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${((activeIndex + 1) / segmentCount) * 100}%`,
            background: primaryColor,
            ...styles.segment,
            transition: 'width 0.3s ease',
          }}
        />
        
        {/* 分段标记 */}
        {Array.from({ length: segmentCount - 1 }, (_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${((i + 1) / segmentCount) * 100}%`,
              top: 0,
              width: 2,
              height: '100%',
              background: '#fff',
              transform: 'translateX(-50%)',
            }}
          />
        ))}
      </div>

      {/* 标签 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: styles.label.marginTop,
        }}
      >
        {segmentLabels.slice(0, segmentCount).map((label, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: styles.label.fontSize,
              fontWeight: styles.label.fontWeight,
              letterSpacing: (styles.label as any).letterSpacing,
              color: index <= activeIndex ? primaryColor : '#9ca3af',
              transition: 'color 0.3s ease',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
