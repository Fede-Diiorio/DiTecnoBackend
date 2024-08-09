const { CustomError } = require('../utils/customErrors');
const { ProductsDao } = require('../dao/mongo/products.dao');
const { OpeningDao } = require('../dao/mongo/opening.dao');
const { StylesDao } = require('../dao/mongo/styles.dao');
const { SpecificationDTO } = require('../dto/specifications.dto');

class ProductRepository {

    #productDao;
    #openingDao;
    #stylesDao;

    constructor() {
        this.#productDao = new ProductsDao();
        this.#openingDao = new OpeningDao();
        this.#stylesDao = new StylesDao();
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

            if (product === 'ventana') {
                return openingsPayload;
            };

            if (product === 'puerta') {
                const validOpenings = openingsPayload.filter(i => i.slug !== 'corrediza');
                return validOpenings;
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

    async getOpeningStyles(product, opening) {
        try {
            const openingStyles = await this.#stylesDao.getStyles();
            const openingStylesPayload = openingStyles.map(i => new SpecificationDTO(i));

            if (opening === 'exterior') {
                const validOpeningStyles = openingStylesPayload.filter(i => i.slug !== 'proyectante');
                return validOpeningStyles;
            };

            if (opening === 'interior') {
                const validOpeningStyles = openingStylesPayload.filter(i => i.slug === 'proyectante');
                return validOpeningStyles;
            };

            return { status: 'Completado' };
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