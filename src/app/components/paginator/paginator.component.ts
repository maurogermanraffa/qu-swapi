import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'wb-paginator',
  styleUrls: ['./paginator.component.scss'],
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent implements OnChanges {
  @Input() totalPages!: number;
  @Input() page!: number;
  @Output() pageSelectedEvent: EventEmitter<number> =
    new EventEmitter<number>();

  countPages!: number[];

  ngOnChanges(): void {
    this.countPages = Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  nextPage(): void {
    this.page++;
    this.pageSelectedEvent.emit(this.page);
  }

  previusPage(): void {
    this.page--;
    this.pageSelectedEvent.emit(this.page);
  }

  especificPage(page: number): void {
    this.page = page;
    this.pageSelectedEvent.emit(this.page);
  }
}
