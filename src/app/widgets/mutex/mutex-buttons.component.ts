import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MutexService, MutexState } from './mutex.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mutex-buttons',
  templateUrl: './mutex-buttons.component.html',
  styleUrls: ['./mutex-buttons.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule]
})
export class MutexButtonsComponent implements OnInit {
  panelOn = false;
  selectedInput: string | null = null;

  readonly inputs: { label: string; icon: string }[] = [
    { label: 'HDMI', icon: 'settings_input_hdmi' },
    { label: 'VGA', icon: 'display_settings' },
    { label: 'HDMI Audio', icon: 'surround_sound' },
    { label: '1/8" Audio', icon: 'headphones' },
  ];

  constructor(private mutexService: MutexService) {}

  ngOnInit() {
    this.mutexService.getState().subscribe((state) => {
      this.panelOn = state.panelOn;
      this.selectedInput = state.selectedInput;
    });
  }

  togglePower() {
    this.panelOn = !this.panelOn;
    this.persistState();
  }

  chooseInput(input: string) {
    if (!this.panelOn) {
      return;
    }
    this.selectedInput = input;
    this.persistState();
  }

  get status(): string {
    if (!this.panelOn) {
      return 'Panel Off';
    }
    return this.selectedInput ? `${this.selectedInput} selected` : 'Panel On';
  }

  private persistState() {
    const state: MutexState = {
      panelOn: this.panelOn,
      selectedInput: this.selectedInput
    };
    this.mutexService.setState(state).subscribe();
  }
}
