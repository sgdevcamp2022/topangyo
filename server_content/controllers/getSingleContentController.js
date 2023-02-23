const db = require('../models/index');
const Content = db.content;
const Op = db.sequelize.Op;

exports.getSingleContent = (req, res) => {
    const id = req.params.id;

    Content
        .findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Retrieve content failure. (id: ' + id + ')'
            });
        });
};