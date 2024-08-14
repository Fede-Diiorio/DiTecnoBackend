const mongoose = require('mongoose');
const { Schema } = mongoose;

const DesingSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true }
});

module.exports = mongoose.model('Design', DesingSchema, "designs");