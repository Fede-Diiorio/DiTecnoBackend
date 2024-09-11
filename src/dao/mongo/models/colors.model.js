import mongoose from 'mongoose';

const { Schema } = mongoose;

const ColorSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true }
});

export default mongoose.model('Color', ColorSchema, "colors");
