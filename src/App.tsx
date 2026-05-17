import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { PostCard } from './components/PostCard';
import { SearchBar } from './components/Search';
import { PostMetadata, PostDetail } from './types';
import Markdown from 'react-markdown';
import { ChevronLeft, Share2, MessageCircle, Sun, Moon, Menu as MenuIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
// @ts-ignore - 预构建脚本生成的文件，可能在首次运行前不存在
import postsData from './posts-data.json';
import { ABOUT_PAGE_CONFIG, AUTHOR_NAME, SITE_TITLE, THEME_COLOR, SITE_BG_OPACITY } from './user-config';

export default function App() {
  const [posts, setPosts] = useState<PostMetadata[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostDetail | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  // 默认背景图 (小白不容易找到并修改这里)
  const DEFAULT_BG = "https://i.urusai.cc/Pws4B.jpg";

  const [bgImage, setBgImage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bg-image') || "";
    }
    return "";
  });
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // 提示信息处理
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      showNotification("链接已复制到剪贴板！");
    }).catch(() => {
      showNotification("分享失败，请直接复制地址栏链接");
    });
  };

  const handleMessage = () => {
    showNotification("评论功能正在开发中...");
  };

  // 移动端/响应式侧边栏处理：屏幕较小时默认关闭，较大时默认开启
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize(); // 初始检查
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  // 监听深色模式变化并应用到 html 根元素
  useEffect(() => {
    document.title = SITE_TITLE;
    // 设置主题色变量
    document.documentElement.style.setProperty('--theme-primary', THEME_COLOR);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // 监听背景图片变化并保存到本地存储
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bg-image', bgImage);
    }
  }, [bgImage]);

  // 获取所有文章列表
  const fetchPosts = async () => {
    try {
      const resp = await fetch('/api/posts');
      if (!resp.ok) throw new Error('API not available');
      const data = await resp.json();
      setPosts(data);
      setLoading(false);
    } catch (err) {
      console.log('Using static posts data fallback');
      setPosts(postsData.map((p: any) => p.metadata) as PostMetadata[]);
      setLoading(false);
    }
  };

  // 处理文章点击事件：获取详情并切换视图
  const handlePostClick = async (slug: string) => {
    setLoading(true);
    try {
      const resp = await fetch(`/api/posts/${slug}`);
      if (!resp.ok) throw new Error('API not available');
      const data = await resp.json();
      setSelectedPost(data);
      window.scrollTo(0, 0); // 滚动到顶部
    } catch (err) {
      console.log('Using static post detail fallback');
      const staticPost = (postsData as unknown as PostDetail[]).find(p => p.slug === slug);
      if (staticPost) {
        setSelectedPost(staticPost);
        window.scrollTo(0, 0);
      }
    } finally {
      setLoading(false);
    }
  };

  // 切换深色/浅色模式
  const toggleDark = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-primary/20 dark:selection:bg-primary/30">
      {/* 移动端侧边栏遮罩层 */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-xs z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* 浮动侧边栏开关按钮 */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={cn(
          "fixed top-6 right-24 lg:left-8 lg:right-auto z-50 p-3 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-gray-200 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-all text-gray-600 dark:text-zinc-400 lg:flex items-center space-x-2",
          isSidebarOpen ? "lg:opacity-0 pointer-events-none" : "lg:opacity-100"
        )}
      >
        <MenuIcon size={20} />
      </button>


      <div 
        className="transition-colors duration-500 min-h-screen relative"
        style={{
          backgroundImage: (bgImage || DEFAULT_BG) ? `linear-gradient(rgba(${isDark ? '18, 18, 18' : '255, 255, 255'}, ${SITE_BG_OPACITY}), rgba(${isDark ? '18, 18, 18' : '255, 255, 255'}, ${SITE_BG_OPACITY})), url("${bgImage || DEFAULT_BG}")` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundColor: isDark ? '#121212' : '#f4f4f5'
        }}
      >
        <Sidebar 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setSelectedPost(null);
            setSelectedTag(null);
            if (window.innerWidth < 1024) setIsSidebarOpen(false);
          }}
          isDark={isDark}
          toggleDark={toggleDark}
          bgImage={bgImage}
          setBgImage={setBgImage}
        />

        <main className={cn(
          "transition-all duration-300 p-6 md:p-12 max-w-7xl mx-auto",
          isSidebarOpen ? "lg:ml-64" : "ml-0"
        )}>
          <AnimatePresence mode="wait">
            {selectedPost ? (
              <motion.div
                key="post-detail"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="flex items-center text-sm font-bold text-gray-500 hover:text-primary transition-colors mb-10 group"
                >
                  <ChevronLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
                  返回文章列表
                </button>

                {selectedPost.metadata.image && (
                  <img 
                    src={selectedPost.metadata.image} 
                    alt={selectedPost.metadata.title}
                    className="w-full h-80 object-cover rounded-3xl shadow-2xl mb-12"
                    referrerPolicy="no-referrer"
                  />
                )}

                <header className="mb-12">
                  <div className="flex items-center space-x-3 mb-6">
                    {(selectedPost.metadata.tags || []).map(tag => (
                      <button 
                        key={tag} 
                        onClick={() => {
                          setSelectedPost(null);
                          setActiveTab('tags');
                          setSelectedTag(tag);
                        }}
                        className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary/20 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <h1 className="text-5xl font-black text-gray-900 dark:text-gray-100 leading-tight">
                    {selectedPost.metadata.title}
                  </h1>
                  <div className="mt-8 flex items-center justify-between pb-8 border-b border-gray-100 dark:border-zinc-900">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-linear-to-r from-primary to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                        {AUTHOR_NAME}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-zinc-100">{AUTHOR_NAME}</p>
                        <p className="text-xs text-gray-500">{selectedPost.metadata.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-400">
                      <button onClick={handleShare} className="hover:text-primary transition-colors"><Share2 size={20} /></button>
                      <button onClick={handleMessage} className="hover:text-primary transition-colors"><MessageCircle size={20} /></button>
                    </div>
                  </div>
                </header>

                <div className="prose prose-lg dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200 leading-relaxed">
                  <div className="markdown-body">
                    <Markdown>{selectedPost.content}</Markdown>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="post-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {activeTab === 'about' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-3xl mx-auto"
                  >
                    <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl mb-10">
                      <img 
                        src={ABOUT_PAGE_CONFIG.image} 
                        alt="About Me Banner" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-10">
                        <div>
                          <h2 className="text-4xl font-black text-white">{ABOUT_PAGE_CONFIG.name}</h2>
                          <p className="text-white/80 font-medium">{ABOUT_PAGE_CONFIG.title}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-zinc-800">
                      <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
                        {ABOUT_PAGE_CONFIG.description}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex flex-col mb-16">
                      <h1 className="text-6xl font-black text-gray-900 dark:text-gray-100 mb-4 tracking-tighter">
                        {activeTab === 'home' ? '探索故事' 
                         : activeTab === 'tags' ? (selectedTag ? `# ${selectedTag}` : '浏览标签')
                         : activeTab === 'archives' ? '归档'
                         : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                      </h1>
                      <p className="text-xl text-gray-500 dark:text-zinc-500 font-medium">
                        {activeTab === 'home' 
                          ? '分享关于设计、技术与创意过程的思考。' 
                          : activeTab === 'tags' ? (selectedTag ? `标签为 "${selectedTag}" 的文章` : '浏览所有话题。')
                          : activeTab === 'archives' ? '回顾过往的文章动态。'
                          : `正在探索 ${activeTab}。`}
                      </p>
                      {activeTab === 'tags' && selectedTag && (
                        <button 
                          onClick={() => setSelectedTag(null)}
                          className="mt-4 text-sm font-bold text-primary hover:opacity-80 flex items-center"
                        >
                          <X size={14} className="mr-1" /> 清除筛选
                        </button>
                      )}
                    </div>

                    <SearchBar posts={postsData as unknown as PostDetail[]} onResultClick={handlePostClick} />

                    {loading ? (
                      <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      <>
                        {activeTab === 'archives' ? (
                          <div className="space-y-12 max-w-3xl mx-auto py-10">
                            {Object.entries(
                              posts.reduce((acc, post) => {
                                const date = new Date(post.date);
                                const year = date.getFullYear();
                                const month = date.getMonth() + 1; // 1-12
                                if (!acc[year]) acc[year] = {};
                                if (!acc[year][month]) acc[year][month] = [];
                                acc[year][month].push(post);
                                return acc;
                              }, {} as Record<number, Record<number, PostMetadata[]>>)
                            )
                            .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
                            .map(([year, months]) => (
                               <div key={year} className="relative pl-8 border-l-2 border-gray-200 dark:border-zinc-800 space-y-10">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-primary rounded-full border border-white dark:border-zinc-950" />
                                <h3 className="text-4xl font-black text-gray-900 dark:text-zinc-100 tracking-tight">{year}</h3>
                                
                                <div className="space-y-12">
                                  {Object.entries(months as Record<number, PostMetadata[]>)
                                    .sort(([monthA], [monthB]) => Number(monthB) - Number(monthA))
                                    .map(([month, monthPosts]) => (
                                      <div key={month} className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                          <span className="text-sm font-black text-primary px-2 py-0.5 bg-primary/5 rounded-md uppercase tracking-widest">
                                            {Number(month)}月
                                          </span>
                                          <div className="h-px flex-1 bg-linear-to-r from-gray-200/50 to-transparent dark:from-zinc-800/50" />
                                        </div>
                                        <div className="space-y-4 pl-4">
                                          {monthPosts.map((post) => (
                                            <div 
                                              key={post.slug} 
                                              onClick={() => handlePostClick(post.slug)}
                                              className="group cursor-pointer flex items-center space-x-4"
                                            >
                                              <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-600 uppercase tracking-tighter tabular-nums">
                                                {new Date(post.date).getDate().toString().padStart(2, '0')}
                                              </span>
                                              <h4 className="text-lg font-bold text-gray-700 dark:text-zinc-300 group-hover:text-primary transition-colors line-clamp-1">
                                                {post.title}
                                              </h4>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : activeTab === 'tags' && !selectedTag ? (
                          <div className="flex flex-wrap gap-4 py-10">
                            {Array.from(new Set(posts.flatMap(p => p.tags || []).map(t => t.toLowerCase()))).map(lowerTag => {
                              const originalTag = posts.flatMap(p => p.tags || []).find(t => t.toLowerCase() === lowerTag);
                              const count = posts.filter(p => p.tags?.some(t => t.toLowerCase() === lowerTag)).length;
                              return (
                                <button
                                  key={lowerTag}
                                  onClick={() => setSelectedTag(originalTag || lowerTag)}
                                  className="px-6 py-3 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md hover:border-primary transition-all flex items-center"
                                >
                                  <span className="font-bold text-gray-900 dark:text-zinc-100 mr-2">{originalTag || lowerTag}</span>
                                  <span className="text-xs text-gray-400 bg-gray-50 dark:bg-zinc-800 px-2 py-0.5 rounded-full">{count}</span>
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                            {posts.filter(post => {
                              if (activeTab === 'home') return true;
                              if (activeTab === 'tags' && selectedTag) {
                                return post.tags?.some(t => t.toLowerCase() === selectedTag.toLowerCase());
                              }
                              return true;
                            }).length > 0 ? posts.filter(post => {
                              if (activeTab === 'home') return true;
                              if (activeTab === 'tags' && selectedTag) {
                                return post.tags?.some(t => t.toLowerCase() === selectedTag.toLowerCase());
                              }
                              return true;
                            }).map(post => (
                              <PostCard key={post.slug} post={post} onClick={handlePostClick} />
                            )) : (
                              <div className="col-span-full py-20 text-center">
                                <p className="text-gray-500 text-lg">该分类下暂无文章。</p>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* 提示通知 UI */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[100] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 rounded-2xl shadow-2xl font-bold flex items-center space-x-2 border border-white/10 dark:border-black/5"
          >
            <span className="text-sm">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
