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

import { StarshipCardComponent } from '../../components/starship-card/starship-card.component';
import { StarshipsApiService } from '../../data-access/starships-api.service';
import { Starship } from '../../models/starship.model';

type FleetVm = {
  loading: boolean;
  error: string | null;
  starships: Starship[];
  filteredStarships: Starship[];
  summary: {
    total: number;
    manufacturers: number;
    hyperspaceReady: number;
  };
};

@Component({
  selector: 'app-fleet-page',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    StarshipCardComponent,
  ],
  templateUrl: './fleet-page.component.html',
  styleUrl: './fleet-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FleetPageComponent {
  private readonly starshipsApiService = inject(StarshipsApiService);

  readonly searchControl = new FormControl('', { nonNullable: true });

  private readonly searchTerm$ = this.searchControl.valueChanges.pipe(
    startWith(this.searchControl.getRawValue()),
    debounceTime(250),
    map((value) => value.trim().toLowerCase()),
    distinctUntilChanged(),
  );

  private readonly starshipsState$ = this.starshipsApiService.getStarships().pipe(
    map((starships) => ({
      loading: false,
      error: null as string | null,
      starships,
    })),
    startWith({
      loading: true,
      error: null as string | null,
      starships: [] as Starship[],
    }),
    catchError(() =>
      of({
        loading: false,
        error: 'Unable to load SWAPI fleet data.',
        starships: [] as Starship[],
      }),
    ),
  );

  readonly vm$ = combineLatest([this.starshipsState$, this.searchTerm$]).pipe(
    map(([state, searchTerm]): FleetVm => {
      const filteredStarships = filterStarships(state.starships, searchTerm);

      return {
        loading: state.loading,
        error: state.error,
        starships: state.starships,
        filteredStarships,
        summary: buildSummary(filteredStarships),
      };
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
}

function filterStarships(starships: Starship[], searchTerm: string): Starship[] {
  if (!searchTerm) {
    return starships;
  }

  return starships.filter((starship) => {
    const haystack = [starship.name, starship.model, starship.manufacturer, starship.starshipClass]
      .join(' ')
      .toLowerCase();

    return haystack.includes(searchTerm);
  });
}

function buildSummary(starships: Starship[]) {
  return {
    total: starships.length,
    manufacturers: new Set(starships.map((starship) => starship.manufacturer)).size,
    hyperspaceReady: starships.filter((starship) => starship.hyperdriveRating !== null).length,
  };
}
