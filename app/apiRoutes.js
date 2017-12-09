let express = require('express');
let router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('called api now: ' + Date.now());
    next();
});

// TODO: html response for /api/
router.get('/', function(req, res) {
    res.send('ask me something...');
});

// giusto per...
router.get('/suggestions', function(req, res) {
    // TODO: chiamare il controller suggestions che chiami i metodi dei models che usa
    res.json({
        test : 'valore'
    });
});

module.exports = router;