const WindowDao = require('../dao/mongo/window.dao');
const ColorDao = require('../dao/mongo/color.dao');
const { OpeningsDTO, StylesDTO, TypeDTO, ColorOrDesignDTO } = require('../dto');
const { CustomError } = require('../utils/customErrors');

class WindowRepository {
    #windowDao;
    #colorDao;

    constructor() {
        this.#windowDao = new WindowDao();
        this.#colorDao = new ColorDao();
    };

    async getOpenings() {
        try {

            const openings = await this.#windowDao.getOpenings();
            const openingsPayload = openings.map(opening => new OpeningsDTO(opening));
            return openingsPayload;

        } catch (error) {
            throw CustomError.createError({
                name: error.name || 'Error en las aberturas.',
                cause: error.cause || 'Ocurrió un error al procesar su solicitud y no se pudieron cargar los datos de forma correcta.',
                message: error.message || 'La petición realizada no pudo ser completada debido a un error en la solicitud.',
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
                    cause: 'Hubo un error al intentar procesar su solicitud porque el estilo de avertuna no existe.',
                    message: 'No existen estilos en la abertura solicitada',
                    status: 404
                });
            };

            const stylesPayload = new StylesDTO(styles[0]);

            if (!stylesPayload || stylesPayload.length === 0) {
                throw CustomError.createError({
                    name: 'Error en la petición.',
                    cause: 'Ocurrió un error al obtener los estilos, es posible que el estilo de apertura que buscas no exista.',
                    message: 'No se pudo obtener ningún estilo de la base de datos.',
                    status: 404
                });
            };

            return stylesPayload;

        } catch (error) {
            throw CustomError.createError({
                name: error.name || 'Error en estilo de aberturas.',
                cause: error.cause || 'Ocurrió un error al procesar su solicitud y no se pudieron cargar los datos de forma correcta.',
                message: error.message || 'La petición realizada no pudo ser completada debido a un error en la solicitud.',
                status: error.status || 500
            });
        };
    };

    async getTypes(opening, style) {
        try {
            const types = await this.#windowDao.getTypes(opening, style);

            if (types.length === 0) {
                throw CustomError.createError({
                    name: 'Parámetro inválido.',
                    cause: 'Hubo un error al intentar procesar su solicitud porque el tipo de avertuna no existe.',
                    message: 'No existen tipos en el estilo de abertura solicitada',
                    status: 404
                });
            };

            const typesPayload = types.map(type => new TypeDTO(type));

            if (!typesPayload || typesPayload.length === 0) {
                throw CustomError.createError({
                    name: 'Error en la petición.',
                    cause: 'Ocurrió un error al obtener los estilos, es posible que el tipo de apertura que buscas no exista.',
                    message: 'No se pudo obtener ningún tipo de abertura de la base de datos.',
                    status: 404
                });
            };

            return typesPayload;

        } catch (error) {
            throw CustomError.createError({
                name: error.name || 'Error en tipo de aberturas.',
                cause: error.cause || 'Ocurrió un error al procesar su solicitud y no se pudieron cargar los datos de forma correcta.',
                message: error.message || 'La petición realizada no pudo ser completada debido a un error en la solicitud.',
                status: error.status || 500
            });
        };
    };

    async getTypeName(opening, style, type) {
        const types = await this.getTypes(opening, style);
        for (const typeName of types) {
            if (typeName.slug === type) {
                return typeName.name;
            };
        };
    };

    async getWindowImage(opening, style, type) {
        const types = await this.getTypes(opening, style);
        for (const typeImage of types) {
            if (typeImage.slug === type) {
                return typeImage;
            };
        };
    };

    async getColors(opening, style, type) {
        try {
            if (!opening || !style || !type) {
                throw CustomError.createError({
                    name: 'Error en la petición.',
                    cause: 'No proporcionó datos suficientes relacionados a la apertura, con lo que la operación no se puede concluir.',
                    message: 'Debe incluir una abertura válida en la URL.',
                    status: 404
                });
            };

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

module.exports = { WindowRepository };