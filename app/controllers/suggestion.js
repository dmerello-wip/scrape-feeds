const appConfig = require('../config.js');
const suggestionMdl = require('./../models/suggestion');
const tagMdl = require('./../models/tag');
const Validator = require('./../helpers/validator');


class suggestionCtrl {

    createSuggestion(req, res) {
        // data to post:
        let postData = {
            title: req.body.title,
            description: req.body.description,
            file: req.file.filename
        };
        let tags = req.body.tags.split(',');

        // TODO: Validate Suggestions data
        //let validation = new Validator(postData, suggestionMdl.config());
        //console.log(validation.messages);
        // TODO: validate tags data


        // create
        // TODO: rendere leggibili sti annidamenti dividendo
        suggestionMdl.create(postData).then((data) => {
            let id = (data.insertId);
            console.log(`created Suggestion id: ${id}`);
            for (let tagName of tags) {
                tagMdl.getTagId(tagName).then((tagId) => {
                    suggestionMdl.relateToTag(id, tagId).then((data) => {
                        res.json({'code': 200, 'message': data});
                    }).catch((error) => {
                        res.json({'code': 400, 'message': error});
                    });
                }).catch((error) => {
                    res.json({'code': 400, 'message': error});
                });
            }
            //res.json({'code': 200, 'message': data});
        }).catch((error) => {
            res.json({'code': 400, 'message': error});
        });

    };


    updateSuggestion(req, res) {
        // TODO: update data / remove all related tags / set new tags
        res.json({'code': 400, 'message': 'to be implemented'});
        /*
         suggestionMdl.update(req, res, {
         id: req.body.id,
         title: req.body.title,
         description: req.body.description,
         file: req.file.filename
         });
        */
    };


    get(req, res) {
        if (req.params.id) {
            suggestionMdl.get(req.params.id)
                .then((data) => {
                    res.json({'code': 200, 'message': data});
                }).catch((error) => {
                res.json({'code': 400, 'message': error});
            });
        } else {
            suggestionMdl.list()
                .then((data) => {
                    res.json({'code': 200, 'message': data});
                }).catch((error) => {
                res.json({'code': 400, 'message': error});
            });
        }
    };

    delete(req, res) {
        suggestionMdl.delete(req.params.id)
            .then((data) => {
                res.json({'code': 200, 'message': data});
            }).catch((error) => {
            res.json({'code': 400, 'message': error});
        });
    };

}

module.exports = new suggestionCtrl();