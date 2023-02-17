const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    id :String,
    title: String,
    message: String,
    url: String,
    icon: String,
    data:String,
    tag: String,
    createDate: {
        type: Date,
        default: Date.now
    }}, 
    {
        versionKey: false
    }
);

mongoose.model('notification', NotificationSchema, 'notification');