module.exports = {

    validateProduct: (req, res, next) => {
        if (req.params.product === 'puerta' || req.params.product === 'ventana') {
            return next();
        };

        return res.status(400).json({ message: 'Debe elegir entre "puerta" o "ventana".' });
    },

    validateOpening: (req, res, next) => {
        if (req.params.opening === 'exterior' || req.params.opening === 'interior' || req.params.opening === 'corrediza' || req.params.opening === 'fija') {
            return next();
        };

        return res.status(400).json({ message: 'El tipo de abertura seleccionado no existe.' });
    },

    validateColor: (req, res, next) => {
        if (req.params.color === 'nogal' || req.params.color === 'roble' || req.params.color === 'liso') {
            return next();
        }

        return res.status(400).json({ message: 'El color solicitado no se encuentra disponible' });
    },

    validateOpeningStyle: (req, res, next) => {
        if (req.params.style === 'banderola' || req.params.style === 'batiente' || req.params.style === 'oscilobatiente' || req.params.style === 'proyectante') {
            return next();
        };

        return res.status(400).json({ message: 'El estilo de abertura seleccionado no existe.' });
    },

};