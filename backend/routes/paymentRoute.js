import express from "express"

import paymentController from "../controllers/paymentController.js";

import { authGuard } from "../middlewares/authMiddleware.js";

const router = express.Router();

export default router