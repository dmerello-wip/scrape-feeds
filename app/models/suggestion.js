const db = require('../dbPool');
const appConfig = require('../config.js');


class Suggestion {

    constructor(){
        console.log('Suggestion Model Class');
    }

    create(data, callback) {
        const query = 'INSERT INTO suggestions (`id`, `image`, `description`, `title`) VALUES (null, "'+appConfig.paths.uploads+'/'+data.file+'", "'+data.description+'", "'+data.title+'");';

        db.query(query, null, function (data, error) {
            if(!error) {
                callback(true, data);
            } else {
                callback(false, error);
            }
        });
    };

    list(req,res) {
        const query = 'SELECT * FROM `suggestions`.`suggestions`;';
        db.query(query, null, function (data, error) {
            if(!error) {
                res.json({'code' : 200, 'message' : data});
            } else {
                res.json({'code' : 400, 'message' : error});
            }
        });
    };

    get(req,res) {
        const query = 'SELECT * FROM `suggestions` WHERE `suggestions`.`id` = '+req.params.id+';';
        db.query(query, null, function (data, error) {
            if(!error) {
                res.json({'code' : 200, 'message' : data});
            } else {
                res.json({'code' : 400, 'message' : error});
            }
        });
    };

    update(req,res, data) {
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

    delete(req,res) {
        const query = 'DELETE FROM `suggestions` WHERE `suggestions`.`id` = '+req.body.id+';';
        db.query(query, null, function (data, error) {
            if(!error) {
                res.json({'code' : 200, 'message' : data});
            } else {
                res.json({'code' : 400, 'message' : error});
            }
        });
    };


}

module.exports = new Suggestion();