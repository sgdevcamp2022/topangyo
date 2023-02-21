const mongoose = require('mongoose');
const Notification= mongoose.model('notification');


exports.deleteAllNotification = async (req,res) => {
  console.log('delete all notification')
  const notification = await Notification.deleteMany({})
  res.json({
    data: 'all notifications deleted'
  })    
}   
