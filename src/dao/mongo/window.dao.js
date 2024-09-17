import { Windows } from './models/index.js';

export default class WindowDao {
    async getOpenings() {
        return await Windows.find();
    };

    async getStyles(opening) {
        return await Windows.find({ slug: opening }, 'style');
    };

    async getTypes(opening, style) {
        const window = await Windows.findOne(
            { slug: opening, 'style.slug': style },
            { 'style.$': 1 } // Proyecta solo el estilo que coincide
        );

        if (window && window.style.length > 0) {
            return window.style[0].type; // Retorna el arreglo de tipos
        };

        return null; // O maneja el caso en que no haya coincidencia
    };
};