const mongoose = require('mongoose');

const documentUserSchema = new mongoose.Schema({
    documentId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    socketId: {
        type: [String],
        required: true
    },
    lastActiveTime: {
        type: Date,
        required: true
    },
    online: {
        type: Boolean
    }
});

module.exports = documentUserSchema;
