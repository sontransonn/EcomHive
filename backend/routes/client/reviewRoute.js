import express from "express"

import {
    submit_review,
    get_reviews
} from "../../controllers/client/homeController.js"

const router = express.Router()

router.get('/customer/get-reviews/:productId', get_reviews)

router.post('/customer/submit-review', submit_review)

export default router