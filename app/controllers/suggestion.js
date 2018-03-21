const appConfig = require('../config.js');
const suggestionMdl = require('./../models/suggestion');
const tagMdl = require('./../models/tag');

exports.createSuggestion = function(req, res) {
    // create post
    suggestionMdl.create({
        title : req.body.title,
        description : req.body.description,
        file : req.file.filename
    }, function(result, message){
        if(result) {
            res.json({'code' : 200, 'message' : message});
        } else {
            res.json({'code' : 400, 'message' : message});
        }
    });
    // retrieve tags ids
    //tagMdl.create(req, res);

};

exports.updateSuggestion = function(req, res) {
    suggestionMdl.update(req, res, {
        id : req.body.id,
        title : req.body.title,
        description : req.body.description,
        file : req.file.filename
    });
};