import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule }  from '@angular/material/progress-spinner'
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { InMemDataService } from 'src/app/services/in-memory-data.service';

import { AppComponent } from './app.component';
import { TickerSearchComponent } from './components/ticker-search/ticker-search.component';
import { DetailsComponent } from './components/details/details.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { NewsModalComponent } from './components/news-modal/news-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BuyModalComponent } from './components/buy-modal/buy-modal.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
import * as $ from 'jquery';


@NgModule({
  declarations: [
    AppComponent,
    TickerSearchComponent,
    WatchlistComponent,
    DetailsComponent,
    NewsModalComponent,
    BuyModalComponent,
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule, 
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatTabsModule,
    HighchartsChartModule,
    NgbModule,
    // AngularFontAwesomeModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
