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
router.get('/test', function(req, res) {
    res.json({
        test : 'valore'
    });
});

module.exports = router;