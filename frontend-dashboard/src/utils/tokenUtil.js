import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
    if (token) {
        const decodeToken = jwtDecode(token)
        const expireTime = new Date(decodeToken.exp * 1000)

        if (new Date() > expireTime) {
            localStorage.removeItem('accessToken')

            return ''
        } else {
            return decodeToken.role
        }
    } else {
        return ''
    }
}