/**
 * @fileoverview کامپوننت صفحه مشاهده یک جلسه از دوره.
 * این کامپوننت شامل پلیر ویدیو، لیست تمام جلسات دوره (سایدبار) و
 * اطلاعات مربوط به جلسه فعلی است.
 */
import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap, Observable } from 'rxjs';
import { CourseService } from '../../services/data/course.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { Course, Lesson } from '../../models/course.model';
import { useAsync } from '../../composables/use-async';
import { BreadcrumbItem } from '../../models/ui.model';
import { QueryStateComponent } from '../../components/query-state/query-state.component';

interface WatchPageData {
  course?: Course;
  lesson?: Lesson;
  lessonId?: number;
}

@Component({
  selector: 'app-course-watch',
  imports: [CommonModule, RouterLink, BreadcrumbComponent, QueryStateComponent],
  templateUrl: './course-watch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseWatchComponent {
  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);
  
  private params$ = this.route.paramMap.pipe(
    map(params => ({
      courseId: Number(params.get('id')),
      lessonId: Number(params.get('lessonId'))
    }))
  );

  private data$: Observable<WatchPageData> = this.params$.pipe(
    switchMap(({ courseId, lessonId }) => 
      this.courseService.getCourseById(courseId).pipe(
        map(course => {
          const lesson = course?.syllabus.flatMap(s => s.lessons).find(l => l.id === lessonId);
          return { course, lesson, lessonId };
        })
      )
    )
  );
  
  private query = useAsync(this.data$);

  status = this.query.status;
  error = this.query.error;

  private pageData = this.query.data;

  course = computed(() => this.pageData()?.course);
  currentLesson = computed(() => this.pageData()?.lesson);
  currentLessonId = computed(() => this.pageData()?.lessonId);

  breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const c = this.course();
    const l = this.currentLesson();
    if (!c) {
      if (this.status() === 'error') {
        return [{ label: 'خطا' }];
      }
      return [];
    }
    const items: BreadcrumbItem[] = [
      { label: 'دوره ها', link: '/courses' },
      { label: c.title, link: `/courses/${c.id}` },
    ];
    if (l) {
      items.push({ label: l.title });
    }
    return items;
  });
}
