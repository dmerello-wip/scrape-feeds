const express = require('express');
const suggestionCtrl = require('./../controllers/suggestion');
const tagCtrl = require('./../controllers/tag');
const multer = require('multer');
const router = express.Router();
const appConfig = require('./../config.js');

/* ------------------------------------------------------ */
// File upload Configurations
/* ------------------------------------------------------ */

// TODO: move this in a helper class
// TODO: if i receive a base64 how can I select di extension?

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appConfig.paths.public+'/'+appConfig.paths.uploads)
    },
    filename: function (req, file, cb) {
        let name = file.originalname.split('.')[0];
        let ext = file.originalname.split('.')[1];
        cb(null, name + '-' + Date.now() + ext);
    }
});


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


// parse application/x-www-form-urlencoded

const storeFields = multer({ storage: storage });

router.get('/suggestion/get', suggestionCtrl.get);
router.get('/suggestion/get/:id', suggestionCtrl.get);
router.post('/suggestion/create', storeFields.single('image'), suggestionCtrl.create);
router.post('/suggestion/update', storeFields.single('image'), suggestionCtrl.update);
router.post('/suggestion/delete', storeFields.any(), suggestionCtrl.delete);
router.post('/suggestion/scrape', storeFields.any(), suggestionCtrl.scrapeFromUrl);

/* ------------------------------------------------------ */
// API for Tags
/* ------------------------------------------------------ */

router.get('/tag/get', tagCtrl.get);


module.exports = router;


