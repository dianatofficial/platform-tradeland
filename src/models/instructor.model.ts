/**
 * @fileoverview تعریف مدل داده برای مدرسین و تحلیلگران.
 */

export interface Instructor {
  id: number;
  name: string;
  type: 'مدرس' | 'تحلیلگر';
  specialty: string;
  imageUrl: string;
  contentCount: number; // Number of courses or channels
  followers: number;
}
