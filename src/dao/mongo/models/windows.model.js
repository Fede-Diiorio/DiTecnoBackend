const mongoose = require('mongoose');
const { Schema } = mongoose;

const TypeSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    color: [{ type: Schema.Types.ObjectId, ref: 'Color' }]  // Referencia a la colección Color.
});

const StyleSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    type: [TypeSchema]  // Un estilo tiene una lista de tipos.
});

const OpeningSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    style: [StyleSchema],  // Una apertura tiene una lista de estilos.
    color: [{ type: Schema.Types.ObjectId, ref: 'Color' }]  // Referencia a la colección Color.
});

const WindowsSchema = new Schema({
    opening: [OpeningSchema]  // Un producto tiene una lista de aperturas.
});

const Window = mongoose.model('Window', WindowsSchema, "windows");

module.exports = Window;
