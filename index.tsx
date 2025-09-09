/**
 * @fileoverview فایل اصلی راه اندازی اپلیکیشن انگولار.
 * این فایل مسئول بوت استرپ کردن AppComponent به همراه فراهم کنندگان اصلی مانند
 * روتر، HTTP client و تشخیص تغییرات بدون Zone.js است.
 */

import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideZonelessChangeDetection, ErrorHandler } from '@angular/core';

import { AppComponent } from './src/app.component';
import { APP_ROUTES } from './src/app.routes';
import { GlobalErrorHandler } from './src/services/error-handling/global-error-handler';
import { httpErrorInterceptor } from './src/services/error-handling/http-error.interceptor';

// بوت استرپ کردن اپلیکیشن با کامپوننت ریشه و فراهم کنندگان مورد نیاز
bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(), // فعال سازی حالت بدون Zone.js برای بهبود عملکرد
    provideRouter(APP_ROUTES, withHashLocation()), // تنظیم روتر با استراتژی هش
    provideHttpClient(withInterceptors([httpErrorInterceptor])), // فراهم کردن سرویس های HTTP با رهگیر خطا
    { provide: ErrorHandler, useClass: GlobalErrorHandler }, // فراهم کردن کنترل کننده خطای سراسری
  ],
}).catch((err) => console.error(err));

// AI Studio always uses an `index.tsx` file for all project types.
