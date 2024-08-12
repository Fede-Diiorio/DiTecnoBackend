const WindowDao = require('../dao/mongo/window.dao');
const { OpeningsDTO, StylesDTO } = require('../dto');
const { CustomError } = require('../utils/customErrors');

class WindowRepository {
    #windowDao;

    constructor() {
        this.#windowDao = new WindowDao();
    };

    async getOpenings() {
        try {

            const openings = await this.#windowDao.getOpenings();
            const openingsPayload = openings.map(opening => new OpeningsDTO(opening));
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

            if (styles.length === 0) {
                throw CustomError.createError({
                    name: 'Parámetro inválido.',
                    cause: 'Hubo un error al intentar procesar su solicitud porque el tipo de avertuna no existe.',
                    message: 'No existen estilos en la abertura solicitada',
                    status: 404
                });
            };

            const stylesPayload = new StylesDTO(styles[0]);

            if (!stylesPayload || stylesPayload.length === 0) {
                throw CustomError.createError({
                    name: 'Error en la petición.',
                    cause: 'Ocurrió un error al obtener los estilos, es posible que el tipo de apertura que buscas no exista.',
                    message: 'No se pudo obtener ningún estilo de la base de datos.',
                    status: 404
                });
            };

            return stylesPayload;

        } catch (error) {
            throw CustomError.createError({
                name: error.name || 'Error en la base de datos.',
                cause: error.cause || 'Error al obtener las opciones de apertura de la base de datos.',
                message: error.message || 'Hubo un error en su solicitud y no se pudieron procesar los tipos de abertura.',
                status: error.status || 500
            });
        };
    };

};

module.exports = { WindowRepository };