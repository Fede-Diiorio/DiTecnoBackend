const { Router } = require('express');
const router = Router();
const { Controller } = require('../controllers/door.controller');

router.get('/', (_, res) => new Controller().getOpening(res));

router.get('/:opening', (req, res) => new Controller().getTypes(req, res));

router.get('/:opening/:type', (req, res) => new Controller().getDesigns(req, res));

router.get('/:opening/:type/:design', (req, res) => new Controller().getColors(req, res));

router.post('/:opening/:type/:design/:color', (req, res) => new Controller())

module.exports = router;