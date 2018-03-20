const db = require('../dbPool');
const appConfig = require('../config.js');
const tag = require('./../models/tag');

exports.create = function(req,res, data) {
    const query = 'INSERT INTO suggestions (`id`, `image`, `description`, `title`) VALUES (null, "'+appConfig.paths.uploads+'/'+data.file+'", "'+data.description+'", "'+data.title+'");';
/*
    let tagIds = [];
    for (const key in data.tags) {
        tagIds.push(tag.getIdOrCreateFromName(data.tags[key]));
    }
    console.dir(tagIds);
*/
    db.query(query, null, function (data, error) {
        if(!error) {
            res.json({'code' : 200, 'message' : data});
        } else {
            res.json({'code' : 400, 'message' : error});
        }
    });
};


exports.list = function(req,res) {
    const query = 'SELECT * FROM `suggestions`.`suggestions`;';
    db.query(query, null, function (data, error) {
        if(!error) {
            res.json({'code' : 200, 'message' : data});
        } else {
            res.json({'code' : 400, 'message' : error});
        }
    });
};

exports.get = function(req,res) {
    const query = 'SELECT * FROM `suggestions` WHERE `suggestions`.`id` = '+req.params.id+';';
    db.query(query, null, function (data, error) {
        if(!error) {
            res.json({'code' : 200, 'message' : data});
        } else {
            res.json({'code' : 400, 'message' : error});
        }
    });
};

exports.update = function(req,res, data) {
    console.log('model update with id: '+data.id);
    const query = "UPDATE `suggestions` SET `description`= '"+data.description+"',`image`= '"+appConfig.paths.uploads+'/'+data.file+"', `title` = '"+data.title+"' WHERE `suggestions`.`id` = "+data.id+";";
    db.query(query, null, function (data, error) {
        if(!error) {
            res.json({'code' : 200, 'message' : data});
        } else {
            res.json({'code' : 400, 'message' : error});
        }
    });
};

exports.delete = function(req,res) {
    const query = 'DELETE FROM `suggestions` WHERE `suggestions`.`id` = '+req.body.id+';';
    db.query(query, null, function (data, error) {
        if(!error) {
            res.json({'code' : 200, 'message' : data});
        } else {
            res.json({'code' : 400, 'message' : error});
        }
    });
};
