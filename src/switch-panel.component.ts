import { Component, Input } from '@angular/core';

export interface PanelInput {
  id: string;
  label: string;
}

@Component({
  selector: 'app-switch-panel',
  standalone: true,
  template: `
    <div class="panel" [class.disabled]="disabled" role="radiogroup">
      <label *ngFor="let input of inputs" class="switch" [class.active]="input.id === value">
        <input type="radio" name="panelInput" [value]="input.id" [disabled]="disabled"
               [checked]="input.id === value" (change)="select(input.id)" [attr.aria-label]="input.label">
        <span class="rail">
          <span class="thumb"></span>
        </span>
        <span class="label">{{ input.label }}</span>
      </label>
    </div>
  `,
  styles: [
    `
    :host { display: block; font-family: sans-serif; }
    .panel { display: flex; gap: 1rem; }
    .switch { position: relative; cursor: pointer; user-select: none; }
    .switch input { display: none; }
    .rail { display: inline-block; width: 60px; height: 24px; background: #444; border-radius: 12px; position: relative; box-shadow: inset 0 0 4px #000; }
    .thumb { position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; border-radius: 50%; background: #666; transition: left 0.2s; box-shadow: 0 0 6px rgba(0,0,0,0.6); }
    .switch.active .rail { background: #2196F3; box-shadow: 0 0 8px #2196F3; }
    .switch.active .thumb { left: 38px; background: #bbdefb; }
    .switch.disabled { opacity: 0.5; cursor: default; }
    .panel.disabled .switch { pointer-events: none; opacity: 0.5; }
    .label { display: block; text-align: center; margin-top: 0.25rem; font-size: 0.75rem; }
    `
  ]
})
export class SwitchPanelComponent {
  @Input() inputs: PanelInput[] = [];
  @Input() value = '';
  @Input() disabled = false;

  select(id: string) {
    if (!this.disabled && this.value !== id) {
      this.value = id;
    }
  }
}
