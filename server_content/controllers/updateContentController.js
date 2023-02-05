const db = require('../models/index');
const Content = db.content;
const Op = db.sequelize.Op;

exports.updateContent = (req, res) => {
    const id = req.params.id;
    const condition = id ? { where: { postPK: id } } : null;

    if(req.body.memberLimit && typeof req.body.memberLimit !== "number"){
        return res.sendStatus(400).send({
            message: 'memeberLimit must be number'
        })
    }

    Content
        .update(
            req.body,
            condition
        )
        .then(resultCount => {
            if (resultCount == 1) {
                res.send({
                    message: 'content updated.'
                });
            } else {
                res.send({
                    message: 'Cannot update content. (id: ' + id + ')'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Update content failure. (id: ' + id + ')'
            });
        });
};