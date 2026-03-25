import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-fleet-page',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <section class="page">
      <header class="page__header">
        <p class="page__eyebrow">Fleet Registry</p>
        <h2>Starship Assets</h2>
        <p>Search, inspect and rank operational fleet candidates.</p>
      </header>

      <mat-card class="card">
        <mat-card-header>
          <mat-card-title>Fleet Registry</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          REST integration, filters and state management enter in the next block.
        </mat-card-content>
      </mat-card>
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

      .card {
        background: var(--bg-card);
        color: var(--text-primary);
        border: 1px solid var(--border-soft);
        border-radius: 18px;
        box-shadow: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FleetPageComponent {}
