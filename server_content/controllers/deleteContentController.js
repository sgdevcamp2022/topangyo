const db = require('../models/index');
const Content = db.content;
const Op = db.sequelize.Op;

exports.deleteContent = (req, res) => {
    const id = req.params.id;
    const condition = id ? { where: { postPK: id } } : null;

    Content
        .destroy(condition)
        .then(resultCount => {
            if (resultCount == 1) {
                res.send({
                    message: 'content deleted.'
                });
            } else {
                res.send({
                    message: 'Cannot delete content. (id: ' + id + ')'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Delete content failure. (id: ' + id + ')'
            });
        });
};