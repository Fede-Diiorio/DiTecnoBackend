const ColorDao = require('../dao/mongo/color.dao');
const { ColorOrDesignDTO } = require('../dto');

class ColorRepository {

    #colorDao;

    constructor() {
        this.#colorDao = new ColorDao();
    }

    async getColors() {
        try {
            const colors = await this.#colorDao.getColors();
            const colorsPayload = colors.map(color => new ColorOrDesignDTO(color));
            return colorsPayload;

        } catch (error) {
            throw CustomError.createError({
                name: error.name || 'Error en tipo de aberturas.',
                cause: error.cause || 'Ocurrió un error al procesar su solicitud y no se pudieron cargar los datos de forma correcta.',
                message: error.message || 'La petición realizada no pudo ser completada debido a un error en la solicitud.',
                status: error.status || 500
            });
        };
    };
};

module.exports = { ColorRepository };