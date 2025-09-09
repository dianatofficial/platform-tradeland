/**
 * @fileoverview داده های نمونه برای پست های کانال های کافه ترید.
 */
import { CafeTradePost } from '../models/cafe-trade.model';

export const ALL_CAFE_TRADE_POSTS: CafeTradePost[] = [
  {
    id: 101,
    channelId: 1,
    authorId: 3,
    authorName: 'علی محمدی',
    authorAvatarUrl: 'https://picsum.photos/seed/ali/100/100',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    type: 'image',
    content: '<p>تحلیل #EURUSD - تایم فریم ۴ ساعته. قیمت پس از رسیدن به مقاومت مهم در ناحیه ۱.۰۸۵۰، الگوی سقف دوقلو را تشکیل داده است. انتظار اصلاح قیمت تا محدوده حمایتی ۱.۰۷۲۰ را داریم. حد ضرر: بالای ۱.۰۸۸۰</p>',
    imageUrl: 'https://picsum.photos/seed/chart1/800/500',
    reactions: { likes: 152, dislikes: 5 },
  },
  {
    id: 102,
    channelId: 2,
    authorId: 4,
    authorName: 'سارا رضایی',
    authorAvatarUrl: 'https://picsum.photos/seed/sara/100/100',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    type: 'text',
    content: '<p>نکته روانشناسی امروز: صبر کردن برای یک ستاپ معاملاتی با احتمال موفقیت بالا، خود بخشی از معامله است. فومو (FOMO) بزرگترین دشمن یک تریدر پرایс اکشن است. به استراتژی خود پایبند بمانید.</p>',
    reactions: { likes: 230, dislikes: 2 },
  },
  {
    id: 103,
    channelId: 1,
    authorId: 3,
    authorName: 'علی محمدی',
    authorAvatarUrl: 'https://picsum.photos/seed/ali/100/100',
    timestamp: new Date(Date.now() - 28 * 60 * 60 * 1000), // 28 hours ago
    type: 'text',
    content: '<p>شاخص دلار #DXY در حال نزدیک شدن به کف کانال صعودی روزانه است. واکنش قیمت به این سطح می‌تواند مسیر کوتاه‌مدت بازارهای جهانی را مشخص کند. حواستان به این سطح باشد.</p>',
    reactions: { likes: 98, dislikes: 1 },
  },
  {
    id: 104,
    channelId: 4,
    authorId: 2,
    authorName: 'مدیر سیستم',
    authorAvatarUrl: 'https://picsum.photos/seed/admin/100/100',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
    type: 'image',
    content: '<p>#BTC در محدوده حساسی قرار دارد. شکست مقاومت ۶۸ هزار دلاری می‌تواند راه را برای اهداف بالاتر هموار کند. از طرفی، از دست دادن حمایت ۶۵ هزار دلار، نشانه ضعف خریداران خواهد بود.</p>',
    imageUrl: 'https://picsum.photos/seed/chart2/800/500',
    reactions: { likes: 512, dislikes: 25 },
  },
];