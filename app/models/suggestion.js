var db = require('../dbPool');

exports.create = function(req,res) {
    let query = 'INSERT INTO suggestions (`id`, `image`, `description`) VALUES (null, "'+req.body.image+'", "'+req.body.description+'")';
    db.use(req, res, query);
};

exports.getAll = function(req,res) {
    let query = 'SELECT * FROM `suggestions`.`suggestions`';
    db.use(req, res, query);
};

exports.delete = function(req,res) {
    let query = 'DELETE FROM `suggestions`.`suggestions` WHERE `suggestions`.`id` = '+req.body.id+'';
    db.use(req, res, query);
};
