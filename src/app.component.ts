/**
 * @fileoverview کامپوننت ریشه (Root Component) اپلیکیشن.
 * این کامپوننت به عنوان پوسته اصلی برنامه عمل می کند و شامل
 * هدر، فوتر و محتوای اصلی (router-outlet) است.
 * این کامپوننت همچنین تشخیص می دهد که آیا کاربر در بخش ادمین است
 * تا هدر و فوتر اصلی را مخفی کند.
 */

import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotificationComponent } from './components/notification/notification.component';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';

declare const lucide: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, NotificationComponent, MobileNavComponent]
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  isAdminRoute = signal(false);

  ngOnInit() {
    // Check initial route since NavigationEnd might not have fired yet for the very first navigation.
    this.isAdminRoute.set(this.router.url.startsWith('/admin'));
    
    // Listen for subsequent route changes
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isAdminRoute.set(event.urlAfterRedirects.startsWith('/admin'));

      // FIX: The `afterRender` hook is not available. Using `setTimeout` ensures
      // `lucide.createIcons()` runs after the router outlet's view is updated,
      // correctly rendering icons on each navigation.
      setTimeout(() => {
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }, 0);
    });
  }
}
