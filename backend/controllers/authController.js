import bcrypt from "bcrypt"
import formidable from "formidable"

import cloudinary from "../configs/cloudinaryConfig.js"

import ADMINS from "../models/adminsModel.js";
import SELLERS from "../models/sellersModel.js";
import CUSTOMERS from "../models/customersModel.js";
import FRIENDS from "../models/friendsModel.js";

import { generateToken } from "../utils/tokenUtil.js";

class authController {

    static getUser = async (req, res) => {
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

    // Đăng nhập với admin
    static admin_login = async (req, res) => {
        try {
            const { email, password } = req.body

            // Kiểm tra dữ liệu có bị trống hay không
            if (!email || !password) {
                return res.status(400).json({ error: "Please fill full form!" })
            }

            const admin = await ADMINS.findOne({ email }).select('+password')

            // Xử lý nếu admin không tồn tại
            if (!admin) {
                return res.status(404).json({ error: "Email not found!" })
            }

            // Kiểm tra mật khẩu
            const isCorrectPassword = await bcrypt.compare(password, admin.password)

            if (!isCorrectPassword) {
                return res.status(400).json({ error: "Password wrong!" })
            }

            // Tạo token
            const token = await generateToken({
                id: admin.id,
                role: admin.role
            })

            // Set Cookie
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

    // Đăng ký seller
    static seller_register = async (req, res) => {
        try {
            const { email, name, password } = req.body

            const seller = await SELLERS.findOne({ email })

            // Xử lý nếu seller đã tồn tại
            if (seller) {
                return res.status(404).json({ error: 'Email alrady exit' })
            }

            // Mã hóa mật khẩu
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newSeller = await SELLERS.create({
                name,
                email,
                password: hashedPassword,
                method: 'menualy',
                shopInfo: {}
            })

            await FRIENDS.create({
                myId: newSeller.id
            })

            // Tạo token
            const token = await generateToken({
                id: newSeller.id,
                role: newSeller.role
            })

            // Set Cookie
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

    // Đăng nhập với seller
    static seller_login = async (req, res) => {
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

    // Đăng ký customer
    static customer_register = async (req, res) => {
        try {
            const { name, email, password } = req.body

            if (!name || !email || !password) {
                return res.status(400).json({ error: "Please fill full form!" })
            }

            const customer = await CUSTOMERS.findOne({ email })

            if (customer) {
                return res.status(400).json({ error: 'Email already exits' })
            }

            // Mã hóa mật khẩu
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newCustomer = await CUSTOMERS.create({
                name: name.trim(),
                email: email.trim(),
                password: hashedPassword,
                method: 'menualy'
            })

            await FRIENDS.create({
                myId: newCustomer.id
            })

            const token = await generateToken({
                id: newCustomer.id,
                name: newCustomer.name,
                email: newCustomer.email,
                method: newCustomer.method
            })

            res.cookie('customerToken', token, {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            })

            return res.status(200).json({
                message: 'Register success',
                token
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    // Đăng nhập với customer
    static customer_login = async (req, res) => {
        try {
            const { email, password } = req.body

            const customer = await CUSTOMERS.findOne({ email }).select('+password')

            if (!customer) {
                return res.status(404).json({ error: "Email not found" })
            }

            const isCorrectPassword = await bcrypt.compare(password, customer.password)

            if (!isCorrectPassword) {
                return res.status(404).json({ error: "Password wrong" })
            }

            const token = await generateToken({
                id: customer.id,
                name: customer.name,
                email: customer.email,
                method: customer.method
            })

            res.cookie('customerToken', token, {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            })

            return res.status(201).json({
                message: 'Login success',
                token
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static profile_image_upload = async (req, res) => {
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

    static profile_info_add = async (req, res) => {
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
}

export default authController