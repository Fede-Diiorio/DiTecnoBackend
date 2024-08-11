const { CustomError } = require('../utils/customErrors');
const { ProductsDao } = require('../dao/mongo/products.dao');
const { OpeningDao } = require('../dao/mongo/opening.dao');
const { ColorsDao } = require('../dao/mongo/colors.dao');
const { StylesDao } = require('../dao/mongo/styles.dao');
const { TypesDao } = require('../dao/mongo/types.dao');
const { SpecificationDTO } = require('../dto/specifications.dto');

class ProductRepository {

    #productDao;
    #openingDao;
    #colorsDao
    #stylesDao;
    #typesDao;

    constructor() {
        this.#productDao = new ProductsDao();
        this.#openingDao = new OpeningDao();
        this.#colorsDao = new ColorsDao();
        this.#stylesDao = new StylesDao();
        this.#typesDao = new TypesDao();
    }

    async getProducts() {
        try {

            const products = await this.#productDao.getProducts();
            const productsPayload = products.map(i => new SpecificationDTO(i));
            return productsPayload;

        } catch {
            throw CustomError.createError({
                name: 'Error en la base de datos.',
                cause: 'Se ha enviado un valor inválido o el producto no existe.',
                message: 'No se pudo cargar la información de los productos desde la base de datos.',
                status: 500
            });
        }

    };

    async getOpeningTypes(product) {
        try {

            const openings = await this.#openingDao.getOpeningTypes();
            const openingsPayload = openings.map(i => new SpecificationDTO(i));

            if (product === 'ventana' || product === 'puerta') {
                return openingsPayload;
            };

            throw CustomError.createError({
                name: 'Tipo inválido',
                cause: 'El tipo de producto solicitado no es válido.',
                message: 'Debe elegir entre "puerta" o "ventana".',
                status: 400
            });

        } catch (error) {
            throw CustomError.createError({
                name: error.name || 'Error en la base de datos.',
                cause: error.cause || 'Error al obtener las opciones de apertura de la base de datos.',
                message: error.message || 'Hubo un error en su solicitud y no se pudieron procesar los tipos de abertura.',
                status: error.status || 500
            });
        };
    };

    async getColors(product, opening) {
        try {

            if (!product || !opening) {
                throw CustomError.createError({
                    name: 'Petición incompleta.',
                    cause: 'Debe ingresar un producto y una forma de apertura para completar la operación.',
                    message: 'URL inválida.',
                    status: 400
                });
            };

            const colors = await this.#colorsDao.getColors();
            const colorsPayload = colors.map(i => new SpecificationDTO(i));
            return colorsPayload;

        } catch (error) {
            throw CustomError.createError({
                name: error.name || 'Error en la base de datos.',
                cause: error.cause || 'Error al obtener las opciones de apertura de la base de datos.',
                message: error.message || 'Hubo un error en su solicitud y no se pudieron procesar los tipos de abertura.',
                status: error.status || 500
            });
        };
    };

    async getOpeningStyles(product, opening, color) {
        try {
            const openingStyles = await this.#stylesDao.getStyles();
            const openingStylesPayload = openingStyles.map(i => new SpecificationDTO(i));

            if (!color) {
                throw CustomError.createError({
                    name: 'Sin color.',
                    cause: 'Necesita ingresar un color para continuar.',
                    message: 'URL inválida.',
                    status: 400
                });
            };

            if (opening === 'exterior' && product === 'ventana') {
                const validOpeningStyles = openingStylesPayload.filter(i => i.slug === 'proyectante');
                return validOpeningStyles;
            };

            if (opening === 'interior' && product === 'ventana') {
                const validOpeningStyles = openingStylesPayload.filter(i => i.slug !== 'proyectante');
                return validOpeningStyles;
            };

        } catch (error) {
            throw CustomError.createError({
                name: error.name || 'Error en la base de datos.',
                cause: error.cause || 'Error al obtener las opciones de apertura de la base de datos.',
                message: error.message || 'Hubo un error en su solicitud y no se pudieron procesar los tipos de abertura.',
                status: error.status || 500
            });
        };
    };

    async getTypes(product, opening, color, style) {
        try {

            console.log(product, opening, color, style);

            const types = await this.#typesDao.getTypes();
            const typesPayload = types.map(i => new SpecificationDTO(i));

            if (!color) {
                throw CustomError.createError({
                    name: 'Sin color.',
                    cause: 'Necesita ingresar un color para continuar.',
                    message: 'URL inválida.',
                    status: 400
                });
            };

            if (product === 'ventana' && opening === 'interior' && style === 'batiente') {
                const validType = typesPayload.filter(i => i.slug !== 'lateralSuperpuesta' && i.slug !== 'dobleSuperpuesta');
                return validType;
            };

            if (product === 'ventana' && opening === 'interior' && (style === 'oscilobatiente' || style === 'banderola')) {
                const validType = typesPayload.filter(i => i.slug !== 'lateralSuperpuesta' && i.slug !== 'dobleSuperpuesta' && i.slug !== 'superpuesta');
                return validType;
            };

            if (product === 'ventana' && opening === 'exterior' && style === 'proyectante') {
                return typesPayload;
            };

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

module.exports = { ProductRepository };