/**
 * @fileoverview کامپوننت فوتر (Footer) اپلیکیشن.
 * این کامپوننت شامل لینک های سریع، اطلاعات کپی رایت و لینک های شبکه های اجتماعی است.
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  /** سال جاری برای نمایش در متن کپی رایت. */
  currentYear = new Date().getFullYear();
}