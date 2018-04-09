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


    getAll() {
        return new Promise((resolve, reject)=>{
            const query = 'SELECT * FROM `suggestions`.`tags`;';
            db.query(query, null, function (data, error) {
                (!error) ? resolve(data) : reject(error);
            });
        });
    };

}


module.exports = new Tag();