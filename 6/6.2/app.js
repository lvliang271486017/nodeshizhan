var connect = require('connect');
var logger = require('./logger');

function hello(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world');
}

var app = connect();
app
.use(logger(':method :url'))
.use(hello)
.listen(8888);