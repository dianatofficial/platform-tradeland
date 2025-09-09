/**
 * @fileoverview داده های نمونه برای آیتم های خبری.
 */
import { NewsItem } from '../models/news.model';

/**
 * @const ALL_NEWS
 * آرایه ای از داده های نمونه برای اخبار.
 */
export const ALL_NEWS: NewsItem[] = [
  { 
    slug: 'btc-analysis-1', 
    title: 'تحلیل هفتگی بیت کوین: آیا روند صعودی ادامه دارد؟', 
    categoryId: 201,
    category: 'کریپتو', 
    subCategory: 'بیت کوین', 
    time: '۲ ساعت پیش', 
    source: 'CoinTelegraph',
    content: '<p>تحلیل هفتگی بیت کوین نشان می‌دهد که قیمت در یک محدوده کلیدی قرار دارد...</p>' 
  },
  { 
    slug: 'iran-stock-index-1', 
    title: 'شاخص کل بورس در آستانه مقاومت حساس', 
    categoryId: 203,
    category: 'بورس ایران', 
    subCategory: 'تحلیل شاخص کل', 
    time: '۵ ساعت پیش', 
    source: 'بورس نیوز',
    content: '<p>شاخص کل بورس تهران امروز با نوسانات زیادی همراه بود...</p>'
  },
  { 
    slug: 'forex-eurusd-1', 
    title: 'تصمیم جدید فدرال رزرو و تاثیر آن بر جفت ارز EUR/USD', 
    categoryId: 202,
    category: 'فارکس', 
    subCategory: 'تحلیل جفت ارزها', 
    time: '۱ روز پیش', 
    source: 'Forex Factory',
    content: '<p>تحلیل تصمیم فدرال رزرو...</p>'
  },
  { 
    slug: 'eth-update-1', 
    title: 'آپدیت جدید اتریوم و تاثیر آن بر قیمت', 
    categoryId: 201,
    category: 'کریپتو', 
    subCategory: 'اتریوم', 
    time: '۲ روز پیش', 
    source: 'CoinDesk',
    content: '<p>تحلیل آپدیت جدید اتریوم...</p>'
  },
];
