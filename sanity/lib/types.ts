import type { PortableTextBlock } from '@portabletext/react';

export type SanityImage = {
  _type: 'image';
  asset?: { _ref: string; _type: 'reference' };
  alt?: string;
  caption?: string;
};

export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  keywords?: string[];
  coverImage?: SanityImage;
};

export type Post = PostListItem & {
  body: PortableTextBlock[];
  _updatedAt: string;
  aiGenerated?: boolean;
};

export type RelatedPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
};
