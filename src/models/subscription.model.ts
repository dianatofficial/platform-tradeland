/**
 * @fileoverview تعریف مدل داده برای اشتراک های کاربران.
 */
import { User } from "./user.model";

export interface UserSubscription {
  id: number;
  user: Pick<User, 'id' | 'fullName' | 'avatarUrl'>;
  planName: string;
  startDate: string;
  endDate: string;
  status: 'فعال' | 'منقضی شده';
}
