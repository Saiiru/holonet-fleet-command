import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    title: 'Dashboard | HoloNet Fleet Command',
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard-page/dashboard-page.component').then(
        (m) => m.DashboardPageComponent,
      ),
  },
  {
    path: 'fleet',
    title: 'Fleet Registry | HoloNet Fleet Command',
    loadComponent: () =>
      import('./features/fleet/pages/fleet-page/fleet-page.component').then(
        (m) => m.FleetPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
