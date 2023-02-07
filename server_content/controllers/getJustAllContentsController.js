const db = require('../models/index');
const Content = db.content;
const Op = db.sequelize.Op;

exports.getJustAllContents = (req, res) => {
    Content
        .findAll({
            order : [["createdAt", "DESC"]],
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Retrieve content failure. (id: ' + id + ')'
            });
        });
};