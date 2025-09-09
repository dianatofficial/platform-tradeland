

/**
 * @fileoverview کامپوننت صفحه اصلی (Home).
 * این صفحه به عنوان لندینگ پیج عمل می کند و شامل بخش های اصلی سایت
 * مانند هیرو، ویژگی ها، جدیدترین دوره ها، مقالات و اخبار است.
 */
import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/data/course.service';
import { BlogService } from '../../services/data/blog.service';
import { NewsService } from '../../services/data/news.service';
import { BlogPostCardComponent } from '../../components/blog-post-card/blog-post-card.component';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { NewsCardComponent } from '../../components/news-card/news-card.component';
import { FeatureCardComponent } from '../../components/feature-card/feature-card.component';
import { Feature } from '../../models/ui.model';
import { ImageSliderComponent } from '../../components/image-slider/image-slider.component';
import { AppearanceService } from '../../services/state/appearance.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, BlogPostCardComponent, CourseCardComponent, NewsCardComponent, FeatureCardComponent, ImageSliderComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  // تزریق سرویس های مورد نیاز
  courseService = inject(CourseService);
  blogService = inject(BlogService);
  newsService = inject(NewsService);
  appearanceService = inject(AppearanceService);

  // --- Signals from Data Services ---
  /** سیگنالی برای نمایش ۳ دوره آخر. */
  courses = computed(() => this.courseService.courses().slice(0, 4));

  /** سیگنالی برای نمایش ۳ پست آخر بلاگ. */
  blogPosts = computed(() => this.blogService.posts().slice(0, 3));
  
  /** سیگنالی برای نمایش ۳ خبر آخر. */
  newsItems = computed(() => this.newsService.newsItems().slice(0, 4));

  // --- Signals from Appearance Service ---
  /** سیگنالی برای تصاویر اسلایدر (مدیریت شده از پنل ادمین). */
  sliderImages = this.appearanceService.sliderImages;
  
  /** سیگنالی برای چیدمان و نمایش بخش های صفحه اصلی (مدیریت شده از پنل ادمین). */
  homePageSections = this.appearanceService.homePageSections;

  /** سیگنالی برای نمایش کارت های ویژگی های اصلی سایت. */
  // FIX: Added the required 'link' property to each feature object to match the 'Feature' interface.
  features = signal<Feature[]>([
    { title: 'آموزش از اساتید برتر', description: 'بهترین محتوای آموزشی را از تحلیلگران با تجربه بازار بیاموزید.', icon: 'award', link: '/courses' },
    { title: 'تحلیل‌های به‌روز و فوری', description: 'با دسترسی به آخرین اخبار و تحلیل‌ها، یک قدم از بازار جلوتر باشید.', icon: 'trending-up', link: '/news' },
    { title: 'جامعه معامله‌گران فعال', description: 'در کافه ترید با دیگران تبادل نظر کنید و از تجربیاتشان بهره‌مند شوید.', icon: 'users', link: '/cafe-trade' },
    { title: 'ابزارهای کاربردی', description: 'از محصولات دانلودی و ابزارهای انحصاری برای بهبود معاملات خود استفاده کنید.', icon: 'app-window', link: '/products' },
  ]);
}