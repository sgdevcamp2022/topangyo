const { ConnectionAcquireTimeoutError } = require('sequelize');
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

    let allSize = 0;

    let conditionforcount = {
        raw: true,
        attributes: [
            'postPK', 'title', 'description', 'author_name', 'author_nickname', 'author_id', 'memberLimit',
            'category', 'imageURL', 'location_latitude', 'location_longitude', 'createdAt', 'meetTime',
            [sequelize.literal(haversine), 'distance']
        ],
        having: sequelize.literal(`distance <= ${distance}`)
    }

    Content
        .findAll(conditionforcount)
        .then(data => {
            allSize = Math.floor(data.length/pageSize + 1);
            // console.log("1 : ", allSize);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Retrieve all content failure.'
            });
        });


    let condition = {
        raw: true,
        attributes: [
            'postPK', 'title', 'description', 'author_name', 'author_nickname', 'author_id', 'memberLimit',
            'category', 'imageURL', 'location_latitude', 'location_longitude', 'createdAt', 'meetTime',
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
            var result = {"allPageNum": allSize, "raws": data};
            // data.unshift({"allPageNum": allSize});
            // res.send(data);
            // console.log("2 : ",allSize);
            res.send(result);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Retrieve all content failure.'
            });
        });
};