const { Router } = require('express');
const router = Router();
const { Controller } = require('../controllers/order.controller');

router.post('/', (req, res) => new Controller().getData(req, res));

module.exports = router;