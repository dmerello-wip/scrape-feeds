let suggestion = require('./models/suggestion');

let express = require('express');
let router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('called api now: ' + Date.now());
    next();
});

router.get('/', function(req, res) {
    res.send('ask me something...');
});

// Suggestions
router.get('/suggestion/list', function(req, res) {
    res.json(suggestion.getAll());
    /*res.json({
        test : 'valore'
    });*/
});

router.get('/suggestion/create', function(req, res) {
    res.json(suggestion.create(1, 'test di testo'));
    /*res.json({
     test : 'valore'
     });*/
});

module.exports = router;


