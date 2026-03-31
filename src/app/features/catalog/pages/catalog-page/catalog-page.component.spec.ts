import { TestBed } from '@angular/core/testing';
import { throwError } from 'rxjs';

import { CatalogApiService } from '../../data-access/catalog-api.service';
import { CatalogPageComponent } from './catalog-page.component';

describe('CatalogPageComponent', () => {
  async function waitForCatalogVm(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  it('should render catalog summary and cards', async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogPageComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(CatalogPageComponent);
    fixture.detectChanges();
    await waitForCatalogVm();
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Technical Reference Workspace');
    expect(text).toContain('Total Entries');
    expect(text).toContain('VEGA Companion');
  });

  it('should filter catalog entries by search term', async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogPageComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(CatalogPageComponent);
    fixture.detectChanges();
    await waitForCatalogVm();
    fixture.componentInstance.searchControl.setValue('hardware');
    await waitForCatalogVm();
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Technical Lab Catalog');
    expect(text).not.toContain('VEGA Companion');
  });

  it('should render an error state when the service fails', async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogPageComponent],
      providers: [
        {
          provide: CatalogApiService,
          useValue: {
            getEntries: () => throwError(() => new Error('failed')),
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(CatalogPageComponent);
    fixture.detectChanges();
    await waitForCatalogVm();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Unable to load catalog entries.');
  });
});
