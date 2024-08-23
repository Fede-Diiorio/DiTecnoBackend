const { Router } = require('express');
const router = Router();
const { Controller } = require('../controllers/colors.controller');

router.get('/', (_, res) => new Controller().getColors(res));

module.exports = router