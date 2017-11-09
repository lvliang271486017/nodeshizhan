var connect = require('connect');
var cookieParser = require('cookie-parser')
var app = connect()
    .use(cookieParser('tobi NO1'))
    .use(function(req, res) {
        console.log(req.cookies);
        console.log(req.signedCookies);
        res.end('hello')
    }).listen(8888);