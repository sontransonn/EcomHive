import express from "express"

import categoryRoute from "./categoryRoute.js"
import productRoute from "./productRoute.js"
import reviewRoute from "./reviewRoute.js"
import cartRoute from "./cartRoute.js"

const router = express.Router()

router.use("/", categoryRoute)
router.use("/", productRoute)
router.use("/", reviewRoute)
router.use("/", cartRoute)

export default router