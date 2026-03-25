import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <section class="page">
      <header class="page__header">
        <p class="page__eyebrow">Operations Overview</p>
        <h2>Fleet Dashboard</h2>
        <p>Command visibility over strategic starship assets.</p>
      </header>

      <div class="grid">
        <mat-card class="card">
          <mat-card-header>
            <mat-card-title>Total Starships</mat-card-title>
          </mat-card-header>
          <mat-card-content>Coming next block</mat-card-content>
        </mat-card>

        <mat-card class="card">
          <mat-card-header>
            <mat-card-title>Mission Fit Analyzer</mat-card-title>
          </mat-card-header>
          <mat-card-content>Coming next block</mat-card-content>
        </mat-card>

        <mat-card class="card">
          <mat-card-header>
            <mat-card-title>Strategic Notes</mat-card-title>
          </mat-card-header>
          <mat-card-content>Coming next block</mat-card-content>
        </mat-card>
      </div>
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
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
      }

      .card {
        background: var(--bg-card);
        color: var(--text-primary);
        border: 1px solid var(--border-soft);
        border-radius: 18px;
        box-shadow: none;
      }

      @media (max-width: 960px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {}
