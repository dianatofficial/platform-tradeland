/**
 * @fileoverview تعریف مسیرهای بخش پروفایل کاربری.
 */
import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { ProfileRedirectComponent } from './profile-redirect.component';

export const PROFILE_ROUTES: Routes = [
  { path: '', component: ProfileRedirectComponent, title: 'پروفایل من' },
  { path: 'user/:id', component: UserProfileComponent, title: 'پروفایل کاربر' },
  { path: 'instructor/:id', component: InstructorProfileComponent, title: 'پروفایل مدرس' },
];