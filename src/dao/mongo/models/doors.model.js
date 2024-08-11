const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema para la colección de diseños
const DesignSchema = new Schema({
    name: String,
    slug: String
});

// Esquema para los tipos de puertas
const DoorTypeSchema = new Schema({
    name: String,
    slug: String,
    colors: [{ type: Schema.Types.ObjectId, ref: 'Color' }], // Referencia a la colección de colores
    designs: [{ type: Schema.Types.ObjectId, ref: 'Design' }] // Referencia a la colección de diseños
});

// Esquema para las aperturas
const OpeningSchema = new Schema({
    name: String,
    slug: String,
    types: [DoorTypeSchema], // Arreglo de tipos de puertas
    colors: [{ type: Schema.Types.ObjectId, ref: 'Color' }], // Para el caso de puertas corredizas
    designs: [{ type: Schema.Types.ObjectId, ref: 'Design' }] // Para el caso de puertas corredizas
});

// Esquema para las puertas
const DoorSchema = new Schema({
    opening: [OpeningSchema] // Arreglo de aperturas
});

// Creación de los modelos
const Design = mongoose.model('Design', DesignSchema);
const Door = mongoose.model('Door', DoorSchema);

module.exports = { Color, Design, Door };
