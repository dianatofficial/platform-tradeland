/**
 * @fileoverview تعریف مدل داده (Interface) برای دوره های آموزشی.
 */

import { User } from "./user.model";

/**
 * @interface Lesson
 * ساختار داده برای یک جلسه درسی را تعریف می کند.
 */
export interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
  isFreePreview?: boolean;
}

/**
 * @interface Course
 * ساختار داده برای یک دوره آموزشی را با تمام جزئیات آن تعریف می کند.
 */
export interface Course {
  id: number;
  title: string;
  instructorId: number; // Foreign key to User
  instructor: string; // Denormalized for display
  instructorImage: string; // Denormalized for display
  instructorBio: string; // Denormalized for display
  price: string;
  subscriptionOnly?: boolean;
  level: string;
  categoryId: number; // Foreign key to Category
  category: string; // Denormalized for display
  tags: string[];
  duration: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  description: string;
  students: number;
  lastUpdate: string;
  whatYouWillLearn: string[];
  requirements: string[];
  syllabus: { 
    sectionTitle: string; 
    lessons: Lesson[];
  }[];
  reviews: {
    name: string;
    rating: number;
    comment: string;
  }[];
}
