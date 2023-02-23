const db = require('../models/index');
const Content = db.content;
const Op = db.sequelize.Op;

exports.updateRecruitStatus = (req, res) => {
    const id = req.params.id;
    const condition = id ? { where: { postPK: id } } : null;

    Content
        .update(
            {recruitStatus : true},
            condition
        )
        .then(resultCount => {
            if (resultCount == 1) {
                res.send({
                    message: 'recruitStatus updated.'
                });
            } else {
                res.send({
                    message: 'Cannot update recruitStatus. (id: ' + id + ')'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Update recruitStatus failure. (id: ' + id + ')'
            });
        });
};