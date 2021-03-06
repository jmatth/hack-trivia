var express = require('express')
  , path = require('path')
  , favicon = require('static-favicon')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , stylus = require('stylus')
  , nib = require('nib');

var config = require('./config');

var db = require('./lib/db')
  , phone = require('./lib/phone');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(stylus.middleware({
    src: path.join(__dirname, 'public')
  , compile: function(str, path) {
      return stylus(str).set('filename', path).set('compress', true).use(nib());
  }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes.index);
app.use('/setup/', routes.setup);
app.use('/hooks/', routes.hooks);
app.use('/play/', routes.play);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

db.connect('localhost/hack_trivia');
phone.config(config.twilio.account_sid, config.twilio.auth_token, config.twilio.number);

module.exports = app;
