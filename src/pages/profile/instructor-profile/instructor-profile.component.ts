/**
 * @fileoverview کامپوننت پروفایل عمومی مدرس یا تحلیلگر.
 * این صفحه اطلاعات عمومی، دوره ها و فعالیت های یک مدرس را نمایش می دهد.
 */
import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
// FIX: Corrected import paths from ../../ to ../../../ to resolve type inference issues.
import { UserService } from '../../../services/data/user.service';
import { CourseService } from '../../../services/data/course.service';
import { useAsync } from '../../../composables/use-async';
import { QueryStateComponent } from '../../../components/query-state/query-state.component';
import { CourseCardComponent } from '../../../components/course-card/course-card.component';
import { StateService } from '../../../services/state/state.service';
import { BlogPostCardComponent } from '../../../components/blog-post-card/blog-post-card.component';
import { BlogService } from '../../../services/data/blog.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CafeTradeService } from '../../../services/data/cafe-trade.service';
import { NotificationService } from '../../../services/error-handling/notification.service';
import { RichTextEditorComponent } from '../../../components/rich-text-editor/rich-text-editor.component';
import { ChannelPostComponent } from '../../../components/channel-post/channel-post.component';
import { CafeTradePost } from '../../../models/cafe-trade.model';

@Component({
  selector: 'app-instructor-profile',
  imports: [CommonModule, QueryStateComponent, CourseCardComponent, BlogPostCardComponent, ReactiveFormsModule, RichTextEditorComponent, ChannelPostComponent],
  templateUrl: './instructor-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstructorProfileComponent {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private courseService = inject(CourseService);
  private blogService = inject(BlogService);
  private stateService = inject(StateService);
  private cafeTradeService = inject(CafeTradeService);
  private notificationService = inject(NotificationService);

  private user$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.userService.getUserById(id))
  );

  private query = useAsync(this.user$);
  instructor = this.query.data;
  status = this.query.status;
  error = this.query.error;

  activeTab = signal<'courses' | 'about' | 'blog' | 'reviews' | 'channel'>('courses');

  newPostForm = new FormGroup({
    content: new FormControl('', Validators.required),
    imageUrl: new FormControl(''),
  });

  isOwnProfile = computed(() => {
    return this.stateService.currentUser()?.id === this.instructor()?.id;
  });

  createdCourses = computed(() => {
    const instructor = this.instructor();
    if (!instructor) return [];
    // In a real app, courses would have an `instructorId`. Here we filter by name.
    return this.courseService.courses().filter(c => c.instructor === instructor.fullName);
  });

  writtenPosts = computed(() => {
    const instructor = this.instructor();
    if (!instructor) return [];
    return this.blogService.posts().filter(p => p.author === instructor.fullName);
  });

  allReviews = computed(() => {
    const courses = this.createdCourses();
    if (!courses) return [];
    return courses.flatMap(course => 
        course.reviews.map(review => ({ ...review, courseTitle: course.title }))
    );
  });

  channel = computed(() => {
    const instructorId = this.instructor()?.id;
    if (!instructorId) return null;
    return this.cafeTradeService.analysts().find(a => a.userId === instructorId);
  });
  
  channelPosts = computed(() => {
    const channelId = this.channel()?.id;
    if (!channelId) return [];
    return this.cafeTradeService.posts()
      .filter(p => p.channelId === channelId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  });

  selectTab(tab: 'courses' | 'about' | 'blog' | 'reviews' | 'channel'): void {
    this.activeTab.set(tab);
  }

  submitPost(): void {
    if (this.newPostForm.invalid) {
      this.notificationService.showError('محتوای پست نمی‌تواند خالی باشد.');
      return;
    }
    const channel = this.channel();
    const instructor = this.instructor();
    if (!channel || !instructor) {
       this.notificationService.showError('اطلاعات کانال یافت نشد.');
      return;
    }
    
    const formValue = this.newPostForm.value;
    
    const postData: Omit<CafeTradePost, 'id' | 'timestamp' | 'reactions'> = {
      channelId: channel.id,
      authorId: instructor.id,
      authorName: instructor.fullName,
      authorAvatarUrl: instructor.avatarUrl!,
      content: formValue.content!,
      imageUrl: formValue.imageUrl || undefined,
      type: formValue.imageUrl ? 'image' : 'text',
    };
    
    this.cafeTradeService.addPost(postData);
    this.notificationService.showSuccess('پست با موفقیت منتشر شد.');
    this.newPostForm.reset();
  }

  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(1);
  }
}
