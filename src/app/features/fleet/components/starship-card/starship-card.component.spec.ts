import { TestBed } from '@angular/core/testing';

import { StarshipCardComponent } from './starship-card.component';
import { Starship } from '../../models/starship.model';

describe('StarshipCardComponent', () => {
  const mockStarship: Starship = {
    id: 10,
    name: 'Millennium Falcon',
    model: 'YT-1300 light freighter',
    manufacturer: 'Corellian Engineering Corporation',
    starshipClass: 'Light freighter',
    crew: 4,
    passengers: 6,
    cargoCapacity: 100000,
    hyperdriveRating: 0.5,
    mglt: 75,
    pilotsCount: 1,
    filmsCount: 1,
    url: 'https://swapi.info/api/starships/10',
    imageUrl: '/assets/starships/10.webp',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarshipCardComponent],
    }).compileComponents();
  });

  it('should render starship details', () => {
    const fixture = TestBed.createComponent(StarshipCardComponent);
    fixture.componentRef.setInput('starship', mockStarship);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Millennium Falcon');
    expect(text).toContain('Operational Dossier');
    expect(text).toContain('Corellian Engineering Corporation');
    expect(text).toContain('Rapid Deployment');
  });

  it('should swap image source to placeholder on error', () => {
    const fixture = TestBed.createComponent(StarshipCardComponent);
    fixture.componentRef.setInput('starship', mockStarship);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    const img = document.createElement('img');
    img.src = '/assets/starships/10.webp';

    component.onImageError({ target: img } as unknown as Event);

    expect(img.src).toContain('/assets/starships/placeholder.svg');
  });
});
