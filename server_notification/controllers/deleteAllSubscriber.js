const mongoose = require('mongoose');
const Subscription = mongoose.model('subscribers');


exports.deleteAllSubscriber = async (req,res) => {
  console.log('delete all subscriber')
  const subscriber= await Subscription.deleteMany({})
  res.json({
    data: 'all subscribers deleted'
  })    
}   
