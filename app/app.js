const express = require('express');
const app = express();
const apiRouting = require('./routes/api');
const adminRouting = require('./routes/admin');
var parseurl = require('parseurl');
const session = require('express-session');
let fs = require('fs');
const Import = require('./controllers/import');




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

/* ------------------------------------------------------ */
// IMPORT: create a cycle and import from file (no tags)
/* ------------------------------------------------------ */


app.use('/import', ()=>{
  const data = JSON.parse(fs.readFileSync('import.json', 'utf8'));
  let i = new Import(data.articles);
});


module.exports = app;
