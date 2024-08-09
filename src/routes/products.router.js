const { Router } = require('express')
const router = Router();
const { Controller } = require('../controllers/products.controller');

router.get('/products', (_, res) => new Controller().getProducts(res));

router.get('/:product', (req, res) => new Controller().getOpenings(req, res));

router.get('/:product/:opening', (req, res) => new Controller().getStyles(req, res));

router.post('/:type/:opening/:style/:color', (req, res) => new Controller().generateProduct(req, res));

module.exports = { router };