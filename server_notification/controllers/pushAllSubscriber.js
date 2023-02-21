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

exports.pushAllSubscriber = async (req,res) => {
    console.log('push all subscriber')
    const payload = {
        id:'',
        title: req.body.title,
        message: req.body.message,
        url: req.body.url,
        icon: req.body.icon
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
                    
                    console.log(payload.id)
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
                            subject: 'http://localhost:3000',
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
                data: 'All Push triggered'
            });
        }
    });
};