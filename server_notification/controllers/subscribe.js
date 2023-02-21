const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Subscription = mongoose.model('subscribers');

let userid;

router.post('/:id', async (req, res) => {
    userid = req.params.id;
    console.log(`userid is: ${userid}`);
    res.json({
        data: 'UserId saved.'  
    });
});

router.post('/', async (req, res) => {
    console.log(userid)
    const model = {"id":userid,"endpoint":req.body.endpoint,"keys":{"p256dh":req.body.keys.p256dh,"auth":req.body.keys.auth}}
    console.log(model)
    const subscriptionModel = new Subscription(model);
    subscriptionModel.save((err, subscription) => {
        if (err) {
            console.error(`Error occurred while saving subscription. Err: ${err}`);
            res.status(500).json({
                error: 'Technical error occurred'
            });
        } else {
            res.json({
                data: 'Subscription saved.'
            });
        }
    });
});

router.get('/', (req, res) => {
            res.json({
                data: 'Invalid Request Bad'
            });
});
module.exports = router;