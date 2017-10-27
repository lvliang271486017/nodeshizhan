var http = require('http');
var qs = require('querystring');

var items = [];

function show(res) {
    var html = `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>todo list</title>
    </head>
    <body>
        <h1>todo list</h1>
        <ul> ` +
            items.map(function(item) {
                return `<li>`+ item + `</li>`
            }).join('')
        + `</ul>
        <form action="/" method="post">
            <p><input type="text" name="item"></p>
            <p><input type="submit" value="add item"></p>
        </form>
    </body>
    </html>`;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

function notFound(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('not found');
}

function badRequest(res) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end('bad Request');
}

function add(req, res) {
    var body = '';
    req.setEncoding('utf-8');
    req.on('data', function(thunk) {
        body += thunk;
    });
    req.on('end', function() {
        var obj = qs.parse(body);
        items.push(obj.item);
        show(res);
    })
}

var server = http.createServer(function(req, res) {
    if (req.url === '/') {
        switch (req.method) {
            case 'GET':
                show(res);
                break;
            case 'POST':
                add(req, res);
                break;
            default:
                badRequest(res);
        }
    } else {
        notFound(res);
    }
})

server.listen(8888);

console.log('server start at 8888');