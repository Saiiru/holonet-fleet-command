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
      labelKey: 'nav.dashboard',
      icon: 'dashboard',
      route: '/dashboard',
    },
    {
      labelKey: 'nav.fleet',
      icon: 'rocket_launch',
      route: '/fleet',
    },
  ];
}
