import { jwtDecode } from 'jwt-decode'

export const decodeToken = (token) => {
    if (token) {
        const data = jwtDecode(token)

        return data
    } else {
        return ''
    }
}