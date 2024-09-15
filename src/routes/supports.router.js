import { Router } from "express";
import Controller from "../controllers/support.controller.js";

const router = Router();

router.post('/report', (req, res) => new Controller().reportError(req, res));

export default router;