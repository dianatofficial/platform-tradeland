/**
 * @fileoverview Mock data for subscription plans.
 */
import { SubscriptionPlan } from '../models/subscription-plan.model';

export const ALL_PLANS: SubscriptionPlan[] = [
    {
      id: 1,
      name: 'یک ماهه',
      price: '۲۹۹,۰۰۰',
      period: 'ماهانه',
      description: 'دسترسی کامل به تمام دوره های اشتراکی برای یک ماه.',
      features: [
        'دسترسی به تمام دوره های اشتراکی',
        'پشتیبانی ایمیلی',
        'دسترسی به وبینارهای ماهانه',
      ],
      isRecommended: false,
    },
    {
      id: 2,
      name: 'شش ماهه',
      price: '۱,۴۹۰,۰۰۰',
      period: 'هر ۶ ماه',
      description: 'بهترین انتخاب برای یادگیری مستمر با تخفیف ویژه.',
      features: [
        'تمام ویژگی های پلن یک ماهه',
        'تخفیف ۱۷٪ نسبت به پلن ماهانه',
        'دسترسی زودهنگام به دوره های جدید',
        'یک جلسه مشاوره خصوصی',
      ],
      isRecommended: true,
    },
    {
      id: 3,
      name: 'سالیانه',
      price: '۲,۴۹۰,۰۰۰',
      period: 'سالیانه',
      description: 'تعهد به موفقیت بلندمدت با بیشترین تخفیف.',
      features: [
        'تمام ویژگی های پلن شش ماهه',
        'تخفیف ۳۰٪ نسبت به پلن ماهانه',
        'دسترسی به کانال سیگنال VIP',
      ],
      isRecommended: false,
    },
  ];
