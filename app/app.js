const express = require('express');

const app = express();



const apiRouting = require('./apiRoutes');

// FRONTEND: serve static files
app.use(express.static('public'));

// API: serve api through /api routing
app.use('/api', apiRouting);


module.exports = app;


