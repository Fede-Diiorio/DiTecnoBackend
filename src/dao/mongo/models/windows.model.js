const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Esquema para los tipos
const TypeSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    color: [{ type: Schema.Types.ObjectId, ref: 'Color' }]  // Referencia a la colección de colores
});

// Esquema para los estilos
const StyleSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    type: [TypeSchema]
});

// Esquema para las aperturas
const WindowSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    style: [StyleSchema]
});

module.exports = mongoose.model('Window', WindowSchema, 'windows');


