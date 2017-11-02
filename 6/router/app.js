var connect = require('connect');
var router = require('./router');
var routes = {
    GET: {
        '/users': function(req, res) {
            res.end('tobi, loki, ferret');
        },
        '/user/:id': function(req, res, id) {
            res.end('user: ' + id);
        }
    },
    DELETE: {
        '/user/:id': function(req, res, id) {
            res.end('delete user ' + id);
        }
    }
}

var app = connect();
app
.use(router(routes))
.listen(8888);