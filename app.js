const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const index = require('./routes/index');
const users = require('./routes/users');
const rooms = require('./routes/rooms');
const hospitals = require('./routes/hospitals');
const patient = require('./routes/patient');
const passport =require ('passport');
var LocalStrategy = require('passport-local').Strategy;
// var security = require('./config/security');
var User = require('./models/users');

const app = express();

mongoose.connect('mongodb://localhost/bedin-db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const allowCrossDomain = function(req, res, next) {
    // intercept OPTIONS method
    if ('OPTIONS'==req.method) {
      res.set({
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Accept, Header, Content-Type, access-control-allow-origin',
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      });
      return res.sendStatus(200);
    }
    res.set({
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers':"header, Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since",
      'Access-Control-Allow-Credentials': true
    });
    next();   
};
app.use(allowCrossDomain);

// app.all('/', security.ensureAuthenticated);
app.use('/', index);
app.use('/users', users);
app.use('/rooms', rooms);
app.use('/hospitals', hospitals);
app.use('/patient', patient);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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