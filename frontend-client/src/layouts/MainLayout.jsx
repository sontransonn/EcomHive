import React from 'react'

import MainHeader from './components/MainHeader'
import Footer from './components/Footer'

const MainLayout = ({ children }) => {
    return (
        <div className='w-full flex flex-col'>
            <MainHeader />
            {children}
            <Footer />
        </div>
    )
}

export default MainLayout