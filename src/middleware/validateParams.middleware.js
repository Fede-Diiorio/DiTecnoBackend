module.exports = {

    validateProduct: (req, res, next) => {
        const product = req.params.product;

        if (product === 'puerta' || product === 'ventana') {
            return next();
        };

        return res.status(404).json({ message: 'Debe elegir entre "puerta" o "ventana".' });
    },

    validateOpening: (req, res, next) => {
        const opening = req.params.opening;

        if (opening === 'exterior' || opening === 'interior' || opening === 'corrediza' || opening === 'fija') {
            return next();
        };

        return res.status(404).json({ message: 'La abertura seleccionada no existe.' });
    },

    validateColor: (req, res, next) => {
        const color = req.params.color;

        if (color === 'nogal' || color === 'roble' || color === 'liso') {
            return next();
        }

        return res.status(404).json({ message: 'El color solicitado no se encuentra disponible' });
    },

    validateOpeningStyle: (req, res, next) => {
        const style = req.params.style;

        if (style === 'banderola' || style === 'batiente' || style === 'oscilobatiente' || style === 'proyectante') {
            return next();
        };

        return res.status(404).json({ message: 'El estilo de abertura seleccionado no existe.' });
    },

    validateOpeningType: (req, res, next) => {
        const type = req.params.type;

        if (type === 'superpuesta' || type === 'simple' || type === 'lateral' || type === 'lateralSuperpuesta' || type === 'dobleSuperpuesta') {
            return next();
        };

        return res.status(404).json({ message: 'El tipo de apertura seleccionado no existe.' });
    }

};