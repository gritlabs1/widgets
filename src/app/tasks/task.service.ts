import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Task {
  id: string;
  title: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = 'https://www.gritlabs.net';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http
      .get<{ taskId: string; title: string; description: string }[]>(
        `${this.baseUrl}/tasks/list`
      )
      .pipe(
        map((tasks) =>
          tasks.map((t) => ({ id: t.taskId, title: t.title, description: t.description }))
        )
      );
  }

  createTask(task: Omit<Task, 'id'>): Observable<string> {
    return this.http.post(`${this.baseUrl}/tasks/create`, task, { responseType: 'text' });
  }

  getTask(id: string): Observable<Task> {
    return this.http
      .get<{ taskId: string; title: string; description: string }>(
        `${this.baseUrl}/tasks/${id}/details`
      )
      .pipe(map((t) => ({ id: t.taskId, title: t.title, description: t.description })));
  }

  updateTask(id: string, task: Omit<Task, 'id'>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/tasks/${id}/details`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tasks/${id}/details`);
  }
}
