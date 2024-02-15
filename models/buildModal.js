const mongoose = require('mongoose');

const buildSchema = new mongoose.Schema({
    CPU: {
        type: String,
        required: true
    },
    motherboard: {
        type: String,
        required: true
    },
    RAM: {
        type: String,
        required: true
    },
    storage: {
        type: String,
        required: true
    },
    GPU: {
        type: String,
        required: true
    },
    PSU: {
        type: String,
        required: true
    },
    case: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Build = mongoose.model('Build', buildSchema);

module.exports = Build;
