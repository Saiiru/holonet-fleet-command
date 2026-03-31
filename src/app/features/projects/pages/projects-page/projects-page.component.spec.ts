import { TestBed } from '@angular/core/testing';

import { ProjectsPageComponent } from './projects-page.component';

describe('ProjectsPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsPageComponent],
    }).compileComponents();
  });

  it('should render mock projects', () => {
    const fixture = TestBed.createComponent(ProjectsPageComponent);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Project Workspace');
    expect(text).toContain('VEGA Ops Hub');
    expect(text).toContain('Helmet HUD');
  });
});
