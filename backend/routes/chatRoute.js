import express from "express"

import chatController from "../controllers/chatController.js"

const router = express.Router()

router.post('/customer/add-customer-friend', chatController.add_customer_friend)
router.post('/customer/send-message-to-seller', chatController.customer_message_add)

export default router