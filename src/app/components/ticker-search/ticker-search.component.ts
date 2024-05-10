import { Component, OnInit } from '@angular/core';
import { CompanySearchResult } from '../../models/CompanySearchResult';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchService} from 'src/app/services/search.service';
import {switchMap, debounceTime, tap, finalize, startWith} from 'rxjs/operators';
import {User, IUserResponse} from 'src/app/models/Users';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ticker-search',
  templateUrl: './ticker-search.component.html',
  styleUrls: ['./ticker-search.component.css']
})
export class TickerSearchComponent implements OnInit {

  companySResults: CompanySearchResult[] = [];
  searchForm: FormGroup;
  isLoading = false;

  
  constructor(private fb: FormBuilder, private appService: SearchService, private router: Router) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      userInput: null
    })

      this.searchForm
      .get('userInput')
      .valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.appService.search({name: value})
        .pipe(
          finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(companys => this.companySResults = companys.results);
  }

  displayFn(company: CompanySearchResult) {
    if (company) { 
      return company.ticker; 
    }
  }

  onSubmit(tickerVal: string) {

    if (tickerVal.length == 0){
      return;
    }

    this.router.navigateByUrl('details/' + tickerVal);    
  }


}
