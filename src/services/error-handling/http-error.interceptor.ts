import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry, throwError, timer } from 'rxjs';
import { NotificationService } from './notification.service';

export const httpErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    // Retry failed requests for transient errors (e.g., network issues)
    retry({
      count: 2,
      delay: (error: HttpErrorResponse, retryCount: number) => {
        // Only retry on network errors or 5xx server errors
        if (error.status === 0 || error.status >= 500) {
          // Exponential backoff
          return timer(1000 * retryCount);
        }
        return throwError(() => error);
      },
    }),
    catchError((error: HttpErrorResponse) => {
      // Don't show a notification for 401/403 as auth logic will handle redirects
      if (error.status === 401 || error.status === 403) {
        return throwError(() => error);
      }

      // Show a generic error message for other failures
      const message = 'خطایی در ارتباط با سرور رخ داد. لطفا دوباره تلاش کنید.';
      notificationService.showError(message);

      // Re-throw the error so that component-level error handlers can also react
      return throwError(() => error);
    })
  );
};
