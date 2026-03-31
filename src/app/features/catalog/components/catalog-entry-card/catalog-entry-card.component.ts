import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { CatalogEntry } from '../../models/catalog-entry.model';

@Component({
  selector: 'app-catalog-entry-card',
  standalone: true,
  imports: [MatCardModule, MatChipsModule],
  templateUrl: './catalog-entry-card.component.html',
  styleUrl: './catalog-entry-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogEntryCardComponent {
  @Input({ required: true }) entry!: CatalogEntry;

  get statusLabel(): string {
    switch (this.entry.status) {
      case 'active':
        return 'Active';
      case 'draft':
        return 'Draft';
      default:
        return 'Deprecated';
    }
  }

  get statusClass(): string {
    return `catalog-entry-card__status catalog-entry-card__status--${this.entry.status}`;
  }
}
