var connect = require('connect');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');

var sessionOpts = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}

var app = connect()
  .use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
  .use(cookieParser())
  .use(session(sessionOpts))
  .use(function(req, res, next) {
    var sess = req.session;
    if (sess.views) {
      res.setHeader('Content-Type', 'text/html');
      res.write('<p>views: '+ sess.views +'</p>');
      res.end();
      sess.views++;
    } else {
      sess.views = 1;
      res.end('welcome to the session demo, refresh');
    }
  });

app.listen(8888);