import React, { useEffect } from 'react'
import {
  Routes,
  Route
} from 'react-router-dom'

import Home from './pages/home/Home'
import Shop from './pages/shop/Shop'
import Register from './pages/register/Register'
import Login from './pages/login/Login'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App