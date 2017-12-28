var mysql = require('mysql');

var mysqlPool = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : 'nimda',
    database : 'suggestions',
    debug    :  false
});

// TODO: non è meglio che ritorni dati e non response Json?
exports.use = function(req,res, query) {
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
                res.json({'code' : 200, 'message' : rows});
                return;
            } else {
                res.json({"code" : 400, "status" : "Error in query"});
                return;
            }
        });

        connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        });
    });
}


