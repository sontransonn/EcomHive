import express from "express"

import authController from "../controllers/authController.js"

import { authGuard } from "../middlewares/authMiddleware.js";

const router = express.Router();

// -----admin
router.post('/admin-login', authController.admin_login)

// -----seller
router.post('/seller-register', authController.seller_register)
router.post('/seller-login', authController.seller_login)

// -----customer
router.post('/customer-register', authController.customer_register)
router.post('/customer-login', authController.customer_login)

// ------logout
router.get('/logout', authGuard, authController.logout)

router.get('/get-user', authGuard, authController.getUser)
router.post('/profile-image-upload', authGuard, authController.profile_image_upload)
router.post('/profile-info-add', authGuard, authController.profile_info_add)

export default router