/**
 * @fileoverview Service for managing subscription plan data.
 */
import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { ALL_PLANS } from '../../data/subscription-plans.data';
import { SubscriptionPlan } from '../../models/subscription-plan.model';

@Injectable({ providedIn: 'root' })
export class SubscriptionPlanService {
  private plansState = signal<SubscriptionPlan[]>(ALL_PLANS);

  public plans = this.plansState.asReadonly();

  getPlans(): Observable<SubscriptionPlan[]> {
    return of(this.plansState()).pipe(delay(200));
  }

  getPlanById(id: number): Observable<SubscriptionPlan> {
    const plan = this.plansState().find(p => p.id === id);
    if (!plan) {
      return throwError(() => new Error(`پلن با شناسه ${id} یافت نشد.`));
    }
    return of(plan).pipe(delay(100));
  }

  addPlan(planData: Omit<SubscriptionPlan, 'id'>): void {
    const newPlan: SubscriptionPlan = {
      ...planData,
      id: Date.now(),
    };
    this.plansState.update(plans => [...plans, newPlan]);
  }

  updatePlan(updatedPlan: SubscriptionPlan): void {
    this.plansState.update(plans =>
      plans.map(p => p.id === updatedPlan.id ? updatedPlan : p)
    );
  }

  deletePlan(id: number): void {
    this.plansState.update(plans => plans.filter(p => p.id !== id));
  }
}
