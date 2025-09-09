/**
 * @fileoverview سرویس مدیریت داده های مدرسین و تحلیلگران.
 */
import { Injectable, signal } from '@angular/core';
import { ALL_INSTRUCTORS } from '../../data/instructors.data';
import { Instructor } from '../../models/instructor.model';

@Injectable({ providedIn: 'root' })
export class InstructorService {
  private instructorsState = signal<Instructor[]>(ALL_INSTRUCTORS);

  public instructors = this.instructorsState.asReadonly();

  /**
   * یک مدرس/تحلیلگر را بر اساس شناسه حذف می‌کند.
   * @param id شناسه آیتمی که باید حذف شود.
   */
  deleteInstructor(id: number): void {
    this.instructorsState.update(items => items.filter(item => item.id !== id));
  }
}
