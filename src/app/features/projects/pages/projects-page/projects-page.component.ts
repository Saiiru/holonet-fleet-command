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

      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1rem;
      }

      .project-card {
        background: var(--bg-card);
        color: var(--text-primary);
        border: 1px solid var(--border-soft);
        border-radius: 18px;
        box-shadow: none;
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
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPageComponent {
  readonly projects = MOCK_PROJECTS;
}
