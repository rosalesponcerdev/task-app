import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-section-ui',
  standalone: true,
  imports: [],
  templateUrl: './user-section.component.html',
})
export class UserSectionComponent {
  @Input() username: string | null = null;

  @Output() clickLogout = new EventEmitter();
}
