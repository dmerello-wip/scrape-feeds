const appConfig = require('../config.js');
const suggestion = require('./../models/suggestion');

exports.createSuggestion = function(req, res) {
    suggestion.create(req, res, {
        title : req.body.title,
        description : req.body.description,
        file : req.file.filename,
\        tags : req.body.tags
    });
};

exports.updateSuggestion = function(req, res) {
    suggestion.update(req, res, {
        id : req.body.id,
        title : req.body.title,
        description : req.body.description,
        file : req.file.filename,
        tags : req.tags
    });
};