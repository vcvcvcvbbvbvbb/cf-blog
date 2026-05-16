# 🖋️ 我的个人博客模板 (Minimalist Static Blog)

这是一个为**纯粹写作**而生的个人博客模板。基于 **Vite + React + Tailwind CSS** 构建，无需数据库，通过 Markdown 驱动，实现极致的加载速度与优雅的阅读体验。

---

## 🚀 部署方式 (根据您的程度选择)

本项目支持多种部署方式，您可以根据自己的技术水平选择最适合的一种：

### 🧊 模式一：极简部署 (小白/新手推荐)
**特点**：无需安装任何开发环境，完全在浏览器内通过鼠标操作完成，终身免费。

**1. 准备项目代码**
*   登录您的 [GitHub](https://github.com/) 账号（没有请注册）。
*   找到本项目仓库，点击右上角的 **Fork** 按钮。
*   在弹出页面点击 **Create fork**，这会将代码复制一份到您自己的仓库中。

**2. 在 Cloudflare Pages 部署**
*   访问 [Cloudflare 控制台](https://dash.cloudflare.com/) 并登录。
*   在左侧菜单选择 **Workers & Pages** -> **Create application**。
*   切换到 **Pages** 选项卡，点击 **Connect to Git**。
*   选择您的 GitHub 账号，并选中刚才 Fork 的项目，点击 **Begin setup**。
*   在“Build settings”中配置如下：
    *   **Framework preset**: 选 `Vite`。
    *   **Build command**: 输入 `npm run build`。
    *   **Build output directory**: 输入 `dist`。
*   点击 **Save and Deploy**，等待 1-2 分钟，您的网站就通过公网 URL 访问了！

**3. 如何添加文章与修改信息？**
*   点击您 GitHub 仓库中的 `src/user-config.ts` 文件，点击右上角的“铅笔”图标进行编辑，修改您的博主名称、头像等，完成后点击 **Commit changes**。
*   点击 `content/posts/` 目录，点击 **Add file** -> **Create new file**。
*   文件名以 `.md` 结尾（如 `hello-world.md`），参考其他文件写好标题、日期等信息。
*   **关键点**：您在 GitHub 上执行的每一次 **Commit changes** 操作，Cloudflare 都会自动感知并帮您更新网站！

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

本项目极其强调“配置与内容分离”：
*   **全局设置**: 修改 `src/user-config.ts`。可以修改 `THEME_COLOR` 一键换色，或者调整 `SITE_BG_OPACITY` 来改变背景图片的透明度。
*   **文章管理**: 在 `content/posts/` 编写 Markdown。
*   **本地图片**: 放入 `public/images/`，引用的路径为 `/images/文件名.jpg`。

---

## 📄 许可证
本项目基于 MIT 许可证开源。您可以自由复刻、修改并使用。
