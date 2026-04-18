#!/usr/bin/env python3
"""
批量为模板文件添加进度条支持
"""
import os
import re
import glob

# 模板目录
TEMPLATES_DIR = r"c:\Users\ka\Desktop\juya-news-card-main\juya-news-card-main\src\templates"

# 已经支持进度条的6个线条模板（不需要修改）
EXCLUDED_TEMPLATES = [
    'lineMinimal.tsx',
    'lineGridCard.tsx',
    'lineFrame.tsx',
    'lineAccent.tsx',
    'lineBox.tsx',
    'lineDivider.tsx',
]

# 进度条渲染代码模板
PROGRESS_BAR_CODE = '''
  // 进度条配置
  const topConfig = progressBarConfig?.top;
  const bottomConfig = progressBarConfig?.bottom;

  const renderProgressBar = (position: 'top' | 'bottom') => {
    const config = position === 'top' ? topConfig : bottomConfig;
    if (!config?.show) return null;
    const { segmentCount, segmentLabels, activeIndex } = config;

    return (
      <div style={{
        width: '100%',
        padding: position === 'top' ? '20px 60px 12px' : '12px 60px 20px',
        background: '{bg_color}',
        borderBottom: position === 'top' ? '1px solid #e5e7eb' : undefined,
        borderTop: position === 'bottom' ? '1px solid #e5e7eb' : undefined,
      }}>
        <div style={{ width: '100%', height: 4, background: '#e5e7eb', borderRadius: 2, display: 'flex', position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, height: '100%',
            width: `${{((activeIndex + 1) / segmentCount) * 100}}%`,
            background: '{progress_color}', borderRadius: 2, transition: 'width 0.3s ease',
          }} />
          {Array.from({{ length: segmentCount - 1 }}, (_, i) => (
            <div key={i} style={{
              position: 'absolute', left: `${{((i + 1) / segmentCount) * 100}}%`,
              top: 0, width: 2, height: '100%', background: '#fff', transform: 'translateX(-50%)',
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          {segmentLabels.slice(0, segmentCount).map((label, index) => (
            <div key={index} style={{
              flex: 1, textAlign: 'center', fontSize: '12px', fontWeight: 500,
              color: index <= activeIndex ? '{progress_color}' : '#9ca3af', transition: 'color 0.3s ease',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}>{label}</div>
          ))}
        </div>
      </div>
    );
  };
'''

def get_template_files():
    """获取所有需要修改的模板文件"""
    all_tsx = glob.glob(os.path.join(TEMPLATES_DIR, '*.tsx'))
    templates = []
    for f in all_tsx:
        basename = os.path.basename(f)
        if basename not in EXCLUDED_TEMPLATES and not basename.startswith('index'):
            templates.append(f)
    return templates

def detect_colors(content):
    """检测模板的主色调和背景色"""
    # 默认颜色
    bg_color = '#fff'
    progress_color = '#2563eb'

    # 尝试检测背景色
    bg_patterns = [
        r'background(?:Color)?:\s*[\'"`](#[0-9a-fA-F]{3,6})[\'"`]',
        r'background(?:Color)?:\s*[\'"`](#[0-9a-fA-F]{3,6})[\'"`]',
        r'background:\s*[\'"`](#[0-9a-fA-F]{3,6})[\'"`]',
        r'backgroundColor:\s*[\'"`](#[0-9a-fA-F]{3,6})[\'"`]',
    ]

    for pattern in bg_patterns:
        match = re.search(pattern, content)
        if match:
            bg = match.group(1)
            if bg.lower() not in ['#ffffff', '#fff', '#000000', '#000']:
                bg_color = bg
                break

    # 尝试检测主色调（从icon颜色或主题色）
    color_patterns = [
        r'icon:\s*[\'"`](#[0-9a-fA-F]{3,6})[\'"`]',
        r'color:\s*[\'"`](#[0-9a-fA-F]{3,6})[\'"`]',
        r'background:\s*[\'"`](#[0-9a-fA-F]{3,6})[\'"`]',
    ]

    for pattern in color_patterns:
        matches = re.findall(pattern, content)
        for c in matches:
            if c.lower() not in ['#ffffff', '#fff', '#000000', '#000', '#333', '#666', '#999']:
                progress_color = c
                break
        if progress_color != '#2563eb':
            break

    return bg_color, progress_color

