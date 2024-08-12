const WindowDao = require('../dao/mongo/window.dao');
const { SpecificationDTO } = require('../dto/opening.dto');
const { CustomError } = require('../utils/customErrors');

class WindowRepository {
    #windowDao;

    constructor() {
        this.#windowDao = new WindowDao();
    };

    async getOpenings() {
        try {

            const openings = await this.#windowDao.getOpenings();
            const openingsPayload = openings.map(opening => new SpecificationDTO(opening));
            return openingsPayload;

        } catch (error) {
            throw CustomError.createError({
                name: error.name || 'Error en la base de datos.',
                cause: error.cause || 'Error al obtener las opciones de apertura de la base de datos.',
                message: error.message || 'Hubo un error en su solicitud y no se pudieron procesar los tipos de abertura.',
                status: error.status || 500
            });
        };
    };

    async getStyles(opening) {
        try {
            const styles = await this.#windowDao.getStyles(opening);
            console.log(styles);  // Imprime sin el operador de propagación

            const stylesPayload = styles.map(style => new SpecificationDTO(style));
            console.log(stylesPayload);  // Verifica el resultado después del mapeo

            if (stylesPayload.length === 0) {
                throw CustomError.createError({
                    name: 'Error en la petición.',
                    cause: 'Ocurrió un error al obtener los estilos, es posible que el tipo de apertura que buscas no exista.',
                    message: 'No se pudo obtener ningún estilo de la base de datos.',
                    status: 404
                });
            };

            return stylesPayload;

        } catch (error) {
            console.error('Error al obtener estilos:', error);  // Maneja y registra el error
        };
    };

};

module.exports = { WindowRepository };