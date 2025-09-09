import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface AppearanceTab {
  link: string;
  label: string;
}

@Component({
  selector: 'app-admin-appearance',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-appearance.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminAppearanceComponent {
  tabs: AppearanceTab[] = [
    { link: 'home', label: 'صفحه اصلی' },
    { link: 'header', label: 'هدر' },
    { link: 'footer', label: 'فوتر' },
    // More pages can be added here
  ];
}
