import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

import { mapCatalogEntryDto } from '../adapters/catalog-entry.mapper';
import { CatalogEntry } from '../models/catalog-entry.model';
import { CATALOG_ENTRY_MOCKS } from './catalog.mock';

@Injectable({
  providedIn: 'root',
})
export class CatalogApiService {
  getEntries(): Observable<CatalogEntry[]> {
    return of(CATALOG_ENTRY_MOCKS).pipe(map((response) => response.map(mapCatalogEntryDto)));
  }
}
