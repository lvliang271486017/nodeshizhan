var qs = require('querystring');

exports.sendHtml = function(res, html) {
    res.writeHead('Content-Type', 'text/html');
    res.writeHead('Content-Length', Buffer.byteLength(html));
    res.end(html);
};

exports.parseReceivedData = function(req, cb) {
    var body = '';
    res.setEnCoding('utf8');
    req.on('data', function(chunk) {
        body += chunk;
    });
    req.on('end', function() {
        var data = JSON.parse(body);
        cb(data);
    });
};

exports.actionForm = function(id, path, label) {
    var html = '<form method="POST" action="" '+ path +'">'+
        '<input type="hidden" name="id" value="' + id + '" /> '+
        '<input type="submit" value="' + label + '" />'+
        '</form>';
    return html;
};

exports.add = function(db, req, res) {
    exports.parseReceivedData(req, function(work) {
        db.query(
            "INSERT INTO work (hours, data, description) " +
            " VALUES (?, ?, ?)",
            [work.hours, work.date, work.description],
            function(err) {
                if (err) throw err;
                exports.show(db, res);
            }
        );
    });
};

exports.delete = function(db, req, res) {
    exports.parseReceivedData(req, function(work) {
        db.query(
            "DELETE FROM work WHERE iD=?",
            [work.id],
            function(err) {
                if (err) throw err;
                exports.show(db, res);
            }
        );
    });
};

exports.archive = function(db, req, res) {
    exports.parseReceivedData(req, function(work) {
        db.query(
            "UPDATE work SET archived=1 WHERE id=?",
            [work.id],
            function(err) {
                if (err) throw err;
                exports.show(db, res);
            }
        );
    });
};

exports.show = function(db, res, showArchive) {
    var query = "SELECT * FROM work " +
        "WHERE archived=?" +
        "ORDER BY data DESC";
    var archiveValue = (showArchive) ? 1 : 0;
    db.query(
        query,
        [archiveValue],
        function(err, rows) {
            if (err) throw err;
            html = showArchive ? '' :
            '<a href="/archived">Archived Work</a><br/>';
            html += exports.workHitlistHtml(rows);
            html += exports.workFormHtml();
            exports.sendHtml(res, html);
        }
    );
};

exports.showArchive = function(db, res) {
    exports.show(db, res, true);
};

exports.workHitlistHtml = function(rows) {
    var html = '<table>';
    for (var i in rows) {
        html += '<tr>';
        html += '<td>' + rows[i].data + '</td>';
        html += '<td>' + rows[i].hours + '</td>';
        html += '<td>' + rows[i].description + '</td>';
        if (!rows[i].archived) {
            html += '<td>' + exports.workArchiveForm(rows[i].id) + '</td>';
        }
        html += '<td>' + exports.workDeleteForm(rows[i].id) + '</td>';
        html += '</tr>';
    }
    html += '</table>';
    return html;
}

exports.workFormHtml = function() {
    var html = '<form method="POST" action="/">'+
        '<p>Data <br/> <input name="date" type="text" /></p>'+
        '<p>Hours worked <br/> <input name="hours" type="text" /></p>'+
        '<p>description <br/>'+
        '<textarea name="description"></textarea></p>'+
        '<input type="submit" value="Add" />'+
        '</form>';
    return html;
};

exports.workArchiveForm = function(id) {
    return exports.actionForm(id, '/archive', 'Archive');
};

exports.workArchiveForm = function(id) {
    return exports.actionForm(id, '/delete', 'Delete');
}