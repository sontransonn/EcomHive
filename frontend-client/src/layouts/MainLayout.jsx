import React from 'react'

import Header from './components/Header'
import Footer from './components/Footer'

const MainLayout = ({ children }) => {
    return (
        <div className='w-full flex flex-col gap-8'>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default MainLayout