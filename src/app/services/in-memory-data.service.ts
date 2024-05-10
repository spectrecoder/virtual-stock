import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemDataService implements InMemoryDbService {

  createDb() {
    let companies = [
      {
        ticker: "AAPL",
        assetType: "Stock",
        countryCode: "US",
        isActive: true,
        name: "Apple Inc",
      },
      {
        ticker: "PNPL",
        assetType: "Stock",
        countryCode: "US",
        isActive: true,
        name: "Pineapple Exprss",
      },
      {
        ticker: "APRU",
        assetType: "Stock",
        countryCode: "US",
        isActive: true,
        name: "Apple Rush Comp Inc",
      },
    ];
    
    return {companies: {
      total: companies.length,
      results: companies
    }};
  }

}
