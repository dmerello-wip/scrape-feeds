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
        suggestionMdl.create(postData)
            .then( (suggestionData) => {
                let id = (suggestionData.insertId);
                console.log(`created Suggestion id: ${id}`);
                for (let tagName of tags) {
                    tagMdl.getTagId(tagName)
                        .then( (tagId) => {
                            suggestionMdl.relateToTag(id, tagId)
                                .catch((msg)=>{
                                    res.json({ 'code': 400, 'message': msg });
                                })
                        })
                        .catch( (getTagIdError) => {
                            res.json({ 'code': 400, 'message': getTagIdError });
                        });
                }
                res.json({ 'code': 200, 'message': suggestionData });
            }).catch( (message) => {
                res.json({ 'code': 400, 'message': message });
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