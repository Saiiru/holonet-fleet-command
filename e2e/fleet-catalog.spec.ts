import { expect, test } from '@playwright/test';

const mockStarships = [
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
    url: 'https://swapi.info/api/starships/10'
  },
  {
    name: 'X-wing',
    model: 'T-65 X-wing',
    manufacturer: 'Incom Corporation',
    starship_class: 'Starfighter',
    crew: '1',
    passengers: '0',
    cargo_capacity: '110',
    hyperdrive_rating: '1.0',
    MGLT: '100',
    pilots: ['https://swapi.info/api/people/1'],
    films: ['https://swapi.info/api/films/1'],
    url: 'https://swapi.info/api/starships/12'
  }
];

test.describe('Fleet catalog', () => {
  test('loads catalog and filters by search term', async ({ page }) => {
    await page.route('https://swapi.info/api/starships', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockStarships),
      });
    });

    await page.goto('/fleet');

    await expect(page.getByRole('heading', { name: 'Operational Starship Reference' })).toBeVisible();
    await expect(page.getByText('Millennium Falcon')).toBeVisible();
    await expect(page.getByText('X-wing')).toBeVisible();

    await page.getByLabel('Search fleet').fill('falcon');

    await expect(page.getByText('Millennium Falcon')).toBeVisible();
    await expect(page.getByText('X-wing')).not.toBeVisible();
  });
});
