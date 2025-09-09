/**
 * @fileoverview تعریف مدل های داده (Interfaces) برای محصولات دانلودی.
 */

/**
 * @interface ProductReview
 * ساختار داده برای نظر یک کاربر در مورد محصول.
 */
export interface ProductReview {
  name: string;
  rating: number;
  comment: string;
}

/**
 * @interface ProductFaq
 * ساختار داده برای یک سوال متداول در مورد محصول.
 */
export interface ProductFaq {
  question: string;
  answer: string;
}

/**
 * @interface Product
 * ساختار داده برای یک محصول دانلودی را با تمام جزئیات آن تعریف می کند.
 */
export interface Product {
  id: number;
  slug: string;
  title: string;
  author: string;
  price: string;
  type: 'کتاب' | 'جزوه';
  categoryId: number;
  imageUrl: string;
  description: string;
  tableOfContents: string[];
  fileFormat: string;
  pageCount: number;
  releaseDate: string;
  version: string;
  language: string;
  tags: string[];
  reviews: ProductReview[];
  faq: ProductFaq[];
  sampleUrl?: string;
}
