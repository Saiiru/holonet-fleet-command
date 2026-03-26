import { STARSHIP_IMAGE_MAP } from './starship-images';

export interface SwapiStarshipDto {
  name: string;
  model: string;
  manufacturer: string;
  starship_class: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  hyperdrive_rating: string;
  MGLT: string;
  pilots: string[];
  films: string[];
  url: string;
}

export interface Starship {
  id: number;
  name: string;
  model: string;
  manufacturer: string;
  starshipClass: string;
  crew: number | null;
  passengers: number | null;
  cargoCapacity: number | null;
  hyperdriveRating: number | null;
  mglt: number | null;
  pilotsCount: number;
  filmsCount: number;
  url: string;
  imageUrl: string;
}

export function mapSwapiStarship(dto: SwapiStarshipDto): Starship {
  const id = extractIdFromUrl(dto.url);

  return {
    id,
    name: dto.name,
    model: dto.model,
    manufacturer: dto.manufacturer,
    starshipClass: dto.starship_class,
    crew: toNullableNumber(dto.crew),
    passengers: toNullableNumber(dto.passengers),
    cargoCapacity: toNullableNumber(dto.cargo_capacity),
    hyperdriveRating: toNullableNumber(dto.hyperdrive_rating),
    mglt: toNullableNumber(dto.MGLT),
    pilotsCount: dto.pilots.length,
    filmsCount: dto.films.length,
    url: dto.url,
    imageUrl: STARSHIP_IMAGE_MAP[id] ?? '/assets/starships/placeholder.svg',
  };
}

function toNullableNumber(value: string): number | null {
  if (!value || value === 'unknown' || value === 'n/a') {
    return null;
  }

  const normalized = value.replace(/,/g, '').trim();
  const parsed = Number(normalized);

  return Number.isNaN(parsed) ? null : parsed;
}

function extractIdFromUrl(url: string): number {
  const match = url.match(/\/starships\/(\d+)$/);
  return match ? Number(match[1]) : 0;
}
