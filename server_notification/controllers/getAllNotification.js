const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { async } = require('q');
const Subscription = mongoose.model('subscribers');
const Notification= mongoose.model('notification');

exports.getAllNotification = async (req,res) => {
  console.log('get all notifications')
  const notification = await Notification.find({})
  res.json({
    notification
  })
}