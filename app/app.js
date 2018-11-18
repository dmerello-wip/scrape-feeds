const express = require('express');
const app = express();
const apiRouting = require('./routes/api');
const adminRouting = require('./routes/admin');
var parseurl = require('parseurl');
const session = require('express-session');
let fs = require('fs');
const SuggestionMdl = require('./models/suggestion');




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
  console.log(data.articles[0]);
  SuggestionMdl.scrapeNewSuggestion(data.articles[0])
    .then((scrapedData) => {
      SuggestionMdl.create(scrapedData);
      console.log(`imported ${data.articles[0]}`);
    }).catch((scraperErrors) => {
    console.dir(scraperErrors);
  });
});

module.exports = app;
