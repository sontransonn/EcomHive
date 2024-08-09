import express from "express"

import orderController from "../controllers/orderController.js"

const router = express.Router()

// ----admin
router.get('/admin/orders', orderController.get_admin_orders)
router.get('/admin/order/:orderId', orderController.get_admin_order)

router.put('/admin/order-status/update/:orderId', orderController.admin_order_status_update)

// ----seller
router.get('/seller/orders/:sellerId', orderController.get_seller_orders)
router.get('/seller/order/:orderId', orderController.get_seller_order)

router.put('/seller/order-status/update/:orderId', orderController.seller_order_status_update)

// -----customer
router.get('/customer/confirm/:orderId', orderController.order_confirm)
router.get('/customer/gat-dashboard-data/:userId', orderController.get_customer_databorad_data)
router.get('/customer/gat-orders/:customerId/:status', orderController.get_orders)
router.get('/customer/gat-order/:orderId', orderController.get_order)

router.post('/customer/place-order', orderController.place_order)
router.post('/customer/create-payment', orderController.create_payment)



export default router