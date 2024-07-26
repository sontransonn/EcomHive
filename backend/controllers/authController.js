import bcrypt from "bcrypt"
import formidable from "formidable"

import ADMINS from "../models/adminModel.js";

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
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
}

export const seller_register = async (req, res) => {

}

export const seller_login = async (req, res) => {

}

export const profile_image_upload = async (req, res) => {

}

export const profile_info_add = async (req, res) => {

}