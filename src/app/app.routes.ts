import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./showcase/widgets-showcase.component').then(
        (m) => m.WidgetsShowcaseComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./showcase/welcome.component').then((m) => m.WelcomeComponent),
      },
      {
        path: 'widget/task-list',
        loadComponent: () =>
          import('./tasks/task-list.component').then((m) => m.TaskListComponent),
      },
      {
        path: 'widget/mutex',
        loadComponent: () =>
          import('./widgets/mutex/mutex-buttons.component').then(
            (m) => m.MutexButtonsComponent
          ),
      },
      {
        path: 'widget/cors-test',
        loadComponent: () =>
          import('./cors-test.component').then((m) => m.CorsTestComponent),
      },
      {
        path: 'widget/ag-grid-demo',
        loadComponent: () =>
          import('./widgets/ag-grid-crypto/ag-grid-crypto-demo.component').then(
            (m) => m.AgGridCryptoDemoComponent
          ),
      },
    ],
  },
  {
    path: 'task-list',
    loadComponent: () =>
      import('./tasks/task-list.component').then((m) => m.TaskListComponent),
  },
  {
    path: 'mutex',
    loadComponent: () =>
      import('./widgets/mutex/mutex-buttons.component').then(
        (m) => m.MutexButtonsComponent
      ),
  },
  {
    path: 'cors-test',
    loadComponent: () =>
      import('./cors-test.component').then((m) => m.CorsTestComponent),
  },
  {
    path: 'ag-grid-demo',
    loadComponent: () =>
      import('./widgets/ag-grid-crypto/ag-grid-crypto-demo.component').then(
        (m) => m.AgGridCryptoDemoComponent
      ),
  },
];
