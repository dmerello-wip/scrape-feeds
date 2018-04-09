const db = require('../helpers/dbPool');

class Tag {



    create(tagName) {
        return new Promise( (resolve, reject) => {
            const query = 'INSERT INTO tags (`id`, `name`) VALUES (null, "' + tagName + '"); ';
            db.query(query, null, (data, error) => {
                (!error) ? resolve(data) : reject(error);
            });
        });
    };

    getTagId(tagName) {
        return new Promise( (resolve, reject) => {
            const q_checkTag = 'SELECT * FROM `tags` WHERE `tags`.`name` = "'+tagName+'";';
            db.query(q_checkTag, null, (data, error) => {
                if(!error) {
                    if(data[0]===undefined){
                        // create a new tag and get id
                        this.create(tagName)
                            .then(function(tagData){
                                resolve(tagData.insertId)
                            })
                            .catch(function(tagError){
                                reject(tagError);
                            });
                    } else {
                        // use an existent tag id
                        resolve(data[0].id);
                    }
                } else {
                    reject('Tag Model - getTagId: Query error');
                }
            });
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