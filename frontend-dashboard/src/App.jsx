import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Toaster } from 'react-hot-toast'

import {
  get_user_info
} from "./redux/slices/authSlice"

import Router from './router/Router'

import routeHelper from './router/helpers/routeHelper'

const App = () => {
  const dispatch = useDispatch()

  const { token } = useSelector(state => state.auth)

  const [allRoutes, setAllRoutes] = useState([])

  useEffect(() => {
    const allRoutes = routeHelper.getAllRoutes()

    setAllRoutes([...allRoutes])
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