import express from "express"

import {
    get_categorys,
} from "../../controllers/client/homeController.js"

const router = express.Router()

router.get('/get-categorys', get_categorys)

export default router