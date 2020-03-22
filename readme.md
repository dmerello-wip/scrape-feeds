## Experimental little feed scraper

    /app            -> Express Js app to manage mysql queries
    /dev_client     -> React Js frontend
    /public         -> static assets

### mysql setup:

set DB in /app/helpers/dbPool.js:

    user     : 'suggestions',
    password : 'suggestions',
    database : 'suggestions',
    
TODO: a decent configuration 
    
### Start and develop

 - _npm install_
 - _npm run start_ to start server
 - _localhost:3043_ to view it
 - _npm run watch_ to develop
