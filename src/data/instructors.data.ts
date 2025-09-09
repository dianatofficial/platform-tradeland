/**
 * @fileoverview داده های نمونه برای مدرسین و تحلیلگران.
 */
import { Instructor } from '../../models/instructor.model';

export const ALL_INSTRUCTORS: Instructor[] = [
  { id: 1, name: 'علی محمدی', type: 'مدرس', specialty: 'تحلیل تکنیکال کلاسیک', imageUrl: 'https://picsum.photos/seed/ali/100/100', contentCount: 2, followers: 12500 },
  { id: 2, name: 'سارا رضایی', type: 'مدرس', specialty: 'پرایс اکشن RTM', imageUrl: 'https://picsum.photos/seed/sara/100/100', contentCount: 1, followers: 28000 },
  { id: 3, name: 'رضا حسینی', type: 'مدرس', specialty: 'مدیریت سرمایه و روانشناسی', imageUrl: 'https://picsum.photos/seed/reza/100/100', contentCount: 1, followers: 8500 },
  { id: 4, name: 'سیگنال کریپتو', type: 'تحلیلگر', specialty: 'بازار ارزهای دیجیتال', imageUrl: 'https://picsum.photos/seed/crypto-signal/100/100', contentCount: 1, followers: 55000 },
  { id: 5, name: 'مریم اکبری', type: 'مدرس', specialty: 'فاندامنتال کریپتوکارنسی', imageUrl: 'https://picsum.photos/seed/maryam/100/100', contentCount: 1, followers: 6500 },
  { id: 6, name: 'تیم تریدپلت', type: 'مدرس', specialty: 'معاملات الگوریتمی', imageUrl: 'https://picsum.photos/seed/platform/100/100', contentCount: 1, followers: 3000 },
];
