import express from "express"

import reviewController from "../../controllers/client/reviewController.js"

const router = express.Router()

router.get('/get-reviews/:productId', reviewController.get_reviews)

router.post('/submit-review', reviewController.submit_review)

export default router