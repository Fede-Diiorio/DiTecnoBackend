import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Esquema para los tipos
const TypeSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true },
    casementQuantity: { type: Number, required: true },
});

// Esquema para los estilos
const StyleSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true },
    type: [TypeSchema]
});

// Esquema para las aperturas
const WindowSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    style: [StyleSchema]
});

export default mongoose.model('Window', WindowSchema, 'windows');


