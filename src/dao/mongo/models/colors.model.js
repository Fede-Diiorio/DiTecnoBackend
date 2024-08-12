const mongoose = require('mongoose');
const { Schema } = mongoose;

const ColorSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true }
});

module.exports = mongoose.model('Color', ColorSchema, "colors");