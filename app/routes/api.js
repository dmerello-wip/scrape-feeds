const express = require('express');
const suggestionCtrl = require('./../controllers/suggestion');
const tagCtrl = require('./../controllers/tag');
const router = express.Router();


/* ------------------------------------------------------ */
// API Routing configuration:
/* ------------------------------------------------------ */

router.use(function timeLog(req, res, next) {
    console.log('called api routing: ' + Date.now());
    next();
});

router.get('/', function(req, res) {
    res.send('ask me something...');
});


/* ------------------------------------------------------ */
// API for Suggestions
/* ------------------------------------------------------ */



router.get('/suggestion/get', suggestionCtrl.get);
router.get('/suggestion/get/:id', suggestionCtrl.get);


/* ------------------------------------------------------ */
// API for Tags
/* ------------------------------------------------------ */


router.get('/tag/get', tagCtrl.get);


module.exports = router;


