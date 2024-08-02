import express from "express"

import sellerController from "../../controllers/dashboard/sellerController.js";

import { authGuard } from "../../middlewares/authMiddleware.js"

const router = express.Router();

router.get('/get-pending-sellers-by-query', authGuard, sellerController.get_pending_sellers_by_query)
router.get('/get-active-sellers-by-query', authGuard, sellerController.get_active_sellers_by_query)
router.get('/get-deactive-sellers-by-query', authGuard, sellerController.get_deactive_sellers_by_query)
router.get('/get-seller-by-sellerId/:sellerId', authGuard, sellerController.get_seller_by_sellerId)

router.post('/update-status-seller-by-sellerId', authGuard, sellerController.update_status_seller_by_sellerId)

export default router