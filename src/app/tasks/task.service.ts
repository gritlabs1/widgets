import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.get<Task[]>(`${this.baseUrl}/tasks/list`);
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks/create`, task);
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/tasks/${id}/details`);
  }

  updateTask(id: string, task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/tasks/${id}/details`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tasks/${id}/details`);
  }
}
