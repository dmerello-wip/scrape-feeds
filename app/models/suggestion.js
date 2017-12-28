var db = require('../dbPool');

exports.create = function(id, text, done) {
    let q = 'INSERT INTO suggestions (id, text, date) VALUES()';
};

exports.getAll = function(req,res) {
    let query = 'SELECT * FROM `suggestions`.`suggestions`';
    db.use(req,res, query);
};
