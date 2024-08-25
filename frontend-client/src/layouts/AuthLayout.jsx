import React from 'react'

import AuthHeader from './components/AuthHeader'
import Footer from './components/Footer'

const AuthLayout = ({ auth, children }) => {
    return (
        <div className='w-full flex flex-col'>
            <AuthHeader auth={auth} />
            {children}
            <Footer />
        </div>
    )
}

export default AuthLayout