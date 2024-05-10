const { response } = require('express');
var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();
var tingoApiKey = process.env.TINGO_API_KEY;
var newsApiKey = process.env.NEWS_API_KEY;


/* GET users listing. */
router.get('/search', function(req, res, next) {

    var result = {
        results: [],
        total: 0
    };

    res.send(result);

});


/* Search for company names api for autocomplete */
router.get('/search/:ticker', function(req, res, next) {

    companies = [];
    ticker = req.params.ticker;
    fetch(`https://api.tiingo.com/tiingo/utilities/search?query=${ticker}&token=${tingoApiKey}`)
    .then(res => res.json())
    .then(data => processData(data))
    .then(data => res.send(data));

});


/* Get the details for the company */
router.get('/detail/:ticker', function(req, res, next) {

  details = {};
  ticker = req.params.ticker;

  fetch(`https://api.tiingo.com/tiingo/daily/${ticker}?token=${tingoApiKey}`)
  .then(res => res.json())
  .then(function(data) {

    if (!data || data.detail){
      details.results = [];
      details.success = false;
    }else{
      details.results = [data];
      details.success = true;
    }
    res.send(details)
  });

});


/* Get the company price data  */
router.get('/price/:ticker', function(req, res, next) {

  price = {};
  ticker = req.params.ticker;
  // console.log("\nrequesting company price\n");

  fetch(`https://api.tiingo.com/iex/?tickers=${ticker}&token=${tingoApiKey}`)
  .then(res => res.json())
  .then(function(data) {

    if (!data){
      price.results = [];
      price.success = false;
    }else{
      price.results = data;
      price.success = true;
    }

    res.send(price)
  });
});

/* Get the daily chart data */
router.get('/chart/daily/:ticker/:startDate', function(req, res, next) {

  dailyChart = {};
  ticker = req.params.ticker;
  startDate = req.params.startDate;

  fetch(`https://api.tiingo.com/iex/${ticker}/prices?startDate=${startDate}&resampleFreq=4min&token=${tingoApiKey}`)
  .then(res => res.json())
  .then(function(data) {

    if (data.details){
      dailyChart.results = [];
      dailyChart.success = false;
    }else{
      dailyChart.results = data;
      dailyChart.success = true;
    }

    res.send(dailyChart)
  });
});


/* Get the company news data  */
router.get('/news/:ticker', function(req, res, next) {

  news = {};
  ticker = req.params.ticker;

  fetch(`https://newsapi.org/v2/everything?apiKey=${newsApiKey}&q=${ticker}`)
  .then(res => res.json())
  .then(function(data) {

    if (!data){
      news.results = [];
      news.success = false;
    }else{
      news.results = processNews(data.articles);
      news.success = true;
    }
    res.send(news)
  });
});


/* Get the daily chart data */
router.get('/chart/historical/:ticker', function(req, res, next) {

  const dateTwoYears = new Date();
  dateTwoYears.setFullYear(dateTwoYears.getFullYear() - 2);
  const startDate = getDateStr(dateTwoYears);
  console.log(startDate);

  histChart = {};
  ticker = req.params.ticker;
  console.log(`\nrequesting company historical chart for ${ticker} from ${startDate}\n`);

  fetch(`https://api.tiingo.com/tiingo/daily/${ticker}/prices?startDate=${startDate}&resampleFreq=daily&token=${tingoApiKey}`)
  .then(res => res.json())
  .then(function(data) {
    if (!data || data.detail){
      histChart.results = [];
      histChart.success = false;
    }else{
      histChart.results = data;
      histChart.success = true;
    }

    res.send(histChart)
  });
});



function processHistChart(data) {

  results = {
    volume: [],
    ohlc: []
  };

  for (var i = 0; i < data.length; i++){
    results.volume.push([
        new Date(data[i].date).getTime(),
        data[i].volume
    ]);

    results.ohlc.push([
      new Date(data[i].date).getTime(),
      data[i].open,
      data[i].high,
      data[i].low,
      data[i].close
    ])

  }

  return results;

}


function processNews(data) {

  results = [];

  for (var i = 0; i < data.length; i++){
    if (data[i].url && data[i].title && data[i].description && data[i].source.name 
      && data[i].urlToImage && data[i].publishedAt) {
        results.push({
          url: data[i].url,
          title: data[i].title,
          description: data[i].description,
          source: data[i].source.name,
          urlToImage: data[i].urlToImage,
          publishedAt: data[i].publishedAt
      });

    }
  }

  return results;

}


function processData(data) {

  var result = {
    results: [],
    total: 0
  };

  for (var i = 0; i < data.length; i++){
    // console.log()
    if (data[i].name) {
      result.results.push({
        name: data[i].name,
        ticker: data[i].ticker
      })
    }
  }

  result.total = result.results.length;

  return result;

}

function getDateStr(date) {
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  let year = date.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');

}


module.exports = router;
