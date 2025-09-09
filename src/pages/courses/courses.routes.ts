/**
 * @fileoverview تعریف مسیرهای بخش دوره های آموزشی.
 * این مسیرها به صورت تنبل (lazy-loaded) بارگذاری می شوند.
 */

import { Routes } from '@angular/router';
import { CoursesListComponent } from './courses-list.component';
import { CourseDetailComponent } from './course-detail.component';
import { CourseWatchComponent } from './course-watch.component';

export const COURSES_ROUTES: Routes = [
  { path: '', component: CoursesListComponent, title: 'دوره های آموزشی' },
  { path: ':id', component: CourseDetailComponent, title: 'جزئیات دوره' },
  { path: ':id/watch/:lessonId', component: CourseWatchComponent, title: 'مشاهده دوره' },
];
