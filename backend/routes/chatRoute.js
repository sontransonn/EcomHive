import express from "express"

import chatController from "../controllers/chatController.js"

import { authGuard } from "../middlewares/authMiddleware.js"

const router = express.Router()

// -----Customer
router.post('/customer/add-customer-friend', chatController.add_customer_friend)
router.post('/customer/send-message-from-customer-to-seller', chatController.send_message_from_customer_to_seller)

// -----Seller
router.get('/seller/get-customers/:sellerId', chatController.get_customers)
router.get('/seller/get-customer-message/:customerId', authGuard, chatController.get_customer_seller_message)

router.post('/seller/send-message-to-customer', authGuard, chatController.seller_message_add)

export default router