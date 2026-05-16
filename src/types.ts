export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  image?: string;
  tags?: string[];
  slug: string;
}

export interface PostDetail {
  metadata: PostMetadata;
  content: string;
}
