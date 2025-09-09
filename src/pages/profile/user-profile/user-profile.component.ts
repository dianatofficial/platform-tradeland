/**
 * @fileoverview کامپوننت پروفایل کاربر عادی (تریدر).
 * این صفحه به عنوان داشبورد شخصی کاربر عمل کرده و دوره ها، محصولات و تنظیمات او را نمایش می دهد.
 */
import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap, take } from 'rxjs';
// FIX: Corrected import paths from ../../ to ../../../ to resolve type inference issues.
import { UserService } from '../../../services/data/user.service';
import { CourseService } from '../../../services/data/course.service';
import { ProductService } from '../../../services/data/product.service';
import { useAsync } from '../../../composables/use-async';
import { QueryStateComponent } from '../../../components/query-state/query-state.component';
import { CourseCardComponent } from '../../../components/course-card/course-card.component';
import { ProductCardComponent } from '../../../components/product-card/product-card.component';
import { StateService } from '../../../services/state/state.service';
import { SubscriptionService } from '../../../services/data/subscription.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { NotificationService } from '../../../services/error-handling/notification.service';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, RouterLink, QueryStateComponent, CourseCardComponent, ProductCardComponent, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private courseService = inject(CourseService);
  private productService = inject(ProductService);
  private stateService = inject(StateService);
  private subscriptionService = inject(SubscriptionService);
  private notificationService = inject(NotificationService);

  private user$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.userService.getUserById(id))
  );
  
  private query = useAsync(this.user$);
  user = this.query.data;
  status = this.query.status;
  error = this.query.error;

  activeTab = signal<'courses' | 'products' | 'subscriptions' | 'settings'>('courses');
  
  settingsForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    bio: new FormControl(''),
    location: new FormControl(''),
    tradingStyle: new FormControl<'Day Trader' | 'Swing Trader' | 'Investor' | 'Scalper' | null>(null),
    email: new FormControl('', [Validators.required, Validators.email]),
    notificationPreferences: new FormGroup({
      newCourses: new FormControl(false),
      newsletter: new FormControl(false)
    })
  });

  ngOnInit(): void {
    this.user$.pipe(take(1)).subscribe(user => {
      if (user) {
        this.settingsForm.patchValue(user);
      }
    });
  }

  // A signal to check if the current user is viewing their own profile
  isOwnProfile = computed(() => {
    return this.stateService.currentUser()?.id === this.user()?.id;
  });

  enrolledCourses = computed(() => {
    const user = this.user();
    if (!user || !user.enrolledCourseIds) return [];
    return this.courseService.courses().filter(c => user.enrolledCourseIds?.includes(c.id));
  });
  
  purchasedProducts = computed(() => {
    const user = this.user();
    if (!user || !user.purchasedProductIds) return [];
    return this.productService.products().filter(p => user.purchasedProductIds?.includes(p.id));
  });

  userSubscription = computed(() => {
    const userId = this.user()?.id;
    if (!userId) return null;
    return this.subscriptionService.subscriptions().find(sub => sub.user.id === userId);
  });

  selectTab(tab: 'courses' | 'products' | 'subscriptions' | 'settings'): void {
    this.activeTab.set(tab);
  }

  saveSettings(): void {
    if (this.settingsForm.invalid || !this.user()) {
      this.notificationService.showError('لطفا فیلدهای الزامی را به درستی پر کنید.');
      return;
    }

    // FIX: Use `getRawValue()` to get the full form value, preventing type errors with partial nested objects like `notificationPreferences`.
    // Also, explicitly handle the `null` value for `tradingStyle` to match the `User` model's `undefined`.
    const formValue = this.settingsForm.getRawValue();
    const updatedUser: User = {
      ...this.user()!,
      ...formValue,
      tradingStyle: formValue.tradingStyle ?? undefined,
    };
    
    this.userService.updateUser(updatedUser);
    
    // Also update the global state if it's the current user
    if (this.isOwnProfile()) {
      this.stateService.setCurrentUser(updatedUser);
    }
    
    this.notificationService.showSuccess('تغییرات با موفقیت ذخیره شد.');
    this.activeTab.set('courses');
  }
}
