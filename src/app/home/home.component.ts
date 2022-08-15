import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { JSONService } from '../services/json.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  stocksForm: UntypedFormGroup = this.fb.group({
    stockName: ['', [Validators.required]],
    price: ['', [Validators.required]],
    quantity: ['', [Validators.required]],
    sector: ['', [Validators.required]],
    marketCap: ['', [Validators.required]],
    totalInvestment: ['', [Validators.required]],
    Id: ['']
  });

  stocksList: any[] = [];
  submitted: boolean = false;
  isEdit:boolean = false;

  localStorageName: string = 'StocksList';

  onlyNumeric = this.service.integerValidation;
  numericDecimal = this.service.decimalValidation;

  totalAmount: number = 0;

  chartOption: EChartsOption = {};
  chartOptionBar: EChartsOption = {};

  constructor(public json: JSONService, private fb: UntypedFormBuilder, public service: UtilitiesService) { }

  ngOnInit(): void {
    this.BindStocks();
  }

  get s() { return this.stocksForm.controls }

  Save() {
    this.submitted = true;
    if (this.stocksForm.valid) {
      this.stocksList.push(this.stocksForm.value);
      this.AddSerialNo();
      this.json.Save(this.stocksList, this.localStorageName);
      this.submitted = false;
      this.Cancel();
    }
    else {

    }
  }

  Edit(item:any){
    this.isEdit = true;
    this.stocksForm.patchValue(item);
  }

  Update(){
    this.submitted = true;
    if (this.stocksForm.valid) {
      this.stocksList = this.stocksList.filter(e => e.Id != this.stocksForm.value.Id);
      this.stocksList.push(this.stocksForm.value);
      this.AddSerialNo();
      this.json.Save(this.stocksList, this.localStorageName);
      this.submitted = false;
      this.Cancel();
    }
    else {

    }
  }

  Delete(Id: number) {
    this.stocksList = this.stocksList.filter(e => e.Id != Id);
    this.AddSerialNo();
    this.json.Save(this.stocksList, this.localStorageName);
    this.Cancel();
  }

  Cancel() {
    this.stocksForm.reset();
    this.submitted = false;
    this.isEdit = false;
  }

  BindStocks() {
    debugger
    let list = this.json.Get(this.localStorageName);
    if (list) {
      this.stocksList = list;
      this.stocksList.forEach(e => e.totalInvestment = Number(e.totalInvestment.toFixed(2)));
      this.AddSerialNo();
    }

  }

  AddSerialNo() {
    if (this.stocksList.length > 0) {
      for (let index = 0; index < this.stocksList.length; index++) {
        this.stocksList[index].Id = index;
      }
    }
    this.calculateTotalAmount();
    this.fillChart();
  }

  calculateTotalInvestment() {
    let price = this.stocksForm.value.price;
    let quantity = this.stocksForm.value.quantity;
    if (price && quantity) {
      let totalInvestment = price * quantity;
      this.stocksForm.controls["totalInvestment"].setValue(Number(totalInvestment.toFixed(2)));
    }
  }

  calculateTotalAmount() {
    this.totalAmount = 0;
    if (this.stocksList?.length > 0)
      this.stocksList.forEach(e => this.totalAmount = e.totalInvestment + this.totalAmount);
      this.totalAmount = Number(this.totalAmount.toFixed(2));
  }

  fillChart() {
    if (this.stocksList?.length > 0) {
      let datalist: any = [];

      this.stocksList.forEach(e => {
        let obj: any = {};
        obj.name = e.stockName;
        obj.value = e.totalInvestment;
        datalist.push(obj);
      });

      this.chartOption = {
        tooltip: {
          trigger: 'item'
        },
        series: {
          type: 'pie',
          radius: '60%',
          data: datalist,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0,0,0,0.5)'
            }
          }
        }
      };

      this.chartOptionBar = {
        xAxis:{
          data:this.stocksList.map( x => x.stockName)
        },
        yAxis:{

        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        tooltip: {
          trigger: 'item'
        },
        series: {
          type: 'bar',
          //radius: '60%',
          data: this.stocksList.map(x => x.totalInvestment),
        }
      };
    }
  }

}
