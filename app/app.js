let express = require('express');
let app = express();

let apiRouting = require('./apiRoutes');
var db = require('./dbHelper.js');


// FRONTEND: serve static files
app.use(express.static('public'));

// API: serve api's routes
app.use('/api', apiRouting);

//connect to db
db.connect(function(err) {
    if (err) {
        console.log('Unable to connect to MySQL');
        process.exit(1);
    } else {
        console.log('Connected to mysql');
    }
});

module.exports = app;


