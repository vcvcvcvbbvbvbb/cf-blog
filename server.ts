import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";
import matter from "gray-matter";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 文章存放目录
  const POSTS_DIR = path.join(process.cwd(), "content/posts");

  // 确保文章目录存在，如果为空则创建一个示例文章
  try {
    await fs.mkdir(POSTS_DIR, { recursive: true });
    const files = await fs.readdir(POSTS_DIR);
    if (files.length === 0) {
      await fs.writeFile(
        path.join(POSTS_DIR, "hello-world.md"),
        `---
title: Hello World
date: 2024-05-16
description: This is your first blog post.
image: https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop
tags: ["General", "Welcome"]
---
Welcome to my new blog! This project is built with React, Express, and inspired by the Hugo Stack theme.
      `
      );
    }
  } catch (err) {
    console.error("Failed to setup content directory:", err);
  }

  // API 路由：获取所有文章列表
  app.get("/api/posts", async (req, res) => {
    try {
      const files = await fs.readdir(POSTS_DIR);
      const posts = await Promise.all(
        files
          .filter(file => file.endsWith(".md"))
          .map(async (file) => {
            const content = await fs.readFile(path.join(POSTS_DIR, file), "utf-8");
            const { data } = matter(content);
            if (data.draft === true) return null; // 过滤草稿
            return {
              slug: file.replace(".md", ""),
              ...data,
            };
          })
      );
      // 过滤掉 null 并按日期降序排序
      const filteredPosts = posts
        .filter(p => p !== null)
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      res.json(filteredPosts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  // API 路由：根据 slug 获取单篇文章详情
  app.get("/api/posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const filePath = path.join(POSTS_DIR, `${slug}.md`);
      const fileContent = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      
      if (data.draft === true) {
        return res.status(404).json({ error: "Post is a draft" });
      }

      res.json({ metadata: data, content });
    } catch (error) {
      res.status(404).json({ error: "Post not found" });
    }
  });

  // Vite preview middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
