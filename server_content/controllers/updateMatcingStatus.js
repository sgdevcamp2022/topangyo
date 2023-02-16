const db = require('../models/index');
const Content = db.content;
const Op = db.sequelize.Op;

exports.updateMatchingStatus = (req, res) => {
    const id = req.params.id;
    const condition = id ? { where: { postPK: id } } : null;

    Content
        .update(
            {matchingStatus : true},
            condition
        )
        .then(resultCount => {
            if (resultCount == 1) {
                res.send({
                    message: 'matchingStatus updated.'
                });
            } else {
                res.send({
                    message: 'Cannot update matchingStatus. (id: ' + id + ')'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Update matchingStatus failure. (id: ' + id + ')'
            });
        });
};