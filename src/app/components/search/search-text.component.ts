import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
import { ChangeEvent } from 'src/app/pages/search/search.component';

@Component({
  selector: 'wb-search-text',
  styleUrls: ['./search-text.component.scss'],
  templateUrl: './search-text.component.html',
})
export class SearchTextComponent implements OnInit {

  @Input() errorMessage: boolean = false;
  @Input() isDisabled: boolean = false;

  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('textSearchInput', { static: true })
  textSearchInput!: ElementRef;

  constructor() { }

  ngOnInit() {
    fromEvent(this.textSearchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        filter((res) => res.length > 2 || res.length == 0),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.searchEvent.emit(text);
      });
  }

  search() {
    this.searchEvent.emit(this.textSearchInput.nativeElement.value);
  }


}
