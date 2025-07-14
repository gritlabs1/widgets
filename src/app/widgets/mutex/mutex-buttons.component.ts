import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { MutexService, MutexState } from './mutex.service';

@Component({
  selector: 'app-mutex-buttons',
  templateUrl: './mutex-buttons.component.html',
  styleUrls: ['./mutex-buttons.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatButtonToggleModule]
})
export class MutexButtonsComponent implements OnInit {
  panelOn = false;
  selectedInput: string | null = null;

  readonly inputs = ['HDMI', 'VGA', 'HDMI Audio', '1/8\" Audio'];

  constructor(private mutexService: MutexService) {}

  ngOnInit() {
    this.mutexService.getState().subscribe((state) => {
      this.panelOn = state.panelOn;
      this.selectedInput = state.selectedInput;
    });
  }

  togglePower() {
    this.panelOn = !this.panelOn;
    if (!this.panelOn) {
      this.selectedInput = null;
    }
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
