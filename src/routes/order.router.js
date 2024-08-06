import { Router } from "express";
const router = Router();
import orderController from '../controllers/order.controller.js';

router.post('/:prod/:opening/:type/:color', orderController.sendMail);

export default router;