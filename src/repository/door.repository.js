import DoorDao from '../dao/mongo/door.dao.js';
import { OpeningsDTO, DoorStyleDTO, TypeDTO, DesignDTO, DoorModelDTO } from '../dto/index.js';
import CustomError from '../utils/customErrors.js';

export default class DoorRepository {
    #doorDao;

    constructor() {
        this.#doorDao = new DoorDao();
    };

    async getOpenings() {
        try {

            const openings = await this.#doorDao.getOpenings();
            const openingsPayload = openings.map(opening => new OpeningsDTO(opening));
            return openingsPayload;

        } catch (error) {
            throw CustomError.createError({
                name: error.name || 'Error en las aberturas.',
                cause: error.cause || 'Ocurrió un error al procesar su solicitud y no se pudo cargar los datos de forma correcta.',
                message: error.message || 'La petición realizada no pudo ser completada debido a un error en la solicitud.',
                status: error.status || 500
            });
        };
    };

    async getStyles(opening) {
        try {
            const styles = await this.#doorDao.getStyles(opening);

            if (styles.length === 0) {
                throw CustomError.createError({
                    name: 'Parámetro inválido.',
                    cause: 'Hubo un error al intentar procesar su solicitud porque el tipo de abertura no existe.',
                    message: 'No existen tipos en el estilo de abertura solicitada',
                    status: 404
                });
            };

            const stylesPayload = new DoorStyleDTO(styles[0]);

            if (!stylesPayload || stylesPayload.length === 0) {
                throw CustomError.createError({
                    name: 'Error en la petición.',
                    cause: 'Ocurrió un error al obtener los estilos, es posible que el tipo de abertura que buscas no exista.',
                    message: 'No se pudo obtener ningún tipo de abertura de la base de datos.',
                    status: 404
                });
            };

            return stylesPayload;

        } catch (error) {
            throw CustomError.createError({
                name: error.name || 'Error en tipo de aberturas.',
                cause: error.cause || 'Ocurrió un error al procesar su solicitud y no se pudo cargar los datos de forma correcta.',
                message: error.message || 'La petición realizada no pudo ser completada debido a un error en la solicitud.',
                status: error.status || 500
            });
        };
    };

    async getTypes(opening, style) {
        try {
            const types = await this.#doorDao.getTypes(opening, style);

            if (types.length === 0) {
                throw CustomError.createError({
                    name: 'Parámetro inválido.',
                    cause: 'Hubo un error al intentar procesar su solicitud porque el tipo de abertura no existe.',
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
                cause: error.cause || 'Ocurrió un error al procesar su solicitud y no se pudo cargar los datos de forma correcta.',
                message: error.message || 'La petición realizada no pudo ser completada debido a un error en la solicitud.',
                status: error.status || 500
            });
        };
    };

    async getTypeName(opening, type) {
        const types = await this.getTypes(opening);
        for (const typeName of types) {
            if (typeName.slug === type) {
                return typeName.name;
            };
        };
    };

    async getDesigns(opening, style, type) {
        try {
            if (!opening || !style || !type) {
                throw CustomError.createError({
                    name: 'Error en la petición.',
                    cause: 'No proporcionó datos suficientes relacionados a la abertura, con lo que la operación no se puede concluir.',
                    message: 'Debe incluir una abertura válida en la URL.',
                    status: 404
                });
            };

            const designs = await this.#doorDao.getDesigns(opening, style, type);

            if (designs.length === 0) {
                throw CustomError.createError({
                    name: 'Parámetro inválido.',
                    cause: 'Hubo un error al intentar procesar su solicitud porque no se pudo acceder a los diseños de aberturas.',
                    message: 'No existen deseños para asignar a esta abertura.',
                    status: 404
                });
            };

            const designsPayload = new DesignDTO(designs[0]);

            if (!designsPayload || designsPayload.length === 0) {
                throw CustomError.createError({
                    name: 'Error en la petición.',
                    cause: 'Ocurrió un error al obtener los diseños, es posible que el diseño de abertura que buscas no exista.',
                    message: 'No se pudo obtener ningún diseño de abertura de la base de datos.',
                    status: 404
                });
            };

            return designsPayload;

        } catch (error) {
            throw CustomError.createError({
                name: error.name || 'Error en tipo de aberturas.',
                cause: error.cause || 'Ocurrió un error al procesar su solicitud y no se pudo cargar los datos de forma correcta.',
                message: error.message || 'La petición realizada no pudo ser completada debido a un error en la solicitud.',
                status: error.status || 500
            });
        };
    };

    async getDesignsSpecification(opening, style, type, design) {
        try {
            if (!opening || !style || !type || !design) {
                throw CustomError.createError({
                    name: 'Error en la petición.',
                    cause: 'No proporcionó datos suficientes relacionados a la abertura, con lo que la operación no se puede concluir.',
                    message: 'Debe incluir una abertura válida en la URL.',
                    status: 404
                });
            };

            const doorType = await this.#doorDao.getTypeSpecification(opening, style, type);
            const designSpec = await this.#doorDao.getDesignsSpecification(opening, style, type, design);
            const doorModel = new DoorModelDTO(doorType, designSpec);

            return doorModel;

        } catch (error) {
            throw CustomError.createError({
                name: error.name || 'Error en tipo de aberturas.',
                cause: error.cause || 'Ocurrió un error al procesar su solicitud y no se pudo cargar los datos de forma correcta.',
                message: error.message || 'La petición realizada no pudo ser completada debido a un error en la solicitud.',
                status: error.status || 500
            });
        };
    };
};