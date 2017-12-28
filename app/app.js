var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var apiRouting = require('./apiRoutes');

// FRONTEND: serve static files
app.use(express.static('public'));

// API: use body parser to retrieve post data
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// API: serve api's routes
app.use('/api', apiRouting);


module.exports = app;


