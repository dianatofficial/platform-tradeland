/**
 * @fileoverview سرویس مدیریت وضعیت برای ظاهر و تنظیمات کلی سایت.
 * این سرویس به عنوان منبع حقیقت برای تنظیماتی عمل می کند که از پنل ادمین قابل تغییر هستند.
 */
import { Injectable, signal } from '@angular/core';

export interface HomePageSection {
  id: string;
  name: string;
  visible: boolean;
}

@Injectable({ providedIn: 'root' })
export class AppearanceService {
  /** نام سایت که در هدر نمایش داده می شود. */
  siteName = signal('تریدلند');

  /** لیستی از URL های تصاویر برای اسلایدر صفحه اصلی. */
  sliderImages = signal<string[]>([
    'https://picsum.photos/seed/slider1/1200/400',
    'https://picsum.photos/seed/slider2/1200/400',
    'https://picsum.photos/seed/slider3/1200/400',
    'https://picsum.photos/seed/slider4/1200/400',
  ]);

  /** تنظیمات مربوط به ترتیب و نمایش بخش های مختلف صفحه اصلی. */
  homePageSections = signal<HomePageSection[]>([
    { id: 'slider', name: 'اسلایدر تصاویر', visible: true },
    { id: 'hero', name: 'بخش هیرو (عنوان اصلی)', visible: true },
    { id: 'features', name: 'بخش ویژگی‌ها', visible: true },
    { id: 'courses', name: 'بخش دوره‌های ویژه', visible: true },
    { id: 'blogNews', name: 'بخش بلاگ و اخبار', visible: true },
  ]);

  /**
   * نام سایت را به روز می کند.
   * @param name نام جدید سایت.
   */
  setSiteName(name: string) {
    this.siteName.set(name);
  }

  /**
   * یک تصویر جدید به اسلایدر اضافه می کند.
   * @param url آدرس URL تصویر جدید.
   */
  addSliderImage(url: string) {
    this.sliderImages.update(images => [...images, url]);
  }

  /**
   * یک تصویر را از اسلایدر حذف می کند.
   * @param index ایندکس تصویری که باید حذف شود.
   */
  deleteSliderImage(index: number) {
    this.sliderImages.update(images => images.filter((_, i) => i !== index));
  }
  
  /**
   * چیدمان بخش های صفحه اصلی را به روز می کند.
   * @param sections آرایه جدیدی از تنظیمات بخش ها.
   */
  updateHomePageSections(sections: HomePageSection[]) {
    this.homePageSections.set(sections);
  }
}