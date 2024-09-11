import { Router } from 'express';
import Controller from '../controllers/colors.controller.js';

const router = Router();

router.get('/', (_, res) => new Controller().getColors(res));

export default router;