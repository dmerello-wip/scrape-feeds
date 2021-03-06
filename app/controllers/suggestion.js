const SuggestionMdl = require('./../models/suggestion');
const Validator = require('./../helpers/validator');
const Fs = require('fs');


class SuggestionCtrl {

    create(req, res) {

        // data to post:
        let postData = {
            title: req.body.title,
            description: req.body.description,
            file: (req.file) ? req.file.filename : undefined,
            url: (req.body.url)
        };
        let tags = req.body.tags.split(',');
        // TODO: validate tags data

        new Validator(postData, SuggestionMdl.config, SuggestionMdl.mandatories.create)
            .then(() => {
                // create my Suggestion article and join tags
                SuggestionMdl.createAndRelateToTag(postData, tags)
                    .then((suggestionData) => {
                        res.json({'code': 200, 'message': suggestionData});
                    })
                    .catch((errorMessage) => {
                        res.json({'code': 400, 'message': errorMessage});
                    });
            })
            .catch((errorResponse) => {
                res.json({'code': 400, 'message': errorResponse});
            });
    }

    update(req, res) {
        let postData = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            file: req.file.filename
        };
        let tags = req.body.tags.split(',');
        // update my Suggestion article, and related tags

        new Validator(postData, SuggestionMdl.config, SuggestionMdl.mandatories.update)
            .then(() => {
                SuggestionMdl.updateAndRelateToTag(postData, tags)
                    .then((suggestionData) => {
                        res.json({'code': 200, 'message': suggestionData});
                    })
                    .catch((message) => {
                        res.json({'code': 400, 'message': message});
                    });
            })
            .catch((errorResponse) => {
                res.json({'code': 400, 'message': errorResponse});
            });
    }

    delete(req, res) {
        SuggestionMdl.delete(req.body.id)
            .then((suggestionData) => {
                res.json({'code': 200, 'message': suggestionData});
            }).catch((error) => {
            res.json({'code': 400, 'message': error});
        });
    }

    get(req, res) {
        const getPromise = (req.params.id) ? SuggestionMdl.get(req.params.id) : SuggestionMdl.getAll();
        getPromise
            .then((data) => {
               // tags: from string to array:
                for (let item of data) {
                    item.tags =  item.tags.split(',');
                }
                res.json({'code': 200, 'message': data});
            })
            .catch((error) => {
                res.json({'code': 400, 'message': error});
            });
    }

    scrapeFromUrl(req, res) {
        let postData = {
            url: req.body.url,
        };
        new Validator(postData, [{name: 'url', type: 'url'}], ['url'])
            .then(() => {
                SuggestionMdl.scrapeNewSuggestion(postData.url)
                    .then((scrapedData) => {
                        res.json({'code': 200, 'message': scrapedData});
                    }).catch((scraperErrors) => {
                    console.dir(scraperErrors);
                        res.json({
                            'code': 400,
                            'message': [{
                                name : 'form',
                                status: false,
                                message: 'error in scraping url ...'
                            }]
                        });
                    });
            })
            .catch((validationErrors) => {
                res.json({'code': 400, 'message': validationErrors});
            });
    }


}


module.exports = new SuggestionCtrl();