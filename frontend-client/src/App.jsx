import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { get_all_category } from "./redux/slices/categorySlice"

import HomePage from './pages/home/HomePage'
import ShopPage from './pages/shop/ShopPage'
import CategoryProductsPage from './pages/category-products/CategoryProductsPage';
import SearchProductsPage from './pages/search-products/SearchProductsPage';
import ProductDetails from './pages/product-details/ProductDetails';
import Cart from './pages/cart/Cart';
import Shipping from './pages/shipping/Shipping';
import Payment from './pages/payment/Payment';
import RegisterPage from './pages/register/RegisterPage'
import LoginPage from './pages/login/LoginPage'
import ProtectUser from './components/ProtectUser';
import ClientDashboard from './pages/dashboard/ClientDashboard';
import Index from './pages/dashboard/Index';
import Chat from './pages/dashboard/Chat';
import Order from './pages/dashboard/Order';
import Orders from './pages/dashboard/Orders';
import Wishlist from './pages/dashboard/Wishlist';
import ChangePassword from './pages/dashboard/ChangePassword';

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(get_all_category())
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/products?' element={<CategoryProductsPage />} />
        <Route path='/products/search?' element={<SearchProductsPage />} />
        <Route path='/product/details/:slug' element={<ProductDetails />} />
        <Route path='/card' element={<Cart />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />

        <Route path='/dashboard' element={<ProtectUser />}>
          <Route path='' element={<ClientDashboard />}>
            <Route path='' element={<Index />} />
            <Route path='my-orders' element={<Orders />} />
            <Route path='my-wishlist' element={<Wishlist />} />
            <Route path='order/details/:orderId' element={<Order />} />
            <Route path='chage-password' element={<ChangePassword />} />
            <Route path='chat' element={<Chat />} />
            <Route path='chat/:sellerId' element={<Chat />} />
          </Route>
        </Route>
      </Routes>
      <Toaster position='top-right' />
    </>
  )
}

export default App