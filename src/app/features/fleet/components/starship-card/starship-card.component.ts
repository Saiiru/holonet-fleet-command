import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { Starship } from '../../models/starship.model';

@Component({
  selector: 'app-starship-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './starship-card.component.html',
  styleUrl: './starship-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarshipCardComponent {
  @Input({ required: true }) starship!: Starship;

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/starships/placeholder.svg';
  }

  get readinessLabel(): string {
    return this.starship.hyperdriveRating !== null ? 'Hyperspace Ready' : 'Limited Range';
  }

  get readinessClass(): string {
    return this.starship.hyperdriveRating !== null
      ? 'ship-card__pill ship-card__pill--ready'
      : 'ship-card__pill ship-card__pill--limited';
  }

  get missionProfile(): string {
    const crew = this.starship.crew ?? 0;
    const passengers = this.starship.passengers ?? 0;
    const cargo = this.starship.cargoCapacity ?? 0;
    const hyperdrive = this.starship.hyperdriveRating ?? 99;

    if (cargo >= 50000 || passengers >= 500) {
      return 'Heavy Logistics';
    }

    if (hyperdrive <= 1 && crew <= 10) {
      return 'Rapid Deployment';
    }

    if (crew >= 1000) {
      return 'Capital Support';
    }

    if (passengers > 0 && hyperdrive <= 2) {
      return 'Escort / Transport';
    }

    return 'General Operations';
  }
}
