import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  shareReplay,
  startWith,
} from 'rxjs';

import { CatalogEntryCardComponent } from '../../components/catalog-entry-card/catalog-entry-card.component';
import { CatalogApiService } from '../../data-access/catalog-api.service';
import { CatalogEntry } from '../../models/catalog-entry.model';

type CatalogVm = {
  loading: boolean;
  error: string | null;
  entries: CatalogEntry[];
  filteredEntries: CatalogEntry[];
  summary: {
    total: number;
    categories: number;
    active: number;
  };
};

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    CatalogEntryCardComponent,
  ],
  templateUrl: './catalog-page.component.html',
  styleUrl: './catalog-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogPageComponent {
  private readonly catalogApiService = inject(CatalogApiService);

  readonly searchControl = new FormControl('', { nonNullable: true });

  private readonly searchTerm$ = this.searchControl.valueChanges.pipe(
    startWith(this.searchControl.getRawValue()),
    debounceTime(200),
    map((value) => value.trim().toLowerCase()),
    distinctUntilChanged(),
  );

  private readonly catalogState$ = this.catalogApiService.getEntries().pipe(
    map((entries) => ({
      loading: false,
      error: null as string | null,
      entries,
    })),
    startWith({
      loading: true,
      error: null as string | null,
      entries: [] as CatalogEntry[],
    }),
    catchError(() =>
      of({
        loading: false,
        error: 'Unable to load catalog entries.',
        entries: [] as CatalogEntry[],
      }),
    ),
  );

  readonly vm$ = combineLatest([this.catalogState$, this.searchTerm$]).pipe(
    map(([state, searchTerm]): CatalogVm => {
      const filteredEntries = filterEntries(state.entries, searchTerm);

      return {
        loading: state.loading,
        error: state.error,
        entries: state.entries,
        filteredEntries,
        summary: buildSummary(filteredEntries),
      };
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
}

function filterEntries(entries: CatalogEntry[], searchTerm: string): CatalogEntry[] {
  if (!searchTerm) {
    return entries;
  }

  return entries.filter((entry) => {
    const haystack = [entry.name, entry.category, entry.owner, ...entry.tags].join(' ').toLowerCase();

    return haystack.includes(searchTerm);
  });
}

function buildSummary(entries: CatalogEntry[]) {
  return {
    total: entries.length,
    categories: new Set(entries.map((entry) => entry.category)).size,
    active: entries.filter((entry) => entry.status === 'active').length,
  };
}
