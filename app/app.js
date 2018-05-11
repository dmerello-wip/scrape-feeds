const express = require('express');
const app = express();
const apiRouting = require('./routes/api');
const adminRouting = require('./routes/admin');
// passport auth
const passport = require('passport');
const auth = require('./auth');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');


/* ------------------------------------------------------ */
// Google Auth configuration
/* ------------------------------------------------------ */
auth(passport);
app.use(passport.initialize());

app.use(cookieSession({
    name: 'session',
    keys: ['456asd564das6'],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(cookieParser());


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
        failureRedirect: '/error'
    }),
    (req, res) => {
        //console.log(req.user.token);
        console.log('google returned user.token');
        console.dir(req.user);
        req.session.token = req.user.token;
        res.redirect('/admin');
    }
);

module.exports = app;
