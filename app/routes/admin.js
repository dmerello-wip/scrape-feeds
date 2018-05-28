const express = require('express');
const adminRouter = express.Router();
const passport = require('passport');
const auth = require('./../auth');


adminRouter.get('/*', (req, res) => {
    if (req.session.token) {
        res.redirect('/dashboard');
    } else {
        res.redirect('/error');
    }
});

adminRouter.get('/auth/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});



module.exports = adminRouter;


