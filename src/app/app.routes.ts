import { Routes } from '@angular/router';
import { TaskListComponent } from './tasks/task-list.component';

export const routes: Routes = [
  { path: '', component: TaskListComponent },
  {
    path: 'mutex',
    loadChildren: () =>
      import('./widgets/mutex/mutex.module').then((m) => m.MutexModule),
  },
];
