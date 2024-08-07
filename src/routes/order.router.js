const { Router } = require('express')
const router = Router();
const { Controller } = require('../controllers/order.controller');

router.post('/:type/:opening/:style/:color', (req, res) => new Controller().generateProduct(req, res));

module.exports = { router };