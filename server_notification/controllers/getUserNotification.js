const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { async } = require('q');
const Subscription = mongoose.model('subscribers');
const Notification= mongoose.model('notification');


exports.getUserNotification = async (req,res) => {
   //const id = Subscription.findById
  console.log('get user notification')
  const usernotification = await Notification.find({_id:id})
  res.json({
    usernotification
  })    
}   

/* 
router.get('/:id', async (req, res) => {
  //const id = Subscription.findById
  const id = req.params.id;
  console.log(id)

  const notification = await Notification.find({_id:id})
  res.json({
    notification
  })
});

router.get('/', async (req, res) => {
    res.json({
        data: 'Invalid Request Bad'
    });
});
module.exports =router; */