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
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() totalPages!: number;
  countPages!: number[];
  @Input() page!: number;
  @Output() pageSelectedEvent: EventEmitter<number> =
    new EventEmitter<number>();

  ngOnInit() { }

  ngOnChanges(): void {
    this.countPages = Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  nextPage() {
    this.page++;
    this.pageSelectedEvent.emit(this.page);
  }

  previusPage() {
    this.page--;
    this.pageSelectedEvent.emit(this.page);
  }

  especificPage(page: number) {
    this.page = page;
    this.pageSelectedEvent.emit(this.page);
  }
}
