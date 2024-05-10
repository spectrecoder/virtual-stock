import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  watchlistTimer;
  buyTimer;

  constructor() { }


  showWatchlistAlert(isAdded: boolean, ticker: string){

    clearTimeout(this.watchlistTimer);

    let alertType = "alert-success";
    let alertText = ticker + " added to Watchlist";

    if (!isAdded) {
      alertType = "alert-danger";
      alertText = ticker + " removed from Watchlist"
    }

    document.querySelector("#watchlist-alert").innerHTML = (
    '<div class="text-center alert alert-dismissible fade show ' + alertType + '" role="alert">' +
      alertText + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"> \
        <span aria-hidden="true">&times;</span> \
      </button> \
    </div>');

    this.watchlistTimer = setTimeout(function () { 
  
      // Closing the alert 
      (<any>$('#watchlist-alert .' + alertType)).alert('close'); 
    }, 5000); 
  }


  showBuyAlert(ticker: string){

    if (!document.querySelector("#buy-alert")){

      // console.log("not alert");
      return;
    }

    clearTimeout(this.buyTimer);

    let alertType = "alert-success";
    let alertText = ticker + " bought sucessfully!";


    document.querySelector("#buy-alert").innerHTML = (
    '<div class="text-center alert alert-dismissible fade show ' + alertType + '" role="alert">' +
      alertText + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"> \
        <span aria-hidden="true">&times;</span> \
      </button> \
    </div>');

    this.buyTimer = setTimeout(function () { 
  
      // Closing the alert 
      (<any>$('#buy-alert .' + alertType)).alert('close'); 
    }, 5000); 
  }



}
