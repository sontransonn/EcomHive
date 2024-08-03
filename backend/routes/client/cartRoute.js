import express from "express"

import cartController from "../../controllers/client/cartController.js"

const router = express.Router()

router.get('/get-products-in-cart/:userId', cartController.get_products_in_cart)

router.post('/add-product-to-cart', cartController.add_product_to_cart)

router.put('/quantity-inc/:card_id', cartController.quantity_inc)
router.put('/quantity-dec/:card_id', cartController.quantity_dec)

router.delete('/delete-product-in-cart/:card_id', cartController.delete_product_in_cart)

export default router