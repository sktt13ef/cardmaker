# PowerShell script to add progress bar support to templates
$templatesDir = "c:\Users\ka\Desktop\juya-news-card-main\juya-news-card-main\src\templates"

# Excluded templates (already have progress bar)
$excluded = @('lineMinimal.tsx', 'lineGridCard.tsx', 'lineFrame.tsx', 'lineAccent.tsx', 'lineBox.tsx', 'lineDivider.tsx')

# Get all .tsx files
$files = Get-ChildItem -Path $templatesDir -Filter "*.tsx" | Where-Object { $_.Name -notin $excluded -and $_.Name -ne 'index.ts' -and $_.Name -ne 'types.ts' -and $_.Name -ne 'catalog.ts' -and $_.Name -ne 'client-registry.ts' -and $_.Name -ne 'runtime-resolver.ts' -and $_.Name -ne 'ssr-runtime.ts' }

Write-Host "Found $($files.Count) template files to process"

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8

    # Skip if already has progressBarConfig
    if ($content -match 'progressBarConfig') {
        Write-Host "  [SKIP] $($file.Name) - already has progress bar"
        continue
    }

    # Add ProgressBarConfig import
    if ($content -notmatch "import.*ProgressBarConfig.*from.*progress-bar") {
        # Find last import statement
        $lastImport = [regex]::Matches($content, "import\s+.*?from\s+.*?;").Value | Select-Object -Last 1
        if ($lastImport) {
            $importLine = "import { ProgressBarConfig } from '../types/progress-bar';"
            $content = $content.Replace($lastImport, "$lastImport`n$importLine")
        }
    }

    # Modify Props interface - add progressBarConfig
    $propsPattern = 'interface\s+(\w+)Props\s*\{([^}]*)\}'
    $propsMatch = [regex]::Match($content, $propsPattern)
    if ($propsMatch.Success) {
        $oldProps = $propsMatch.Value
        if ($oldProps -notmatch 'progressBarConfig') {
            $newProps = $oldProps.TrimEnd('}').Trim() + "`n  progressBarConfig?: ProgressBarConfig;`n}"
            $content = $content.Replace($oldProps, $newProps)
        }
    }

    # Modify component function parameters
    $funcPattern = '(const\s+(\w+):\s*React\.FC<\w+Props>\s*=\s*\(\{[^}]*?)\}\s*\)'
    $funcMatch = [regex]::Match($content, $funcPattern)
    if ($funcMatch.Success) {
        $oldFunc = $funcMatch.Groups[1].Value
        if ($oldFunc -notmatch 'progressBarConfig') {
            $newFunc = $oldFunc.TrimEnd() + ", progressBarConfig"
            $content = $content.Replace($oldFunc, $newFunc)
        }
    }

    # Add progress bar code before return statement
    $progressBarCode = @"

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
        background: '#fff',
        borderBottom: position === 'top' ? '1px solid #e5e7eb' : undefined,
        borderTop: position === 'bottom' ? '1px solid #e5e7eb' : undefined,
      }}>
        <div style={{ width: '100%', height: 4, background: '#e5e7eb', borderRadius: 2, display: 'flex', position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, height: '100%',
            width: `${((activeIndex + 1) / segmentCount) * 100}%`,
            background: '#2563eb', borderRadius: 2, transition: 'width 0.3s ease',
          }} />
          {Array.from({ length: segmentCount - 1 }, (_, i) => (
            <div key={i} style={{
              position: 'absolute', left: `${((i + 1) / segmentCount) * 100}%`,
              top: 0, width: 2, height: '100%', background: '#fff', transform: 'translateX(-50%)',
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          {segmentLabels.slice(0, segmentCount).map((label, index) => (
            <div key={index} style={{
              flex: 1, textAlign: 'center', fontSize: '12px', fontWeight: 500,
              color: index <= activeIndex ? '#2563eb' : '#9ca3af', transition: 'color 0.3s ease',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}>{label}</div>
          ))}
        </div>
      </div>
    );
  };

"@

    # Find return statement and insert progress bar code before it
    $returnPattern = '(\s+return\s*\(?\s*<div\s+style=\{\{[^}]*width:\s*1920)'
    $returnMatch = [regex]::Match($content, $returnPattern)
    if ($returnMatch.Success -and $content -notmatch 'renderProgressBar') {
        $insertPos = $returnMatch.Index
        $content = $content.Substring(0, $insertPos) + $progressBarCode + $content.Substring($insertPos)
    }

    # Modify outer div to use flex layout
    $outerDivPattern = 'style=\{\{\s*width:\s*1920,\s*height:\s*1080,\s*transform:\s*`scale\(\$\{scale\}\)`,\s*transformOrigin:\s*["\']top left["\'],\s*overflow:\s*["\']hidden["\']\s*\}\}'
    if ($content -match $outerDivPattern) {
        $oldStyle = $Matches[0]
        $newStyle = 'style={{ width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: ''top left'', overflow: ''hidden'', display: ''flex'', flexDirection: ''column'' }}'
        $content = $content -replace [regex]::Escape($oldStyle), $newStyle
    }

    # Add top progress bar after opening div
    $topProgress = "      {/* 顶部进度条 */}`n      {renderProgressBar('top')}`n`n      <div style={{ flex: 1, overflow: 'hidden' }}>"
    $firstDivPattern = '(style=\{\{\s*width:\s*1920,\s*height:\s*1080,\s*transform:\s*`scale\(\$\{scale\}\)`,\s*transformOrigin:\s*["\']top left["\'],\s*overflow:\s*["\']hidden["\'],\s*display:\s*["\']flex["\'],\s*flexDirection:\s*["\']column["\']\s*\}\}>\s*)'
    $firstDivMatch = [regex]::Match($content, $firstDivPattern)
    if ($firstDivMatch.Success -and $content -notmatch "renderProgressBar\('top'\)") {
        $insertAfter = $firstDivMatch.Index + $firstDivMatch.Length
        $content = $content.Substring(0, $insertAfter) + $topProgress + $content.Substring($insertAfter)
    }

    # Add bottom progress bar before closing
    $bottomProgress = "      </div>`n`n      {/* 底部进度条 */}`n      {renderProgressBar('bottom')}"
    $lastDivPattern = '(\s+</div>\s*</div>\s*\);\s*\};\s*export\s+const)'
    $lastMatch = [regex]::Match($content, $lastDivPattern)
    if ($lastMatch.Success -and $content -notmatch "renderProgressBar\('bottom'\)") {
        $oldEnding = $lastMatch.Groups[1].Value
        $newEnding = $bottomProgress + "`n    </div>`n  );`n};`n`nexport const"
        $content = $content.Replace($oldEnding, $newEnding)
    }

    # Modify render function
    $renderPattern = 'render:\s*\(\s*data\s*,\s*scale\s*\)\s*=>'
    if ($content -match $renderPattern) {
        $oldRender = $Matches[0]
        $newRender = 'render: (data, scale, progressBarConfig) =>'
        $content = $content -replace [regex]::Escape($oldRender), $newRender
    }

    # Modify React.createElement to pass progressBarConfig
    $createPattern = 'React\.createElement\((\w+),\s*\{\s*data\s*,\s*scale\s*\}\)'
    $createMatch = [regex]::Match($content, $createPattern)
    if ($createMatch.Success) {
        $oldCreate = $createMatch.Value
        $componentName = $createMatch.Groups[1].Value
        $newCreate = "React.createElement($componentName, { data, scale, progressBarConfig })"
        $content = $content.Replace($oldCreate, $newCreate)
    }

    # Modify JSX to pass progressBarConfig
    $jsxPattern = '<(\w+)\s+data=\{data\}\s+scale=\{scale\}\s*/?>'
    $jsxMatch = [regex]::Match($content, $jsxPattern)
    if ($jsxMatch.Success) {
        $oldJsx = $jsxMatch.Value
        $componentName = $jsxMatch.Groups[1].Value
        $newJsx = "<$componentName data={{data}} scale={{scale}} progressBarConfig={{progressBarConfig}} />"
        $content = $content.Replace($oldJsx, $newJsx)
    }

    # Write modified content
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "  [DONE] $($file.Name)"
}

Write-Host "`nBatch processing complete!"
