/**
 * @fileoverview Defines the data model for a category.
 */

export type CategoryType = 'course' | 'blog' | 'product' | 'news';

/**
 * @interface Category
 * Defines the structure for a category object.
 */
export interface Category {
  id: number;
  name: string;
  type: CategoryType;
}
