var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// load env variables mostly for API keys
require('dotenv').config();
// console.log(process.env) // remove this after you've confirmed it is working


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var searchRouter = require('./routes/search');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/' ,express.static(path.join(__dirname, 'dist/angular-trading-platform')));
app.use('/api', apiRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/angular-trading-platform/index.html'));
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
