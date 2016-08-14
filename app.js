var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var requirejs = require('requirejs');

var routes = require('./routes/routes');
var exphbs  = require('express3-handlebars');


var app = express();
var isProduction = app.get('env') === 'production';

// view engine setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('less-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'build'),
    compress: isProduction
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(app.router);

app.get('/', routes.login);
app.get('/about', routes.about);
app.get('/contact', routes.contact);
//app.get('/login', routes.login);

app.get('/login', function (req, res) {
    // pass a local variable to the view
    res.render('login', { title: 'Hey', message: 'Hello there!' });
});
 
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

if (app.get('env') === 'development') {
    // development error handler
    // will print stack trace 
    app.use(function(err, req, res) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


if (isProduction) {
    //requirejs optimizer should build to one file here
    var config = {
        mainConfigFile: 'public/javascript/main.js',
        name: 'lib/almond',
        include: ['main'],
        out: 'build/javascript/main-built.js',
        uglify: {
            toplevel: true
        }
    };

    requirejs.optimize(config, function (){}, function(err) {
        //optimization err callback
        throw err;
    });

    routes.setProductionMode();
}

// production error handler
// no stack traces leaked to user
app.use(function(err, req, res) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
