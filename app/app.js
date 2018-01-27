const express = require('express');
/*const upload = multer({ dest: 'uploads/' });*/

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({ storage: storage })


const app = express();


app.post('/test', upload.any(), function (req, res, next) {
    console.log(req.file);
    console.log(req.files);
    console.log(req.body);
});

const apiRouting = require('./apiRoutes');

// FRONTEND: serve static files
app.use(express.static('public'));

app.use('/api', apiRouting);


module.exports = app;


