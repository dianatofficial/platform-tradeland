/**
 * @fileoverview داده های نمونه برای اشتراک های کاربران.
 */
import { UserSubscription } from '../../models/subscription.model';

export const ALL_SUBSCRIPTIONS: UserSubscription[] = [
  { id: 1, user: {id: 3, fullName: 'علی محمدی', avatarUrl: 'https://picsum.photos/seed/ali/100/100'}, planName: 'سالیانه', startDate: '۱۴۰۲/۱۲/۱۵', endDate: '۱۴۰۳/۱۲/۱۵', status: 'فعال' },
  { id: 2, user: {id: 1, fullName: 'کاربر تستی', avatarUrl: 'https://picsum.photos/seed/user-avatar/100/100'}, planName: 'یک ماهه', startDate: '۱۴۰۳/۰۴/۱۵', endDate: '۱۴۰۳/۰۵/۱۵', status: 'منقضی شده' },
  { id: 3, user: {id: 4, fullName: 'سارا رضایی', avatarUrl: 'https://picsum.photos/seed/sara/100/100'}, planName: 'شش ماهه', startDate: '۱۴۰۳/۰۲/۲۰', endDate: '۱۴۰۳/۰۸/۲۰', status: 'فعال' },
];
