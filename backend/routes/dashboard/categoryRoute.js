import express from "express"

import {
    add_category,
    get_category
} from "../../controllers/dashboard/categoryController.js"

import { authGuard } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/category-add', authGuard, add_category)
router.get('/category-get', authGuard, get_category)

export default router