import { Component, ChangeDetectionStrategy, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InstructorService } from '../../../services/data/instructor.service';
import { NotificationService } from '../../../services/error-handling/notification.service';
import { Instructor } from '../../../models/instructor.model';

@Component({
  selector: 'app-admin-instructors',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-instructors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminInstructorsComponent {
  private instructorService = inject(InstructorService);
  private notificationService = inject(NotificationService);

  instructors = this.instructorService.instructors;

  deleteInstructor(instructor: Instructor): void {
    if (confirm(`آیا از حذف "${instructor.name}" اطمینان دارید؟`)) {
      this.instructorService.deleteInstructor(instructor.id);
      this.notificationService.showSuccess(`"${instructor.name}" با موفقیت حذف شد.`);
    }
  }

  getTypeClass(type: string): string {
    return type === 'مدرس' ? 'bg-indigo-100 text-indigo-800' : 'bg-teal-100 text-teal-800';
  }
}
