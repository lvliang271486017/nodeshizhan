var connect = require('connect');

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}

function hello(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world');
}

function restrict(req, res, next) {
    var authorization = req.headers.authorization;
    if (!authorization) return next(new Error('unauthorized'));

    var parts = authorization.split(' ');
    var scheme = parts[0];
    var auth = new (parts[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user === 'lv' && pass === '123') {
        next();
    } else {
        return next(new Error('error'));
    }
}

var app = connect();
app
.use(logger)
.use(restrict)
.use(hello)
.listen(8888);