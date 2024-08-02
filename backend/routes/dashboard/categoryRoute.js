import express from "express"

import categoryController from "../../controllers/dashboard/categoryController.js"

import { authGuard } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/get-categories-by-query', authGuard, categoryController.get_categories_by_query)

router.post('/add-category', authGuard, categoryController.add_category)

export default router