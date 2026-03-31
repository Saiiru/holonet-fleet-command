import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-vega-assistant-page',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <section class="placeholder-page">
      <p class="placeholder-page__eyebrow">VEGA</p>
      <h2>Virtual Engineering Guidance Assistant</h2>
      <mat-card class="placeholder-page__card">
        <mat-card-content>Next block: summary, checklist and risk analysis actions.</mat-card-content>
      </mat-card>
    </section>
  `,
  styles: [
    `
      .placeholder-page__eyebrow {
        margin: 0 0 0.3rem;
        color: var(--accent-cyan);
        font-size: 0.76rem;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      .placeholder-page h2 {
        margin: 0 0 1rem;
      }

      .placeholder-page__card {
        background: var(--bg-card);
        color: var(--text-primary);
        border: 1px solid var(--border-soft);
        border-radius: 18px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VegaAssistantPageComponent {}
