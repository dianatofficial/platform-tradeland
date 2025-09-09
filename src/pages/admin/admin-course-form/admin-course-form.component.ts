


import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService } from '../../../services/data/course.service';
import { NotificationService } from '../../../services/error-handling/notification.service';
import { Course } from '../../../models/course.model';
import { take } from 'rxjs';
import { RichTextEditorComponent } from '../../../components/rich-text-editor/rich-text-editor.component';
import { UserService } from '../../../services/data/user.service';
import { CategoryService } from '../../../services/data/category.service';
import { User } from '../../../models/user.model';
import { Category } from '../../../models/category.model';


@Component({
  selector: 'app-admin-course-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RichTextEditorComponent],
  templateUrl: './admin-course-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCourseFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);
  private notificationService = inject(NotificationService);
  private userService = inject(UserService);
  private categoryService = inject(CategoryService);

  isLoading = signal(false);
  editMode = signal(false);
  courseId = signal<number | null>(null);
  
  instructors = computed<User[]>(() => this.userService.users().filter(u => u.role === 'Instructor'));
  courseCategories = computed<Category[]>(() => this.categoryService.getCategoriesByType('course'));

  pageTitle = computed(() => this.editMode() ? 'ویرایش دوره' : 'افزودن دوره جدید');

  courseForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    instructorId: new FormControl<number | null>(null, [Validators.required]),
    price: new FormControl('', [Validators.required]),
    level: new FormControl('مقدماتی', [Validators.required]),
    categoryId: new FormControl<number | null>(null, [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    imageUrl: new FormControl(''),
  });

  get title() { return this.courseForm.get('title'); }
  get instructorId() { return this.courseForm.get('instructorId'); }
  get price() { return this.courseForm.get('price'); }
  get categoryId() { return this.courseForm.get('categoryId'); }
  get duration() { return this.courseForm.get('duration'); }
  get description() { return this.courseForm.get('description'); }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode.set(true);
      this.courseId.set(+id);
      this.loadCourseData(+id);
    }
  }

  loadCourseData(id: number): void {
    this.isLoading.set(true);
    this.courseService.getCourseById(id).pipe(take(1)).subscribe({
      next: (course) => {
        if (course) {
          this.courseForm.patchValue(course);
        } else {
          this.notificationService.showError('دوره مورد نظر یافت نشد.');
          this.router.navigate(['/admin/courses']);
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.notificationService.showError('خطا در دریافت اطلاعات دوره.');
        this.isLoading.set(false);
      }
    });
  }
  
  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      this.notificationService.showError('لطفا تمام فیلدهای الزامی را پر کنید.');
      return;
    }
    
    this.isLoading.set(true);
    const formValue = this.courseForm.value;
    const instructor = this.instructors().find(i => i.id === formValue.instructorId);
    const category = this.courseCategories().find(c => c.id === formValue.categoryId);

    if (!instructor || !category) {
      this.notificationService.showError('مدرس یا دسته بندی نامعتبر است.');
      this.isLoading.set(false);
      return;
    }
    
    const courseDataPayload = {
        title: formValue.title!,
        instructorId: instructor.id,
        instructor: instructor.fullName,
        instructorImage: instructor.avatarUrl || '',
        instructorBio: instructor.bio || '',
        price: formValue.price!,
        level: formValue.level!,
        categoryId: category.id,
        category: category.name,
        duration: formValue.duration!,
        description: formValue.description!,
        imageUrl: formValue.imageUrl || `https://picsum.photos/seed/${formValue.title}/600/400`,
    };

    if (this.editMode()) {
      this.courseService.getCourseById(this.courseId()!).pipe(take(1)).subscribe(existingCourse => {
        if (existingCourse) {
          const updatedCourse: Course = { 
            ...existingCourse, 
            ...courseDataPayload 
          };
          this.courseService.updateCourse(updatedCourse);
          this.notificationService.showSuccess('دوره با موفقیت ویرایش شد.');
          this.router.navigate(['/admin/courses']);
        }
      });
    } else {
      const newCourseData: Omit<Course, 'id'> = {
        ...courseDataPayload,
        rating: 0,
        reviewCount: 0,
        students: 0,
        lastUpdate: new Date().toLocaleDateString('fa-IR'),
        tags: [],
        whatYouWillLearn: [],
        requirements: [],
        syllabus: [],
        reviews: [],
      };
      this.courseService.addCourse(newCourseData);
      this.notificationService.showSuccess('دوره جدید با موفقیت اضافه شد.');
      this.router.navigate(['/admin/courses']);
    }
  }
}
