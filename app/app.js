let express = require('express');
let app = express();

let apiRouting = require('./apiRoutes');


// FRONTEND: serve static files
app.use(express.static('public'));

// API: serve api's routes
app.use('/api', apiRouting);


module.exports = app;


