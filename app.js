var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var hbs = require('hbs');
var index = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerHelper('listUsers', function(items, options) {
    var content = '';
    for(var i=0, l=items.length; i<l; i++) {
        var selectorKey = items[i].id.replace(':', '');
        var out = '<tr id="row' + selectorKey + '" class="systemRecords"><td><form action="/" method="post" id="form' + selectorKey + '" class="form-inline" role="form">';
        out = out + '<input type="text" class="form-control" id="firstName" name="firstName" placeholder="First name" value="' + items[i].firstName + '" required> ';
        out = out + '<input type="text" class="form-control" id="lastName" name="lastName" placeholder="Last name" value="' + items[i].lastName + '" required> ';
        out = out + '<input type="text" class="form-control" id="userName" name="userName" placeholder="Username" value="' + items[i].userName + '" required> ';
        out = out + '<button type="submit" class="btn btn-default">Update via HTTP</button> <a href="/remove?key=' + items[i].id + '" role="button" class="btn btn-default">Delete via HTTP</a> <button type="button" class="btn btn-default" data-key="' + items[i].id + '">Update via XHR</button>&nbsp;<button type="button" class="btn btn-default" data-key="' + items[i].id + '">Delete via XHR</button>';
        out = out + '<input type="hidden" id="key" name="key" value="' + items[i].id + '"></form></td></tr>';
        content = content + out;
    }
    return content;
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({resave: true, saveUninitialized: true, cookie: { secure: false }, secret: 'nosql-sampler-app-secret'}));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.route(['/', '/json'])
    .get(index.home)
    .post(index.post);
app.route(['/remove', '/json:remove'])
    .get(index.remove);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

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

module.exports = app;