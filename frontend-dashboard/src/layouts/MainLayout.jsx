import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

import Header from './components/Header'
import Sidebar from './components/Sidebar'

const MainLayout = () => {
    const dispatch = useDispatch()

    const [showSidebar, setShowSidebar] = useState(false)

    const { userInfo } = useSelector(state => state.auth)

    return (
        <div className='bg-[#161d31] w-full min-h-screen'>
            <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

            <div className='ml-0 lg:ml-[260px] pt-[95px] transition-all'>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout