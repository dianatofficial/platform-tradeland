/**
 * @fileoverview داده های نمونه برای دوره های آموزشی.
 */
import { Course } from '../../models/course.model';

/**
 * @const ALL_COURSES
 * آرایه ای از داده های نمونه برای دوره های آموزشی.
 */
export const ALL_COURSES: Course[] = [
  { 
    id: 1, 
    title: 'تحلیل تکنیکال جامع', 
    instructorId: 3, // Ali Mohammadi
    instructor: 'علی محمدی',
    instructorImage: 'https://picsum.photos/seed/ali/100/100',
    instructorBio: 'علی محمدی بیش از ۱۰ سال سابقه فعالیت در بازارهای مالی را دارد و متخصص تحلیل تکنیکال کلاسیک و الگوهای هارمونیک است.',
    price: '۱,۵۰۰,۰۰۰', 
    level: 'مقدماتی تا پیشرفته', 
    categoryId: 1, // تحلیل تکنیکال
    category: 'تکنیکال',
    tags: ['پرفروش'],
    duration: '۲۰ ساعت', 
    imageUrl: 'https://picsum.photos/seed/tech/600/400', 
    rating: 4.8, 
    reviewCount: 120, 
    description: '<h2>درباره این دوره</h2><p>در این دوره جامع، از <strong>مفاهیم پایه</strong> تا <em>استراتژی‌های پیچیده</em> تحلیل تکنیکال را فرا خواهید گرفت.</p><p>این دوره برای تمام سطوح مناسب است و به شما کمک می‌کند تا با اطمینان بیشتری در بازارهای مالی فعالیت کنید.</p><h3>سرفصل‌های کلیدی:</h3><ul><li>مبانی نمودارخوانی</li><li>اندیکاتورهای کاربردی</li><li>مدیریت ریسک</li></ul>', 
    students: 1250, 
    lastUpdate: '1403/04/20', 
    whatYouWillLearn: [
      'اصول و مبانی تحلیل تکنیکال',
      'تحلیل نمودارهای شمعی و الگوهای کلاسیک',
      'استفاده حرفه‌ای از اندیکاتورها و اسیلاتورها',
      'تدوین استراتژی معاملاتی شخصی'
    ],
    requirements: [
      'آشنایی اولیه با مفاهیم بازار سرمایه',
      'نیاز به هیچ دانش قبلی تحلیل تکنیکال نیست'
    ],
    syllabus: [ 
      { sectionTitle: 'فصل اول: مقدمه', lessons: [
        { id: 101, title: 'مقدمه ای بر تحلیل تکنیکال', duration: '15:20', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4', isFreePreview: true },
        { id: 102, title: 'انواع نمودارها', duration: '25:10', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4' },
      ]}, 
      { sectionTitle: 'فصل دوم: الگوهای کلاسیک', lessons: [
        { id: 103, title: 'الگوهای کلاسیک قیمتی', duration: '45:30', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4', isFreePreview: true }, 
        { id: 104, title: 'کاربرد عملی الگوها', duration: '30:00', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4'}] 
      }, 
      { sectionTitle: 'فصل سوم: ابزارهای تحلیلی', lessons: [{ id: 105, title: 'اندیکاتورها و اسیلاتورها', duration: '01:10:00', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4' }] }, 
      { sectionTitle: 'فصل چهارم: مباحث پیشرفته', lessons: [{ id: 106, title: 'امواج الیوت', duration: '01:30:00', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4' }] }, 
      { sectionTitle: 'فصل پنجم: مدیریت سرمایه', lessons: [{ id: 107, title: 'مدیریت سرمایه در تحلیل تکنیکال', duration: '20:00', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4' }] } 
    ],
    reviews: [
      { name: 'رضا', rating: 5, comment: 'دوره فوق العاده کامل و کاربردی بود. ممنون از استاد محمدی.'},
      { name: 'مریم', rating: 4, comment: 'مطالب خوب بود ولی حجم تمرین‌ها کمی زیاد بود.'}
    ]
  },
  { 
    id: 2, 
    title: 'پرایс اکشن پیشرفته', 
    instructorId: 4, // Sara Rezaei
    instructor: 'سارا رضایی', 
    subscriptionOnly: true,
    instructorImage: 'https://picsum.photos/seed/sara/100/100',
    instructorBio: 'سارا رضایی از تحلیلگران برجسته سبک پرایс اکشن RTM در ایران است و به معامله‌گری بر اساس رفتار قیمت شهرت دارد.',
    price: '۲,۲۰۰,۰۰۰', 
    level: 'پیشرفته', 
    categoryId: 4, // پرایс اکشن
    category: 'پرایс اکشن',
    tags: ['پرفروش', 'جدید'],
    duration: '۱۵ ساعت', 
    imageUrl: 'https://picsum.photos/seed/price/600/400', 
    rating: 4.9, 
    reviewCount: 250, 
    description: 'با درک عمیق حرکات قیمت، بدون نیاز به اندیکاتور، بازار را تحلیل و معامله کنید. این دوره بر اساس جدیدترین متدهای پرایс اکشن دنیا طراحی شده است.', 
    students: 800, 
    lastUpdate: '1403/05/01',
    whatYouWillLearn: [
      'درک عمیق ساختارهای بازار',
      'شناسایی نواحی کلیدی عرضه و تقاضا',
      'اجرای ستاپ‌های معاملاتی با وین-ریت بالا',
      'کنترل روانشناسی در معاملات پرایс اکشن'
    ],
    requirements: [
      'گذراندن دوره تحلیل تکنیکال مقدماتی',
      'حداقل ۶ ماه سابقه معامله‌گری'
    ],
    syllabus: [ 
      { sectionTitle: 'مبانی پرایс اکشن', lessons: [
        { id: 201, title: 'ساختارهای بازار', duration: '20:00', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4', isFreePreview: true}, 
        { id: 202, title: 'شناسایی کندل‌های کلیدی', duration: '35:00', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4'}] 
      }, 
      { sectionTitle: 'عرضه و تقاضا', lessons: [{ id: 203, title: 'نواحی عرضه و تقاضا', duration: '55:00', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4' }] }, 
      { sectionTitle: 'ستاپ های معاملاتی', lessons: [{ id: 204, title: 'ستاپ های معاملاتی پیشرفته', duration: '01:12:00', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4' }] }, 
      { sectionTitle: 'روانشناسی', lessons: [{ id: 205, title: 'روانشناسی در پرایс اکشن', duration: '40:00', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4' }] } 
    ],
    reviews: [
      { name: 'احمد', rating: 5, comment: 'بهترین دوره پرایс اکشنی که دیدم!'},
      { name: 'شیما', rating: 5, comment: 'مفاهیم پیچیده به زبان ساده توضیح داده شده بود.'}
    ]
  },
  { 
    id: 3, 
    title: 'مدیریت ریسک و سرمایه', 
    instructorId: 5, // Reza Hosseini
    instructor: 'رضا حسینی', 
    instructorImage: 'https://picsum.photos/seed/reza/100/100',
    instructorBio: 'رضا حسینی متخصص مدیریت سرمایه و روانشناسی معامله‌گری است و به توسعه پلن‌های معاملاتی شخصی‌سازی شده کمک می‌کند.',
    price: '۹۵۰,۰۰۰', 
    level: 'همه سطوح',
    categoryId: 3, // مدیریت سرمایه
    category: 'مدیریت سرمایه',
    tags: [],
    duration: '۸ ساعت', 
    imageUrl: 'https://picsum.photos/seed/risk/600/400', 
    rating: 4.7, 
    reviewCount: 95, 
    description: 'مهم‌ترین اصل موفقیت در بازارهای مالی، بقا است. در این دوره یاد می‌گیرید چگونه از سرمایه خود محافظت کرده و سودهای خود را به صورت مستمر افزایش دهید.', 
    students: 500, 
    lastUpdate: '1403/03/15', 
    whatYouWillLearn: ['محاسبه حجم معامله', 'تعیین حد ضرر و حد سود بهینه', 'مدیریت پوزیشن‌های باز', 'روانشناسی مدیریت ریسک'],
    requirements: ['آشنایی با یک پلتفرم معاملاتی'],
    syllabus: [
      { sectionTitle: 'مفاهیم پایه', lessons: [{id: 301, title: 'اهمیت مدیریت ریسک', duration: '22:15', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4', isFreePreview: true}]},
      { sectionTitle: 'استراتژی ها', lessons: [{id: 302, title: 'استراتژی های مدیریت سرمایه', duration: '40:00', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4'}]}
    ],
    reviews: [{ name: 'جواد', rating: 5, comment: 'این دوره حساب من رو از کال مارجین شدن نجات داد.'}]
  },
  { 
    id: 4, 
    title: 'معاملات الگوریتمی با پایتون', 
    instructorId: 2, // Admin
    instructor: 'تیم تریدلند', 
    subscriptionOnly: true,
    instructorImage: 'https://picsum.photos/seed/platform/100/100',
    instructorBio: 'تیم توسعه تریدلند با تجربه ساخت ابزارهای معاملاتی پیشرفته، این دوره را برای علاقه‌مندان به معاملات خودکار طراحی کرده است.',
    price: '۳,۵۰۰,۰۰۰', 
    level: 'پیشرفته', 
    categoryId: 1, // تحلیل تکنیکال
    category: 'تکنیکال',
    tags: ['جدید'],
    duration: '۳۰ ساعت', 
    imageUrl: 'https://picsum.photos/seed/python/600/400', 
    rating: 4.9, 
    reviewCount: 180, 
    description: 'استراتژی‌های معاملاتی خود را به ربات‌های هوشمند تبدیل کنید و بدون دخالت احساسات، به صورت ۲۴ ساعته در بازار فعالیت کنید.', 
    students: 300, 
    lastUpdate: '1403/05/10',
    whatYouWillLearn: ['برنامه‌نویسی پایتون برای بازارهای مالی', 'اتصال به API صرافی‌ها', 'بک‌تست گرفتن از استراتژی‌ها', 'اجرای ربات‌های معاملاتی'],
    requirements: ['آشنایی با مفاهیم برنامه‌نویسی', 'داشتن استراتژی معاملاتی مشخص'],
    syllabus: [
      { sectionTitle: 'مقدمات پایتون', lessons: [{id: 401, title: 'نصب و راه‌اندازی', duration: '25:00', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4', isFreePreview: true }]},
      { sectionTitle: 'کتابخانه های کاربردی', lessons: [{id: 402, title: 'کار با Pandas', duration: '01:15:00', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4'}]}
    ],
    reviews: [{ name: 'کاوه', rating: 5, comment: 'دوره بی‌نظیر برای ورود به دنیای الگوتریدینگ.'}]
  },
  { 
    id: 5, 
    title: 'فاندامنتال کریپتوکارنسی', 
    instructorId: 2, // Placeholder, let's say Admin team
    instructor: 'مریم اکبری', 
    instructorImage: 'https://picsum.photos/seed/maryam/100/100',
    instructorBio: 'مریم اکبری از تحلیلگران بنیادی مطرح در حوزه ارزهای دیجیتال است و تخصص وی در شناسایی پروژه‌های مستعد رشد است.',
    price: '۱,۸۰۰,۰۰۰', 
    level: 'مقدماتی', 
    categoryId: 2, // تحلیل فاندامنتال
    category: 'فاندامنتال',
    tags: [],
    duration: '۱۲ ساعت', 
    imageUrl: 'https://picsum.photos/seed/crypto/600/400', 
    rating: 4.6, 
    reviewCount: 78, 
    description: 'فراتر از نمودارها، با تحلیل بنیادی پروژه‌های ارز دیجیتال، سرمایه‌گذاری‌های هوشمندانه‌تر و بلندمدت‌تری انجام دهید.', 
    students: 650, 
    lastUpdate: '1403/04/25', 
    whatYouWillLearn: ['تحلیل وایت‌پیپر پروژه‌ها', 'توکنومیکس و اقتصاد توکنی', 'تحلیل فعالیت تیم و جامعه پروژه', 'ارزش‌گذاری رمزارزها'],
    requirements: ['آشنایی با مفاهیم اولیه بلاکچین و کریپتو'],
    syllabus: [
        { sectionTitle: 'مبانی فاندامنتال', lessons: [{id: 501, title: 'وایت پیپر چیست؟', duration: '40:00', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4', isFreePreview: true}]},
        { sectionTitle: 'توکنومیکس', lessons: [{id: 502, title: 'بررسی توکنومیکس', duration: '01:05:00', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4'}]}
    ],
    reviews: [{ name: 'سعید', rating: 4, comment: 'برای شروع خوب بود.'}]
  },
  { 
    id: 6, 
    title: 'استراتژی های معاملاتی در فارکس', 
    instructorId: 3, // Ali Mohammadi
    instructor: 'علی محمدی', 
    instructorImage: 'https://picsum.photos/seed/ali/100/100',
    instructorBio: 'علی محمدی بیش از ۱۰ سال سابقه فعالیت در بازارهای مالی را دارد و متخصص تحلیل تکنیکال کلاسیک و الگوهای هارمونیک است.',
    price: '۲,۰۰۰,۰۰۰', 
    level: 'متوسط', 
    categoryId: 1, // تحلیل تکنیکال
    category: 'تکنیکال',
    tags: [],
    duration: '۱۸ ساعت', 
    imageUrl: 'https://picsum.photos/seed/forex/600/400', 
    rating: 4.8, 
    reviewCount: 155, 
    description: 'در این دوره به صورت تخصصی به بازار فارکس پرداخته و استراتژی‌های معاملاتی سودده و آزمایش‌شده برای این بازار را فرا خواهید گرفت.', 
    students: 900, 
    lastUpdate: '1403/02/11',
    whatYouWillLearn: ['آشنایی با جفت‌ارزهای اصلی و کراس', 'تحلیل اخبار اقتصادی (فاندامنتال)', 'استراتژی‌های معاملاتی روزانه و سویینگ', 'روانشناسی معامله‌گر فارکس'],
    requirements: ['گذراندن دوره تحلیل تکنیکال مقدماتی'],
    syllabus: [
      { sectionTitle: 'مقدمات فارکس', lessons: [{id: 601, title: 'بازار فارکس چیست؟', duration: '30:00', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4', isFreePreview: true}]},
      { sectionTitle: 'استراتژی های پیشرفته', lessons: [{id: 602, title: 'استراتژی سویینگ', duration: '50:00', videoUrl: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4'}]}
    ],
    reviews: [{ name: 'نیما', rating: 5, comment: 'نگاه من به بازار فارکس کاملا عوض شد.'}]
  },
];
