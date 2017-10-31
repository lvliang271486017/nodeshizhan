function setup(format) {
    var reg = /:(\w+)/g;
    return function(req, res, next) {
        var str = format.replace(reg, function(macth, property) {
            console.log(property);
            return req[property];
        })
        console.log(str);
        next();
    }
}

module.exports = setup;