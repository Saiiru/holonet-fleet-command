import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { catchError, combineLatest, map, of, shareReplay, startWith, Subject, switchMap } from 'rxjs';

import { TasksApiService } from '../../../tasks/data-access/tasks-api.service';
import { TaskItem } from '../../../tasks/models/task.model';

@Component({
  selector: 'app-today-page',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <section class="page">
      <header class="page__header">
        <p class="page__eyebrow">Today</p>
        <h2>Operational Focus</h2>
        <p>Short-cycle visibility for tasks due now, active projects, note pressure and VEGA guidance.</p>
      </header>

      <section class="quick-add card-shell">
        <div class="quick-add__copy">
          <h3>Quick Capture</h3>
          <p>Add a task straight into the companion from the daily command view.</p>
        </div>

        <div class="quick-add__fields">
          <mat-form-field appearance="outline">
            <mat-label>New task</mat-label>
            <input matInput [formControl]="quickTaskControl" placeholder="Review today's blockers" />
          </mat-form-field>

          <button mat-flat-button type="button" (click)="createQuickTask()">Add</button>
        </div>
      </section>

      @if (vm$ | async; as vm) {
        <section class="grid">
          <mat-card class="card">
            <mat-card-header>
              <mat-card-title>Today Queue</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <strong class="metric">{{ vm.summary.today }}</strong>
              <p>{{ vm.todayTasks[0]?.description || 'No tasks due today.' }}</p>
            </mat-card-content>
          </mat-card>

          <mat-card class="card">
            <mat-card-header>
              <mat-card-title>Pending Queue</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <strong class="metric">{{ vm.summary.pending }}</strong>
              <p>{{ vm.pendingTasks[0]?.description || 'No pending tasks in the queue.' }}</p>
            </mat-card-content>
          </mat-card>

          <mat-card class="card">
            <mat-card-header>
              <mat-card-title>VEGA Brief</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <strong class="metric">{{ vm.summary.completed }}</strong>
              <p>Completed tasks tracked locally. Next step: connect assistant synthesis.</p>
            </mat-card-content>
          </mat-card>
        </section>

        <section class="list-grid">
          <mat-card class="card list-card">
            <mat-card-header>
              <mat-card-title>Due Today</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              @for (task of vm.todayTasks; track task.id) {
                <div class="task-line">
                  <strong>{{ task.description }}</strong>
                  <span>{{ task.project || 'General' }}</span>
                </div>
              } @empty {
                <p class="empty-copy">No tasks due today.</p>
              }
            </mat-card-content>
          </mat-card>

          <mat-card class="card list-card">
            <mat-card-header>
              <mat-card-title>Pending Backlog</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              @for (task of vm.pendingTasks; track task.id) {
                <div class="task-line">
                  <strong>{{ task.description }}</strong>
                  <span>{{ task.project || 'General' }}</span>
                </div>
              } @empty {
                <p class="empty-copy">No pending tasks available.</p>
              }
            </mat-card-content>
          </mat-card>
        </section>
      }
    </section>
  `,
  styles: [
    `
      .page__header {
        margin-bottom: 1.5rem;
      }

      .page__eyebrow {
        margin: 0 0 0.25rem;
        color: var(--accent-cyan);
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-weight: 600;
      }

      .page__header h2 {
        margin: 0;
        font-size: 2rem;
      }

      .page__header p:last-child {
        margin-top: 0.4rem;
        color: var(--text-secondary);
        max-width: 60ch;
      }

      .quick-add {
        display: grid;
        grid-template-columns: 1.1fr 1fr;
        gap: 1rem;
        align-items: end;
        margin-bottom: 1rem;
      }

      .quick-add__copy h3 {
        margin: 0 0 0.35rem;
      }

      .quick-add__copy p {
        margin: 0;
        color: var(--text-secondary);
      }

      .quick-add__fields {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 0.75rem;
        align-items: start;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .list-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1rem;
      }

      .card,
      .card-shell {
        background: var(--bg-card);
        color: var(--text-primary);
        border: 1px solid var(--border-soft);
        border-radius: 18px;
        box-shadow: none;
      }

      .card-shell {
        padding: 1rem;
      }

      .metric {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 2rem;
        line-height: 1;
      }

      .list-card mat-card-content {
        display: grid;
        gap: 0.75rem;
      }

      .task-line {
        display: grid;
        gap: 0.2rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid rgba(148, 163, 184, 0.12);
      }

      .task-line span,
      .empty-copy,
      .card p {
        color: var(--text-secondary);
      }

      @media (max-width: 960px) {
        .quick-add,
        .quick-add__fields,
        .grid,
        .list-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodayPageComponent {
  private readonly tasksApiService = inject(TasksApiService);
  private readonly refresh$ = new Subject<void>();

  readonly quickTaskControl = new FormControl('', { nonNullable: true });

  private readonly todayTasks$ = this.refresh$.pipe(
    startWith(void 0),
    switchMap(() =>
      this.tasksApiService.getTodayTasks().pipe(catchError(() => of([] as TaskItem[]))),
    ),
  );

  private readonly allTasks$ = this.refresh$.pipe(
    startWith(void 0),
    switchMap(() =>
      this.tasksApiService.getTasks().pipe(catchError(() => of([] as TaskItem[]))),
    ),
  );

  readonly vm$ = combineLatest([this.todayTasks$, this.allTasks$]).pipe(
    map(([todayTasks, allTasks]) => {
      const pendingTasks = allTasks.filter((task) => task.status === 'pending');

      return {
        todayTasks,
        pendingTasks,
        summary: {
          today: todayTasks.length,
          pending: pendingTasks.length,
          completed: allTasks.filter((task) => task.status === 'completed').length,
        },
      };
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  createQuickTask(): void {
    const description = this.quickTaskControl.getRawValue().trim();

    if (!description) {
      return;
    }

    this.tasksApiService.createTask({ description }).subscribe({
      next: () => {
        this.quickTaskControl.setValue('');
        this.refresh$.next();
      },
    });
  }
}
