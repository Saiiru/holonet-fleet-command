import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { ShellComponent } from './shell.component';

class FakeTranslateLoader implements TranslateLoader {
  getTranslation() {
    return of({
      app: {
        title: 'VEGA Ops Hub',
        subtitle: 'Local-first operations workspace',
      },
      nav: {
        today: 'Today',
        projects: 'Projects',
        tasks: 'Tasks',
        catalog: 'Catalog',
        notes: 'Notes',
        vega: 'VEGA',
      },
    });
  }
}

describe('ShellComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ShellComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: FakeTranslateLoader,
          },
        }),
      ],
      providers: [
        provideRouter([]),
      ],
    }).compileComponents();
  });

  it('should expose the VEGA Ops Hub navigation', () => {
    const fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    expect(component.navItems.map((item) => item.route)).toEqual([
      '/today',
      '/projects',
      '/tasks',
      '/catalog',
      '/notes',
      '/vega',
    ]);

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('VEGA OPS');
    expect(text).toContain('Ops Hub');
  });
});
