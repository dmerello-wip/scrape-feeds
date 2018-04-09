const suggestionMdl = require('./../models/suggestion');
const tagMdl = require('./../models/tag');
const Validator = require('./../helpers/validator');


class SuggestionCtrl {

    create(req, res) {
        // data to post:
        let postData = {
            title: req.body.title,
            description: req.body.description,
            file: req.file.filename
        };
        let tags = req.body.tags.split(',');

        // TODO: Validate Suggestions data
        // let validation = new Validator(postData, suggestionMdl.config());
        // console.log(validation.messages);
        // TODO: validate tags data

        // create my Suggestion article
        // TODO: creare una createAndRelate nel model, nn qui
        suggestionMdl.create(postData)
            .then((suggestionData) => {
                let id = (suggestionData.insertId);
                console.log(`created Suggestion id: ${id}`);

                // cycle tags and retrieve tag Id
                for (let tagName of tags) {
                    tagMdl.getTagId(tagName)
                        .then((tagId) => {
                            // relate Suggestion to each Tag
                            suggestionMdl.relateToTag(id, tagId)
                                .catch((msg) => {
                                    res.json({ 'code': 400, 'message': msg });
                                })
                        })
                        .catch((getTagIdError) => {
                            res.json({ 'code': 400, 'message': getTagIdError });
                        });
                }
                // Done!
                res.json({ 'code': 200, 'message': suggestionData });
            })
            .catch((message) => {
                res.json({ 'code': 400, 'message': message });
            });

    };

    update(req, res) {
        suggestionMdl.update({
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            file: req.file.filename
        }).then((suggestionData) => {
            res.json({ 'code': 200, 'message': suggestionData });
        }).catch((error) => {
            res.json({ 'code': 400, 'message': error });
        });
    };

    delete(req, res) {
        suggestionMdl.delete(req.body.id)
            .then((suggestionData) => {
                res.json({ 'code': 200, 'message': suggestionData });
            }).catch((error) => {
            res.json({ 'code': 400, 'message': error });
        });
    };

    get(req, res) {
        if (req.params.id) {
            suggestionMdl.get(req.params.id)
                .then((suggestionData) => {
                    res.json({ 'code': 200, 'message': suggestionData });
                })
                .catch((error) => {
                    res.json({ 'code': 400, 'message': error });
                });
        } else {
            suggestionMdl.getAll()
                .then((data) => {
                    res.json({ 'code': 200, 'message': data });
                })
                .catch((error) => {
                    res.json({ 'code': 400, 'message': error });
                });
        }
    };


}


module.exports = new SuggestionCtrl();