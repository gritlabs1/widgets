import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TaskListComponent } from './tasks/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, TaskListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
