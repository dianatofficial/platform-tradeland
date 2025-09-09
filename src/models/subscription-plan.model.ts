/**
 * @fileoverview Defines the data model for a subscription plan.
 */

/**
 * @interface SubscriptionPlan
 * Defines the structure for a subscription plan object.
 */
export interface SubscriptionPlan {
  id: number;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isRecommended: boolean;
}
