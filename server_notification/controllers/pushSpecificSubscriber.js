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

exports.pushSpecificSubscriber = async (req,res) => {
    const payload = {
        id :req.params.id,
        title: req.body.title,
        message: req.body.message,
        url: req.body.url,
        icon: req.body.icon
    };
    const id  = req.params.id;

    Subscription.find({id:id}, async (err, subscriber) => {
        if (err) {
            console.error(`Error occurred while getting subscriptions`);
            res.status(500).json({
                error: 'Technical error occurred'
            });
        } else {
            let parallelSubscriptionCalls = await subscriber.map((subscription) => {
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
                        payload.id=id
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
                data: 'User Push triggered'
            });
        }
    });
};