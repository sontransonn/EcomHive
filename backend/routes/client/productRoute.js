import express from "express"

import productController from "../../controllers/client/productController.js"

const router = express.Router()

router.get('/get-products', productController.get_products)
router.get('/get-product-by-slug/:slug', productController.get_product_by_slug)
router.get('/price-range-products', productController.price_range_products)
router.get('/get-products-by-query', productController.get_products_by_query)

export default router