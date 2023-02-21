const mongoose = require('mongoose');
const Notification= mongoose.model('notification');

exports.getAllNotification = async (req,res) => {
  console.log('get all notifications')
  const notification = await Notification.find({})
  res.json({
    notification
  })
}