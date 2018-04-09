const db = require('../helpers/dbPool');
const appConfig = require('../config.js');


class Suggestion {

    config(){
        return [
                {
                    name : 'id',
                    type : 'int'
                },
                {
                    name: 'title',
                    type: 'shortText'
                },
                {
                    name: 'description',
                    type: 'longText'
                },
                {
                    name: 'file',
                    type: 'image'
                },
                {
                    name: 'url',
                    type: 'url'
                }
            ];
    }


    create(data) {
        return new Promise( (resolve, reject) => {
            const query = 'INSERT INTO suggestions (`id`, `image`, `description`, `title`) VALUES (null, "'+appConfig.paths.uploads+'/'+data.file+'", "'+data.description+'", "'+data.title+'");';
            db.query(query, null, (data, error) => {
                (!error) ? resolve(data) : reject(error);
            });
        });
    };

    relateToTag(id, idTag){
        return new Promise( (resolve, reject) => {
            const query = 'INSERT INTO suggestions_tags (`id`, `suggestion`, `tag`) VALUES (null, "' + id + '", "' + idTag + '");';
            db.query(query, null, function (data, error) {
                (!error) ? resolve(data) : reject(error);
            });
        });
    };

    getAll(req,res) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `suggestions`.`suggestions`;';
            db.query(query, null, (data, error) => {
                (!error) ? resolve(data) : reject(error);
            });
        });
    };

    get(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `suggestions` WHERE `suggestions`.`id` = ' + id + ';';
            db.query(query, null, (data, error) => {
                (!error) ? resolve(data) : reject(error);
            });
        });
    };

    update(data) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE `suggestions` SET `description`= '"+data.description+"',`image`= '"+appConfig.paths.uploads+'/'+data.file+"', `title` = '"+data.title+"' WHERE `suggestions`.`id` = "+data.id+";";
            db.query(query, null, function (data, error) {
                (!error) ? resolve(data) : reject(error);
            });
        });
    };

    delete(id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM `suggestions` WHERE `suggestions`.`id` = '+id+';';
            db.query(query, null, (data, error) => {
                (!error) ? resolve(data) : reject(error);
            });
        });
    };


}

module.exports = new Suggestion();