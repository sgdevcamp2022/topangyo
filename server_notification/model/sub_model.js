const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriberSchema = new Schema({
   id: String,
   endpoint: String,
   keys: Schema.Types.Mixed,
   createDate: {
       type: Date,
       default: Date.now
   },versionKey: false 
});

mongoose.model('subscribers', SubscriberSchema, 'subscribers');