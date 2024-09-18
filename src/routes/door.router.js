import { Router } from 'express';
import Controller from '../controllers/door.controller.js';

const router = Router();

router.get('/', (_, res) => new Controller().getOpening(res));

router.get('/:opening', (req, res) => new Controller().getStyles(req, res));

router.get('/:opening/:style', (req, res) => new Controller().getTypes(req, res));

router.get('/:opening/:style/:type', (req, res) => new Controller().getDesigns(req, res));

export default router;
