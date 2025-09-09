/**
 * @fileoverview داده های نمونه برای محصولات دانلودی.
 */
import { Product } from '../../models/product.model';

/**
 * @const ALL_PRODUCTS
 * آرایه ای از داده های نمونه برای محصولات دانلودی.
 */
export const ALL_PRODUCTS: Product[] = [
    { 
      id: 1, 
      slug: 'disciplined-trader',
      title: 'کتاب معامله گر منضبط', 
      author: 'مارک داگلاس', 
      price: '۱۲۰,۰۰۰', 
      type: 'کتاب', 
      categoryId: 301,
      imageUrl: 'https://picsum.photos/seed/book1/300/400',
      description: 'کتاب «معامله‌گر منضبط» اثر مارک داگلاس، یکی از منابع کلاسیک و ضروری در زمینه روانشناسی معاملات است. این کتاب به شما کمک می‌کند تا ذهنیت یک معامله‌گر حرفه‌ای را در خود پرورش دهید و بر چالش‌های روانی که منجر به تصمیمات اشتباه در بازار می‌شوند، غلبه کنید.',
      tableOfContents: [
        'فصل ۱: چرا معامله‌گری اینقدر سخت است؟',
        'فصل ۲: ماهیت ریسک',
        'فصل ۳: پاسخ‌های ذهنی به بازار',
        'فصل ۴: ساختار یک ذهنیت برنده',
        'فصل ۵: تمرینات عملی برای انضباط ذهنی',
      ],
      fileFormat: 'PDF, EPUB',
      pageCount: 250,
      releaseDate: '۱۴۰۲/۰۸/۱۵',
      version: 'ویرایش دوم',
      language: 'فارسی',
      tags: ['روانشناسی', 'مدیریت ریسک', 'پرفروش'],
      reviews: [
        { name: 'علی', rating: 5, comment: 'این کتاب دیدگاه من رو به معامله‌گری کاملا تغییر داد. خوندنش برای هر تریدری واجبه.' },
        { name: 'سارا', rating: 4, comment: 'کتاب خوبیه ولی بعضی بخش‌هاش تکراریه.' },
      ],
      faq: [
        { question: 'آیا این کتاب برای مبتدیان مناسب است؟', answer: 'بله، مفاهیم این کتاب برای معامله‌گران در هر سطحی کاربردی و ضروری است.' },
        { question: 'فرمت فایل‌های دانلودی چیست؟', answer: 'پس از خرید، فایل‌های PDF و EPUB کتاب در اختیار شما قرار می‌گیرد.' },
      ],
      sampleUrl: '#'
    },
    { 
      id: 2, 
      slug: 'harmonic-patterns-cheatsheet',
      title: 'جزوه کامل الگوهای هارمونیک', 
      author: 'علی محمدی', 
      price: '۷۵,۰۰۰', 
      type: 'جزوه', 
      categoryId: 302,
      imageUrl: 'https://picsum.photos/seed/sheet1/300/400',
      description: 'یک راهنمای جامع و تصویری برای شناسایی و معامله با استفاده از الگوهای هارمونیک. این جزوه به صورت خلاصه و کاربردی، تمام نکات کلیدی را پوشش می‌دهد.',
      tableOfContents: ['الگوی Gartley', 'الگوی Bat', 'الگوی Butterfly', 'الگوی Crab'],
      fileFormat: 'PDF',
      pageCount: 45,
      releaseDate: '۱۴۰۳/۰۲/۱۰',
      version: '۱.۱',
      language: 'فارسی',
      tags: ['تکنیکال', 'الگوهای کلاسیک'],
      reviews: [],
      faq: []
    },
    { 
      id: 3, 
      slug: 'technical-analysis-john-murphy',
      title: 'کتاب تحلیل تکنیکال جان مورفی', 
      author: 'جان مورفی', 
      price: '۱۸۰,۰۰۰', 
      type: 'کتاب', 
      categoryId: 302,
      imageUrl: 'https://picsum.photos/seed/book2/300/400',
      description: 'مرجع کامل تحلیل تکنیکال که به عنوان کتاب مقدس تکنیکالیست‌ها شناخته می‌شود. ترجمه روان همراه با مثال‌های بازار ایران.',
      tableOfContents: ['فلسفه تحلیل تکنیکال', 'نظریه داو', 'ساختار نمودارها', 'الگوهای بازگشتی و ادامه‌دهنده'],
      fileFormat: 'PDF',
      pageCount: 500,
      releaseDate: '۱۴۰۱/۱۱/۰۱',
      version: 'ویرایش جدید',
      language: 'فارسی',
      tags: ['تکنیکال', 'مرجع'],
      reviews: [],
      faq: []
    },
    { 
      id: 4, 
      slug: 'price-action-checklist',
      title: 'چک لیست معاملاتی پرایс اکشن', 
      author: 'سارا رضایی', 
      price: '۵۰,۰۰۰', 
      type: 'جزوه', 
      categoryId: 303,
      imageUrl: 'https://picsum.photos/seed/sheet2/300/400',
      description: 'یک چک لیست کاربردی و ضروری برای معامله‌گران سبک پرایс اکشن تا قبل از ورود به هر معامله، تمام شرایط لازم را بررسی کنند.',
      tableOfContents: ['بررسی ساختار بازار', 'شناسایی ناحیه عرضه/تقاضا', 'تریگر ورود', 'مدیریت معامله'],
      fileFormat: 'PDF',
      pageCount: 10,
      releaseDate: '۱۴۰۳/۰۵/۰۱',
      version: '۱.۰',
      language: 'فارسی',
      tags: ['پرایс اکشن', 'چک لیست'],
      reviews: [],
      faq: []
    },
    { 
      id: 5, 
      slug: 'operator-memories',
      title: 'کتاب خاطرات یک اپراتور', 
      author: 'ادوین لفور', 
      price: '۱۱۰,۰۰۰', 
      type: 'کتاب', 
      categoryId: 301,
      imageUrl: 'https://picsum.photos/seed/book3/300/400',
      description: 'داستان زندگی جسی لیورمور، یکی از بزرگترین معامله‌گران تاریخ. این کتاب سرشار از درس‌های عمیق در مورد روانشناسی و رفتار بازار است.',
      tableOfContents: ['شروع کار در کارگزاری‌ها', 'اولین میلیون دلار', 'فراز و نشیب‌ها', 'قوانین معامله‌گری'],
      fileFormat: 'PDF, EPUB',
      pageCount: 220,
      releaseDate: '۱۴۰۲/۰۱/۲۰',
      version: 'ویرایش سوم',
      language: 'فارسی',
      tags: ['روانشناسی', 'داستان'],
      reviews: [],
      faq: []
    },
];
