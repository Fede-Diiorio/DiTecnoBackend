import { Doors } from './models/index.js';

export default class DoorDao {
    async getOpenings() {
        return await Doors.find();
    };

    async getStyles(opening) {
        return await Doors.find({ slug: opening }, 'style');
    };

    async getTypes(opening, style) {
        const door = await Doors.findOne(
            { slug: opening, 'style.slug': style },
            { 'style.$': 1 }
        );

        if (door && door.style.length > 0) {
            return door.style[0].type;
        };

        return null;
    };

    async getDesigns(opening, styleSlug, typeSlug) {
        const door = await Doors.aggregate([
            {
                $match: { slug: opening } // Filtra por apertura (opening)
            },
            {
                $unwind: "$style" // Descomponer el array de estilo
            },
            {
                $match: { "style.slug": styleSlug } // Filtra por estilo (styleSlug)
            },
            {
                $unwind: "$style.type" // Descomponer el array de tipo
            },
            {
                $match: { "style.type.slug": typeSlug } // Filtra por tipo (typeSlug)
            },
            {
                $project: {
                    "style.type.design": 1,  // Proyecta solo el campo de diseño
                    "_id": 1  // Incluye explícitamente el _id
                }
            }
        ]);

        if (door.length > 0 && door[0].style.type.design) {
            return door[0].style.type.design; // Retorna el diseño encontrado
        };

        return null;

    };

};