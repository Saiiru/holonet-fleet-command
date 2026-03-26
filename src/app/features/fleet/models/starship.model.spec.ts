import { mapSwapiStarship, SwapiStarshipDto } from './starship.model';

describe('mapSwapiStarship', () => {
  it('should map dto fields into internal model', () => {
    const dto: SwapiStarshipDto = {
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
    };

    const result = mapSwapiStarship(dto);

    expect(result.id).toBe(10);
    expect(result.name).toBe('Millennium Falcon');
    expect(result.starshipClass).toBe('Light freighter');
    expect(result.crew).toBe(4);
    expect(result.passengers).toBe(6);
    expect(result.cargoCapacity).toBe(100000);
    expect(result.hyperdriveRating).toBe(0.5);
    expect(result.mglt).toBe(75);
    expect(result.pilotsCount).toBe(1);
    expect(result.filmsCount).toBe(1);
    expect(result.imageUrl).toContain('/assets/starships/10');
  });

  it('should normalize unknown and invalid numeric values to null', () => {
    const dto: SwapiStarshipDto = {
      name: 'Test Ship',
      model: 'Model T',
      manufacturer: 'Unknown Works',
      starship_class: 'Prototype',
      crew: 'unknown',
      passengers: 'n/a',
      cargo_capacity: 'not-a-number',
      hyperdrive_rating: '',
      MGLT: 'unknown',
      pilots: [],
      films: [],
      url: 'https://swapi.info/api/starships/999',
    };

    const result = mapSwapiStarship(dto);

    expect(result.crew).toBeNull();
    expect(result.passengers).toBeNull();
    expect(result.cargoCapacity).toBeNull();
    expect(result.hyperdriveRating).toBeNull();
    expect(result.mglt).toBeNull();
    expect(result.id).toBe(999);
  });
});
