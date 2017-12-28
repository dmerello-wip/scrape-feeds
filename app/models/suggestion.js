var db = require('../dbPool');

exports.create = function(req,res) {
    let query = 'INSERT INTO suggestions (`id`, `description`, `image`) VALUES (null, "test immagine del belino", "fischione.png")';
    db.use(req, res, query);
};

exports.getAll = function(req,res) {
    let query = 'SELECT * FROM `suggestions`.`suggestions`';
    db.use(req, res, query);
};
