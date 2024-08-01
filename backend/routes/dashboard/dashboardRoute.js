import express from "express"

import categoryRoute from "./categoryRoute.js"
import productRoute from "./productRoute.js"
import sellerRoute from "./sellerRoute.js"

const router = express.Router()

router.use("/", categoryRoute)
router.use("/", productRoute)
router.use("/", sellerRoute)

export default router