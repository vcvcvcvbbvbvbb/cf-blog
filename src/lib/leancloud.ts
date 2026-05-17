/** 
 * Author: adou | alivedou@outlook.com
 * LeanCloud 统计模块：用于实现无服务器的文章阅读量在线计数。
 */
import AV from 'leancloud-storage';
import { LEANCLOUD_CONFIG } from '@/blog.config';

let isInitialized = false;

/** 初始化 LeanCloud 服务 */
export const initLeanCloud = () => {
  if (isInitialized || !LEANCLOUD_CONFIG.enabled) return;
  
  try {
    AV.init({
      appId: LEANCLOUD_CONFIG.appId,
      appKey: LEANCLOUD_CONFIG.appKey,
      serverURL: LEANCLOUD_CONFIG.serverURL,
    });
    isInitialized = true;
  } catch (err) {
    console.error('LeanCloud 初始化失败，请检查配置:', err);
  }
};

/** 
 * 增加并追踪阅读量 
 * @param slug 文章的唯一标识符
 * @returns 更新后的阅读数值
 */
export const trackPageView = async (slug: string): Promise<number> => {
  if (!LEANCLOUD_CONFIG.enabled) return 0;
  initLeanCloud();

  try {
    const query = new AV.Query('Counter');
    query.equalTo('slug', slug);
    let counter: any = await query.first();

    if (!counter) {
      // 第一次访问时，创建一个新的记录
      const Counter = AV.Object.extend('Counter');
      counter = new Counter();
      counter.set('slug', slug);
      counter.set('views', 1);
    } else {
      // 已有记录，则在原有基础上自增 1
      counter.increment('views', 1);
    }

    const saved: any = await counter.save();
    return saved.get('views');
  } catch (err) {
    console.error('追踪阅读量失败:', err);
    return 0;
  }
};

/** 
 * 仅获取当前阅读量数值（不增加计数）
 */
export const getPageView = async (slug: string): Promise<number> => {
  if (!LEANCLOUD_CONFIG.enabled) return 0;
  initLeanCloud();

  try {
    const query = new AV.Query('Counter');
    query.equalTo('slug', slug);
    const counter: any = await query.first();
    return counter ? counter.get('views') : 0;
  } catch (err) {
    console.error('获取阅读量失败:', err);
    return 0;
  }
};
