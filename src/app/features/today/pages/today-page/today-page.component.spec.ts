import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TasksApiService } from '../../../tasks/data-access/tasks-api.service';
import { TodayPageComponent } from './today-page.component';

describe('TodayPageComponent', () => {
  it('should render today tasks and summary cards', async () => {
    await TestBed.configureTestingModule({
      imports: [TodayPageComponent],
      providers: [
        {
          provide: TasksApiService,
          useValue: {
            getTodayTasks: () =>
              of([
                { id: 1, description: 'Task de hoje', status: 'pending', project: 'VEGA', due: '2026-03-31' },
              ]),
            getTasks: () =>
              of([
                { id: 1, description: 'Task de hoje', status: 'pending', project: 'VEGA', due: '2026-03-31' },
                { id: 2, description: 'Task futura', status: 'pending', project: 'Lab' },
                { id: 3, description: 'Task done', status: 'completed', project: 'Ops' },
              ]),
            createTask: () => of({ id: 4, description: 'Nova tarefa', status: 'pending' }),
            markDone: () => of(void 0),
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(TodayPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Operational Focus');
    expect(text).toContain('Task de hoje');
    expect(text).toContain('Pending Queue');
  });
});
