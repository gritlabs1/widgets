import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cors-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="callApi()">Call API</button>
    <div *ngIf="result">{{ result }}</div>
    <div *ngIf="error" style="color:red;">{{ error }}</div>
  `,
})
export class CorsTestComponent {
  result?: string;
  error?: string;

  constructor(private http: HttpClient) {}

  callApi() {
    this.result = undefined;
    this.error = undefined;
    this.http
      .get('https://www.gritlabs.net/api/hello', { responseType: 'text' })
      .subscribe({
        next: (res) => (this.result = res),
        error: (err) => (this.error = err.message),
      });
  }
}
