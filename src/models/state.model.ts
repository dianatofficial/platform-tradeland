/**
 * @fileoverview تعریف مدل داده (Interface) برای وضعیت سراسری برنامه.
 */

import { User } from './user.model';

/**
 * @interface AppState
 * ساختار کلی وضعیت سراسری برنامه را تعریف می کند.
 */
export interface AppState {
  currentUser: User | null;
}
