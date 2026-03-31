export type CatalogEntryStatus = 'draft' | 'active' | 'deprecated';

export interface CatalogEntryDto {
  id: string;
  name: string;
  category: string;
  owner: string;
  status: CatalogEntryStatus;
  tags: string[];
  summary: string;
}

export interface CatalogEntry {
  id: string;
  name: string;
  category: string;
  owner: string;
  status: CatalogEntryStatus;
  tags: string[];
  summary: string;
}
