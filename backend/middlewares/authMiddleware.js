import jwt from "jsonwebtoken"

export const authGuard = async (req, res, next) => {
    try {
        const { accessToken } = req.cookies

        if (!accessToken) {
            return res.status(409).json({ error: 'Please login first!' })
        }

        const decodeToken = await jwt.verify(accessToken, process.env.JWT_SECRET_KEY)

        req.role = decodeToken.role
        req.id = decodeToken.id

        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
}