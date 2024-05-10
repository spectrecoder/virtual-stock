import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TickerSearchComponent  } from 'src/app/components/ticker-search/ticker-search.component';
import { WatchlistComponent  } from 'src/app/components/watchlist/watchlist.component';
import { DetailsComponent } from 'src/app/components/details/details.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

const routes: Routes = [

  { path: '', component: TickerSearchComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'details/:ticker', component: DetailsComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: '**',   redirectTo: '', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
