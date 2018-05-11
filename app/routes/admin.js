const express = require('express');
const adminRouter = express.Router();
const passport = require('passport');
const auth = require('./../auth');


adminRouter.get('/', (req, res) => {
    console.log('a /admin la sessione: ');
    console.log(req.session.token);
    if (req.session.token) {
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


