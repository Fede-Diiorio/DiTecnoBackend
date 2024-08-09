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
            console.log(openingStyles);
            const openingStylesPayload = openingStyles.map(i => new SpecificationDTO(i));

            if (product === 'puerta') {
                throw CustomError.createError({
                    name: 'Producto equivocado.',
                    cause: 'No se pudo procesar su solicitud dado a que las puertas no tienen un estilo de apertura.',
                    message: 'Debe seleccionar una ventana para poder accerder a los estilos de apertura.',
                    status: 400
                });
            };

            if (product !== 'ventana') {
                throw CustomError.createError({
                    name: 'Tipo inválido',
                    cause: 'El tipo de producto solicitado no es válido.',
                    message: 'Debe elegir una ventana.',
                    status: 400
                });
            };

            if (opening === 'exterior') {
                const validOpeningStyles = openingStylesPayload.filter(i => i.slug !== 'proyectante');
                return validOpeningStyles;
            };

            if (opening === 'interior') {
                const validOpeningStyles = openingStylesPayload.filter(i => i.slug === 'proyectante');
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

    #validateParams(type, openingType, openingStyle, color, width, height, quantity) {
        if (type !== 'puerta' || type !== 'ventana') {
            throw CustomError.createError({
                name: 'Producto incorrecto.',
                cause: 'Se ha enviado un valor inválido y el producto no puede ser generado.',
                message: 'El producto debe ser una puerta o una ventana.',
                status: 400
            });
        };

        if (openingType !== 'interior' || openingType !== 'exterior' || openingType !== 'corrediza' || openingType !== 'fija') {
            throw CustomError.createError({
                name: 'Opción inválida.',
                cause: 'Se ha enviado un valor inválido y el producto no puede ser generado.',
                message: 'Debe elegir un tipo de apertura válido.',
                status: 400
            });
        };

        if (openingStyle !== 'banderola' || openingStyle !== 'batiente' || openingStyle !== 'oscilobatiente' || openingStyle !== 'proyectante') {
            throw CustomError.createError({
                name: 'Tipo de avertuna inválida.',
                cause: 'Se ha solicitado un estilo de apertura que no está cargado en nuestro catálogo.',
                message: 'Debe elegir una forma de apertura válida.',
                status: 400
            });
        };

        if (color !== 'nogal' || color !== 'roble' || color !== 'liso') {
            throw CustomError.createError({
                name: 'Color inválido.',
                cause: 'Debe seleccionar un color que esté incluido dentro de nuestro catálogo.',
                message: 'El color solicitado no existe.',
                status: 400
            });
        };

        if (width < 40 || height < 40) {
            throw CustomError.createError({
                name: 'Dimensiones inválidas.',
                cause: 'Tanto el alto como el ancho no pueden ser inferiores a 40cm.',
                message: 'Debe ingresar un alto o un ancho superior a 40cm',
                status: 400
            });
        };

        if (quantity < 1) {
            throw CustomError.createError({
                name: 'Cantidad invalida.',
                cause: 'Para generar el pedido de forma correcta debe ingresar una cantidad de al menos 1.',
                message: 'La cantidad tiene que ser de, al menos, 1.',
                status: 400
            });
        };

        const product = { type, openingType, openingStyle, color, width, height, quantity };
        return product;
    };

    generateProduct(type, openingType, openingStyle, color, width, height, quantity) {
        const product = this.#validateParams(type, openingType, openingStyle, color, width, height, quantity);
        return product
    };
};

module.exports = { ProductRepository };