const { Router } = require('express');
const router = Router();
const { Controller } = require('../controllers/window.controller');

router.get('/', (_, res) => new Controller().getOpening(res));

module.exports = router;