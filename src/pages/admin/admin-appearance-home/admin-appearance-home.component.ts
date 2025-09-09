import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppearanceService, HomePageSection } from '../../../services/state/appearance.service';
import { NotificationService } from '../../../services/error-handling/notification.service';

@Component({
  selector: 'app-admin-appearance-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-appearance-home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminAppearanceHomeComponent {
  private appearanceService = inject(AppearanceService);
  private notificationService = inject(NotificationService);

  sliderImages = this.appearanceService.sliderImages;
  homePageSections = this.appearanceService.homePageSections;

  newImageUrl = signal('');

  addSliderImage(): void {
    const url = this.newImageUrl().trim();
    if (url) {
      try {
        // Simple URL validation
        new URL(url);
        this.appearanceService.addSliderImage(url);
        this.newImageUrl.set('');
        this.notificationService.showSuccess('تصویر با موفقیت اضافه شد.');
      } catch (_) {
        this.notificationService.showError('آدرس URL وارد شده معتبر نیست.');
      }
    }
  }

  deleteSliderImage(index: number): void {
    if (confirm('آیا از حذف این تصویر اطمینان دارید؟')) {
      this.appearanceService.deleteSliderImage(index);
      this.notificationService.showSuccess('تصویر با موفقیت حذف شد.');
    }
  }

  toggleSectionVisibility(sectionId: string): void {
    const sections = this.homePageSections().map(s => 
      s.id === sectionId ? { ...s, visible: !s.visible } : s
    );
    this.appearanceService.updateHomePageSections(sections);
  }

  moveSection(index: number, direction: 'up' | 'down'): void {
    const sections = [...this.homePageSections()];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < sections.length) {
      // Swap elements
      [sections[index], sections[targetIndex]] = [sections[targetIndex], sections[index]];
      this.appearanceService.updateHomePageSections(sections);
    }
  }
}
