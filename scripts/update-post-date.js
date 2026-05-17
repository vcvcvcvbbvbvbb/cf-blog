/**
 * Author: adou | alivedou@outlook.com
 * 该脚本用于自动更新 Markdown 文章中的 date 字段为当前修改日期。
 * 配合 VS Code "Run on Save" 或 Task 使用，实现极客化写作体验。
 */
import fs from 'fs';
import path from 'path';

// 获取传入的文件路径
const filePath = process.argv[2];

if (!filePath) {
  process.exit(1);
}

const absolutePath = path.resolve(process.cwd(), filePath);

// 只处理 posts 文件夹下的 markdown 文件
if (!absolutePath.includes(path.join('src', 'posts')) || !absolutePath.endsWith('.md')) {
  process.exit(0);
}

try {
  let content = fs.readFileSync(absolutePath, 'utf-8');
  
  // 获取当前日期 (YYYY-MM-DD 格式)
  const today = new Date().toISOString().split('T')[0];
  
  // 正则匹配 frontmatter 中的 date 字段
  // 例如：date: 2024-01-01
  const dateRegex = /^(date:\s*).*$/m;
  
  if (dateRegex.test(content)) {
    const newContent = content.replace(dateRegex, `$1${today}`);
    
    // 如果内容有变动，则写回文件
    if (newContent !== content) {
      fs.writeFileSync(absolutePath, newContent, 'utf-8');
      console.log(`[CyberLog] 自动更新文章日期为: ${today}`);
    }
  }
} catch (error) {
  console.error(`[CyberLog] 自动更新日期失败: ${error.message}`);
}
