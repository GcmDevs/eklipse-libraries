import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./modules/home').then((m) => m.Page),
      },
      {
        path: 'seguridad',
        loadChildren: () => import('./modules/permisos/routes').then((m) => m.routes),
        data: { authorities: ['seguridad'] },
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
