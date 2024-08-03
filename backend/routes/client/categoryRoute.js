import express from "express"

import categoryController from "../../controllers/client/categoryController.js"

const router = express.Router()

router.get('/get-all-category', categoryController.get_all_category)

export default router