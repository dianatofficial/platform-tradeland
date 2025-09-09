import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/data/user.service';
import { NotificationService } from '../../../services/error-handling/notification.service';
import { User } from '../../../models/user.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-admin-user-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminUserFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);
  private notificationService = inject(NotificationService);

  isLoading = signal(false);
  editMode = signal(false);
  userId = signal<number | null>(null);
  
  pageTitle = computed(() => this.editMode() ? 'ویرایش کاربر' : 'افزودن کاربر جدید');

  userForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl<'User' | 'Instructor' | 'Admin'>('User', [Validators.required]),
    bio: new FormControl(''),
    tradingStyle: new FormControl<'Day Trader' | 'Swing Trader' | 'Investor' | 'Scalper' | null>(null),
  });

  private currentUser?: User;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode.set(true);
      const userId = +id;
      this.userId.set(userId);
      this.loadUserData(userId);
    }
  }

  loadUserData(id: number): void {
    this.isLoading.set(true);
    this.userService.getUserById(id).pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          this.currentUser = user;
          this.userForm.patchValue(user);
        } else {
          this.notificationService.showError('کاربر مورد نظر یافت نشد.');
          this.router.navigate(['/admin/users']);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.notificationService.showError(err.message || 'خطا در دریافت اطلاعات کاربر.');
        this.router.navigate(['/admin/users']);
        this.isLoading.set(false);
      }
    });
  }
  
  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.notificationService.showError('لطفا تمام فیلدهای الزامی را پر کنید.');
      return;
    }
    
    this.isLoading.set(true);
    const formValue = this.userForm.value;

    if (this.editMode() && this.currentUser) {
      const updatedUser: User = { ...this.currentUser, ...formValue as Partial<User> };
      this.userService.updateUser(updatedUser);
      this.notificationService.showSuccess('کاربر با موفقیت ویرایش شد.');
      this.router.navigate(['/admin/users']);
    } else {
      const newUser: Omit<User, 'id'> = {
        fullName: formValue.fullName!,
        email: formValue.email!,
        role: formValue.role!,
        bio: formValue.bio || undefined,
        tradingStyle: formValue.tradingStyle || undefined,
        avatarUrl: `https://picsum.photos/seed/${formValue.fullName}/100/100`,
        joinedDate: new Date().toLocaleDateString('fa-IR'),
      };
      this.userService.addUser(newUser);
      this.notificationService.showSuccess('کاربر جدید با موفقیت اضافه شد.');
      this.router.navigate(['/admin/users']);
    }
  }
}
