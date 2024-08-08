import MainLayout from "../../layouts/MainLayout"
import ProtectRoute from "../components/ProtectRoute"

import publicRoutes from "../routes/publicRoutes"
import privateRoutes from "../routes/privateRoutes"

class routeHelper {
    // Lấy ra tất cả các route (publicRoutes & privateRoutes)
    static getAllRoutes = () => {
        let allRoutes = []

        // Xử lý bảo vệ privateRoutes
        privateRoutes.map(r => {
            r.element = <ProtectRoute route={r} >{r.element}</ProtectRoute>
        })

        allRoutes = [
            ...publicRoutes,
            {
                path: '/',
                element: <MainLayout />,
                children: privateRoutes
            }
        ]

        return allRoutes
    }
}

export default routeHelper