const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    value:{
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const logModel = mongoose.model('logs', logSchema);

module.exports = logModel;