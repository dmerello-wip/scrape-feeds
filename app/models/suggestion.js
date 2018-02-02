const db = require('../dbPool');
const appConfig = require('../config.js');

exports.create = function(req,res) {
    console.dir(req.body);
    /*const query = 'INSERT INTO suggestions (`id`, `image`, `description`, `title`) VALUES (null, "'+appConfig.paths.uploads+'/'+req.file.filename+'", "'+req.body.description+'", "'+req.body.title+'");';
    db.use(req, res, query);*/
};

exports.list = function(req,res) {
    const query = 'SELECT * FROM `suggestions`.`suggestions`;';
    db.use(req, res, query);
};

exports.get = function(req,res) {
    const query = 'SELECT * FROM `suggestions` WHERE `suggestions`.`id` = '+req.params.id+';';
    db.use(req, res, query);
};

exports.update = function(req,res) {
    const query = "UPDATE `suggestions` SET `description`= '"+req.body.description+"',`image`= '"+appConfig.paths.uploads+'/'+req.file.filename+"', `title` = '"+req.body.title+"' WHERE `suggestions`.`id` = "+req.body.id+";";
    db.use(req, res, query);
};

exports.delete = function(req,res) {
    const query = 'DELETE FROM `suggestions` WHERE `suggestions`.`id` = '+req.body.id+';';
    db.use(req, res, query);
};
