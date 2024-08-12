const { Router } = require('express');
const router = Router();
const { Controller } = require('../controllers/window.controller');

router.get('/', (_, res) => new Controller().getOpening(res));

router.get('/:opening', (req, res) => new Controller().getStyles(req, res));

module.exports = router;