import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, map, of, shareReplay, startWith, Subject, switchMap } from 'rxjs';

import { TasksApiService } from '../../data-access/tasks-api.service';
import { TaskItem } from '../../models/task.model';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <section class="page">
      <header class="page__header">
        <p class="page__eyebrow">Tasks</p>
        <h2>Task Control Board</h2>
        <p>Operational list wired to the companion service for task creation, review and completion.</p>
      </header>

      <section class="hero-grid">
        <article class="hero-card hero-card--primary">
          <p class="hero-card__kicker">Flow Control</p>
          <h3>Keep the board short, current and executable.</h3>
          <p>Use the task surface as the main entry point for operational work coming from the companion.</p>
        </article>

        <article class="hero-card hero-card--accent">
          <p class="hero-card__kicker">Board State</p>
          <strong>{{ (vm$ | async)?.summary?.pending ?? 0 }}</strong>
          <span>pending items</span>
        </article>
      </section>

      <section class="composer card-shell">
        <div class="composer__copy">
          <h3>Add Task</h3>
          <p>Capture quick work items without leaving the hub.</p>
        </div>

        <div class="composer__fields">
          <mat-form-field appearance="outline">
            <mat-label>Description</mat-label>
            <input matInput [formControl]="descriptionControl" placeholder="Ship the next useful increment" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Project</mat-label>
            <input matInput [formControl]="projectControl" placeholder="VEGA Ops Hub" />
          </mat-form-field>

          <button mat-flat-button type="button" class="composer__button" (click)="createTask()">
            Add Task
          </button>
        </div>
      </section>

      @if (vm$ | async; as vm) {
        @if (vm.loading) {
          <div class="state state--loading">
            <mat-spinner diameter="40"></mat-spinner>
            <p>Loading tasks...</p>
          </div>
        } @else if (vm.error) {
          <section class="card-shell state">
            <p>{{ vm.error }}</p>
          </section>
        } @else {
          <section class="summary-grid">
            <article class="summary-card card-shell">
              <span>Total Tasks</span>
              <strong>{{ vm.summary.total }}</strong>
            </article>

            <article class="summary-card card-shell">
              <span>Pending</span>
              <strong>{{ vm.summary.pending }}</strong>
            </article>

            <article class="summary-card card-shell">
              <span>Completed</span>
              <strong>{{ vm.summary.completed }}</strong>
            </article>
          </section>

          <mat-card class="tasks-card">
            <mat-list>
              @for (task of vm.tasks; track task.id) {
                <mat-list-item class="task-row">
                  <div matListItemTitle>{{ task.description }}</div>
                  <div matListItemLine>{{ task.project || 'General' }} · {{ task.status }}</div>
                  @if (task.status !== 'completed') {
                    <button mat-stroked-button type="button" (click)="markDone(task.id)">Done</button>
                  }
                </mat-list-item>
              } @empty {
                <div class="tasks-card__empty">No tasks available.</div>
              }
            </mat-list>
          </mat-card>
        }
      }
    </section>
  `,
  styles: [
    `
      .page__header {
        margin-bottom: 1.5rem;
      }

      .page__eyebrow {
        margin: 0 0 0.3rem;
        color: var(--accent-cyan);
        font-size: 0.76rem;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      .page h2 {
        margin: 0 0 0.75rem;
      }

      .page__header p:last-child {
        color: var(--text-secondary);
        max-width: 64ch;
      }

      .hero-grid {
        display: grid;
        grid-template-columns: 1.8fr minmax(220px, 0.7fr);
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .hero-card {
        padding: 1.2rem 1.25rem;
        border-radius: var(--radius-lg);
        border: 1px solid var(--border-soft);
        box-shadow: var(--shadow-panel);
      }

      .hero-card--primary {
        background:
          radial-gradient(circle at top right, rgba(92, 246, 255, 0.12), transparent 28%),
          linear-gradient(180deg, rgba(18, 31, 54, 0.94) 0%, rgba(8, 16, 29, 0.94) 100%);
      }

      .hero-card--accent {
        display: grid;
        align-content: end;
        background:
          radial-gradient(circle at top left, rgba(255, 196, 107, 0.16), transparent 32%),
          linear-gradient(180deg, rgba(24, 28, 44, 0.94) 0%, rgba(12, 17, 28, 0.94) 100%);
      }

      .hero-card__kicker {
        margin: 0 0 0.45rem;
        color: var(--accent-cyan);
        font-size: 0.74rem;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      .hero-card h3,
      .hero-card strong {
        margin: 0;
        font-family: 'Rajdhani', sans-serif;
      }

      .hero-card h3 {
        font-size: 1.8rem;
        line-height: 0.98;
        max-width: 18ch;
      }

      .hero-card strong {
        font-size: 3rem;
        line-height: 0.9;
      }

      .hero-card span,
      .hero-card p:last-child {
        color: var(--text-secondary);
      }

      .composer {
        display: grid;
        grid-template-columns: 1.1fr 1.4fr;
        gap: 1rem;
        align-items: start;
        margin-bottom: 1rem;
      }

      .composer__copy h3 {
        margin: 0 0 0.35rem;
      }

      .composer__copy p {
        margin: 0;
        color: var(--text-secondary);
      }

      .composer__fields {
        display: grid;
        grid-template-columns: 1.5fr 1fr auto;
        gap: 0.75rem;
        align-items: start;
      }

      .composer__button {
        min-height: 56px;
      }

      .card-shell,
      .tasks-card {
        background: var(--bg-card-elevated);
        color: var(--text-primary);
        border: 1px solid var(--border-soft);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-soft);
      }

      .summary-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .summary-card {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1rem;
      }

      .summary-card span {
        color: var(--text-secondary);
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-weight: 700;
      }

      .summary-card strong {
        font-family: 'Rajdhani', sans-serif;
        font-size: 2.4rem;
        line-height: 0.95;
      }

      .tasks-card {
        overflow: hidden;
      }

      .task-row {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 1rem;
        align-items: center;
      }

      .tasks-card__empty {
        padding: 1rem;
        color: var(--text-secondary);
      }

      .task-row button {
        justify-self: end;
      }

      .state {
        display: grid;
        place-items: center;
        min-height: 180px;
        text-align: center;
        color: var(--text-secondary);
      }

      .state--loading {
        gap: 0.75rem;
      }

      @media (max-width: 980px) {
        .hero-grid,
        .composer,
        .composer__fields,
        .summary-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksPageComponent {
  private readonly tasksApiService = inject(TasksApiService);
  private readonly refresh$ = new Subject<void>();

  readonly descriptionControl = new FormControl('', { nonNullable: true });
  readonly projectControl = new FormControl('', { nonNullable: true });

  readonly vm$ = this.refresh$.pipe(
    startWith(void 0),
    switchMap(() =>
      this.tasksApiService.getTasks().pipe(
        map((tasks) => ({
          loading: false,
          error: null as string | null,
          tasks,
          summary: {
            total: tasks.length,
            pending: tasks.filter((task) => task.status === 'pending').length,
            completed: tasks.filter((task) => task.status === 'completed').length,
          },
        })),
        startWith({
          loading: true,
          error: null as string | null,
          tasks: [] as TaskItem[],
          summary: {
            total: 0,
            pending: 0,
            completed: 0,
          },
        }),
        catchError(() =>
          of({
            loading: false,
            error: 'Unable to load tasks.',
            tasks: [] as TaskItem[],
            summary: {
              total: 0,
              pending: 0,
              completed: 0,
            },
          }),
        ),
      ),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  createTask(): void {
    const description = this.descriptionControl.getRawValue().trim();
    const project = this.projectControl.getRawValue().trim();

    if (!description) {
      return;
    }

    this.tasksApiService
      .createTask({
        description,
        project: project || undefined,
      })
      .subscribe({
        next: () => {
          this.descriptionControl.setValue('');
          this.projectControl.setValue('');
          this.refresh$.next();
        },
      });
  }

  markDone(id: number): void {
    this.tasksApiService.markDone(id).subscribe({
      next: () => this.refresh$.next(),
    });
  }
}
