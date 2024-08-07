const { CustomError } = require('../utils/customErrors');

class ProductRepository {

    async generateProduct(type, openingType, openingStyle, color, width, height, quantity) {

        const invalidType = type !== 'puerta' || type !== 'ventana';
        console.log(invalidType);
        const invalidOpeningType = openingType !== 'interior' || openingType !== 'exterior' || openingType !== 'corrediza' || openingType !== 'fija';
        const invalidOpeningStyle = openingStyle !== 'banderola' || openingStyle !== 'batiente' || openingStyle !== 'oscilobatiente';
        const invalidColor = color !== 'nogal' || color !== 'roble' || color !== 'liso';
        const invalidDimensions = width < 40 || height < 40;

        if (invalidType) {
            throw CustomError.createError({
                name: 'Producto incorrecto.',
                cause: 'Se ha enviado un valor inválido y el producto no puede ser generado.',
                message: 'El producto debe ser una puerta o una ventana.',
                status: 400
            });
        };

        // if (invalidOpeningType) {
        //     throw CustomError.createError({
        //         name: 'Opción inválida.',
        //         cause: 'Se ha enviado un valor inválido y el producto no puede ser generado.',
        //         message: 'Debe elegir un tipo de apertura válido.',
        //         status: 400
        //     });
        // };

        // if (invalidOpeningStyle) {
        //     throw CustomError.createError({
        //         name: 'Tipo de avertuna inválida.',
        //         cause: 'Se ha solicitado un estilo de apertura que no está cargado en nuestro catálogo.',
        //         message: 'Debe elegir una forma de apertura válida.',
        //         status: 400
        //     });
        // };

        // if (invalidColor) {
        //     throw CustomError.createError({
        //         name: 'Color inválido.',
        //         cause: 'Debe seleccionar un color que esté incluido dentro de nuestro catálogo.',
        //         message: 'El color solicitado no existe.',
        //         status: 400
        //     });
        // };

        // if (invalidDimensions) {
        //     throw CustomError.createError({
        //         name: 'Dimensiones inválidas.',
        //         cause: 'Tanto el alto como el ancho no pueden ser inferiores a 40cm.',
        //         message: 'Debe ingresar un alto o un ancho superior a 40cm',
        //         status: 400
        //     });
        // };

        // if (quantity < 1) {
        //     throw CustomError.createError({
        //         name: 'Cantidad invalida.',
        //         cause: 'Para generar el pedido de forma correcta debe ingresar una cantidad de al menos 1.',
        //         message: 'La cantidad tiene que ser de, al menos, 1.',
        //         status: 400
        //     });
        // };

        const product = { type, openingType, openingStyle, color, width, height, quantity };
        return product;
    };
};

module.exports = { ProductRepository };