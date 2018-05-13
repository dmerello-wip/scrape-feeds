let app = require('./app/app');
var https = require('https');
var fs = require('fs');

var key = fs.readFileSync('./server.key');
var cert = fs.readFileSync( './server.crt' );
var ca = fs.readFileSync( './server.crt' );

var options = {
    key: key,
    cert: cert,
    ca: ca
};

https.createServer(options, app).listen(443);

app.use(function(req, res, next) {
    if (req.secure) {
        next();
    } else {
        res.redirect('https://' + req.headers.host + req.url);
    }
});