const axios = require('axios')
const db = require('../models/index');
const { unsubscribe } = require('../routes/content');
const Content = db.content;
const Op = db.sequelize.Op;

exports.createContent = (req, res) => {
    console.log("imageURL : " + req.body.imageURL);
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: 'Title is empty!'
        });
        return;
    }
    else if (!req.body.description) {
        res.status(400).send({
            message: 'description is empty!'
        });
        return;
    }
    else if (!req.body.category) {
        res.status(400).send({
            message: 'category is empty!'
        });
        return;
    }
    else if (!req.body.memberLimit) {
        res.status(400).send({
            message: 'memberLimit is empty!'
        });
        return;
    }
    else if (!req.body.meetTime) {
        res.status(400).send({
            message: 'meetTime is empty!'
        });
        return;
    }

    else if (!req.body.location_latitude) {
        res.status(400).send({
            message: 'location_latitude is empty!'
        });
        return;
    }
    else if (!req.body.location_longitude) {
        res.status(400).send({
            message: 'location_longtitude is empty!'
        });
        return;
    }

    console.log(req.body.author_id)
    let user;
    let geturl = 'http://localhost:3600/user/users/' + req.body.author_id;
    axios({
        method: 'get',
        url: geturl
    })
        .then(function (response) {
            user = response.data.userInfo;
            //console.log(user);

            let content;
            //imageURL(x)
            if (!req.body.imageURL) {
                content = {
                    title: req.body.title,
                    description: req.body.description,
                    author_name: user.name,
                    author_nickname: user.nickname,
                    author_id: user.id,
                    memberLimit: req.body.memberLimit,
                    category: req.body.category,
                    imageURL: null,
                    meetTime: req.body.meetTime,
                    location_latitude: req.body.location_latitude,
                    location_longitude: req.body.location_longitude,
                };
            }
            //imageURL(o)
            else {
                content = {
                    title: req.body.title,
                    description: req.body.description,
                    author_name: user.name,
                    author_nickname: user.nickname,
                    author_id: user.id,
                    memberLimit: req.body.memberLimit,
                    category: req.body.category,
                    imageURL: req.body.imageURL,
                    meetTime: req.body.meetTime,
                    location_latitude: req.body.location_latitude,
                    location_longitude: req.body.location_longitude,
                };
            }

            Content
                .create(content)
                .then(data => {
                    axios({
                        method: 'post',
                        url: 'http://127.0.0.1:3000/push',
                        data: {
                            title: '알림',
                            message: '컨텐츠 작성했어용',
                            url: 'http://naver.com',
                            icon: '',
                            data: '',
                            tag: ''
                        }
                    })
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'Create content failure.'
                    });
                });

        })
        .catch(function (error) {
            console.log(error);
        });
};