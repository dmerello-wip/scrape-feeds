let mysql = require('mysql');


const mysqlPool = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : 'nimda',
    database : 'suggestions',
    debug    :  false
});


exports.use = function(req,res, query) {
    console.log('query: \n'+query);
    mysqlPool.getConnection(function(err,connection){

        if (err) {
            connection.release();
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        console.log('mysql connection as id ' + connection.threadId);

        connection.query(query,function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }
        });

        connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        });
    });
}

