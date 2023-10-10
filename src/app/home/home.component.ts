import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EChartsOption } from 'echarts';
import { Constants } from '../config/constants';
import { Stock } from '../models/Stock';
import { HttpService } from '../services/http.service';
import { JSONService } from '../services/json.service';
import { UtilitiesService } from '../services/utilities.service';
import { ConfirmationBoxComponent } from '../shared/confirmation-box/confirmation-box.component';

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
    currentPrice: [''],
    id: ['']
  });

  stocksList: Stock[] = [];
  submitted: boolean = false;
  isEdit: boolean = false;

  localStorageName: string = 'StocksList';

  onlyNumeric = this.service.integerValidation;
  numericDecimal = this.service.decimalValidation;

  totalAmount: number = 0;

  chartOption: EChartsOption = {};
  chartOptionBar: EChartsOption = {};
  chartOptionCompare: EChartsOption = {};

  constructor(public json: JSONService, private fb: UntypedFormBuilder, public service: UtilitiesService, private httpService: HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.BindStocks();
  }

  get s() { return this.stocksForm.controls }

  Save() {
    this.submitted = true;
    if (this.stocksForm.valid) {
      this.httpService.post(Constants.APIURL + "stocks", this.stocksForm.value).subscribe(resp => {
        this.BindStocks();
        this.submitted = false;
        this.Cancel();
      });
    }
    else {
      //focus on invalid form control && show toster
    }
  }

  Edit(item: any) {
    this.isEdit = true;
    this.stocksForm.patchValue(item);
  }

  Update() {
    this.submitted = true;
    if (this.stocksForm.valid) {
      this.httpService.patch(Constants.APIURL + 'stocks/' + this.stocksForm.value.id, this.stocksForm.value).subscribe(resp => {
        this.BindStocks();
        this.Cancel();
      });
    }
    else {
      //focus on invalid form control && show toster
    }
  }

  Delete(Id: number) {
    debugger
    const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpService.delete(Constants.APIURL + "stocks/" + Id, {}).subscribe(resp => {
          this.BindStocks();
        })
      }
    });
  }

  Cancel() {
    this.stocksForm.reset();
    this.submitted = false;
    this.isEdit = false;
  }

  BindStocks() {
    this.httpService.get(Constants.APIURL + "stocks", {}).subscribe(resp => {
      console.log(resp);
      let list: any = resp;
      if (list) {
        this.stocksList = list;
        this.stocksList.forEach(e => e.totalInvestment = Number(e.totalInvestment.toFixed(2)));
        this.calculateTotalAmount();
        this.fillChart();
      }
    });
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
    if (this.stocksList?.length > 0) {
      this.stocksList.forEach(e => this.totalAmount = e.totalInvestment + this.totalAmount);
      this.totalAmount = Number(this.totalAmount.toFixed(2));
    }
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
        xAxis: {
          data: this.stocksList.map(x => x.stockName)
        },
        yAxis: {

        },

        tooltip: {
          trigger: 'item'
        },
        series:
          {
            type: 'bar',
            data: this.stocksList.map(x => x.totalInvestment),
          }
      };
      

      this.chartOptionCompare = {
        xAxis: {
          data: this.stocksList.map(x => x.stockName)
        },
        yAxis: {

        },

        tooltip: {
          trigger: 'item'
        },
        series:[
          {
            type: 'bar',
            data: this.stocksList.map(x => x.totalInvestment),
          },
          {
            type:'bar',
            data:this.stocksList.map(x => x.currentPrice * x.quantity)
          }
        ]
      };
    }
  }
}
