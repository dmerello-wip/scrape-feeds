const tagMdl = require('./../models/tag');


class tagCtrl {

    get(req, res) {
        tagMdl.list()
            .then((data) => {
                res.json({'code': 200, 'message': data});
            }).catch((error) => {
            res.json({'code': 400, 'message': error});
        });
    };
}

module.exports = new tagCtrl();