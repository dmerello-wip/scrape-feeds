let fs = require('fs');
const SuggestionMdl = require('../models/suggestion');

class Import {

  constructor(articles){
    this.articles = articles;
    this.saveArticle(0);
  }

  saveArticle(i){
    let url = this.articles[i];

    SuggestionMdl.scrapeNewSuggestion(url)
      .then((scrapedData) => {
        console.log(`scraped url: ${url}`);
        SuggestionMdl.create(scrapedData).then(() => {
          console.log(`created article from: ${url}`);
          if(i <  this.articles.length) {
            this.saveArticle(i+1);
          }
        }).catch((importErrors)=>{
          console.log(`import error: ${importErrors}`);
        });
      }).catch((scraperErrors) => {
        console.log(`scraping error: ${scraperErrors}`);
    });
  }

}


module.exports = Import;