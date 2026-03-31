import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { MOCK_PROJECTS } from '../../data/mock-projects';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [TitleCasePipe, MatCardModule, MatChipsModule],
  template: `
    <section class="page">
      <header class="page__header">
        <p class="page__eyebrow">Projects</p>
        <h2>Project Workspace</h2>
        <p>Strong local mocks keep the project surface useful while the backend contract catches up.</p>
      </header>

      <section class="hero-grid">
        <article class="hero-card hero-card--primary">
          <p class="hero-card__kicker">Portfolio Surface</p>
          <h3>Use projects to keep initiatives visible before deep workflow arrives.</h3>
          <p>The mock layer keeps product context alive while the companion grows beyond tasks.</p>
        </article>

        <article class="hero-card hero-card--accent">
          <p class="hero-card__kicker">Active Set</p>
          <strong>{{ projects.length }}</strong>
          <span>tracked initiatives</span>
        </article>
      </section>

      <section class="projects-grid">
        @for (project of projects; track project.id) {
          <mat-card class="project-card">
            <mat-card-header>
              <mat-card-title>{{ project.name }}</mat-card-title>
              <mat-card-subtitle>{{ project.status | titlecase }}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p>{{ project.summary }}</p>
              <mat-chip-set aria-label="Project tags">
                @for (tag of project.tags; track tag) {
                  <mat-chip>{{ tag }}</mat-chip>
                }
              </mat-chip-set>
            </mat-card-content>
          </mat-card>
        }
      </section>
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

      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1rem;
      }

      .project-card {
        background: var(--bg-card-elevated);
        color: var(--text-primary);
        border: 1px solid var(--border-soft);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-soft);
      }

      .project-card p {
        color: var(--text-secondary);
        line-height: 1.5;
      }

      .project-card mat-chip {
        background: rgba(148, 163, 184, 0.08);
        color: var(--text-primary);
        border: 1px solid rgba(148, 163, 184, 0.12);
      }

      @media (max-width: 960px) {
        .hero-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPageComponent {
  readonly projects = MOCK_PROJECTS;
}
