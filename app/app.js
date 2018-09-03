const express = require('express');
const app = express();
const apiRouting = require('./routes/api');
const adminRouting = require('./routes/admin');
var parseurl = require('parseurl');
const session = require('express-session');



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


module.exports = app;
