import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Toaster } from 'react-hot-toast'

import {
  get_user_info
} from "./redux/slices/authSlice"

import Router from './router/Router'

import publicRoutes from "./router/routes/publicRoutes"
import { getRoutes } from './router/routes'

const App = () => {
  const dispatch = useDispatch()

  const [allRoutes, setAllRoutes] = useState([...publicRoutes])

  const { token } = useSelector(state => state.auth)

  useEffect(() => {
    const routes = getRoutes()

    setAllRoutes([...allRoutes, routes])
  }, [])

  useEffect(() => {
    if (token) {
      dispatch(get_user_info())
    }
  }, [token])

  return (
    <>
      <Router allRoutes={allRoutes} />
      <Toaster position='top-right' />
    </>

  )
}

export default App