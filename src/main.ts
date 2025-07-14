import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { SwitchPanelComponent, PanelInput } from './switch-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SwitchPanelComponent],
  template: `
    <app-switch-panel [inputs]="inputs" [(value)]="value" [disabled]="disabled"></app-switch-panel>
    <div style="margin-top:1rem;">
      <button (click)="disabled = !disabled">Toggle Power ({{ disabled ? 'OFF' : 'ON' }})</button>
      <p>Selected: {{ value }}</p>
    </div>
  `
})
export class AppComponent {
  inputs: PanelInput[] = [
    { id: 'hdmi', label: 'HDMI' },
    { id: 'vga', label: 'VGA' },
    { id: 'hdmi-audio', label: 'HDMI Audio' },
    { id: 'aux', label: '1/8\" Audio' }
  ];
  value = 'hdmi';
  disabled = false;
}

bootstrapApplication(AppComponent).catch(err => console.error(err));
