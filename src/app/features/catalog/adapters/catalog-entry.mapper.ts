import { CatalogEntry, CatalogEntryDto } from '../models/catalog-entry.model';

export function mapCatalogEntryDto(dto: CatalogEntryDto): CatalogEntry {
  return {
    id: dto.id.trim(),
    name: dto.name.trim(),
    category: dto.category.trim(),
    owner: dto.owner.trim(),
    status: dto.status,
    tags: dto.tags.map((tag) => tag.trim()).filter(Boolean),
    summary: dto.summary.trim(),
  };
}
