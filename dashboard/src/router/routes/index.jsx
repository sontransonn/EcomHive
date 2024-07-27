import MainLayout from "../../layouts/MainLayout"
import ProtectRoute from "../components/ProtectRoute";

import privateRoutes from "./privateRoutes";

export const getRoutes = () => {
    const allRoute = []

    privateRoutes.map(r => {
        r.element = <ProtectRoute route={r} >{r.element}</ProtectRoute>
    })

    return {
        path: '/',
        element: <MainLayout />,
        children: privateRoutes
    }
}