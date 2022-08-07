import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  integerValidation(event: any) {
    var keyCode = event.which ? event.which : event.keyCode;
    if ((keyCode < 48 || keyCode > 57)) {
      event.preventDefault();
    }
  }

  decimalValidation(event:any){
    var keyCode = event.which ? event.which : event.keyCode;
    if ((keyCode < 48 || keyCode > 57) && keyCode != 46) {
      event.preventDefault();
    }
  }
}
