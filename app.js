var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fingerprint = require('express-fingerprint');
const geoIP = require('geoip-lite');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('trust proxy',true);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fingerprint({
  parameters :[
    fingerprint.useragent,
    fingerprint.acceptHeaders,
    fingerprint.geoip,
    function(next){
      let deviceData = geoIP.lookup(this.req.ip);
      next(null,{
        geoip: {
          country: deviceData?deviceData.country:null,
          city: deviceData?deviceData.city:null,
          timezone: deviceData? deviceData.timezone:null,
          region: deviceData? deviceData.region:null,
          ll:deviceData?deviceData.ll:null
        }
      });
    }
  ]
}))

app.use('/', indexRouter);
//app.use('/users', usersRouter);

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
