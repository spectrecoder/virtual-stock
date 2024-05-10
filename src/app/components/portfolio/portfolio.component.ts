import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CompanyDetails, DetailsResponse } from 'src/app/models/CompanyDetails';
import { CompanyPrice, PriceResponse } from 'src/app/models/CompanyPrice';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  isLoading = true;
  isPortfolioEmpty = true;
  portfolioList = {};
  portfolioData = [];
  portfolioCompPrice: CompanyPrice[] = [];

  constructor(private detailService: DetailsService) { }

  ngOnInit(): void {

    this.updateData(-1);
  }

  updateData(index: number){

    this.portfolioList = JSON.parse(localStorage.getItem("portfolio")) || {}
    let portfolioKeys = Object.keys(this.portfolioList)
    

    portfolioKeys.sort();
    this.isPortfolioEmpty = (portfolioKeys.length == 0);

    if (this.isPortfolioEmpty){
      return;
    }

    const observables = this.detailService.getMultiCompanyInfo(portfolioKeys, 'price');
    
    this.detailService.getMultiCompanyInfo(portfolioKeys, 'price').subscribe(res => {

      this.portfolioCompPrice = res.results.map((item : PriceResponse) => item);
      this.updateDisplay(index);
      this.isLoading = false;
    })
  }


  updateDisplay(index: number){

    let qty = 0;
    let avgCost = 0;
    let totalCost = 0;
    let change = 0;
    let name; 

    if (index != -1){
      this.portfolioData.splice(index, 1);      
    }

    for (var i = 0; i < this.portfolioCompPrice.length; i++) {

      qty = this.portfolioList[this.portfolioCompPrice[i].ticker][0];
      totalCost = this.portfolioList[this.portfolioCompPrice[i].ticker][1];
      avgCost = totalCost / qty;
      change = +(this.portfolioCompPrice[i].last - avgCost).toFixed(3);
      name = this.portfolioList[this.portfolioCompPrice[i].ticker][2];

      if (this.portfolioData.length == this.portfolioCompPrice.length){
        this.portfolioData[i].last = this.portfolioCompPrice[i].last;
        this.portfolioData[i].qty = qty;
        this.portfolioData[i].totalCost = totalCost;
        this.portfolioData[i].avgCost = +avgCost.toFixed(3);
        this.portfolioData[i].change = change;  
        this.portfolioData[i].marketVal = +(this.portfolioCompPrice[i].last * qty).toFixed(3);
        this.portfolioData[i].isChangeNeg = change < 0;
        this.portfolioData[i].isChangePos = change > 0;
      }else{

        this.portfolioData.push({
          name: name,
          ticker: this.portfolioCompPrice[i].ticker,
          last : this.portfolioCompPrice[i].last,
          qty: qty,
          totalCost: totalCost,
          avgCost: +avgCost.toFixed(3),
          change: change,
          marketVal: +(this.portfolioCompPrice[i].last * qty).toFixed(3),
          isChangeNeg: change < 0,
          isChangePos: change > 0,
        });
      }
    }
  }
}
