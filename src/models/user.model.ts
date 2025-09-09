/**
 * @fileoverview تعریف مدل داده برای یک کاربر.
 */

/**
 * @interface User
 * ساختار داده برای اطلاعات کاربر را تعریف می کند.
 */
export interface User {
  id: number;
  fullName: string;
  email: string;
  avatarUrl?: string;
  role?: 'Admin' | 'User' | 'Instructor';
  joinedDate?: string;

  // New fields for User/Trader
  bio?: string;
  location?: string;
  tradingStyle?: 'Day Trader' | 'Swing Trader' | 'Investor' | 'Scalper';
  favoriteMarkets?: string[];
  enrolledCourseIds?: number[];
  purchasedProductIds?: number[];
  
  // New fields for Instructor
  specialty?: string;
  followersCount?: number;
  socialLinks?: {
    telegram?: string;
    instagram?: string;
    twitter?: string;
  };
  studentRating?: number;

  // New fields for settings
  notificationPreferences?: {
    newCourses: boolean;
    newsletter: boolean;
  };
}