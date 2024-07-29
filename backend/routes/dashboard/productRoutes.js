import express from "express"

import {
    add_product,
    products_get,
    product_get,
    product_update,
    product_image_update
} from "../../controllers/dashboard/productControllers.js"

import { authGuard } from "../../middlewares/authMiddlewares.js";

const router = express.Router();

router.post('/product-add', authGuard, add_product)
router.get('/products-get', authGuard, products_get)
router.get('/product-get/:productId', authGuard, product_get)
router.post('/product-update', authGuard, product_update)
router.post('/product-image-update', authGuard, product_image_update)

export default router