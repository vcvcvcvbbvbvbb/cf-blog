# AI Minimalist Blog

本项目是一个基于 **AI 驱动的极简个人博客系统**。它结合了传统的 Markdown 文档管理和现代 AI 能力（AI 总结、语义搜索），旨在为开发者提供一个既纯粹又智能的写作与阅读平台。

---

## 🚀 部署指南 (复刻必读)

### 1. 必备环境
- **Node.js**: 18.0.0 或更高版本。
- **Package Manager**: npm, yarn 或 pnpm。
- **Gemini API Key (可选)**: 用于启用 AI 总结与智能搜索功能。

### 2. 如何申请 Gemini API Key (可选)
如果需要启用 AI 功能，请按照以下步骤操作：
1.  访问 [Google AI Studio](https://aistudio.google.com/app/apikey)。
2.  使用您的 Google 账号登录。
3.  点击 **"Create API key"** 按钮生成您的专属密钥。
4.  **备注**：Gemini API 提供免费层级（Free Tier），完全能够满足个人博客的日常使用。
5.  **重要说明**：**该 API Key 是可选的**。即使不配置，您依然可以正常使用博客的所有核心功能，包括：文章阅读、标签过滤、本地标题搜索等。仅“AI 一键总结”和“语义智能搜索”功能会处于禁用状态。

### 3. 本地部署步骤
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

### 4. 生产环境部署 (推荐：Cloudflare Pages)
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

### 5. 传统服务器部署 (备选)
如果您拥有 VPS 服务器：
1.  **构建**：本地或服务器执行 `npm run build`。
2.  **运行**：确保已安装 Node.js，执行 `npm run start`。
3.  **进程守护**：建议使用 PM2 保持后台运行：`pm2 start dist/server.cjs --name ai-blog`。
