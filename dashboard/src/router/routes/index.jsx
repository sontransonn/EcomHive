import MainLayout from "../../layouts/MainLayout"

import privateRoutes from "./privateRoutes";

export const getRoutes = () => {
    const allRoute = []

    return {
        path: '/',
        element: <MainLayout />,
        children: privateRoutes
    }
}