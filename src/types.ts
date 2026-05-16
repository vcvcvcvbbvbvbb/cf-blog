export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  image?: string;
  tags?: string[];
  slug: string;
}

export interface PostDetail {
  slug: string;
  metadata: PostMetadata;
  content: string;
}
