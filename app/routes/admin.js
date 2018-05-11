const express = require('express');
const adminRouter = express.Router();
const passport = require('passport');
const auth = require('./../auth');


// TODO: session is not consinstent from routers
// try this: https://expressjs.com/en/resources/middleware/session.html

adminRouter.get('/', (req, res) => {
    console.log('a /admin : ');
    if (res.cookie('token')!=='') {
        res.cookie('token', req.session.token);
        res.redirect('/dashboard');
    } else {
        res.cookie('token', '')
        res.redirect('/error');
    }
});

adminRouter.get('/auth/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});



module.exports = adminRouter;


