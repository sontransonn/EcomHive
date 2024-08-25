import React from 'react'
import { Link } from 'react-router-dom'

const AuthHeader = ({ auth }) => {
    return (
        <div className='bg-white p-3'>
            <div className='w-[85%] flex flex-wrap justify-between items-center mx-auto'>
                <div className='flex gap-4 items-center'>
                    <Link to="/">
                        <img
                            className='w-[150px] h-[50x] cursor-pointer'
                            src="http://localhost:3000/images/logo.png"
                            alt="logo"
                        />
                    </Link>
                    <span className='text-2xl text-slate-600 font-bold'>{auth}</span>
                </div >

                <div>
                    <span className='cursor-pointer hover:underline text-orange-500'>Bạn cần giúp đỡ?</span>
                </div>
            </div >
        </div >
    )
}

export default AuthHeader