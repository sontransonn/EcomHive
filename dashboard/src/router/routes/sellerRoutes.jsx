import { lazy } from 'react'

const SellerDashboard = lazy(() => import('../../pages/seller/SellerDashboard'))
const AddProduct = lazy(() => import("../../pages/seller/AddProduct"))

const sellerRoutes = [
    {
        path: '/seller/dashboard',
        element: <SellerDashboard />,
        ability: 'seller'
    },
    {
        path: '/seller/dashboard/add-product',
        element: <AddProduct />,
        ability: 'seller'
    },
]

export default sellerRoutes