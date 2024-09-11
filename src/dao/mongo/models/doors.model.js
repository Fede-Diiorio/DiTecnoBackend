import mongoose from 'mongoose';

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

export default mongoose.model('Door', DoorSchema, 'doors');
