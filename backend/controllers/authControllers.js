import bcrypt from "bcrypt"
import formidable from "formidable"

import cloudinary from "../configs/cloudinaryConfig.js"

import ADMINS from "../models/adminsModel.js";
import SELLERS from "../models/sellersModel.js";
import SELLER_CUSTOMERS from "../models/chat/sellerCustomerModel.js";

import { generateToken } from "../utils/tokenUtil.js";

export const admin_login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill full form!" })
        }

        const admin = await ADMINS.findOne({ email }).select('+password')

        if (!admin) {
            return res.status(404).json({ error: "Email not found!" })
        }

        const isCorrectPassword = await bcrypt.compare(password, admin.password)

        if (!isCorrectPassword) {
            return res.status(400).json({ error: "Password wrong!" })
        }

        const token = await generateToken({
            id: admin.id,
            role: admin.role
        })

        res.cookie('accessToken', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })

        res.status(200).json({
            message: "Login successfully!",
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
}

export const getUser = async (req, res) => {
    try {
        const { id, role } = req;

        if (role === 'admin') {
            const user = await ADMINS.findById(id)

            res.status(200).json({ userInfo: user })
        } else {
            const seller = await SELLERS.findById(id)

            res.status(200).json({ userInfo: seller })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
}

export const seller_register = async (req, res) => {
    try {
        const { email, name, password } = req.body

        const seller = await SELLERS.findOne({ email })

        if (seller) {
            return res.status(404).json({ error: 'Email alrady exit' })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newSeller = await SELLERS.create({
            name,
            email,
            password: hashedPassword,
            method: 'menualy',
            shopInfo: {}
        })

        await SELLER_CUSTOMERS.create({
            myId: newSeller.id
        })

        const token = await generateToken({
            id: newSeller.id,
            role: newSeller.role
        })

        res.cookie('accessToken', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })

        return res.status(201).json({
            message: 'register success',
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
}

export const seller_login = async (req, res) => {
    try {
        const { email, password } = req.body

        const seller = await SELLERS.findOne({ email }).select('+password')

        if (!seller) {
            return res.status(404).json({ error: "Email not found" })
        }

        const isCorrectPassword = await bcrypt.compare(password, seller.password)

        if (!isCorrectPassword) {
            return res.status(400).json({ error: "Password wrong" })
        }

        const token = await generateToken({
            id: seller.id,
            role: seller.role
        })

        res.cookie('accessToken', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })

        return res.status(200).json({
            token,
            message: "Login success"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
}

export const profile_image_upload = async (req, res) => {
    try {
        const { id } = req
        const form = formidable({ multiples: true })

        form.parse(req, async (err, _, files) => {
            if (err) {
                return res.status(400).json({ error: 'something error' })
            }

            let { image } = files
            image = Array.isArray(image) ? image[0] : image;

            const result = await cloudinary.uploader.upload(image.filepath, { folder: 'profile' })

            if (result) {
                await SELLERS.findByIdAndUpdate(id, {
                    image: result.url
                })

                const userInfo = await SELLERS.findById(id)

                res.status(201).json({
                    message: 'image upload success',
                    userInfo
                })
            } else {
                res.status(400).json({
                    error: 'image upload failed'
                })
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
}

export const profile_info_add = async (req, res) => {
    try {
        const { id } = req;
        const {
            division,
            district,
            shopName, sub_district
        } = req.body;

        await SELLERS.findByIdAndUpdate(id, {
            shopInfo: {
                shopName,
                division,
                district,
                sub_district
            }
        })

        const userInfo = await SELLERS.findById(id)

        res.status(200).json({
            message: 'Profile info add success',
            userInfo
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
}