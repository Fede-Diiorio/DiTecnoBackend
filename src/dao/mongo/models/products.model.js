const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['puerta', 'ventana']
    },
    openingType: {
        type: String,
        required: true,
        enum: ['interior', 'exterior', 'fija', 'corrediza']
    },
    openingStyle: {
        type: String,
        enum: ['banderola', 'batiente', 'oscilobatiente']
    },
    color: {
        type: String,
        required: true,
        enum: ['roble', 'nogal', 'lisa']
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
});

const Product = mongoose.model('Products', schema, 'products')