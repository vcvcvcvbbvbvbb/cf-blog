# ✨ 绝绝子！零成本搭建你的极简赛博空间 | 0 门槛 1 分钟闪电部署

> 这是一个为**纯粹写作**而生的个人博客模板。基于 **Vite + React + Tailwind CSS** 构建，无需数据库，通过 Markdown 驱动，实现极致的加载速度与优雅的阅读体验。

---

## 🔥 为什么选择本项目？
*   **💸 零元购**: 配合 Cloudflare Pages，终身免费，无需服务器费用。
*   **⚡ 闪电快**: 静态导出，全球 CDN 分发，秒开网页。
*   **🖋️ 写作爽**: 只需写 Markdown 丢进文件夹，网站自动更新。
*   **🎨 随心改**: 内置主题换色、背景透明度调节、侧边栏实时背景切换。
*   **🏷️ 多标签**: 每篇文章支持添加多个标签，分类检索更方便。

---

## 🚀 部署方式 (根据您的程度选择)

本项目支持多种部署方式，您可以根据自己的技术水平选择最适合的一种：

### 🧊 模式一：极简部署 (小白/新手推荐)
**特点**：无需安装任何开发环境，完全在浏览器内通过鼠标操作完成，终身免费。

**1. 准备项目代码**
*   登录您的 [GitHub](https://github.com/) 账号（没有请注册）。
*   找到本项目仓库，点击右上角的 **Fork** 按钮。
*   在弹出页面点击 **Create fork**，这会将代码复制一份到您自己的仓库中。

**2. 在 Cloudflare Pages 部署 (魔法开始的地方)**
*   访问 [Cloudflare 控制台](https://dash.cloudflare.com/) 并登录。
*   在左侧菜单选择 **Workers & Pages** -> **Create application**。
*   切换到 **Pages** 选项卡，点击 **Connect to Git**。
*   选择您的 GitHub 账号，并选中刚才 Fork 的项目，点击 **Begin setup**。
*   在“Build settings”中配置如下：
    *   **Framework preset**: 选 `none`。
    *   **Build command**: 输入 `npm run build`。
    *   **Build output directory**: 输入 `dist`。
*   点击 **Save and Deploy**，等待 1-2 分钟，您的网站就正式上线了！

**3. 如何添加文章与修改信息？**
*   **修改个人信息**：点击您 GitHub 仓库中的 `src/user-config.ts` 文件，点击右上角的“铅笔”图标进行编辑，修改名称、头像、透明度等。
*   **添加文章**：点击 `content/posts/` 目录，点击 **Add file** -> **Create new file**。文件名以 `.md` 结尾。
*   **多标签技巧**：在文章头部的 `tags` 字段中，使用类似 `["标签1", "标签2"]` 的格式即可添加多个标签。
*   **关键点**：您在 GitHub 上执行的每一次改动，Cloudflare 都会自动帮你同步到线上网站！

---

### 💻 模式二：极客部署 (有电脑基础/本地调试)
**特点**：在本地进行复杂的排版与预览，通过命令行管理项目。

**1. 环境配置 (Windows 用户推荐 WSL)**
*   打开终端执行 `wsl --install` 安装 Ubuntu。
*   在 Ubuntu 中执行 `sudo apt update && sudo apt install nodejs npm` (推荐使用 Node 20+)。
*   **PS**: 若 WSL 密码丢失，请询问 [DeepSeek](https://chat.deepseek.com/) 寻找“WSL 重置密码方法”。

**2. 本地调试**
*   使用 **VSCode** 打开项目。
*   推荐安装 **Markdown All in One** 或 **Markdown Preview Enhanced** 插件以便实时预览。
*   在项目根目录运行 `npm install` 安装依赖。
*   运行 `npm run dev` 启动本地预览 (http://localhost:3000)。

**3. 同步到 GitHub**
*   本地修改完成后，使用 `git add .`、`git commit -m "update"`、`git push` 将改动推送到 GitHub，线上网站会自动刷新。

---

### 🛡️ 模式三：专业部署 (VPS 独立托管)
**特点**：完全掌控服务器环境，适合希望自行管理域名与 SSL 的用户。

**1. 准备工作**
*   拥有一个 Linux VPS (如 Ubuntu/Debian)。
*   安装 Node.js 和 Nginx。

**2. 构建项目**
*   在本地或 VPS 上执行 `npm run build`。
*   这会生成一个 `dist` 文件夹，里面包含了所有静态网页文件。

**3. 配置 Nginx**
*   将 `dist` 目录上传到服务器（如 `/var/www/blog`）。
*   修改 Nginx 配置文件：
    ```nginx
    server {
        listen 80;
        server_name yourdomain.com;
        location / {
            root /var/www/blog;
            index index.html;
            try_files $uri $uri/ /index.html;
        }
    }
    ```
*   重启 Nginx (`sudo systemctl restart nginx`)。

---

## 🎨 快速自定义指引

本项目极其强调“配置与内容分离”，适合小白快速上手：
*   **基础设置**: 修改 `src/user-config.ts`。您可以修改博主姓名、头像，或通过 `THEME_COLOR` 一键换色，还可以调整 `SITE_BG_OPACITY` 透明度。
*   **高级背景**: 
    *   **初始背景**: 网站自带了一个精致的默认背景图（内置于代码中，无需配置）。
    *   **手动覆盖**: 您可以在运行网站后，通过侧边栏左下角的“背景图片”输入框实时更换。您的修改会保存在浏览器本地。
*   **文章管理**: 在 `content/posts/` 使用 Markdown 格式编写。
*   **素材管理**: 推荐将本地图片放入 `public/images/`，引用的路径为 `/images/文件名.jpg`。

---

## 🛠️ 未来功能扩展建议 (给开发者的进阶指南)

如果您有一定代码基础，并希望为这个博客添加更多功能，以下是一些可行的技术路径：

*   **💬 评论系统 (Comment System)**:
    *   **建议**: 推荐使用 [Giscus](https://giscus.app/zh-CN) 或 [Waline](https://waline.js.org/)。Giscus 基于 GitHub Discussions，完全免费且契合本项目风格。
    *   **实现**: 在文章详情页组件底部引入相应的 JS 脚本即可。
*   **🌍 多语言支持 (i18n)**:
    *   **建议**: 使用 `react-i18next`。
    *   **实现**: 为 `user-config.ts` 中的文本提供多语言版本，并添加一个切换语言的按钮。
*   **🔐 文章加密 (Post Encryption)**:
    *   **建议**: 使用 `crypto-js` 对 Markdown 内容进行 AES 加密。
    *   **实现**: 在预处理脚本中检测 `.md` 头部是否含有 `password` 字段，若有则加密内容。前端读取时提示用户输入密码解绑。
*   **📊 阅读量统计**:
    *   **建议**: 使用 [LeanCloud](https://leancloud.cn/) 或 [Umami](https://umami.is/)。
    *   *实现*: 在页面加载时通过 API 调用计数值。

---

## ❤️ 致谢 (Acknowledgments)

本项目是一个“AI 协作开发”的实验性成果。特别感谢 **Gemini 3 Flash Preview** 模型与 **Google AI Studio** 平台，它们让我能够以“零代码”的方式，仅通过高质量的提示词引导便完成了整个项目的构建。

在整个开发过程中，我坚持使用以下核心指令指导 AI 创作：
> “我对本项目的实际技术栈不了解，请你不要揣测我的意图，请你以负责任的态度，在实际修改前给我可行的解决方案，并征求我的意见。”

这种“对话式开发”的模式，让非技术背景的创作者也能拥有属于自己的、高品质的赛博空间。

---

## 📄 许可证
本项目基于 MIT 许可证开源。您可以自由复刻、修改并使用。
