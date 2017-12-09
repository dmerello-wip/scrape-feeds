let express = require('express');
let app = express();

let apiRouting = require('./apiRoutes');
let db = require('./dbHelper');

// serve static files
app.use(express.static(__dirname + '../public'));

// serve api's
app.use('/api', apiRouting);

// serve frontend TODO: html response
app.get('/', function(req, res) {
    res.send('siamo in home');
});


// Connect to MySQL:
db.connect(function(err) {
    if (err) {
        console.log('Unable to connect to MySQL');
        process.exit(1);
    } else {
        console.log('Connected to mysql');
    }
});

app.listen(3000, function () {
    console.log('Suggestions App listening on port 3000');
});