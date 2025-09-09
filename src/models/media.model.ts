/**
 * @fileoverview تعریف مدل داده برای آیتم های رسانه.
 */

export interface MediaItem {
  id: number;
  url: string;
  filename: string;
  uploadedAt: string;
  fileType: string;
  size: string; // e.g., '1.2 MB'
}
