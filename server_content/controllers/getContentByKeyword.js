const { sequelize } = require('../models/index');
const db = require('../models/index');
const Content = db.content;
const Op = db.sequelize.Op;

exports.getKeywordContents = (req, res) => {
    const pageSize = 5;
    const distance = 1;
    let pageNum = req.query.page;
    let keyword = req.query.keyword;
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
        raw: true,
        where: {
            [Op.or]: [
              {
                title: {
                  [Op.like]: `%${keyword}%`,
                },
              },
              {
                description: {
                  [Op.like]: `%${keyword}%`,
                },
              },
            ],
          },
        attributes: [
            'postPK', 'title', 'description', 'author_name', 'author_nickname', 'author_id', 'memberLimit',
            'category', 'imageURL', 'location_latitude', 'location_longitude', 'createdAt', 'meetTime',
            [sequelize.literal(haversine), 'distance']
        ],
        having: sequelize.literal(`distance <= ${distance}`),
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