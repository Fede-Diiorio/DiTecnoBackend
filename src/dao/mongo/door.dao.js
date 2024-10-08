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

    async getTypeSpecification(openingSlug, styleSlug, typeSlug) {
        const door = await Doors.findOne(
            {
                slug: openingSlug, // Filtra por la apertura (openingSlug)
                "style.slug": styleSlug, // Filtra por el estilo (styleSlug)
                "style.type.slug": typeSlug // Filtra por el tipo (typeSlug)
            },
            {
                "style.$": 1 // Proyecta solo el array de estilos coincidente
            }
        );

        // Si se encontró el documento
        if (door && door.style.length > 0) {
            const matchingStyle = door.style[0];
            // Busca el tipo específico dentro del estilo
            const matchingType = matchingStyle.type.find(t => t.slug === typeSlug);

            // Si se encuentra el tipo, lo devuelve
            if (matchingType) {
                return matchingType;
            }
        }

        // Si no se encuentra el tipo, retorna null
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

    async getDesignsSpecification(openingSlug, styleSlug, typeSlug, designSlug) {
        const door = await Doors.aggregate([
            {
                $match: { slug: openingSlug } // Filtra por apertura (openingSlug)
            },
            {
                $unwind: "$style" // Descompone el array de estilo
            },
            {
                $match: { "style.slug": styleSlug } // Filtra por estilo (styleSlug)
            },
            {
                $unwind: "$style.type" // Descompone el array de tipo
            },
            {
                $match: { "style.type.slug": typeSlug } // Filtra por tipo (typeSlug)
            },
            {
                $unwind: "$style.type.design" // Descompone la primera capa del array de diseño
            },
            {
                $unwind: "$style.type.design" // Descompone la segunda capa del array de diseño
            },
            {
                $match: { "style.type.design.slug": designSlug } // Filtra por diseño (designSlug)
            },
            {
                $project: {
                    "style.type.design": 1,  // Proyecta el campo de diseño completo
                    "_id": 0  // Excluye el _id del resultado
                }
            }
        ]);

        if (door.length > 0) {
            return door[0].style.type.design; // Retorna el diseño encontrado
        };

        return null; // Retorna null si no encuentra el diseño
    };

};