import express from "express"

import wishlistController from "../../controllers/client/wishlistController.js"

const router = express.Router()

router.get('/get-products-in-wishlist/:userId', wishlistController.get_products_in_wishlist)

router.post('/add-product-to-wishlist', wishlistController.add_product_to_wishlist)

router.delete('/delete-product-in-wishlist/:wishlistId', wishlistController.delete_product_in_wishlist)

export default router