import express from "express"

import chatController from "../controllers/chatController.js"

import { authGuard } from "../middlewares/authMiddleware.js"

const router = express.Router()

// -----customer
router.post('/customer/add-customer-friend', chatController.add_customer_friend)
router.post('/customer/send-message-from-customer-to-seller', chatController.send_message_from_customer_to_seller)

// -----seller
router.get('/seller/get-customers/:sellerId', chatController.get_customers)
router.get('/seller/get-customer-message/:customerId', authGuard, chatController.get_customer_seller_message)

router.post('/seller/send-message-to-customer', authGuard, chatController.seller_message_add)

// -----admin
router.get('/admin/get-sellers', authGuard, chatController.get_sellers)

router.post('/message-send-seller-admin', authGuard, chatController.seller_admin_message_insert)
router.get('/get-admin-messages/:receverId', authGuard, chatController.get_admin_messages)
router.get('/get-seller-messages', authGuard, chatController.get_seller_messages)

export default router