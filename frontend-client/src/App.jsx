import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {
  Routes,
  Route
} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import {
  get_category
} from "./redux/slices/homeSlice"

import HomePage from './pages/home/HomePage'
import ShopPage from './pages/shop/ShopPage'
import CategoryProductsPage from './pages/category-products/CategoryProductsPage';
import SearchProductsPage from './pages/search-products/SearchProductsPage';
import ProductDetails from './pages/product-details/ProductDetails';
import Cart from './pages/cart/Cart';
import Shipping from './pages/shipping/Shipping';
import RegisterPage from './pages/register/RegisterPage'
import LoginPage from './pages/login/LoginPage'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(get_category())
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
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />

      </Routes>

      <Toaster position='top-right' />
    </>
  )
}

export default App