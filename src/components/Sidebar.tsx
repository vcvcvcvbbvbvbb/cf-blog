import React from 'react';
import { Home, Archive, Tag, User, Github, Twitter, Youtube, MessageSquare, Sun, Moon, ExternalLink, Image as ImageIcon, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface SidebarProps {
  isOpen: boolean; // 侧边栏是否开启状态
  onClose: () => void; // 关闭侧边栏的回调函数
  activeTab: string; // 当前活动的导航标签
  setActiveTab: (tab: string) => void; // 设置活动导航标签的回调函数
  isDark: boolean; // 是否处于深色模式
  toggleDark: () => void; // 切换深色/浅色模式的回调函数
  bgImage: string; // 自定义背景图片 URL
  setBgImage: (url: string) => void; // 设置背景图片的回调函数
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeTab, setActiveTab, isDark, toggleDark, bgImage, setBgImage }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'archives', label: 'Archives', icon: Archive },
    { id: 'tags', label: 'Tags', icon: Tag },
    { id: 'about', label: 'About', icon: User },
  ];

  const recommendedLinks = [
    { label: 'GitHub', icon: Github, url: 'https://github.com' },
    { label: 'Discord', icon: MessageSquare, url: 'https://discord.com' },
    { label: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
    { label: 'YouTube', icon: Youtube, url: 'https://youtube.com' },
  ];

  return (
    <aside className={cn(
      "fixed top-0 left-0 h-screen w-64 border-r border-gray-300 dark:border-zinc-800 bg-[#d8d8d8]/95 dark:bg-[#181818]/98 backdrop-blur-xl flex flex-col p-8 transition-all duration-300 z-50",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      {/* Mobile Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200 transition-colors lg:hidden"
      >
        <X size={20} />
      </button>

      {/* Profile Section */}
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="w-24 h-24 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg ring-4 ring-white dark:ring-zinc-800">
          JD
        </div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Jane Doe</h1>
        <p className="text-xs text-gray-500 dark:text-zinc-500 mt-1 font-medium">Creative Developer & Writer</p>
      </div>

      {/* Main Navigation */}
      <nav className="space-y-1 mb-8">
        <p className="px-4 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">Menu</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200",
              activeTab === item.id 
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none"
                : "text-zinc-700 dark:text-zinc-400 hover:bg-gray-200/50 dark:hover:bg-zinc-800/50"
            )}
          >
            <item.icon className={cn("w-5 h-5 mr-3", activeTab === item.id ? "text-white" : "text-gray-400 dark:text-zinc-500")} />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Recommended Links Section */}
      <div className="space-y-1">
        <p className="px-4 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">Recommended</p>
        {recommendedLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-400 rounded-xl hover:bg-white dark:hover:bg-zinc-800 hover:shadow-sm group transition-all duration-200"
          >
            <div className="flex items-center">
              <link.icon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-indigo-500 transition-colors" />
              {link.label}
            </div>
            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300" />
          </a>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="mt-auto space-y-4 pt-6 border-t border-gray-100 dark:border-zinc-900">
        <div className="px-4">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500 flex items-center">
            <ImageIcon size={10} className="mr-1" /> Background
          </p>
          <input 
            type="text" 
            placeholder="Image URL..."
            value={bgImage}
            onChange={(e) => setBgImage(e.target.value)}
            className="w-full text-[10px] bg-white/40 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-800 rounded-lg p-2 focus:ring-1 focus:ring-indigo-500 outline-hidden transition-all text-zinc-700 dark:text-zinc-400"
          />
        </div>

        <button 
          onClick={toggleDark}
          className="w-full flex items-center justify-center py-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all group"
        >
          {isDark ? (
            <Sun size={20} className="group-hover:text-yellow-500 transition-colors" />
          ) : (
            <Moon size={20} className="group-hover:text-indigo-500 transition-colors" />
          )}
          <span className="ml-2 text-xs font-semibold uppercase tracking-[0.15em]">
            {isDark ? 'Light' : 'Dark'} Mode
          </span>
        </button>
      </div>
    </aside>
  );
};
