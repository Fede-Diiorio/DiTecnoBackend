const mongoose = require('mongoose');
const { Schema } = mongoose;

const DesingSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true }
});

const Design = mongoose.model('Design', DesingSchema, "designs");

module.exports = Design;
