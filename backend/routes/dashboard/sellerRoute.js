import express from "express"

import sellerController from "../../controllers/dashboard/sellerController.js";

import { authGuard } from "../../middlewares/authMiddleware.js"

const router = express.Router();

router.get('/request-seller-get', authGuard, sellerController.get_pending_sellers_by_query)
router.get('/get-sellers', authGuard, sellerController.get_active_sellers_by_query)
router.get('/get-deactive-sellers', authGuard, sellerController.get_deactive_sellers_by_query)
router.get('/get-seller/:sellerId', authGuard, sellerController.get_seller_by_sellerId)

router.post('/seller-status-update', authGuard, sellerController.update_status_seller_by_sellerId)

export default router