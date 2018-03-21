const db = require('../dbPool');

class Tag {

    getTagsId(tagsArray){
        for (const key in tagsArray) {
            console.log(tagsArray[key].name);
        }
    };

    create(req,res) {
        const query = 'INSERT INTO tags (`id`, `name`) VALUES (null, "'+req.body.name+'");';
        db.query(query, null, function (data, error) {
            if(!error) {
                res.json({'code' : 200, 'message' : data});
            } else {
                res.json({'code' : 400, 'message' : error});
            }
        });
    };

    list(req,res) {
        const query = 'SELECT * FROM `suggestions`.`tags`;';
        db.query(query, null, function (data, error) {
            if(!error) {
                res.json({'code' : 200, 'message' : data});
            } else {
                res.json({'code' : 400, 'message' : error});
            }
        });
    };

    get(req,res) {
        const query = 'SELECT * FROM `tags` WHERE `tags`.`id` = '+req.params.id+';';
        db.query(query, null, function (data, error) {
            if(!error) {
                res.json({'code' : 200, 'message' : data});
            } else {
                res.json({'code' : 400, 'message' : error});
            }
        });
    };


    update(req,res) {
        const query = "UPDATE `tags` SET `name`= '"+req.body.name+"' WHERE `tags`.`id` = "+req.body.id+";";
        db.query(query, null, function (data, error) {
            if(!error) {
                res.json({'code' : 200, 'message' : data});
            } else {
                res.json({'code' : 400, 'message' : error});
            }
        });
    };

    delete(req,res) {
        const query = 'DELETE FROM `tags` WHERE `tags`.`id` = '+req.body.id+';';
        db.query(query, null, function (data, error) {
            if(!error) {
                res.json({'code' : 200, 'message' : data});
            } else {
                res.json({'code' : 400, 'message' : error});
            }
        });
    };
}


module.exports = new Tag();