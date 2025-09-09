/**
 * @fileoverview داده های نمونه برای کاربران سیستم.
 */
import { User } from '../../models/user.model';

export const ALL_USERS: User[] = [
  {
    id: 1,
    fullName: 'کاربر تستی',
    email: 'user@trade.com',
    avatarUrl: 'https://picsum.photos/seed/user-avatar/100/100',
    role: 'Admin',
    joinedDate: '۱۴۰۳/۰۵/۰۱',
    bio: 'معامله‌گر بازارهای جهانی با تمرکز بر روی جفت ارزهای اصلی.',
    location: 'تهران، ایران',
    tradingStyle: 'Swing Trader',
    favoriteMarkets: ['Forex', 'Crypto'],
    enrolledCourseIds: [1, 3],
    purchasedProductIds: [1, 2],
    notificationPreferences: {
      newCourses: true,
      newsletter: false,
    }
  },
  {
    id: 2,
    fullName: 'مدیر سیستم',
    email: 'admin@trade.com',
    avatarUrl: 'https://picsum.photos/seed/admin/100/100',
    role: 'Admin',
    joinedDate: '۱۴۰۳/۰۱/۱۰'
  },
  {
    id: 3,
    fullName: 'علی محمدی',
    email: 'ali.m@trade.com',
    avatarUrl: 'https://picsum.photos/seed/ali/100/100',
    role: 'Instructor',
    joinedDate: '۱۴۰۲/۱۲/۱۵',
    bio: 'بیش از ۱۰ سال سابقه فعالیت در بازارهای مالی. متخصص تحلیل تکنیکال کلاسیک و الگوهای هارمونیک و مدرس دوره‌های تحلیل تکنیکال جامع و استراتژی‌های معاملاتی در فارکس.',
    location: 'اصفهان، ایران',
    specialty: 'تحلیل تکنیکال کلاسیک',
    followersCount: 12500,
    studentRating: 4.8,
    socialLinks: {
        telegram: '#',
        instagram: '#',
        twitter: '#',
    }
  },
  {
    id: 4,
    fullName: 'سارا رضایی',
    email: 'sara.r@trade.com',
    avatarUrl: 'https://picsum.photos/seed/sara/100/100',
    role: 'Instructor',
    joinedDate: '۱۴۰۳/۰۲/۲۰',
    bio: 'تحلیلگر برجسته سبک پرایс اکشن RTM در ایران و مدرس دوره پرایс اکشن پیشرفته. به معامله‌گری بر اساس رفتار قیمت شهرت دارم.',
    location: 'شیراز، ایران',
    specialty: 'پرایс اکشن RTM',
    followersCount: 28000,
    studentRating: 4.9,
    socialLinks: {
        telegram: '#',
        instagram: '#',
    }
  },
  {
    id: 5,
    fullName: 'رضا حسینی',
    email: 'reza.h@trade.com',
    avatarUrl: 'https://picsum.photos/seed/reza/100/100',
    role: 'Instructor',
    joinedDate: '۱۴۰۳/۰۳/۰۵',
    specialty: 'مدیریت سرمایه و روانشناسی',
    followersCount: 8500,
    studentRating: 4.7
  },
  {
    id: 6,
    fullName: 'جواد کریمی',
    email: 'javad.k@trade.com',
    avatarUrl: 'https://picsum.photos/seed/javad/100/100',
    role: 'User',
    joinedDate: '۱۴۰۳/۰۶/۱۰',
    bio: 'به تازگی وارد دنیای معامله گری شدم و در حال یادگیری هستم.',
    tradingStyle: 'Day Trader',
    favoriteMarkets: ['Iran Stock'],
    enrolledCourseIds: [1],
    purchasedProductIds: []
  }
];