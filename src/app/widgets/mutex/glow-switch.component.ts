import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glow-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './glow-switch.component.html',
  styleUrls: ['./glow-switch.component.scss'],
})
export class GlowSwitchComponent {
  @Input() name!: string;
  @Input() value!: string;
  @Input() label = '';
  @Input() disabled = false;
  @Input() checked = false;
  @Output() changed = new EventEmitter<string>();

  onChange() {
    this.changed.emit(this.value);
  }
}
