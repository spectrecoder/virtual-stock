import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { last } from 'rxjs/operators';
import { CompanyDetails } from 'src/app/models/CompanyDetails';
import { CompanyPrice } from 'src/app/models/CompanyPrice';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.css']
})
export class BuyModalComponent implements OnInit {

  @Input() companyPrice: CompanyPrice[] = [];
  @Input() companyDetail: CompanyDetails[] = [];
  @Input() isBuy: boolean;
  @Input() idx: number;
  @Input() buttonPortfolio: boolean;
  @Output() itemBuyEvent = new EventEmitter<number>();
  qty = 0;
  total = 0
  isDisabled = true;

  constructor(private modalService: NgbModal, private alertService: AlertsService) { }

  ngOnInit(): void {
  }

  open(content) {
    this.isDisabled = true;
    this.qty = 0;
    this.total = 0;
    this.modalService.open(content);
  }
  

  onKey(qty: number) {
    this.qty = +qty;
    this.isDisabled = true;

    if (qty > 0){
      this.isDisabled = false;
    }

    // if the modal is for sell
    if (!this.isBuy){
      let portfolio = JSON.parse(localStorage.getItem("portfolio")) || {};
      let totqty = portfolio[this.companyPrice[0].ticker][0]

      if (qty > totqty){
        this.isDisabled = true;
      }

    }

    this.total = parseFloat((qty * this.companyPrice[0].last).toFixed(2))
  }

  buy() {

    var portfolio = JSON.parse(localStorage.getItem("portfolio")) || {};
    var totQty = this.qty;
    var totCost = parseFloat((this.companyPrice[0].last * this.qty).toFixed(2));

    var name;
    if (this.companyDetail[0]){
      name = this.companyDetail[0].name;
    }else{
      name = portfolio[this.companyPrice[0].ticker][2];
    }
    

    if (portfolio[this.companyPrice[0].ticker]){
      totQty += parseFloat(portfolio[this.companyPrice[0].ticker][0]);
      totCost = parseFloat((totCost + parseFloat(portfolio[this.companyPrice[0].ticker][1])).toFixed(2));
    }


    portfolio[this.companyPrice[0].ticker] = [totQty, totCost, name];
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
      
    this.itemBuyEvent.emit(-1);
    this.alertService.showBuyAlert(this.companyPrice[0].ticker);


  }

  sell(){

    var portfolio = JSON.parse(localStorage.getItem("portfolio"));
    var totQty = parseFloat(portfolio[this.companyPrice[0].ticker][0]) - this.qty;

    var totCost;
    var totbought = this.qty * parseFloat(portfolio[this.companyPrice[0].ticker][1]) / parseFloat(portfolio[this.companyPrice[0].ticker][0])
    var name = portfolio[this.companyPrice[0].ticker][2]
    let i = -1;

    totCost = parseFloat((parseFloat(portfolio[this.companyPrice[0].ticker][1]) - totbought).toFixed(2));
    portfolio[this.companyPrice[0].ticker] = [totQty, totCost, name];

    if (totQty <= 0){
      delete portfolio[this.companyPrice[0].ticker];
      i = this.idx;
    }

    localStorage.setItem("portfolio", JSON.stringify(portfolio));
    this.itemBuyEvent.emit(i);

  }
}
