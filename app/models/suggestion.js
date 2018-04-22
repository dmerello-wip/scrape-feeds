const db = require('../helpers/dbPool');
const appConfig = require('../config.js');
const tagMdl = require('./tag');


class Suggestion {

    constructor() {
        this.config = [
            {name: 'id', type: 'int'},
            {name: 'title', type: 'shortText'},
            {name: 'description', type: 'longText'},
            {name: 'file', type: 'image'},
            {name: 'url', type: 'url'}
        ];
        this.mandatories = {
            create: ['title', 'description'],
            update: ['id', 'title', 'description'],
            delete: ['id']
        };
    }

    create(data) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO suggestions (`id`, `image`, `description`, `title`) VALUES (null, "' + appConfig.paths.uploads + '/' + data.file + '", "' + data.description + '", "' + data.title + '");';
            db.query(query, null, (data, error) => {
                (!error) ? resolve(data) : reject(error);
            });
        });
    };

    relateToTag(id, idTag) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO suggestions_tags (`id`, `suggestion`, `tag`) VALUES (null, "' + id + '", "' + idTag + '");';
            db.query(query, null, function (data, error) {
                (!error) ? resolve(data) : reject(error);
            });
        });
    };

    updateTags(id, tags) {
        // cycle tags and retrieve tag Id
        for (let tagName of tags) {
            tagMdl.getTagId(tagName)
                .then((tagId) => {
                    // relate Suggestion to each Tag
                    this.relateToTag(id, tagId)
                        .catch((msg) => {
                            res.json({'code': 400, 'message': msg});
                        })
                })
                .catch((getTagIdError) => {
                    res.json({'code': 400, 'message': getTagIdError});
                });
        }
    }

    createAndRelateToTag(postData, tags) {
        return new Promise((resolve, reject) => {
            this.create(postData).then((suggestionData) => {
                let id = (suggestionData.insertId);
                console.log(`created Suggestion id: ${id}`);
                this.updateTags(id, tags);
                resolve(suggestionData);
            });
        });
    }

    updateAndRelateToTag(postData, tags) {
        return new Promise((resolve, reject) => {
            this.update(postData).then(() => {
                console.log(`update Suggestion id: ${postData.id}`);
                this.removeAllTags(postData.id).then(() => {
                    this.updateTags(postData.id, tags);
                    resolve(postData);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }

    getAll(req, res) {
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
            const query = "UPDATE `suggestions` SET `description`= '" + data.description + "',`image`= '" + appConfig.paths.uploads + '/' + data.file + "', `title` = '" + data.title + "' WHERE `suggestions`.`id` = " + data.id + ";";
            db.query(query, null, function (data, error) {
                (!error) ? resolve(data) : reject(error);
            });
        });
    };

    delete(id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM `suggestions` WHERE `suggestions`.`id` = ' + id + ';';
            db.query(query, null, (data, error) => {
                (!error) ? resolve(data) : reject(error);
            });
        });
    };

    removeAllTags(id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM `suggestions_tags` WHERE `suggestion` = '" + id + "'";
            db.query(query, null, function (data, error) {
                (!error) ? resolve(data) : reject(error);
            });
        });
    };


}

module.exports = new Suggestion();