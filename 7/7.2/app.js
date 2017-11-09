var connect = require('connect');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

function edit(req, res, next) {
  if ('GET' != req.method) return next();
  res.setHeader('content-type', 'text/html');
  res.setHeader('_method', 'PUT');
  res.write('<form method="post" action = "/?_method=PUT">');
  res.write('<input type="hidden" name="_method" value="PUT" />');
  res.write('<input type="text" name="user[name]" value="tobi" />');
  res.write('<input type="submit" value="Update" />');
  res.write('</form>');
  res.end();
}

function update(req, res, next) {
  console.log(req);
  if ('PUT' != req.method) return next();
  res.end('update name to ' + req.body.user.name);
}

var app = connect()
  .use(bodyParser())
  .use(methodOverride('_method'))
  .use(edit)
  .use(update)
  .listen(8888);