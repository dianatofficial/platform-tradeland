import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SubscriptionPlanService } from '../../../services/data/subscription-plan.service';
import { NotificationService } from '../../../services/error-handling/notification.service';
import { take } from 'rxjs';
import { SubscriptionPlan } from '../../../models/subscription-plan.model';

@Component({
  selector: 'app-admin-subscription-plan-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-subscription-plan-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSubscriptionPlanFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private planService = inject(SubscriptionPlanService);
  private notificationService = inject(NotificationService);

  isLoading = signal(false);
  editMode = signal(false);
  planId = signal<number | null>(null);
  
  pageTitle = computed(() => this.editMode() ? 'ویرایش پلن اشتراک' : 'افزودن پلن جدید');

  planForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    period: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    isRecommended: new FormControl(false),
    features: new FormArray([new FormControl('')]),
  });

  get features() {
    return this.planForm.get('features') as FormArray;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode.set(true);
      const planId = +id;
      this.planId.set(planId);
      this.loadPlanData(planId);
    }
  }

  loadPlanData(id: number): void {
    this.isLoading.set(true);
    this.planService.getPlanById(id).pipe(take(1)).subscribe({
      next: (plan) => {
        this.planForm.patchValue(plan);
        this.features.clear();
        plan.features.forEach(feature => this.features.push(new FormControl(feature, Validators.required)));
        this.isLoading.set(false);
      },
      error: (err) => {
        this.notificationService.showError(err.message || 'خطا در دریافت اطلاعات پلن.');
        this.router.navigate(['/admin/subscription-plans']);
        this.isLoading.set(false);
      }
    });
  }
  
  addFeature() {
    this.features.push(new FormControl('', Validators.required));
  }

  removeFeature(index: number) {
    this.features.removeAt(index);
  }

  onSubmit(): void {
    if (this.planForm.invalid) {
      this.planForm.markAllAsTouched();
      this.notificationService.showError('لطفا تمام فیلدهای الزامی را پر کنید.');
      return;
    }
    
    this.isLoading.set(true);
    const formValue = this.planForm.value;

    if (this.editMode()) {
      const updatedPlan: SubscriptionPlan = { id: this.planId()!, ...formValue as Omit<SubscriptionPlan, 'id'> };
      this.planService.updatePlan(updatedPlan);
      this.notificationService.showSuccess('پلن با موفقیت ویرایش شد.');
      this.router.navigate(['/admin/subscription-plans']);
    } else {
      this.planService.addPlan(formValue as Omit<SubscriptionPlan, 'id'>);
      this.notificationService.showSuccess('پلن جدید با موفقیت اضافه شد.');
      this.router.navigate(['/admin/subscription-plans']);
    }
  }
}
