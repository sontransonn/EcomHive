import express from "express"

import cartController from "../../controllers/client/cartController.js"

const router = express.Router()

router.get('/get-card-product/:userId', cartController.get_card_products)
router.get('/get-wishlist-products/:userId', cartController.get_wishlist)

router.post('/add-to-card', cartController.add_to_cart)
router.post('/add-to-wishlist', cartController.add_wishlist)

router.put('/quantity-inc/:card_id', cartController.quantity_inc)
router.put('/quantity-dec/:card_id', cartController.quantity_dec)

router.delete('/delete-card-product/:card_id', cartController.delete_card_product)
router.delete('/delete-wishlist-product/:wishlistId', cartController.delete_wishlist)

export default router