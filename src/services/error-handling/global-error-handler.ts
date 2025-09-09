import { ErrorHandler, Injectable, inject, isDevMode } from '@angular/core';
import { NotificationService } from './notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly notificationService = inject(NotificationService);

  handleError(error: unknown): void {
    // Log the error to the console. In a real app, you'd send this to a logging service.
    if (isDevMode()) {
      console.error('Unhandled error:', error);
    }
    
    let message = 'یک خطای پیش بینی نشده رخ داد. لطفا بعدا تلاش کنید.';

    // Customize message for specific error types if needed
    if (error instanceof HttpErrorResponse) {
        // HTTP errors are handled by the interceptor, but if one slips through, handle it.
        message = 'یک خطای سرور رخ داد. لطفا دوباره تلاش کنید.';
    } else if (error instanceof Error) {
        // Use the error's message if it's a standard Error object
        // but avoid being too technical for the user.
        // We can check for specific messages if we want.
    }

    // Show a user-friendly notification
    this.notificationService.showError(message);
  }
}
