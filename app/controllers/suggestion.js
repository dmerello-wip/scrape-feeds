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

        // TODO: validate tags data
        // TODO: Validate Suggestions data
        // let validation = new Validator(postData, suggestionMdl.config());
        // console.log(validation.messages);

        // create my Suggestion article and join tags
        suggestionMdl.createAndRelateToTag(postData, tags)
            .then((suggestionData) => {
                res.json({ 'code': 200, 'message': suggestionData });
            })
            .catch((message) => {
                res.json({ 'code': 400, 'message': message });
            });
    };

    update(req, res) {
        let postData = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            file: req.file.filename
        };
        let tags = req.body.tags.split(',');
        // update my Suggestion article, and related tags
        suggestionMdl.updateAndRelateToTag(postData, tags)
            .then((suggestionData) => {
                res.json({ 'code': 200, 'message': suggestionData });
            })
            .catch((message) => {
                res.json({ 'code': 400, 'message': message });
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