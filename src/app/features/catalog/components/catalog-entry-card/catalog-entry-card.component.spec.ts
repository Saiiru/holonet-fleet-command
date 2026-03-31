import { TestBed } from '@angular/core/testing';

import { CatalogEntryCardComponent } from './catalog-entry-card.component';
import { CatalogEntry } from '../../models/catalog-entry.model';

describe('CatalogEntryCardComponent', () => {
  const mockEntry: CatalogEntry = {
    id: 'ops-shell',
    name: 'Ops Shell',
    category: 'Workspace',
    owner: 'Frontend',
    status: 'active',
    tags: ['angular', 'shell'],
    summary: 'Shell principal do workspace.',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogEntryCardComponent],
    }).compileComponents();
  });

  it('should render catalog entry details', () => {
    const fixture = TestBed.createComponent(CatalogEntryCardComponent);
    fixture.componentRef.setInput('entry', mockEntry);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Ops Shell');
    expect(text).toContain('Catalog Entry');
    expect(text).toContain('Workspace');
    expect(text).toContain('Frontend');
    expect(text).toContain('Active');
  });
});