def add_progress_bar_to_template(filepath):
    """为单个模板添加进度条支持"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 检查是否已经支持进度条
    if 'progressBarConfig' in content:
        print(f"  [跳过] 已支持进度条: {os.path.basename(filepath)}")
        return

    # 检测颜色
    bg_color, progress_color = detect_colors(content)

    # 1. 添加 ProgressBarConfig 导入
    if 'ProgressBarConfig' not in content:
        # 在最后一个 import 后添加
        import_pattern = r"(import\s+.*?from\s+.*?;\n)(?!\s*import)"
        last_import_match = None
        for match in re.finditer(r"import\s+.*?from\s+.*?;", content):
            last_import_match = match

        if last_import_match:
            import_stmt = "import { ProgressBarConfig } from '../types/progress-bar';\n"
            pos = last_import_match.end()
            content = content[:pos] + import_stmt + content[pos:]

    # 2. 修改 Props 接口
    # 查找 interface XXXProps
    props_pattern = r"interface\s+(\w+)Props\s*\{[^}]*\}"
    props_match = re.search(props_pattern, content)
    if props_match:
        props_block = props_match.group(0)
        if 'progressBarConfig' not in props_block:
            # 在接口中添加 progressBarConfig
            new_props = props_block.rstrip('}').strip() + "\n  progressBarConfig?: ProgressBarConfig;\n}"
            content = content.replace(props_block, new_props)

    # 3. 修改组件函数参数
    # 查找 const Component: React.FC<XXXProps> = ({ data, scale }) =>
    func_pattern = r"(const\s+(\w+):\s*React\.FC<\w+Props>\s*=\s*\(\{[^}]*?)\}\)"
    func_match = re.search(func_pattern, content)
    if func_match:
        func_def = func_match.group(1)
        if 'progressBarConfig' not in func_def:
            # 在参数中添加 progressBarConfig
            new_func = func_def.rstrip() + ", progressBarConfig })"
            content = content.replace(func_match.group(0), new_func + func_match.group(0)[len(func_match.group(1)):])

    # 4. 添加进度条渲染代码
    # 在 return 语句前添加 renderProgressBar 函数
    progress_code = PROGRESS_BAR_CODE.format(bg_color=bg_color, progress_color=progress_color)

    # 查找 return ( 或 return 语句
    return_pattern = r"(\s+return\s*\(?\s*<div\s+style=\{\{[^}]*width:\s*1920)"
    return_match = re.search(return_pattern, content)

    if return_match and 'renderProgressBar' not in content:
        # 在 return 前插入进度条代码
        insert_pos = return_match.start()
        content = content[:insert_pos] + progress_code + content[insert_pos:]

    # 5. 修改最外层 div 添加 flex 布局
    # 查找 style={{ width: 1920, height: 1080, transform: ... }}
    outer_div_pattern = r'style=\{\{\s*width:\s*1920,\s*height:\s*1080,\s*transform:\s*`scale\(\$\{scale\}\)`,\s*transformOrigin:\s*[\'"]top left[\'"],\s*overflow:\s*[\'"]hidden[\'"]\s*\}\}'
    outer_match = re.search(outer_div_pattern, content)
    if outer_match:
        old_style = outer_match.group(0)
        new_style = 'style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: \'top left\', overflow: \'hidden\', display: \'flex\', flexDirection: \'column\' }}'
        content = content.replace(old_style, new_style, 1)

    # 6. 添加顶部进度条
    # 在修改后的 div 后添加顶部进度条
    top_progress = "      {/* 顶部进度条 */}\n      {renderProgressBar('top')}\n\n      <div style={{ flex: 1, overflow: 'hidden' }}>"

    # 查找第一个 <div 之后的位置
    first_div_pattern = r"(style=\{\{\s*width:\s*1920,\s*height:\s*1080,\s*transform:\s*`scale\(\$\{scale\}\)`,\s*transformOrigin:\s*[\'"]top left[\'"],\s*overflow:\s*[\'"]hidden[\'"],\s*display:\s*[\'"]flex[\'"],\s*flexDirection:\s*[\'"]column[\'"]\s*\}\}>\s*)"
    first_div_match = re.search(first_div_pattern, content)
    if first_div_match and "{renderProgressBar('top')}" not in content:
        insert_after = first_div_match.end()
        content = content[:insert_after] + top_progress + content[insert_after:]

    # 7. 添加底部进度条并关闭 flex div
    # 在 </div> (最外层) 前添加底部进度条
    bottom_progress = "      </div>\n\n      {/* 底部进度条 */}\n      {renderProgressBar('bottom')}\n"

    # 查找最后的 </div> 闭合标签
    # 这是一个简化的处理，可能需要更精确的定位
    last_div_pattern = r"(\s+</div>\s*</div>\s*\);\s*\};\s*export\s+const)"
    last_match = re.search(last_div_pattern, content)
    if last_match and "{renderProgressBar('bottom')}" not in content:
        old_ending = last_match.group(1)
        new_ending = bottom_progress + "    </div>\n  );\n};\n\nexport const"
        content = content.replace(old_ending, new_ending)

    # 8. 修改 render 函数
    # 查找 render: (data, scale) =>
    render_pattern = r"render:\s*\(\s*data\s*,\s*scale\s*\)\s*=>"
    render_match = re.search(render_pattern, content)
    if render_match:
        old_render = render_match.group(0)
        new_render = "render: (data, scale, progressBarConfig) =>"
        content = content.replace(old_render, new_render)

    # 9. 修改 React.createElement 或 JSX 调用，传递 progressBarConfig
    # 查找 React.createElement(Component, { data, scale })
    create_pattern = r"React\.createElement\((\w+),\s*\{\s*data\s*,\s*scale\s*\}\)"
    create_match = re.search(create_pattern, content)
    if create_match:
        old_create = create_match.group(0)
        component_name = create_match.group(1)
        new_create = f"React.createElement({component_name}, {{ data, scale, progressBarConfig }})"
        content = content.replace(old_create, new_create)

    # 查找 <Component data={data} scale={scale} />
    jsx_pattern = r"<(\w+)\s+data=\{data\}\s+scale=\{scale\}\s*/?>"
    jsx_match = re.search(jsx_pattern, content)
    if jsx_match:
        old_jsx = jsx_match.group(0)
        component_name = jsx_match.group(1)
        new_jsx = f"<{component_name} data={{data}} scale={{scale}} progressBarConfig={{progressBarConfig}} />"
        content = content.replace(old_jsx, new_jsx)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  [完成] {os.path.basename(filepath)}")

def main():
    templates = get_template_files()
    print(f"找到 {len(templates)} 个需要修改的模板文件")

    for filepath in templates:
        try:
            add_progress_bar_to_template(filepath)
        except Exception as e:
            print(f"  [错误] {os.path.basename(filepath)}: {e}")

    print("\n处理完成!")

if __name__ == '__main__':
    main()
