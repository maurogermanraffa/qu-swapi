import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { Resource, ResourceDetail, SWApiService } from '../../core/shared/services/swapi/swapi.service';
import { Observable, Subject } from 'rxjs';

export interface Result {
  created: string;
  edited: string;
  films: string[];
  id: string;
  imagePath: string;
  name: string;
  url: string;
}

export interface ChangeEvent {
  page: number;
  searchText: string;
  resource: Resource;
}

@Component({
  selector: 'wb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {


  nroPage = 1;
  totalPages = 0;
  enableNextPage: boolean = false;
  enablePreviusPage: boolean = false;

  loadingPage: boolean = true;
  loadingItems: number[] = Array(10)
    .fill(0)
    .map((x, i) => i + 1);



  showErrorMessage = false;
  resources$!: Observable<Resource[]>;
  resourceSelected!: Resource;

  private categorySubject = new Subject<ChangeEvent>();
  categorySelected$ = this.categorySubject.asObservable();
  results$!: Observable<Result[]>;

  constructor(
    private swApiService: SWApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.resources$ = this.swApiService.getResources().pipe(
      tap((resources: Resource[]) => {
        this.resourceSelected = resources[0];
        this.onChangeResults(1);
      })
    );
    this.results$ = this.categorySelected$.pipe(
      tap((changeEvent: ChangeEvent) => {
        this.resourceSelected = changeEvent.resource
        this.loadingPage = true
      }),
      switchMap((changeEvent: ChangeEvent) =>
        this.swApiService
          .getResourceDetail(changeEvent.resource, changeEvent.searchText, changeEvent.page)
          .pipe(
            tap((data: ResourceDetail) => {
              this.initPagination(data)
              this.showErrorMessage = data.results.length === 0

            }),
            map((data: ResourceDetail) => data.results),
            finalize(() => this.loadingPage = false)
          )));
  }

  onChangeResults(page: number, resource?: Resource, searchText?: string): void {
    this.categorySubject.next({
      page: page ?? 1,
      resource: resource ?? this.resourceSelected,
      searchText: searchText ?? ''
    });
  }


  initPagination(data: ResourceDetail) {
    this.totalPages = Math.ceil(data.count / 10);
    this.enableNextPage = data.next ? true : false;
    this.enablePreviusPage = data.previous ? true : false;
    this.nroPage = this.getCurrentPageNumber(data);
  }


  getCurrentPageNumber(data: ResourceDetail): number {
    if (data.next) {
      const nextPage = new URL(data.next);
      return parseInt(nextPage.searchParams.get('page') || '', 10) - 1;
    } else if (data.previous) {
      const previousPage = new URL(data.previous);
      return parseInt(previousPage.searchParams.get('page') || '', 10) + 1;
    }
    return 1;
  }


  clickCard(character: Result) {
    this.router.navigate([String(`/search/character/${character.id}`)]);
  }


}
