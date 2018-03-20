const db = require('../dbPool');
const appConfig = require('../config.js');

exports.create = function(req,res) {
    const query = 'INSERT INTO tags (`id`, `name`) VALUES (null, "'+req.body.name+'");';
    db.query(query, null, function (data, error) {
        if(!error) {
            res.json({'code' : 200, 'message' : data});
        } else {
            res.json({'code' : 400, 'message' : error});
        }
    });
};

exports.list = function(req,res) {
    const query = 'SELECT * FROM `suggestions`.`tags`;';
    db.query(query, null, function (data, error) {
        if(!error) {
            res.json({'code' : 200, 'message' : data});
        } else {
            res.json({'code' : 400, 'message' : error});
        }
    });
};

exports.get = function(req,res) {
    const query = 'SELECT * FROM `tags` WHERE `tags`.`id` = '+req.params.id+';';
    db.query(query, null, function (data, error) {
        if(!error) {
            res.json({'code' : 200, 'message' : data});
        } else {
            res.json({'code' : 400, 'message' : error});
        }
    });
};

// todo: meglio farla come servizio o come metodo parametrizzato?
exports.getIdOrCreateFromName = function(name) {
    const query = 'SELECT `tags`.`id` FROM `tags` WHERE `tags`.`name` = '+name+';';
    db.query(query, null, function (data, error) {
        if(!error) {
            return data;
        } else {
            res.json({'code' : 400, 'message' : error});
        }
    });
}

exports.update = function(req,res) {
    const query = "UPDATE `tags` SET `name`= '"+req.body.name+"' WHERE `tags`.`id` = "+req.body.id+";";
    db.query(query, null, function (data, error) {
        if(!error) {
            res.json({'code' : 200, 'message' : data});
        } else {
            res.json({'code' : 400, 'message' : error});
        }
    });
};

exports.delete = function(req,res) {
    const query = 'DELETE FROM `tags` WHERE `tags`.`id` = '+req.body.id+';';
    db.query(query, null, function (data, error) {
        if(!error) {
            res.json({'code' : 200, 'message' : data});
        } else {
            res.json({'code' : 400, 'message' : error});
        }
    });
};
