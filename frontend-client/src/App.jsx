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
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>

      <Toaster position='top-right' />
    </>
  )
}

export default App