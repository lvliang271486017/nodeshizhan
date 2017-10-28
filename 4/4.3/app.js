var http = require('http');
var formidable = require('formidable');

function show(res) {
    var html = `<form action="/" method="post" enctype="multipart/form-data">
                    <p><input type="text" name="name"></p>
                    <p><input type="file" name="file"></p>
                    <p><input type="submit" value="upload"></p>
                </form>`;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

function upload(req, res) {
    if (!isFormData(req)) {
        res.statusCode = 400;
        res.end('bad request');
        return;
    }
    var form = new formidable.IncomingForm();

    form.on('field', function(field, value) {
        console.log('field');
        console.log(field);
        console.log(value);
    })
    form.on('file', function(name, file) {
        console.log('file');
        console.log(name);
        console.log(file);
    })
    form.on('end', function() {
        console.log('upload complete');
    })
    form.on('progress', function(bytesReceived, bytesExpected) {
        var percent = Math.floor(bytesReceived / bytesExpected * 100);
        console.log(percent);
    })
    form.parse(req, function(err, fields, files) {
        console.log(fields);
        console.log(files);
        res.end('upload complete');
    });
}

function isFormData(req) {
    var type = req.headers['content-type'] || '';
    return 0 == type.indexOf('multipart/form-data');
}

var server = http.createServer(function(req, res) {
    switch (req.method) {
        case 'GET':
            show(res);
            break;
        case 'POST':
            upload(req, res);
            break;
    }
})

server.listen(8888)