const express = require('express');
const app = express();
const apiRouting = require('./routes/api');
const adminRouting = require('./routes/admin');
// passport auth
const passport = require('passport');
const auth = require('./auth');
var parseurl = require('parseurl');
const session = require('express-session');


/* ------------------------------------------------------ */
// Google Auth configuration
/* ------------------------------------------------------ */
auth(passport);
app.use(passport.initialize());



app.use(session({
	secret: 'auth-session',
	resave: false,
	saveUninitialized: true
}))

app.use(function (req, res, next) {
	console.log('test session data: ')
	if(req.session){
		console.dir(req.session);
	} else {
		console.log(' > no passport token');
	}
	next();
});


/* ------------------------------------------------------ */
// FRONTEND: serve static files
/* ------------------------------------------------------ */

app.use(express.static('public'));

/* ------------------------------------------------------ */
// API: serve api through /api routing
/* ------------------------------------------------------ */

app.use('/api', apiRouting);

/* ------------------------------------------------------ */
// ADMIN: serve authenticated
/* ------------------------------------------------------ */

app.use('/admin', adminRouting);

app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    (req, res) => {
        console.log('google returned user.token:');
        console.log(req.user.token);
        console.log('google returned user:');
        console.dir(req.user);
        req.session.token = req.user.token;
        res.redirect('/dashboard');
    }
);

module.exports = app;
