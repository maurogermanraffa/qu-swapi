import { Injectable } from '@angular/core';
import { Observable, of, scheduled } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Resource, Result, ResourceDetail } from '../../interfaces/swapi.interfaces';


@Injectable({
  providedIn: 'root',
})
export class SWApiService {
  constructor(private http: HttpClient) { }


  getResources(): Observable<Resource[]> {
    return this.http.get<any>(environment.resources).pipe(
      map((response: any) => {
        return Object.keys(response).map(key => (<Result>{
          name: key,
          url: response[key]
        }));
      }),
      catchError((err: any) => {
        console.error(err);
        return of(err)
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
      map((response: ResourceDetail) => {
        console.log(response.results[0]);
        response.results.forEach((result: Result) => {
          result.id = result.url.split('/')[5];
          if (resource.name === 'people') resource.name = 'characters'; // HardRule because assets site change people to characters
          if (resource.name === 'films') result.name = result.title!; // HardRule because assets site change films to movies
          result.imagePath = `${environment.assets}/${resource.name}/${result.id}.jpg`;
        });
        return response;
      }),
      catchError((err: any) => {
        console.error(err);
        return of(err)
      })
    );
  }



  getItemResource(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
      catchError((err: any) => {
        console.error(err);
        return of(err)
      })
    );
  }


}

