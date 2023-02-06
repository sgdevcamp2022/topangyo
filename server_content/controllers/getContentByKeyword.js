const db = require('../models/index');
const Content = db.content;
const Op = db.sequelize.Op;

exports.getKeywordContents = (req, res) => {
    console.log("category");
    const pageSize = 5;
    let pageNum = req.query.page;
    let category = req.query.category;
    console.log(pageNum);
    console.log(category);
    
    let condition = { where: { category : category }, order : [["createdAt", "DESC"]],
                    limit: pageSize, offset: pageSize*(pageNum-1)};

    Content
        .findAll(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Retrieve all content failure.'
            });
        });
};