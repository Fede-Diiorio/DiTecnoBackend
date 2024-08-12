const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema para las aperturas
const TypeSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true }
});

// Esquema para las puertas
const DoorSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    type: [TypeSchema],
});

module.exports = mongoose.model('Door', DoorSchema, 'doors');
