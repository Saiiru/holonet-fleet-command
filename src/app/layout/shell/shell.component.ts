import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  readonly navItems = [
    {
      labelKey: 'nav.today',
      icon: 'today',
      route: '/today',
    },
    {
      labelKey: 'nav.projects',
      icon: 'folder_open',
      route: '/projects',
    },
    {
      labelKey: 'nav.tasks',
      icon: 'checklist',
      route: '/tasks',
    },
    {
      labelKey: 'nav.catalog',
      icon: 'inventory_2',
      route: '/catalog',
    },
    {
      labelKey: 'nav.notes',
      icon: 'note_stack',
      route: '/notes',
    },
    {
      labelKey: 'nav.vega',
      icon: 'psychology',
      route: '/vega',
    },
  ];
}
