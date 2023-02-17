const express = require('express');
const router = express.Router();
const verifyJwtToken = require("../middlewares/verifyJwtToken");

const HandlepushAllSubscriber =require('../controllers/pushAllSubscriber');
const HandleGetAllnotification =require('../controllers/getAllNotification');
const HandleGetUsernotification = require('../controllers/getUserNotification');
const HandlepushSpeicificSubscriber = require('../controllers/pushSpecificSubscriber');
const HandleDeleteUsernotification = require('../controllers/deleteUserNotification');
router.post('/push/:id',HandlepushSpeicificSubscriber.pushSpecificSubscriber);
router.post('/push',HandlepushAllSubscriber.pushAllSubscriber);
router.get('/notifications',HandleGetAllnotification.getAllNotification);
router.get('/notifications/:id',HandleGetUsernotification.getUserNotification);
router.delete('/notifications/:id',HandleGetUsernotification.getUserNotification);
router.get('/')


module.exports =router;