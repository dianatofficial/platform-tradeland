import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StateService } from '../../services/state/state.service';

interface MobileNavLink {
  path: string;
  label: string;
  icon: string;
  exact?: boolean;
}

@Component({
  selector: 'app-mobile-nav',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './mobile-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavComponent {
  private stateService = inject(StateService);
  isAuthenticated = this.stateService.isAuthenticated;
  
  // Use computed to dynamically change the last link based on auth state
  navLinks = computed<MobileNavLink[]>(() => {
    const links: MobileNavLink[] = [
      { path: '/', label: 'خانه', icon: 'home', exact: true },
      { path: '/courses', label: 'دوره ها', icon: 'book-open' },
      { path: '/blog', label: 'بلاگ', icon: 'file-text' },
      { path: '/subscriptions', label: 'اشتراک', icon: 'gem' },
    ];
    
    if (this.isAuthenticated()) {
      links.push({ path: '/profile', label: 'پروفایل', icon: 'user' });
    } else {
      links.push({ path: '/login', label: 'ورود', icon: 'log-in' });
    }
    
    return links;
  });
}
