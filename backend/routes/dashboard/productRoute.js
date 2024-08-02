import express from "express"

import productController from "../../controllers/dashboard/productController.js"

import { authGuard } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/get-products-by-query', authGuard, productController.get_products_by_query)
router.get('/get-product-by-productId/:productId', authGuard, productController.get_product_by_productId)

router.post('/add-product', authGuard, productController.add_product)
router.post('/update-product-by-productId', authGuard, productController.update_product_by_productId)
router.post('/update-product-image-by-productId', authGuard, productController.update_product_image_by_productId)

export default router