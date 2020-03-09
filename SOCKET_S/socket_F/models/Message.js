const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'chat',
        required: true
    },
})

module.exports = mongoose.model('message', MessageSchema)
