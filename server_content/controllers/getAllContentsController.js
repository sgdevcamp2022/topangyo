const { sequelize } = require('../models/index');
const db = require('../models/index');
const Content = db.content;
const Op = db.sequelize.Op;

exports.getAllContents = (req, res) => {
    const pageSize = 5;
    const distance = 1;
    let pageNum = req.query.page;
    let lat = parseFloat(req.query.lat);
    let lon = parseFloat(req.query.lon);

    const haversine = `(
                            6371 * acos(
                            cos(radians(${lat}))
                            * cos(radians(location_latitude))
                            * cos(radians(location_longitude) - radians(${lon}))
                            + sin(radians(${lat})) * sin(radians(location_latitude))
                            )
                        )`;


    let condition = {
        attributes: [
<<<<<<< HEAD
            'postPK', 'title', 'description', 'author_name', 'author_nickname', 'author_id',
            'category', 'imageURL', 'location_latitude', 'location_longitude', 'createdAt',
=======
            'postPK', 'title', 'description', 'author_name', 'author_nickname', 'author_id', 'memberLimit',
            'category', 'imageURL', 'location_latitude', 'location_longitude', 'createdAt', 'meetTime',
>>>>>>> backend
            [sequelize.literal(haversine), 'distance']
        ],
        having: sequelize.literal(`distance <= ${distance}`),
        order : [["createdAt", "DESC"]],
        limit: pageSize, 
        offset: pageSize*(pageNum-1)
    }

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