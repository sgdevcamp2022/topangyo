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
                console.log("here")
                let users;
                let geturl = 'http://localhost:4100/match/membersList/'
                axios({
                    method: 'post',
                    url: geturl,
                    data: {
                        room: id,
                    }
                })
                .then(function(response){
                    users = response.data.membersList.members;
                    console.log(users);
                    for(let i in users){
                        console.log(users[i]); 
                        axios({
                            method: 'post',
                            url: `http://127.0.0.1:3800/push/${users[i]}`,
                            data: {
                                title: '매칭',
                                message: '요청하신 매칭이 완료되었습니다. 채팅을 나누어보세요~',
                                url: 'chat',
                                icon: ''
                            }
                        })
                    }
                })
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