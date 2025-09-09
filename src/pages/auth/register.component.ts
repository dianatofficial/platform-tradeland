import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/state/auth.service';
import { NotificationService } from '../../services/error-handling/notification.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  // Fix: Replaced FormBuilder with direct instantiation of FormGroup and FormControl
  // to resolve a type inference issue with `inject(FormBuilder)`.
  registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    terms: new FormControl(false, [Validators.requiredTrue]),
  });
  
  get fullName() { return this.registerForm.get('fullName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }

  register(): void {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      const { fullName, email, password } = this.registerForm.value;

      this.authService.register(fullName!, email!, password!).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.notificationService.showSuccess('ثبت نام شما با موفقیت انجام شد. اکنون می‌توانید وارد شوید.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.message || 'خطایی در هنگام ثبت نام رخ داد.');
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
