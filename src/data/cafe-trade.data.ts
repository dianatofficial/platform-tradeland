/**
 * @fileoverview داده های نمونه برای تحلیلگران کافه ترید.
 */
import { Analyst } from '../models/cafe-trade.model';

/**
 * @const ALL_ANALYSTS
 * آرایه ای از داده های نمونه برای تحلیلگران.
 */
export const ALL_ANALYSTS: Analyst[] = [
  { id: 1, userId: 3, name: 'کانال علی محمدی', specialty: 'تحلیل تکنیکال کلاسیک', imageUrl: 'https://picsum.photos/seed/ali/100/100', followers: 12500, bio: 'تحلیل روزانه بازارهای جهانی و ارائه سیگنال‌های معاملاتی بر اساس استراتژی‌های کلاسیک.' },
  { id: 2, userId: 4, name: 'پرایс اکشن با سارا رضایی', specialty: 'پرایс اکشن RTM', imageUrl: 'https://picsum.photos/seed/sara/100/100', followers: 28000, bio: 'نگاهی عمیق به حرکات قیمت و شناسایی نقاط ورود بهینه بدون نیاز به اندیکاتور.' },
  { id: 3, userId: 5, name: 'آکادمی رضا حسینی', specialty: 'مدیریت سرمایه و روانشناسی', imageUrl: 'https://picsum.photos/seed/reza/100/100', followers: 8500, bio: 'مباحث کلیدی در مورد مدیریت ریسک، کنترل احساسات و ساخت یک پلن معاملاتی پایدار.' },
  { id: 4, userId: 2, name: 'سیگنال کریپتو ادمین', specialty: 'بازار ارزهای دیجیتال', imageUrl: 'https://picsum.photos/seed/crypto-signal/100/100', followers: 55000, bio: 'پوشش آخرین اخبار و تحلیل‌های فاندامنتال و تکنیکال بازار رمزارزها.' },
];
