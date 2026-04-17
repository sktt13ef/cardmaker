# Juya News Card

> 一个基于 AI 的智能内容卡片生成工具，支持 Markdown 和 JSON 双格式输入，一键生成精美可视化卡片。

## ✨ 核心特性

### 1. 双格式输入支持
- **Markdown 格式**：直接粘贴文章，AI 自动提取要点
- **JSON 格式**：精确控制卡片内容，适合结构化数据

### 2. 美化模板系统
相比原版，本版本对 UI 进行了全面美化：
- **11+ 精选模板**：大气优雅、极简纯净、现代卡片、材质设计、暖调卡片、玻璃拟态、新拟态、便当格、扁平设计、瑞士风格、新闻卡片
- **优化字体层级**：标题、卡片标题、描述文字层次分明
- **响应式布局**：自动适配不同内容长度
- **精致配色方案**：每套模板都有精心设计的配色

### 3. 大纲拆分功能
输入一个大纲，可以：
- **一键生成总览图**：展示完整大纲结构
- **自动拆分细节图**：每个要点生成独立卡片
- **批量导出**：支持 SVG、PNG、HTML 多种格式

### 4. 灵活的 AI 接入
- **本地 Ollama**：适合简单内容，保护隐私
- **线上 AI 接口**：支持 OpenAI、Claude、通义千问等，适合长文本

---

## 🚀 快速开始

### 环境要求
- Node.js >= 20
- npm >= 10

### 安装依赖

```bash
npm install
```

### 准备环境变量

```bash
cp .env.example .env
```

编辑 `.env`，至少配置以下 3 项：

```env
LLM_API_KEY=your-api-key
LLM_API_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4o-mini
```

### 安装 Playwright（首次运行必需）

```bash
npx playwright install
```

### 启动服务

```bash
npm run dev
```

访问 http://localhost:3000 即可使用。

---

## 📖 使用流程

### 方式一：本地 Ollama（简单内容）

适合短文本，保护数据隐私。

1. 配置 `.env` 使用本地模型：
   ```env
   LLM_API_BASE_URL=http://localhost:11434/v1
   LLM_MODEL=qwen2.5:7b
   ```

2. 启动 Ollama：
   ```bash
   ollama run qwen2.5:7b
   ```

3. 在网页输入内容，点击生成。

⚠️ **注意**：长文本（>2000字）容易超时失败。

---

### 方式二：线上 AI（推荐，适合长文本）

本地 Ollama 因算力限制，处理长文本容易超时。推荐将提示词粘贴到线上 AI 使用。

#### 步骤 1：获取系统提示词

系统提示词位于 `src/services/llm-prompt.ts`，或网页界面点击 "提示词" 按钮复制。

#### 步骤 2：粘贴到线上 AI

打开任意线上 AI（ChatGPT、Claude、Gemini、通义千问、DeepSeek 等）：

1. **粘贴系统提示词**
2. **粘贴你的文章**
3. **要求输出 JSON 格式**

#### 步骤 3：获取 JSON 输出

AI 会返回如下格式：

```json
{
  "mainTitle": "文章主标题",
  "cards": [
    {
      "title": "要点1",
      "desc": "详细描述...",
      "icon": "article"
    }
  ]
}
```

#### 步骤 4：导入生成卡片

- 切换到 "JSON 输入" 模式
- 粘贴 AI 生成的 JSON
- 点击 "生成卡片"

---

## 🎨 模板预览

| 模板 | 风格特点 |
|------|----------|
| **大气优雅** | 纯白背景，克制配色，清晰易读 |
| **极简纯净** | 去除一切非必要元素，大量留白 |
| **现代卡片** | 简洁几何形态，专业商务风格 |
| **材质设计** | 圆润柔和，Material Design 风格 |
| **暖调卡片** | 温暖舒适，暖色调配色 |
| **玻璃拟态** | 通透轻盈，半透明效果 |
| **新拟态** | 柔和立体，阴影驱动 |
| **便当格** | 模块化网格，Apple/Linear 风格 |
| **扁平设计** | 纯色无渐变，简洁明快 |
| **瑞士风格** | 国际主义设计，严谨网格 |
| **新闻卡片** | 专业新闻风格，清晰易读 |

---

## 🏗️ 部署方式

### Docker 部署（推荐）

```bash
# 准备环境变量
cp .env.example .env
# 编辑 .env 配置 LLM API 信息

# 启动
docker compose up --build
```

### Node.js 直接部署

```bash
npm install
npx playwright install
npm run build
npm start
```

### 生产环境（PM2）

```bash
npm install -g pm2
pm2 start npm --name "juya-news-card" -- start
pm2 save
pm2 startup
```

---

## 📝 输入格式示例

### Markdown 格式

```markdown
# 文章标题

## 要点一
详细描述内容...

## 要点二
详细描述内容...
```

### JSON 格式

```json
{
  "mainTitle": "文章主标题",
  "cards": [
    {
      "title": "卡片标题",
      "desc": "支持 <strong>加粗</strong> 和 <code>代码</code> 标签",
      "icon": "article"
    }
  ]
}
```

---

## ⚙️ 环境变量

### 必需配置

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `LLM_API_KEY` | LLM API 密钥 | `sk-xxx...` |
| `LLM_API_BASE_URL` | API 基础 URL | `https://api.openai.com/v1` |
| `LLM_MODEL` | 使用的模型 | `gpt-4o-mini` |

### 可选配置

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `PORT` | 服务端口 | `3000` |
| `LLM_TIMEOUT_MS` | LLM 请求超时 | `120000` |
| `MAX_INPUT_TEXT_CHARS` | 最大输入字符数 | `12000` |
| `API_BEARER_TOKEN` | API 认证令牌 | - |
| `ALLOW_UNAUTHENTICATED_WRITE` | 允许未认证写入 | `true` |

---

## 🔧 常用命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 运行生产版本
npm start

# 类型检查
npm run typecheck

# 生成模板元数据
npm run generate-meta

# Docker 构建运行
npm run docker:build
npm run docker:up
```

---

## 🐛 故障排查

### 本地 Ollama 超时
- 缩短输入文本
- 使用更大的模型
- 改用线上 AI

### Playwright 安装失败
```bash
npx playwright install chromium
```

### 端口被占用
```bash
PORT=3001 npm run dev
```

---

## 📂 项目结构

```
juya-news-card-main/
├── src/
│   ├── templates/      # 卡片模板（11+ 套）
│   ├── components/     # React 组件
│   ├── services/       # LLM 服务
│   └── utils/          # 工具函数
├── scripts/            # 工具脚本
├── public/             # 静态资源
├── .env.example        # 环境变量示例
├── docker-compose.yml  # Docker 配置
└── package.json        # 项目配置
```

---

## 📄 开源协议

MIT License

---

## 🤝 贡献

欢迎提交 Issue 和 PR！

---

> **轻量开源定位**：这是一个"可用优先"的普通开发者项目，适合快速分享思路与工具，不要求重度维护。
