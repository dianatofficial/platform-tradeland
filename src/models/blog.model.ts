/**
 * @fileoverview تعریف مدل داده (Interface) برای پست های بلاگ.
 */

/**
 * @interface BlogPost
 * ساختار داده برای یک پست بلاگ را تعریف می کند.
 */
export interface BlogPost {
  slug: string;
  title: string;
  categoryId: number;
  category: string; // Denormalized for display
  imageUrl: string;
  excerpt: string;
  author: string;
  authorId: number; // Foreign key to User model
  authorImage: string; // Denormalized for display
  date: string;
  content: string;
  tags: string[];
  readingTime: string;
  featured?: boolean;
  views: number;
  likes: number;
}
