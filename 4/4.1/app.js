var http = require('http');
var fs = require('fs');
var parse = require('url').parse;
var join = require('path').join;

var root = __dirname;

var server = http.createServer(function(req, res) {
    var url = parse(req.url);
    var path = join(root, url.pathname);
    // var stream = fs.createReadStream(path);
    // stream.on('data', function(chunk) {
    //     res.write(chunk);
    // });
    // stream.on('end', function() {
    //     res.end();
    // })
    // stream.pipe(res); //管道
    // stream.on('error', function(err) {
    //     res.statusCode = 500;
    //     res.end('internet server error');
    // })
    // stat 检查文件
    fs.stat(path, function(err, stat) {
        if (err) {
            if (err.code === 'ENOENT') {
                res.statusCode = 404;
                res.end('not found');
            } else {
                res.statusCode = 500;
                res.end('internet server error');
            }
        } else {
            res.setHeader('Content-Type', stat.size);
            var stream = fs.createReadStream(path);
            stream.pipe(res);
            stream.on('error', function() {
                res.statusCode = 500;
                res.end('internet server error');
            });
        }
    });
});

server.listen(8888);

console.log('server start at 8888')