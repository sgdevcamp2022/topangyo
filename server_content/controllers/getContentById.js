const { sequelize } = require('../models/index');
const db = require('../models/index');
const Content = db.content;
const Op = db.sequelize.Op;

exports.getUsetidContents = (req, res) => {
    const pageSize = 5;
    let pageNum = req.query.page;
    let user_id = req.query.id; 

    let condition = {
        raw: true,
        where: { author_id: user_id },
        attributes: [
            'postPK', 'title', 'description', 'author_name', 'author_nickname', 'author_id', 'memberLimit',
            'category', 'imageURL', 'location_latitude', 'location_longitude', 'createdAt', 'meetTime', 'matchingStatus',
        ],
        order: [["createdAt", "DESC"]],
    }

    Content
        .findAll(condition)
        .then(data => {
            var allSize = 0;
            if(data.length != 0){
                allSize = Math.floor((data.length-1)/pageSize + 1);
            }
            const result_data = data.slice(pageSize * (pageNum - 1), pageSize * (pageNum - 1) + pageSize);
            var result = {"allPageNum": allSize, "raws": result_data};
            // data.unshift({"allPageNum": allSize});
            // res.send(data);
            res.send(result);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Retrieve all content failure.'
            });
        });
};