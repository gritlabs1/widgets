import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  template: '<p class="welcome">Select a widget from the menu.</p>',
  styleUrls: ['./welcome.component.css'],
  imports: [CommonModule],
})
export class WelcomeComponent {}
