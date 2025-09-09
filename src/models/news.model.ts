/**
 * @fileoverview تعریف مدل داده (Interface) برای آیتم های خبری.
 */

/**
 * @interface NewsItem
 * ساختار داده برای یک آیتم خبری یا تحلیلی را تعریف می کند.
 */
export interface NewsItem {
  slug: string;
  title: string;
  categoryId: number;
  category: string; // Denormalized for display
  subCategory: string;
  time: string;
  source: string;
  content: string;
}
