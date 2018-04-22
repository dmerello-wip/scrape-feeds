const SuggestionMdl = require('./../models/suggestion');
const Validator = require('./../helpers/validator');


class SuggestionCtrl {

    create(req, res) {
        // data to post:
        let postData = {
            title: req.body.title,
            description: req.body.description,
            file: (req.file) ? req.file.filename : undefined
        };
        let tags = req.body.tags.split(',');

        // TODO: validate tags data
        // TODO: Validate Suggestions data
        new Validator(postData, SuggestionMdl.config, SuggestionMdl.mandatories.create)
            .then(() => {
                // create my Suggestion article and join tags
                SuggestionMdl.createAndRelateToTag(postData, tags)
                    .then((suggestionData) => {
                        res.json({ 'code': 200, 'message': suggestionData });
                    })
                    .catch((message) => {
                        res.json({ 'code': 400, 'message': message });
                    });
            }).catch(() => {
            console.log('validazione andata male');
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
        SuggestionMdl.updateAndRelateToTag(postData, tags)
            .then((suggestionData) => {
                res.json({'code': 200, 'message': suggestionData});
            })
            .catch((message) => {
                res.json({'code': 400, 'message': message});
            });
    };

    delete(req, res) {
        SuggestionMdl.delete(req.body.id)
            .then((suggestionData) => {
                res.json({'code': 200, 'message': suggestionData});
            }).catch((error) => {
            res.json({'code': 400, 'message': error});
        });
    };

    get(req, res) {
        if (req.params.id) {
            SuggestionMdl.get(req.params.id)
                .then((suggestionData) => {
                    res.json({'code': 200, 'message': suggestionData});
                })
                .catch((error) => {
                    res.json({'code': 400, 'message': error});
                });
        } else {
            SuggestionMdl.getAll()
                .then((data) => {
                    res.json({'code': 200, 'message': data});
                })
                .catch((error) => {
                    res.json({'code': 400, 'message': error});
                });
        }
    };


}


module.exports = new SuggestionCtrl();