import express from "express"

import productController from "../../controllers/dashboard/productController.js"

import { authGuard } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/products-get', authGuard, productController.get_products_by_query)
router.get('/product-get/:productId', authGuard, productController.get_product_by_productId)

router.post('/product-add', authGuard, productController.add_product)
router.post('/product-update', authGuard, productController.update_product_by_productId)
router.post('/product-image-update', authGuard, productController.update_product_image_by_productId)

export default router