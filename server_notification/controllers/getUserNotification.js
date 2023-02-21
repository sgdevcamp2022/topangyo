const mongoose = require('mongoose');
const Notification= mongoose.model('notification');

exports.getUserNotification = async (req,res) => {
  const id = req.params.id
  console.log('get user notification')
  const usernotification = await Notification.find({id:id})
  res.json({
    usernotification
  })    
}   
