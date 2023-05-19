import { Component, Input } from '@angular/core';
import { Result } from 'src/app/core/shared/interfaces/swapi.interfaces';
import { environment } from 'src/environments/environment';

export interface response {
  content: any
  url: string
}
@Component({
  selector: 'wb-card',
  styleUrls: ['./card.component.scss'],
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() result!: Result;
  @Input() loading!: boolean;


  handleImageError(event: any): void {
    event.target.src = environment.defaultPlaceholder;
  }
}
