let app = require('./app/app');


let https = require('https');
let fs = require('fs');

let key = fs.readFileSync('./server.key');
let cert = fs.readFileSync( './server.crt' );
let ca = fs.readFileSync( './server.crt' );

let options = {
    key: key,
    cert: cert,
    ca: ca
};

https.createServer(options, app).listen(3043, function () {
    console.log('app started');
});

app.use(function(req, res, next) {
    if (req.secure) {
        next();
    } else {
        res.redirect('https://' + req.headers.host + req.url);
    }
});