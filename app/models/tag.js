const db = require('../dbPool');

class Tag {



    create(tagName, callback) {
        const query = 'INSERT INTO tags (`id`, `name`) VALUES (null, "'+tagName+'"); ';
        db.query(query, null, function (data, error) {
            if(!error) {
                callback(true, data);
            } else {
                callback(false, error);
            }
        });
    };

    list(req,res) {
        const query = 'SELECT * FROM `suggestions`.`tags`;';
        db.query(query, null, function (data, error) {
            if(!error) {
                res.json({'code' : 200, 'message' : data});
            } else {
                res.json({'code' : 400, 'message' : error});
            }
        });
    };

    get(req,res) {
        const query = 'SELECT * FROM `tags` WHERE `tags`.`id` = '+req.params.id+';';
        db.query(query, null, function (data, error) {
            if(!error) {
                res.json({'code' : 200, 'message' : data});
            } else {
                res.json({'code' : 400, 'message' : error});
            }
        });
    };


    update(req,res) {
        const query = "UPDATE `tags` SET `name`= '"+req.body.name+"' WHERE `tags`.`id` = "+req.body.id+";";
        db.query(query, null, function (data, error) {
            if(!error) {
                res.json({'code' : 200, 'message' : data});
            } else {
                res.json({'code' : 400, 'message' : error});
            }
        });
    };

    delete(req,res) {
        const query = 'DELETE FROM `tags` WHERE `tags`.`id` = '+req.body.id+';';
        db.query(query, null, function (data, error) {
            if(!error) {
                res.json({'code' : 200, 'message' : data});
            } else {
                res.json({'code' : 400, 'message' : error});
            }
        });
    };
}


module.exports = new Tag();