const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Subscription = mongoose.model('subscribers');

router.post('/', async (req, res) => {
    const subscriptionModel = new Subscription(req.body);
    console.log(subscriptionModel)
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

router.post('/unsubscribe', (req, res) => {
    const subscriptionModel = new Subscription(req.body);
    subscriptionModel.delete((err, subscription) => {
        if (err) {
            console.error(`Error occurred while saving subscription. Err: ${err}`);
            res.status(500).json({
                error: 'Technical error occurred'
            });
        } else {
            res.json({
                data: 'your subscribe is deleted.'
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