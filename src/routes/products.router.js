const { Router } = require('express')
const router = Router();
const { Controller } = require('../controllers/products.controller');
const { validateProduct, validateOpening, validateOpeningStyle } = require('../middleware/validateParams.middleware');

router.get('/products', (_, res) => new Controller().getProducts(res));

router.get('/:product', validateProduct, (req, res) => new Controller().getOpenings(req, res));

router.get('/:product/:opening', validateProduct, validateOpening, (req, res) => new Controller().getStyles(req, res));

router.get('/:product/:opening/:style', validateProduct, validateOpening, validateOpeningStyle, (req, res) => new Controller().getTypes(req, res));

module.exports = { router };