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

    validateOpeningStyle: (req, res, next) => {
        if (req.params.style === 'banderola' || req.params.style === 'batiente' || req.params.style === 'oscilobatiente' || req.params.style === 'proyectante') {
            return next();
        }

        return res.status(400).json({ message: 'El estilo de abertura seleccionado no existe.' });
    },
};