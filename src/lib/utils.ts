/** 
 * Author: adou | alivedou@outlook.com
 * 这是一个通用的样式类合并工具，用于动态组合 Tailwind CSS 类名。
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn 工具函数：结合了 clsx 和 tailwind-merge，
 * 能够解决 Tailwind 类名冲突（如多个 py- 冲突），并支持条件渲染类名。
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
