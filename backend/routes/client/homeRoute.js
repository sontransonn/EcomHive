import express from "express"

import {
    get_categorys,
    get_products,
    get_product,
    price_range_product,
    query_products,
    submit_review,
    get_reviews
} from "../../controllers/client/homeController.js"

const router = express.Router()

router.get('/get-categorys', get_categorys)
router.get('/get-products', get_products)
router.get('/get-product/:slug', get_product)
router.get('/price-range-latest-product', price_range_product)
router.get('/query-products', query_products)

router.post('/customer/submit-review', submit_review)
router.get('/customer/get-reviews/:productId', get_reviews)

export default router