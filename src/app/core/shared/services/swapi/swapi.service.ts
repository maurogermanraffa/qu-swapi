import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Result } from 'src/app/pages/search/search.component';


export interface Resource {
  name: string
  url: string
}

export interface ResourceDetail {
  count: number
  next: string
  previous: string
  results: Result[]
}


@Injectable({
  providedIn: 'root',
})
export class SWApiService {
  constructor(private http: HttpClient) { }


  getResources(): Observable<Resource[]> {
    return this.http.get<any>(environment.resources).pipe(
      map((response) => {
        return Object.keys(response).map(key => ({
          name: key,
          url: response[key]
        }));
      }),
      catchError((err: any) => {
        console.log(err);
        return of(err);
      })
    );
  }


  getResourceDetail(resource: Resource, name?: string, page?: number): Observable<ResourceDetail> {
    let params = new HttpParams();
    if (name) {
      params = params.append('search', name);
    }
    if (page) {
      params = params.append('page', page);
    }
    return this.http.get<any>(resource.url, { params: params }).pipe(
      map((response) => {
        response.results.forEach((result: Result) => {
          result.id = result.url.split('/')[5];
          if (resource.name === 'people') resource.name = 'characters';
          result.imagePath = `${environment.assets}/${resource.name}/${result.id}.jpg`;
        });
        return response;
      }),
      catchError((err: any) => {
        console.log(err);
        return of(err);
      })
    );
  }


}

