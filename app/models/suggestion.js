var db = require('../dbPool');

exports.create = function(req,res) {
    var query = 'INSERT INTO suggestions (`id`, `image`, `description`, `title`) VALUES (null, "'+req.body.image+'", "'+req.body.description+'", "'+req.body.title+'");';
    db.use(req, res, query);
};

exports.list = function(req,res) {
    var query = 'SELECT * FROM `suggestions`.`suggestions`;';
    db.use(req, res, query);
};

exports.get = function(req,res) {
    var query = 'SELECT * FROM `suggestions` WHERE `suggestions`.`id` = '+req.params.id+';';
    db.use(req, res, query);
};

exports.update = function(req,res) {
    var query = "UPDATE `suggestions` SET `description`= '"+req.body.description+"',`image`= '"+req.body.image+"', `title` = '"+req.body.title+"' WHERE `suggestions`.`id` = "+req.body.id+";";
    db.use(req, res, query);
};

exports.delete = function(req,res) {
    var query = 'DELETE FROM `suggestions` WHERE `suggestions`.`id` = '+req.body.id+';';
    db.use(req, res, query);
};
