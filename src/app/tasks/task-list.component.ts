import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { TaskService, Task } from './task.service';
import { TaskDialogComponent } from './task-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatCardModule
  ]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  displayedColumns = ['title', 'description', 'actions'];

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.message || 'Failed to load tasks', 'Close', { duration: 3000 });
      }
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(TaskDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.taskService.createTask(result).subscribe({
          next: () => {
            this.snackBar.open('Task created', 'Close', { duration: 3000 });
            this.loadTasks();
          },
          error: (err) => {
            this.loading = false;
            this.snackBar.open(err.message || 'Failed to create task', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  editTask(task: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, { data: { title: task.title, description: task.description } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.taskService.updateTask(task.id, result).subscribe({
          next: () => {
            this.snackBar.open('Task updated', 'Close', { duration: 3000 });
            this.loadTasks();
          },
          error: (err) => {
            this.loading = false;
            this.snackBar.open(err.message || 'Failed to update task', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  deleteTask(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Delete Task', message: 'Are you sure you want to delete this task?' }
    });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.loading = true;
        this.taskService.deleteTask(id).subscribe({
          next: () => {
            this.snackBar.open('Task deleted', 'Close', { duration: 3000 });
            this.loadTasks();
          },
          error: (err) => {
            this.loading = false;
            this.snackBar.open(err.message || 'Failed to delete task', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}
