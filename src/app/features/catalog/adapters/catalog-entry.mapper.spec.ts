import { mapCatalogEntryDto } from './catalog-entry.mapper';
import { CatalogEntryDto } from '../models/catalog-entry.model';

describe('mapCatalogEntryDto', () => {
  it('should normalize dto fields into the internal model', () => {
    const dto: CatalogEntryDto = {
      id: ' companion-go ',
      name: ' VEGA Companion ',
      category: ' Service ',
      owner: ' Platform ',
      status: 'active',
      tags: [' go ', 'api', ''],
      summary: ' Local backend companion. ',
    };

    const result = mapCatalogEntryDto(dto);

    expect(result.id).toBe('companion-go');
    expect(result.name).toBe('VEGA Companion');
    expect(result.category).toBe('Service');
    expect(result.owner).toBe('Platform');
    expect(result.tags).toEqual(['go', 'api']);
    expect(result.summary).toBe('Local backend companion.');
  });
});
