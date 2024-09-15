import WindowDao from '../dao/mongo/window.dao.js';
import { OpeningsDTO, StylesDTO, TypeDTO } from '../dto/index.js'
import CustomError from '../utils/customErrors.js';

export default class WindowRepository {

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

    async getTypeSpecification(opening, style, type) {
        try {
            const types = await this.getTypes(opening, style);

            for (const typeSpecification of types) {
                if (typeSpecification.slug === type) {
                    return typeSpecification;
                };
            };

            throw CustomError.createError({
                name: 'No hay resultado.',
                cause: 'No se pudo dar con las especificidades de ese tipo, es probable que el producto no exista.',
                message: 'Error en la petición. El producto solicitado no existe.',
                status: 404
            });
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