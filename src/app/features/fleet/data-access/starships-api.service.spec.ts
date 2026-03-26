import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { StarshipsApiService } from './starships-api.service';

describe('StarshipsApiService', () => {
  let service: StarshipsApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(StarshipsApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch and map starships from the API', () => {
    service.getStarships().subscribe((result) => {
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(10);
      expect(result[0].starshipClass).toBe('Light freighter');
      expect(result[0].crew).toBe(4);
      expect(result[0].pilotsCount).toBe(1);
    });

    const req = httpMock.expectOne('https://swapi.info/api/starships');
    expect(req.request.method).toBe('GET');

    req.flush([
      {
        name: 'Millennium Falcon',
        model: 'YT-1300 light freighter',
        manufacturer: 'Corellian Engineering Corporation',
        starship_class: 'Light freighter',
        crew: '4',
        passengers: '6',
        cargo_capacity: '100000',
        hyperdrive_rating: '0.5',
        MGLT: '75',
        pilots: ['https://swapi.info/api/people/13'],
        films: ['https://swapi.info/api/films/1'],
        url: 'https://swapi.info/api/starships/10',
      },
    ]);
  });
});
