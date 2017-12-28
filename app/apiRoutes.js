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
router.get('/suggestion/list', suggestion.getAll);
router.post('/suggestion/create', suggestion.create);
router.post('/suggestion/delete', suggestion.delete);


module.exports = router;


