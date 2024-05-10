import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {combineAll, map, startWith, tap} from 'rxjs/operators';
// import {User, IUserResponse} from 'src/app/models/Users';
import { CompanySearchResult, InSearchResponse } from 'src/app/models/CompanySearchResult'
import { constants } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {}

  search(filter: {name: string} = {name: ''}): Observable<InSearchResponse> {
    return this.http.get<InSearchResponse>('/api/search/' + filter.name)
    .pipe(
      tap((response: InSearchResponse) => {
        response.results = response.results.map(company => new CompanySearchResult(company.ticker, company.name))

        return response;
      }));
  }


}
