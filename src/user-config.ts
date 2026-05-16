import { Home, Archive, Tag, User, MessageCircle, Tv, Share2, HelpCircle } from 'lucide-react';

/**
 * ==========================================
 *           网站基础信息配置
 * ==========================================
 */

// 1. 网站标题（显示在浏览器标签页上）
export const SITE_TITLE = "张三的个人博客";

// 2. 网站名称（显示在侧边栏顶部）
export const BLOG_NAME = "张三的个人博客";

// 3. 网站描述（用于搜索引擎优化）
export const BLOG_DESCRIPTION = "一个基于 Vite + React 的极简静态博客。";


/**
 * ==========================================
 *           博主个人信息配置
 * ==========================================
 */

// 4. 用户名
export const AUTHOR_NAME = "张三";

// 5. 职业称号/简介
export const AUTHOR_TITLE = "一个热爱生活的开发者";

// 6. 头像图片路径
// 可以使用远程链接，或者将图片放入 public/images/ 后使用 "/images/文件名.jpg"
export const AUTHOR_AVATAR = "https://w.wallhaven.cc/full/rq/wallhaven-rqjokj.png";


/**
 * ==========================================
 *           侧边栏菜单与链接
 * ==========================================
 */

// 7. 导航菜单
export const MENU_ITEMS = [
  { id: 'home', label: '首页', icon: Home },
  { id: 'archives', label: '归档', icon: Archive },
  { id: 'tags', label: '标签', icon: Tag },
  { id: 'about', label: '关于', icon: User },
];

// 8. 推荐/社交链接（您可以根据需要添加任意数量的链接）
//注意：如果您使用了新的 Lucide 图标，记得在文件顶部 import 它
export const RECOMMENDED_LINKS = [
  { label: '微信', icon: MessageCircle, url: '#' },
  { label: '哔哩哔哩', icon: Tv, url: 'https://www.bilibili.com' },
  { label: '微博', icon: Share2, url: 'https://weibo.com' },
  { label: '知乎', icon: HelpCircle, url: 'https://www.zhihu.com' },
];


/**
 * ==========================================
 *           “关于我”页面详细配置
 * ==========================================
 */

export const ABOUT_PAGE_CONFIG = {
  name: AUTHOR_NAME,
  title: AUTHOR_TITLE,
  image: "https://w.wallhaven.cc/full/rq/wallhaven-rqjokj.png", // 背景大图
  description: `
你好！我是${AUTHOR_NAME}。

这里是我的个人空间，记录我的学习、思考和生活点滴。
我热爱技术，也喜欢探索生活中的各种可能性。
希望这里的内容能给你带来一些启发。
  `.trim()
};

/**
 * ==========================================
 *           网站主题色配置
 * ==========================================
 */

// 9. 主题色（主要用于按钮、链接、高亮背景）
export const THEME_COLOR = "#4f46e5"; // 默认 Indigo 600

// 10. 网站背景图片透明度（0.0 到 1.0 之间，数值越小，背景图越清晰）
// 建议：浅色模式 0.7-0.9，深色模式 0.8-0.95
export const SITE_BG_OPACITY = 0.5;
