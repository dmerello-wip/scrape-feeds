const SuggestionMdl = require('./../models/suggestion');
const Validator = require('./../helpers/validator');
const Scraper = require("scrape-it");


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
        // TODO: Validate Suggestions data
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

        new Validator(postData, SuggestionMdl.config, SuggestionMdl.mandatories.create)
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
    }

    createFromUrl(req, res){
        console.dir(req);
        Scraper(req.body.url, {
            title: "h1",
            desc: ".header h2",
            avatar: {
                selector: "img:eq(0)",
                attr: "src"
            }
        }).then(({ data, response }) => {
            console.log(`Status Code: ${response.statusCode}`)
            res.json({'code': 200, 'message': data});
        })



    }


}


module.exports = new SuggestionCtrl();