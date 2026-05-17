---
title: "CF-blog：零门槛 1 分钟闪电部署指南"
date: "2026-05-17"
draft: false
description: "这是一份专门为小白准备的极简个人博客部署指南，带你从零开始拥有属于自己的感性空间。"
tags: ["教程", "部署", "CyberLog"]
image: "https://i.urusai.cc/Pws4B.jpg"
---

## ✨ 为什么选择 CF-blog？

这是一个为 **纯粹写作** 而生的个人博客模板。基于 **Vite + React + Tailwind CSS** 构建，无需数据库，通过 Markdown 驱动，实现极致的加载速度与优雅的阅读体验。

项目开源地址：[https://github.com/alivedou/cf-blog](https://github.com/alivedou/cf-blog)

---

## 🛠️ 部署前的准备 (小白清单)

在开始之前，你只需要准备两个免费账号：
1.  **GitHub 账号**: 用来存放你的代码。 [点击注册](https://github.com/join)
2.  **Cloudflare 账号**: 用来发布你的网站。 [点击注册](https://dash.cloudflare.com/sign-up)

---

## 🚀 闪电部署步骤

### 1. 获取代码 (Fork)
访问 [仓库主页](https://github.com/alivedou/cf-blog)，点击右上角的 **Fork** 按钮。

**💡 贴心建议**：在 Fork 页面，你可以将 `Repository name` 修改为您喜欢的名字（比如 `myblog`或者其他你喜欢的名字）。这不仅是你的代码库，更是你数字世界的名字。点击 **Create fork**，这一份蓝图就正式存入了你的 GitHub 账号。

### 2. 极速上线 (Cloudflare Pages)
1.  登录 [Cloudflare 控制台](https://dash.cloudflare.com/)。
2.  进入 `Workers & Pages` -> `Create application` -> `Pages` -> `Connect to Git`。
3.  授权 GitHub，选择你刚刚 Fork 的 `cf-blog` 仓库。
4.  **配置构建参数**:
    *   构建命令: `npm run build`
    *   输出目录: `dist`
5.  点击“保存并部署”。几秒钟后，属于你的博客网站就诞生的！

---

## 🎨 个性化你的花园

### 修改基本信息
在 GitHub 网页上直接修改项目根目录下的 `blog.config.ts` 文件。你可以即时更改：
*   **SITE_TITLE**: 网站在浏览器上的名字。
*   **AUTHOR_NAME**: 你的大名。
*   **THEME_COLOR**: 主题颜色（如 orange, indigo, emerald）。

### 开始写作
在 `content/posts/` 目录下新建 `.md` 文件。每一篇文章头部都需要包含这段配置（Frontmatter）：

```markdown
---
title: "我的第一篇博客"
date: "2026-05-17"
tags: ["生活", "分享"]
---
```

---

## 🛠️ 进阶：自动化更新日期
如果你在本地使用 VS Code 写作，可以利用内置脚本省去手动改日期的麻烦。
按下 `Ctrl + Shift + B` (Windows) 或 `Cmd + Shift + B` (Mac)，选择任务，脚本会自动帮你同步日期！

## ❤️ 联系博主
如果在部署中遇到任何“墙”，欢迎骚扰：[alivedou@outlook.com](mailto:alivedou@outlook.com)
或者直接在 GitHub 提交 Issue。
