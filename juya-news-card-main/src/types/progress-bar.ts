/**
 * 进度条配置
 */
export interface ProgressBarConfig {
  /** 顶部进度条 */
  top: SingleProgressBarConfig;
  /** 底部进度条 */
  bottom: SingleProgressBarConfig;
}

/**
 * 单个进度条配置
 */
export interface SingleProgressBarConfig {
  /** 是否显示 */
  show: boolean;
  /** 分块数量 */
  segmentCount: number;
  /** 分块标签 */
  segmentLabels: string[];
  /** 当前激活索引 */
  activeIndex: number;
}

/**
 * 默认进度条配置
 */
export const DEFAULT_PROGRESS_BAR_CONFIG: ProgressBarConfig = {
  top: {
    show: false,
    segmentCount: 3,
    segmentLabels: ['背景', '现状', '展望'],
    activeIndex: 0,
  },
  bottom: {
    show: false,
    segmentCount: 3,
    segmentLabels: ['背景', '现状', '展望'],
    activeIndex: 0,
  },
};

/**
 * 进度条预设
 */
export interface ProgressBarPreset {
  id: string;
  name: string;
  segmentCount: number;
  defaultLabels: string[];
}

/**
 * 进度条预设列表
 */
export const PROGRESS_BAR_PRESETS: ProgressBarPreset[] = [
  { id: 'three', name: '三段式', segmentCount: 3, defaultLabels: ['背景', '现状', '展望'] },
  { id: 'four', name: '四段式', segmentCount: 4, defaultLabels: ['引言', '分析', '案例', '结论'] },
  { id: 'five', name: '五段式', segmentCount: 5, defaultLabels: ['背景', '问题', '方案', '实施', '总结'] },
  { id: 'timeline', name: '时间线', segmentCount: 4, defaultLabels: ['过去', '现在', '未来', '愿景'] },
];

/**
 * 复制进度条配置为JSON字符串
 */
export function copyProgressBarConfig(config: ProgressBarConfig): string {
  return JSON.stringify(config, null, 2);
}

/**
 * 从JSON字符串导入进度条配置
 */
export function importProgressBarConfig(json: string): ProgressBarConfig | null {
  try {
    const parsed = JSON.parse(json);
    // 基本验证
    if (parsed.top && parsed.bottom) {
      return parsed as ProgressBarConfig;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * 复制单个进度条配置为JSON字符串
 */
export function copySingleProgressBarConfig(config: SingleProgressBarConfig): string {
  return JSON.stringify(config, null, 2);
}

/**
 * 从JSON字符串导入单个进度条配置
 */
export function importSingleProgressBarConfig(json: string): SingleProgressBarConfig | null {
  try {
    const parsed = JSON.parse(json);
    // 基本验证
    if (typeof parsed.show === 'boolean' &&
        typeof parsed.segmentCount === 'number' &&
        Array.isArray(parsed.segmentLabels) &&
        typeof parsed.activeIndex === 'number') {
      return parsed as SingleProgressBarConfig;
    }
    return null;
  } catch {
    return null;
  }
}
