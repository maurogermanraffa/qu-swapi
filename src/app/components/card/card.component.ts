import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Result } from 'src/app/pages/search/search.component';

@Component({
  selector: 'wb-card',
  styleUrls: ['./card.component.scss'],
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() result!: Result;
  @Input() loading!: boolean;
  @Output() clickCard: EventEmitter<Result> = new EventEmitter<Result>();

  onClick() {
    this.clickCard.emit(this.result);
  }


  handleImageError(event: any): void {
    event.target.src = '/assets/placeholder.jpg'
  }
}
