const { Router } = require('express')
const router = Router();
const { Controller } = require('../controllers/order.controller');

router.get('/products', (_, res) => new Controller().getProducts(res));

router.post('/:type/:opening/:style/:color', (req, res) => new Controller().generateProduct(req, res));

module.exports = { router };