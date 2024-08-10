const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Messenger = new Schema(
    {
        senderId: { type: String },
        receiverId: { type: String },
        text: { type: String },
    },
    {
        collection: 'messenger',
        timestamps: true,
    },
);

module.exports = mongoose.model('Messenger', Messenger);
