import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TasksApiService } from '../../data-access/tasks-api.service';
import { TasksPageComponent } from './tasks-page.component';

describe('TasksPageComponent', () => {
  it('should render tasks from the service', async () => {
    await TestBed.configureTestingModule({
      imports: [TasksPageComponent],
      providers: [
        {
          provide: TasksApiService,
          useValue: {
            getTasks: () =>
              of([
                { id: 1, description: 'Configurar ambiente VEGA', status: 'pending', project: 'VEGA' },
                { id: 2, description: 'Subir tasks page', status: 'completed', project: 'Frontend' },
              ]),
            createTask: () => of({ id: 3, description: 'Nova tarefa', status: 'pending' }),
            markDone: () => of(void 0),
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(TasksPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Task Control Board');
    expect(text).toContain('Configurar ambiente VEGA');
    expect(text).toContain('Subir tasks page');
  });
});
