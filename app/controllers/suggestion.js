const suggestionMdl = require('./../models/suggestion');
const tagMdl = require('./../models/tag');
const Validator = require('./../helpers/validator');


class SuggestionCtrl {

    createSuggestion(req, res) {
        // data to post:
        let postData = {
            title: req.body.title,
            description: req.body.description,
            file: req.file.filename
        };
        let tags = req.body.tags.split(',');

        // Validate Suggestions data
        let validation = new Validator(postData, suggestionMdl.config());
        console.log(validation.messages);
        // TODO: validate tags data


        // create
        // TODO: rendere leggibili sti annidamenti dividendo
        suggestionMdl.create(postData, function (status, msg) {
            if (!status) {
                res.json({ 'code': 400, 'message': msg });
            } else {
                let id = (msg.insertId);
                console.log(`created Suggestion id: ${id}`);
                for (let tagName of tags) {
                    tagMdl.getTagId(tagName, function (tagId) {
                        if (status) {
                            suggestionMdl.relateToTag(id, tagId, function (status, msg) {
                                if (!status) {
                                    res.json({ 'code': 400, 'message': msg });
                                }
                            });
                        } else {
                            res.json({ 'code': 400, 'message': msg });
                        }
                    });
                }
                res.json({ 'code': 200, 'message': msg });
            }
        });

    };

    updateSuggestion(req, res) {
        suggestionMdl.update(req, res, {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            file: req.file.filename
        });
    };

}


module.exports = new SuggestionCtrl();