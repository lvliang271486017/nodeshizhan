var http = require('http');
var work = require('./lib/timetrack');
var mysql = require('mysql');
var db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root3306',
  database: 'timetrack'
});

var server = http.createServer(function (req, res) {
  switch (req.method) {
    case 'POST':
      switch (req.ur) {
        case '/':
          work.add(db, req, res);
          break;
        case '/archive':
          work.archive(db, req, res);
          break;
        case '/delete':
          work.delete(db, req, res);
          break;
      }
      break;
    case 'GET':
      switch (req.ur) {
        case '/':
          work.show(db, res);
          break;
        case '/archive':
          work.showArchive(db, res);
          break;
      }
  }
})

db.query('CREATE TABLE IF NOT EXISTS work ('
  + 'id INT(10) NOT NULL AUTO_INCREMENT, '
  + 'hours DECIMAL(5, 2) DEFAULT 0, '
  + 'date DATE, '
  + 'archived INT(1) DEFAULT 0, '
  + 'description LONGTEXT, '
  + 'PRIMARY KEY(id)) ',
  function(err) {
    if (err) throw err;
    console.log('server start 8888');
    server.listen(8888);
  }
)