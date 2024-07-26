import express from "express"

import {
    admin_login,
    getUser,
    seller_register,
    seller_login,
    profile_image_upload,
    profile_info_add
} from "../controllers/authController.js"

import { authGuard } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/admin-login', admin_login)
router.get('/get-user', authGuard, getUser)
router.post('/seller-register', seller_register)
router.post('/seller-login', seller_login)
router.post('/profile-image-upload', profile_image_upload)
router.post('/profile-info-add', profile_info_add)

export default router