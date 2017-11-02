var parse = require('url').parse;

module.exports = function(obj) {
    return function(req, res, next) {
        if (!obj[req.method]) {
            next();
            return;
        }
        var routes = obj[req.method];
        var url = parse(req.url);
        var paths = Object.keys(routes);
        
        for (let item of paths) {
            var path = item;
            var fn = routes[path];
            path = path
                .replace(/\//g, '\\/')
                .replace(/:(\w+)/g, '([^\\/]+)');
            console.log(path);
            var reg = new RegExp('^' + path + '$');
            console.log(url);
            var captures = url.pathname.match(reg);
            if (captures) {
                console.log(captures);
                var args = [req, res].concat(captures.slice(1));
                fn.apply(null, args);
                return;
            }
        }
        next();
    }
}