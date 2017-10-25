var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    if (req.url === '/') {
        fs.readFile('./titles.json', function(err, data) {
            if (err) {
                console.log(err);
                res.end('server error - titles.json');
            } else {
                var titles = JSON.parse(data.toString());

                fs.readFile('./template.html', function(err, data) {
                    if (err) {
                        console.log(err);
                        res.end('server error - template.html');
                    } else {
                        var temp = data.toString();
                        var html = temp.replace('%', titles.join('</li><li>'));
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(html);
                    }
                })
            }
        })
    }
})

server.listen(8888);
console.log('server listen at 8888');