/**
 * @fileoverview کامپوننت قابل استفاده مجدد برای نمایش کارت یک دوره آموزشی.
 * این کامپوننت اطلاعات خلاصه یک دوره را در قالب یک کارت نمایش می دهد.
 */
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './course-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent {
  /** ورودی اجباری: آبجکت داده های دوره. */
  course = input.required<Course>();
}
