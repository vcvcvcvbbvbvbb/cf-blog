# AI Minimalist Blog - 项目全指南

## 一、 项目简介
本项目是一个基于 **AI 驱动的极简个人博客系统**。它结合了传统的 Markdown 文档管理和现代 AI 能力（AI 总结、语义搜索），旨在为开发者提供一个既纯粹又智能的写作与阅读平台。

---

## 二、 项目组织结构
项目采用全栈架构（React + Express），逻辑层次分明：

```text
├── content/               # 内容库
│   └── posts/            # Markdown 文章存放目录
├── server.ts             # 后端入口：负责文件读取、AI 接口转发、静态资源托管
├── src/                  # 前端源码
│   ├── components/       # UI 组件库
│   │   ├── Search.tsx    # AI + 本地双模搜索组件
│   │   ├── Sidebar.tsx   # 响应式侧边栏
│   │   └── PostCard.tsx  # 文章卡片展示
│   ├── App.tsx           # 前端主路由与状态管理
│   ├── types.ts          # 数据模型定义
│   └── index.css         # 全局样式（含 Tailwind 配置）
├── package.json          # 依赖与脚本
├── .env.example          # 环境变量模板
└── proposal.md           # 项目方案说明文档（本文件）
```

---

## 三、 技术方案与实现过程

### 1. 核心架构方案
*   **前端**：使用 **React 18** + **Vite** 构建，利用 **Tailwind CSS** 进行极致的响应式设计。使用 **Framer Motion** 实现丝滑的页面切换效果。
*   **后端**：基于 **Node.js (Express)**，通过 `fs` 模块直接读取文件系统中的 Markdown 文件，无需数据库，满足极简运维需求。
*   **AI 能力**：通过后端代理调用 **Google Gemini API**，实现文章摘要生成和基于语义的“智能搜索”。

### 2. 实现过程
*   **初期**：搭建基础 Express 服务器，实现 `/api/posts` 接口遍历本地目录并解析 Markdown 首部信息 (Front-matter)。
*   **中期**：设计响应式侧边栏布局，引入深色模式切换和自定义背景图片功能。
*   **后期**：集成 Gemini SDK，为长文章提供“一键总结”按钮，并优化搜索算法（支持忽略大小写的标签过滤与 AI 全文检索）。

---

## 四、 核心功能说明
*   **Markdown 云原生**：直接在 `content/posts` 增加 `.md` 文件即可发布。
*   **AI 文章总结**：利用 Gemini 提取长文精华，提升阅读效率。
*   **双模搜索**：支持本地标题匹配及 AI 深度语义搜索。
*   **多端适配**：针对移动端优化，侧边栏支持抽屉式开关。
*   **高度定制化**：支持用户端自定义背景图及全站深色模式。

---

## 五、 部署指南 (复刻必读)

### 1. 必备环境
- **Node.js**: 18.0.0 或更高版本。
- **Package Manager**: npm, yarn 或 pnpm。
- **Gemini API Key**: [获取地址](https://aistudio.google.com/app/apikey)。

### 2. 本地部署步骤
1.  **克隆/下载项目**：获取源代码并进入文件夹。
2.  **安装依赖**：
    ```bash
    npm install
    ```
3.  **配置环境变量**： 
    - 复制 `.env.example` 为 `.env`。
    - 在 `.env` 中填写您的 `GEMINI_API_KEY=你的密钥`。
4.  **启动开发环境**：
    ```bash
    npm run dev
    ```
5.  **访问项目**：打开 [http://localhost:3000](http://localhost:3000)。

### 3. 生产环境部署 (推荐：Cloudflare Pages)
这是最推荐的部署方式，简单高效且性能优越：

1.  **GitHub 托管**：首先将您的项目代码推送到个人 **GitHub** 仓库。
2.  **关联 Cloudflare**：
    - 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)，进入 **Workers & Pages** 页面。
    - 点击 **Create** -> **Pages** -> **Connect to Git**，选择您的博客仓库。
3.  **构建配置**：
    - **Framework preset**: 选择 `Vite`。
    - **Build command**: `npm run build`
    - **Build output directory**: `dist`
4.  **环境变量 (核心步奏)**：
    - 在 **Environment variables** (构建阶段) 中点击 **Add variable**。
    - 变量名输入 `GEMINI_API_KEY`，值填入您的 Gemini API 密钥。
5.  **完成部署**：
    - 点击 **Save and Deploy**，等待构建完成后，您将获得一个 `*.pages.dev` 的二级域名供全球访问。

### 4. 传统服务器部署 (备选)
如果您拥有 VPS 服务器：
1.  **构建**：本地或服务器执行 `npm run build`。
2.  **运行**：确保已安装 Node.js，执行 `npm run start`。
3.  **进程守护**：建议使用 PM2 保持后台运行：`pm2 start dist/server.cjs --name ai-blog`。

---

## 六、 逻辑总结
本项目遵循“数据即文件”的思想，降低了博客维护的负担，同时引入 AI 作为交互增强手段。结构清晰，非常适合作为个人技术博客或知识库的复刻模板。
