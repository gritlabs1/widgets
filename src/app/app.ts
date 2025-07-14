import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CorsTestComponent } from './cors-test.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule, CorsTestComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-workspace');
}
