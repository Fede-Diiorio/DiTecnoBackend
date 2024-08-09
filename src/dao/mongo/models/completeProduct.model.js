const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    product: {
        type: String,
        enum: ['puerta', 'ventana'],
        required: true
    },
    opening: {
        type: String,
        required: true,
        enum: ['interior', 'exterior', 'corrediza']
    },
    style: {
        type: String,
        enum: ['batiente', 'oscilobatiente', 'banderola', 'upper']
    },
    type: {
        type: String,
    },
    color: {
        type: String,
        required: true,
        enum: ['nogal', 'roble', 'liso']
    },
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
});

module.exports = mongoose.model('Products', schema);