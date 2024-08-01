import express from "express"

import categoryController from "../../controllers/dashboard/categoryController.js"

import { authGuard } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/category-get', authGuard, categoryController.get_categories_by_query)

router.post('/category-add', authGuard, categoryController.add_category)

export default router