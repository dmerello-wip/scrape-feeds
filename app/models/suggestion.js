var db = require('../dbPool');

exports.create = function(req,res) {
    console.dir(req.body.description);
    let query = 'INSERT INTO suggestions (`id`, `image`, `description`) VALUES (null, "'+req.body.image+'", "'+req.body.description+'")';
    db.use(req, res, query);
};

exports.getAll = function(req,res) {
    let query = 'SELECT * FROM `suggestions`.`suggestions`';
    db.use(req, res, query);
};
