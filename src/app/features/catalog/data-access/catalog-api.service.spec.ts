import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { CatalogApiService } from './catalog-api.service';

describe('CatalogApiService', () => {
  let service: CatalogApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogApiService);
  });

  it('should return mapped catalog entries from local contracts', async () => {
    const entries = await firstValueFrom(service.getEntries());

    expect(entries.length).toBeGreaterThan(0);
    expect(entries[0]?.name).toBe('VEGA Companion');
  });
});
