import { Component, OnInit } from '@angular/core';
import { DetailsService } from 'src/app/services/details.service';
import { ActivatedRoute } from "@angular/router";
import { CompanyDetails } from 'src/app/models/CompanyDetails';
import { CompanyPrice } from 'src/app/models/CompanyPrice';
import * as Highcharts from "highcharts/highstock";
// import { DailyChart } from 'src/app/models/DailyChart';
// import { tick } from '@angular/core/testing';
import { News } from 'src/app/models/News';
import { HistChart } from 'src/app/models/HistChart';
// import Exporting from 'highcharts/modules/exporting';
import IndicatorsCore from "highcharts/indicators/indicators";
import vbp from 'highcharts/indicators/volume-by-price';
import { AlertsService } from 'src/app/services/alerts.service';
// import { timer } from 'rxjs';

IndicatorsCore(Highcharts);
vbp(Highcharts);

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  companyDetails: CompanyDetails[] = [];
  companyPrice: CompanyPrice[];
  companyNews: News[];
  dailyChart = [];
  histChart: HistChart[];
  histData = {
    'volumne': [],
    'ohlc': []
  };
  dailyData = [];
  ticker: string;
  isLoading = true;
  isChangePos = false;
  isChangeNeg = false;
  isError = false;
  isAddedToFav = false;
  updateFlag = false;
  interval;

  // High charts initialization
  HighchartsDaily: typeof Highcharts = Highcharts;
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptionsDaily: Highcharts.Options = {

    time: {
      // timezone: 'America/Los_Angeles',
      timezoneOffset: 8 * 60
      // useUTC: false
    },

    navigator: {
    
      series: [{
          /* fillOpacity: 0.05, */
          fillOpacity: 1.0,
          color: '',
      }]
    },

    series: [
      {
        type: 'spline',
        data: [],
        tooltip: {
          valueDecimals: 2
        }
      }
    ],
    rangeSelector:{
      enabled:false
    },
    title: {
      useHTML: true,
    },
  }


  HighchartsHist: typeof Highcharts = Highcharts;
  updateFromInput = false;
  chartOptionsHist: Highcharts.Options = {

    rangeSelector: {
      selected: 2,
    },

    title: {
        text: ''
    },

    subtitle: {
        text: 'With SMA and Volume by Price technical indicators'
    },

    yAxis: [{
        startOnTick: false,
        endOnTick: false,
        labels: {
            align: 'right',
            x: -3
        },
        title: {
            text: 'OHLC'
        },
        height: '60%',
        lineWidth: 2,
        resize: {
            enabled: true
        }
    }, {
        labels: {
            align: 'right',
            x: -3
        },
        title: {
            text: 'Volume'
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2
    }],

    tooltip: {
        split: true
    },

    plotOptions: {
        series: {
            dataGrouping: {
                units: [
                  ['day', [1]],
                  ['week', [1]], 
                  ['month', [1]],
                  ['year', null]
                ],

              groupPixelWidth: 20
      
            }
        }
    },

    series: [{
        type: 'candlestick',
        name: '',
        id: 'candle',
        zIndex: 2,
        data: [
          [0,0,0,0,0],
        ]
    }, {
        type: 'column',
        name: 'Volume',
        id: 'volume',
        data: [

          [ 1539907200000, 2278720 ],
     
        ],
        yAxis: 1
    }, {
        type: 'vbp',
        linkedTo: 'candle',
        params: {
            volumeSeriesID: 'volume'
        },
        dataLabels: {
            enabled: false
        },
        zoneLines: {
            enabled: false
        }
    }, {
        type: 'sma',
        linkedTo: 'candle',
        zIndex: 1,
        marker: {
            enabled: false
        }
    }]
  }



  constructor(private detailService: DetailsService, private alertService: AlertsService, private route: ActivatedRoute) {}

  ngOnDestroy(){

    clearInterval(this.interval);
  }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.ticker = params.get("ticker").toUpperCase();
      let watchlist = JSON.parse(localStorage.getItem("watchlist"));

      if (watchlist){
        this.isAddedToFav = watchlist[this.ticker] || false;
      }
    })
    

    this.interval = setInterval(() => {
      this.update();
    }, 15000);

    this.isError = false;
    this.isLoading = true;

    this.detailService.getCompanyDetails(this.ticker).subscribe ( responseList => {

      this.companyDetails = responseList[0].results;
      this.companyPrice = responseList[1].results;

      if (this.companyDetails.length == 0 || this.companyPrice.length == 0){
        this.isError = true;
        clearInterval(this.interval);
        return;
      }

      if (this.companyPrice[0].change < 0) {
        this.isChangeNeg = true;
      }else if (this.companyPrice[0].change > 0) {
        this.isChangePos = true;
      }

      if (!this.companyPrice[0].isMarketOpen){
        clearInterval(this.interval);
      }

      this.detailService.getDailyChart(this.ticker, this.companyPrice[0].timestamp.slice(0, 10)).subscribe(res => {

        this.dailyChart = res.results;
        this.updateDailyChart();
        this.isLoading = false;
        this.updateFlag = true;
      });
    });

    this.detailService.getNewsAndHisChart(this.ticker).subscribe ( res => {

      this.companyNews = res[0].results;
      this.histChart = res[1].results;
      this.updateHistChart();

    });
  }

  calculateClassesForPrice() {
    return {
        'positive': this.isChangePos,
        'negative': this.isChangeNeg
    };
  }


  updateHistChart() {
    for (var i = 0; i < this.histChart.length; i++) {
      this.histData.ohlc.push([
        this.histChart[i].date, this.histChart[i].open, 
        this.histChart[i].high, this.histChart[i].low, this.histChart[i].close
      ]);
      this.histData.volumne.push([this.histChart[i].date, this.histChart[i].volume]);
    }

    this.chartOptionsHist.series[0]['data'] = this.histData.ohlc;
    this.chartOptionsHist.series[1]['data'] = this.histData.volumne;
    this.chartOptionsHist.series[0]['name'] = this.ticker;

    this.chartOptionsHist.title['text'] = '<h2>' + this.ticker + ' Historical</h2>';
    this.updateFromInput = true;
 
  }

  updateDailyChart() {
    for (var i = 0; i < this.dailyChart.length; i++) {
      this.dailyChart[i] = [new Date(this.dailyChart[i].date).getTime(), this.dailyChart[i].close]
    }

    this.chartOptionsDaily.series[0]['data'] = this.dailyChart;
    this.chartOptionsDaily.series[0]['name'] = this.ticker;
    this.chartOptionsDaily.title['text'] = '<h2>' + this.ticker + '</h2>';

    
    if (this.isChangeNeg) {
      this.chartOptionsDaily.series[0].color = 'red';
      this.chartOptionsDaily.navigator.series[0].color = 'red';
    }else if (this.isChangePos){
      this.chartOptionsDaily.series[0].color = 'green';
      this.chartOptionsDaily.navigator.series[0].color = 'green';
    }else{
      this.chartOptionsDaily.series[0].color = 'black';
      this.chartOptionsDaily.navigator.series[0].color = 'black';
    }
  }

  toggleWatchlist() {

    if (this.isAddedToFav){

      let watchlist = JSON.parse(localStorage.getItem("watchlist"));
      delete watchlist[this.ticker];
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      this.isAddedToFav = false;
      this.alertService.showWatchlistAlert(this.isAddedToFav, this.companyDetails[0].ticker);

    }else{

      let watchlist = JSON.parse(localStorage.getItem("watchlist")) || {};  // should be a dictionary
      watchlist[this.ticker] = this.companyDetails[0].name;
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      this.isAddedToFav = true;
      this.alertService.showWatchlistAlert(this.isAddedToFav, this.companyDetails[0].ticker);

    } 

  }

  update() {

    this.detailService.getMultiCompanyInfo([this.ticker], 'price').subscribe ( responseList => {

      this.companyPrice = responseList.results;

      if (this.companyPrice[0].change < 0) {
        this.isChangeNeg = true;
      }else if (this.companyPrice[0].change > 0) {
        this.isChangePos = true;
      }

      if (!this.companyPrice[0].isMarketOpen){
        clearInterval(this.interval);
      }

      this.detailService.getDailyChart(this.ticker, this.companyPrice[0].timestamp.slice(0, 10)).subscribe(res => {

        this.dailyChart = res.results;
        this.updateDailyChart();
        this.isLoading = false;
        this.updateFlag = true;
      });
    });
  }

}
