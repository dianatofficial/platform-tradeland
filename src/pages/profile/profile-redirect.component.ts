/**
 * @fileoverview کامپوننت هدایتگر برای پروفایل کاربری.
 * این کامپوننت بر اساس نقش کاربر، او را به صفحه پروفایل مناسب هدایت می کند.
 */
import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../services/state/state.service';

@Component({
  selector: 'app-profile-redirect',
  template: '', // This component has no view
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileRedirectComponent implements OnInit {
  private stateService = inject(StateService);
  private router = inject(Router);

  ngOnInit(): void {
    const currentUser = this.stateService.currentUser();
    if (currentUser) {
      switch (currentUser.role) {
        case 'Admin':
          this.router.navigate(['/admin/dashboard'], { replaceUrl: true });
          break;
        case 'Instructor':
          this.router.navigate(['/profile/instructor', currentUser.id], { replaceUrl: true });
          break;
        case 'User':
        default:
          this.router.navigate(['/profile/user', currentUser.id], { replaceUrl: true });
          break;
      }
    } else {
      // If for some reason a non-authenticated user reaches here, send them to login
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }
}