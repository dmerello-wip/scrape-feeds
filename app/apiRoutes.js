var express = require('express');

var suggestion = require('./models/suggestion');

var router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('called api now: ' + Date.now());
    next();
});

router.get('/', function(req, res) {
    res.send('ask me something...');
});

// Suggestions
router.get('/suggestion/get', suggestion.list);
router.get('/suggestion/get/:id', suggestion.get);
router.post('/suggestion/create', suggestion.create);
router.post('/suggestion/update', suggestion.update);
router.post('/suggestion/delete', suggestion.delete);


module.exports = router;


