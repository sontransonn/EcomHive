import express from "express"

import {
    get_seller_request,
    get_active_sellers,
    get_deactive_sellers,
    get_seller,
    seller_status_update
} from "../../controllers/dashboard/sellerController.js"

import { authGuard } from "../../middlewares/authMiddleware.js"

const router = express.Router();

router.get('/request-seller-get', authGuard, get_seller_request)
router.get('/get-sellers', authGuard, get_active_sellers)
router.get('/get-deactive-sellers', authGuard, get_deactive_sellers)
router.get('/get-seller/:sellerId', authGuard, get_seller)
router.post('/seller-status-update', authGuard, seller_status_update)

export default router