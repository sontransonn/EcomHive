import express from "express"

import {
    get_products,
    get_product,
    price_range_product,
    query_products,
} from "../../controllers/client/homeController.js"

const router = express.Router()

router.get('/get-products', get_products)
router.get('/get-product/:slug', get_product)
router.get('/price-range-latest-product', price_range_product)
router.get('/query-products', query_products)

export default router