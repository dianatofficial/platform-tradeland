import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/state/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm = new FormGroup({
    email: new FormControl('user@trade.com', [Validators.required, Validators.email]),
    password: new FormControl('12345678', [Validators.required]),
  });

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  login(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      const { email, password } = this.loginForm.value;

      this.authService.login(email!, password!).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/']); // هدایت به صفحه اصلی پس از ورود موفق
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.message || 'خطایی رخ داد. لطفاً دوباره تلاش کنید.');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
