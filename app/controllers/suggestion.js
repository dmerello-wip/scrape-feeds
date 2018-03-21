const appConfig = require('../config.js');
const suggestionMdl = require('./../models/suggestion');
const tagMdl = require('./../models/tag');

exports.createSuggestion = function(req, res) {
    // data to post:
    let postData = {
        title : req.body.title,
        description : req.body.description,
        file : req.file.filename
    };
    let tags = req.body.tags.split(',');

    // TODO: insertID NON è l'id inserito, ma l'id di transazione mysql
    // trovare il modo di farti tornare l'id inserito

    // create
    suggestionMdl.create( postData , function(status, msg){
        if(!status) {
            res.json({'code' : 400, 'message' : msg});
        } else {
            console.dir(msg);
            let id = (msg.insertId);
            console.log(`created Suggestion id: ${id}`);
            for(let tag of tags){
                tagMdl.create(tag, function(status, msg){
                    if (status) {
                        suggestionMdl.relateToTag(id, msg.insertId, function(status, msg){
                            if (!status) {
                                res.json({'code' : 400, 'message' : msg});
                            }
                        });
                    } else {
                        res.json({'code' : 400, 'message' : msg});
                    }
                });
            }
            res.json({'code' : 200, 'message' : msg});
        }
    });

};

exports.updateSuggestion = function(req, res) {
    suggestionMdl.update(req, res, {
        id : req.body.id,
        title : req.body.title,
        description : req.body.description,
        file : req.file.filename
    });
};