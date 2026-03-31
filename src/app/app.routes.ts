import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'today',
  },
  {
    path: 'today',
    title: 'Today | VEGA Ops Hub',
    loadComponent: () =>
      import('./features/today/pages/today-page/today-page.component').then(
        (m) => m.TodayPageComponent,
      ),
  },
  {
    path: 'projects',
    title: 'Projects | VEGA Ops Hub',
    loadComponent: () =>
      import('./features/projects/pages/projects-page/projects-page.component').then(
        (m) => m.ProjectsPageComponent,
      ),
  },
  {
    path: 'tasks',
    title: 'Tasks | VEGA Ops Hub',
    loadComponent: () =>
      import('./features/tasks/pages/tasks-page/tasks-page.component').then(
        (m) => m.TasksPageComponent,
      ),
  },
  {
    path: 'catalog',
    title: 'Catalog | VEGA Ops Hub',
    loadComponent: () =>
      import('./features/catalog/pages/catalog-page/catalog-page.component').then(
        (m) => m.CatalogPageComponent,
      ),
  },
  {
    path: 'notes',
    title: 'Notes | VEGA Ops Hub',
    loadComponent: () =>
      import('./features/notes/pages/notes-page/notes-page.component').then(
        (m) => m.NotesPageComponent,
      ),
  },
  {
    path: 'vega',
    title: 'VEGA Assistant | VEGA Ops Hub',
    loadComponent: () =>
      import('./features/vega-assistant/pages/vega-assistant-page/vega-assistant-page.component').then(
        (m) => m.VegaAssistantPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'today',
  },
];
