const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Subscription = mongoose.model('subscribers');
const Notification = mongoose.model('notification');
const q = require('q');
const dotenv =require("dotenv");
const webPush = require('web-push');
const config = require('../config/keys');
const redis = require('redis');
const { async } = require('q');

dotenv.config();

/* 
const redisClient = redis.createClient({ legacyMode: true }); 
redisClient.on('connect', () => {
   console.info('Redis connected!');
});
redisClient.on('error', (err) => {
   console.error('Redis Client Error', err);
});
redisClient.connect().then(); 
const redisCli = redisClient.v4; 
 */

exports.pushAllSubscriber = async (req,res) => {
    console.log('push all subscriber')
    const payload = {
        title: req.body.title,
        message: req.body.message,
        url: req.body.url,
        icon: req.body.icon,
        data: req.body.data,
        tag: req.body.tag
    };

    Subscription.find({}, async (err, subscriptions) => {
        if (err) {
            console.error(`Error occurred while getting subscriptions`);
            res.status(500).json({
                error: 'Technical error occurred'
            });
        } else {
            let parallelSubscriptionCalls = await subscriptions.map((subscription) => {
                return new Promise((resolve, reject) => {
                    const pushSubscription = {
                        endpoint: subscription.endpoint,
                        keys: {
                            p256dh: subscription.keys.p256dh,
                            auth: subscription.keys.auth
                        }
                    };
                    const pushPayload = JSON.stringify(payload);
                    const pushOptions = {
                        vapidDetails: {
                            subject: 'http://example.com',
                            privateKey: config.privateKey,
                            publicKey: config.publicKey
                        },
                        headers: {}
                    };
                    webPush.sendNotification(
                        pushSubscription,
                        pushPayload,
                        pushOptions
                    ).then((value) => {
                        resolve({
                            status: true,
                            endpoint: subscription.endpoint,
                            data: value
                        });
                        Notification.insertMany(payload)
                    }).catch((err) => {
                        reject({
                            status: false,
                            endpoint: subscription.endpoint,
                            data: err
                        });
                    });
                });
            });
            q.allSettled(parallelSubscriptionCalls).then((pushResults) => {
                console.info(pushResults);
            });
            res.json({
                data: 'Push triggered'
            });
        }
    });
};
/* router.post('/', (req, res) => {
    const payload = {
        title: req.body.title,
        message: req.body.message,
        url: req.body.url,
        icon: req.body.icon,
        data: req.body.data,
        tag: req.body.tag
    };
    Subscription.find({}, (err, subscriptions) => {
        if (err) {
            console.error(`Error occurred while getting subscriptions`);
            res.status(500).json({
                error: 'Technical error occurred'
            });
        } else {
            let parallelSubscriptionCalls = subscriptions.map((subscription) => {
                return new Promise((resolve, reject) => {
                    const pushSubscription = {
                        endpoint: subscription.endpoint,
                        keys: {
                            p256dh: subscription.keys.p256dh,
                            auth: subscription.keys.auth
                        }
                    };
                    const pushPayload = JSON.stringify(payload);
                    const pushOptions = {
                        vapidDetails: {
                            subject: 'http://example.com',
                            privateKey: config.privateKey,
                            publicKey: config.publicKey
                        },
                        headers: {}
                    };
                    webPush.sendNotification(
                        pushSubscription,
                        pushPayload,
                        pushOptions
                    ).then((value) => {
                        resolve({
                            status: true,
                            endpoint: subscription.endpoint,
                            data: value
                        });
                        Notification.insertMany(payload)
                    }).catch((err) => {
                        reject({
                            status: false,
                            endpoint: subscription.endpoint,
                            data: err
                        });
                    });
                });
            });
            q.allSettled(parallelSubscriptionCalls).then((pushResults) => {
                console.info(pushResults);
            });
            res.json({
                data: 'Push triggered'
            });
        }
    });
});

router.get('/', (req, res) => {
    res.json({
        data: 'Invalid Request Bad'
    });
});
module.exports = router; */