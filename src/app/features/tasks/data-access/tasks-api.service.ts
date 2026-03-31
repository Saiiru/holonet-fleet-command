import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../../../core/config/api.config';
import { TaskItem } from '../models/task.model';

type CreateTaskPayload = Pick<TaskItem, 'description' | 'project' | 'due' | 'tags'>;

@Injectable({
  providedIn: 'root',
})
export class TasksApiService {
  private readonly http = inject(HttpClient);

  constructor(@Inject(API_BASE_URL) private readonly apiBaseUrl: string) {}

  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(`${this.apiBaseUrl}/api/tasks`);
  }

  getTodayTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(`${this.apiBaseUrl}/api/tasks/today`);
  }

  createTask(payload: CreateTaskPayload): Observable<TaskItem> {
    return this.http.post<TaskItem>(`${this.apiBaseUrl}/api/tasks`, payload);
  }

  markDone(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiBaseUrl}/api/tasks/${id}/done`, {});
  }
}
