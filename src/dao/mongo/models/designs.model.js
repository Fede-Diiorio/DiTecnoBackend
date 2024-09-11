import mongoose from 'mongoose';

const { Schema } = mongoose;

const DesingSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true }
});

export default mongoose.model('Design', DesingSchema, 'designs');