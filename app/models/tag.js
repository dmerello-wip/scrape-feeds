const db = require('../helpers/dbPool');

class Tag {


    create(tagName) {
        const query = 'INSERT INTO tags (`id`, `name`) VALUES (null, "'+tagName+'"); ';
        return new Promise((resolve, reject)=>{
            db.query(query, null, function (data, error) {
                (!error) ? resolve(data) : reject(error);
            });
        });
    };

    getTagId(tagName) {
        const q_checkTag = 'SELECT * FROM `tags` WHERE `tags`.`name` = "'+tagName+'";';
        return new Promise((resolve, reject)=> {
            db.query(q_checkTag, null, function (data, error) {
                if (!error) {
                    if (data[0] === undefined) {
                        // create a new tag and get id
                        this.create(tagName).then((tagData) => {
                            resolve(tagData.insertId);
                        });
                    } else {
                        // create an existend tag id
                        resolve(data[0].id);
                    }
                } else {
                    console.log('Tag Model - getTagId: Query error');
                }
            }.bind(this));
        });
    };


    list(req,res) {
        const query = 'SELECT * FROM `suggestions`.`tags`;';
        return new Promise((resolve, reject)=>{
            db.query(query, null, function (data, error) {
                (!error) ? resolve(data) : reject(error);
            });
        });
    };

    get(req,res) {
        const query = 'SELECT * FROM `tags` WHERE `tags`.`id` = '+req.params.id+';';
        return new Promise((resolve, reject)=>{
            db.query(query, null, function (data, error) {
                (!error) ? resolve(data) : reject(error);
            });
        });
    };


    update(req,res) {
        const query = "UPDATE `tags` SET `name`= '"+req.body.name+"' WHERE `tags`.`id` = "+req.body.id+";";
        return new Promise((resolve, reject)=>{
            db.query(query, null, function (data, error) {
                (!error) ? resolve(data) : reject(error);
            });
        });
    };

    delete(req,res) {
        const query = 'DELETE FROM `tags` WHERE `tags`.`id` = '+req.body.id+';';
        return new Promise((resolve, reject)=>{
            db.query(query, null, function (data, error) {
                (!error) ? resolve(data) : reject(error);
            });
        });
    };
}


module.exports = new Tag();