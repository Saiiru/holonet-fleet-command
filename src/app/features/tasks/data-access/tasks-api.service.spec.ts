import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { API_BASE_URL } from '../../../core/config/api.config';
import { TasksApiService } from './tasks-api.service';

describe('TasksApiService', () => {
  let service: TasksApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: 'http://127.0.0.1:8081' },
      ],
    });

    service = TestBed.inject(TasksApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch tasks', () => {
    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(1);
      expect(tasks[0].description).toBe('Configurar ambiente VEGA');
    });

    const req = httpMock.expectOne('http://127.0.0.1:8081/api/tasks');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1, description: 'Configurar ambiente VEGA', status: 'pending' }]);
  });

  it('should create a task', () => {
    service.createTask({ description: 'Nova tarefa', project: 'VEGA' }).subscribe((task) => {
      expect(task.id).toBe(2);
      expect(task.project).toBe('VEGA');
    });

    const req = httpMock.expectOne('http://127.0.0.1:8081/api/tasks');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.description).toBe('Nova tarefa');
    req.flush({ id: 2, description: 'Nova tarefa', project: 'VEGA', status: 'pending' });
  });

  it('should mark a task as done', () => {
    service.markDone(3).subscribe();

    const req = httpMock.expectOne('http://127.0.0.1:8081/api/tasks/3/done');
    expect(req.request.method).toBe('POST');
    req.flush(null);
  });
});
