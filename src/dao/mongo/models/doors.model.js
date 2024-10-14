import mongoose from 'mongoose';

const { Schema } = mongoose;

// Esquema para el diseño (si planeas extenderlo más tarde)
const DesignSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true }
    // Puedes agregar más campos para el diseño aquí si es necesario
});

// Esquema para los tipos de puertas
const TypeSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true },
    casementQuantity: { type: Number, required: true },
    casementName: { type: String, required: true, default: "Medida de hoja [metros]" },
    design: [DesignSchema]  // Asumiendo que 'design' puede tener varios diseños
});

// Esquema para los estilos de puertas
const StyleSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    type: [TypeSchema]  // Un estilo tiene varios tipos
});

// Esquema para las aperturas de puertas
const DoorSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    style: [StyleSchema]  // Una apertura tiene varios estilos
});

export default mongoose.model('Door', DoorSchema, 'doors');
