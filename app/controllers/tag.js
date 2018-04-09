const tagMdl = require('./../models/tag');


class TagCtrl {

    get(req, res){
        tagMdl.getAll()
            .then((tagsData) => {
                res.json({ 'code': 200, 'message': tagsData });
            })
            .catch((error) => {
                res.json({ 'code': 400, 'message': error });
            });
    }

}


module.exports = new TagCtrl();