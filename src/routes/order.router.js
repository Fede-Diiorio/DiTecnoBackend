import { Router } from 'express';
import Controller from '../controllers/order.controller.js';

const router = Router();

router.post('/', (req, res) => new Controller().getData(req, res));

export default router;