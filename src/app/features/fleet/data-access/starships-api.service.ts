import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Starship, SwapiStarshipDto, mapSwapiStarship } from '../models/starship.model';

@Injectable({
  providedIn: 'root',
})
export class StarshipsApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = 'https://swapi.info/api';

  getStarships(): Observable<Starship[]> {
    return this.http
      .get<SwapiStarshipDto[]>(`${this.apiBaseUrl}/starships`)
      .pipe(map((response) => response.map(mapSwapiStarship)));
  }
}
