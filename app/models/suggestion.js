var db = require('../dbHelper.js');

exports.create = function(id, text, done) {
    var values = [id, text, new Date().toISOString()];
    db.get().query('INSERT INTO suggestions (id, text, date) VALUES(?, ?, ?)', values, function(err, result) {
        if (err) return done(err);
        done(null, result.insertId);
    });
};

exports.getAll = function(done) {
    db.get().query('SELECT * FROM suggestions', function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};
