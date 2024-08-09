const { CustomError } = require('../utils/customErrors');

module.exports = {
    validateProduct: (req, res, next) => {
        if (req.params.product === 'puerta' || req.params.product === 'ventana') {
            return next();
        };

        return res.status(400).json({ message: 'Debe elegir entre "puerta" o "ventana".' });
    },
    validateOpening: (req, res, next) => {
        if (req.params.opening === 'exterior' || req.params.opening === 'interior' || req.params.opening === 'corrediza') {
            return next();
        };

        return res.status(400).json({ message: 'El tipo de abertura seleccionado no existe.' });
    },
};