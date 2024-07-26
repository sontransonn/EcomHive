import jwt from "jsonwebtoken"

export const generateToken = async (data) => {
    const token = await jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })

    return token
}