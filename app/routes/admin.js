const express = require('express');
const appConfig = require('./../config.js');
const suggestionCtrl = require('./../controllers/suggestion');
const adminRouter = express.Router();
const multer = require('multer');


/* ------------------------------------------------------ */
// File upload Configurations
/* ------------------------------------------------------ */

// TODO: move this in a helper class
// TODO: if i receive a base64 how can I select di extension?


// parse application/x-www-form-urlencoded


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, appConfig.paths.public + '/' + appConfig.paths.uploads)
	},
	filename: function (req, file, cb) {
		let name = file.originalname.split('.')[0];
		let ext = file.originalname.split('.')[1];
		cb(null, name + '-' + Date.now() + ext);
	}
});
const storeFields = multer({storage: storage});



/* ------------------------------------------------------ */
// Admin Api routes
/* ------------------------------------------------------ */

adminRouter.post('/api/suggestion/create', storeFields.single('image'), suggestionCtrl.create);
adminRouter.post('/api/suggestion/update', storeFields.single('image'), suggestionCtrl.update);
adminRouter.post('/api/suggestion/delete', storeFields.any(), suggestionCtrl.delete);
adminRouter.post('/api/suggestion/scrape', storeFields.any(), suggestionCtrl.scrapeFromUrl);

module.exports = adminRouter;


