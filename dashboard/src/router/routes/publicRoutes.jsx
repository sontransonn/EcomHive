import { lazy } from 'react'

const Home = lazy(() => import('../../pages/Home'))
const SellerLogin = lazy(() => import('../../pages/auth/SellerLogin'))
const SellerRegister = lazy(() => import('../../pages/auth/SellerRegister'))
const AdminLogin = lazy(() => import('../../pages/auth/AdminLogin'))
const Unauthorized = lazy(() => import('../../pages/Unauthorized'))

const publicRoutes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <SellerLogin />
    },
    {
        path: '/register',
        element: <SellerRegister />
    },
    {
        path: '/admin/login',
        element: <AdminLogin />
    },
    {
        path: '/unauthorized',
        element: <Unauthorized />
    },
]

export default publicRoutes