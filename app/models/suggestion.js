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

    getMandatories(){
        return {
            create : ['title', 'description'],
            update : ['id', 'title', 'description'],
            delete : ['id']
        };
    }

    create(data) {
        const query = 'INSERT INTO suggestions (`id`, `image`, `description`, `title`) VALUES (null, "'+appConfig.paths.uploads+'/'+data.file+'", "'+data.description+'", "'+data.title+'");';
        return new Promise((resolve, reject)=>{
            db.query(query, null, function (data, error) {
                (!error) ? resolve(data) : reject(error) ;
            });
        });
    }

    relateToTag(id, idTag){
        const query = 'INSERT INTO suggestions_tags (`id`, `suggestion`, `tag`) VALUES (null, "'+id+'", "'+idTag+'");';
        return new Promise((resolve, reject)=>{
            db.query(query, null, function (data, error) {
                (!error) ? resolve(data) : reject(error) ;
            });
        });
    }

    list() {
        const query = 'SELECT * FROM `suggestions`.`suggestions`;';
        return new Promise((resolve, reject)=>{
            db.query(query, null, function (data, error) {
                (!error) ? resolve(data) : reject(error) ;
            });
        });
    }

    get(id) {
        const query = 'SELECT * FROM `suggestions` WHERE `suggestions`.`id` = '+id+';';
        return new Promise((resolve, reject)=>{
            db.query(query, null, function (data, error) {
                (!error) ? resolve(data) : reject(error) ;
            });
        });
    }

    update(data) {
        console.log('model update with id: '+data.id);
        const query = "UPDATE `suggestions` SET `description`= '"+data.description+"',`image`= '"+appConfig.paths.uploads+'/'+data.file+"', `title` = '"+data.title+"' WHERE `suggestions`.`id` = "+data.id+";";
        return new Promise((resolve, reject)=>{
            db.query(query, null, function (data, error) {
                (!error) ? resolve(data) : reject(error) ;
            });
        });
    }

    delete(id) {
        const query = 'DELETE FROM `suggestions` WHERE `suggestions`.`id` = '+id+';';
        return new Promise((resolve, reject)=>{
            db.query(query, null, function (data, error) {
                (!error) ? resolve(data) : reject(error) ;
            });
        });
    }

}

module.exports = new Suggestion();