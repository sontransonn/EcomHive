import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { PropagateLoader } from 'react-spinners'

import {
    admin_login,
    messageClear
} from '../../redux/slices/authSlice'

import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const AdminLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        loader,
        errorMessage, successMessage
    } = useSelector(state => state.auth)

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            navigate('/')
        }
    }, [errorMessage, successMessage])

    const inputHandle = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const submit = (e) => {
        e.preventDefault()
        dispatch(admin_login(formData))
    }

    return (
        <div className='flex justify-center items-center bg-no-repeat bg-cover bg-center h-screen bg-[url("https://png.pngtree.com/background/20230618/original/pngtree-korean-e-commerce-in-high-quality-3d-renderings-for-social-media-picture-image_3754412.jpg")]'>
            <div className='p-10 rounded-md text-white bg-white flex flex-col gap-10 shadow-2xl'>
                <div className=' bg-pink-500 rounded-md flex flex-col text-center mt-[-75px] py-3 px-16'>
                    <span className='font-semibold text-xl'>ADMIN LOGIN</span>
                    <span className='text-base'>Please enter your Login details!</span>
                </div>

                <form
                    onSubmit={submit}
                    className='text-black'
                >
                    <div className='relative flex flex-col w-full gap-1 mb-5 border-b border-solid border-slate-300 overflow-hidden'>
                        <input
                            onChange={inputHandle}
                            value={formData.email}
                            className='px-3 py-2 outline-none'
                            type="text" name='email'
                            placeholder='Enter Email/Username' id='email' required
                        />
                    </div>
                    <div className='relative flex flex-col w-full gap-1 mb-5 border-b border-solid border-slate-300 overflow-hidden'>
                        <input
                            onChange={inputHandle}
                            value={formData.password}
                            className='px-3 py-2 outline-none'
                            type={showPassword ? "text" : "password"}
                            name='password'
                            placeholder='Enter Password' id='password' required
                        />
                        {showPassword ? (
                            <FaEye
                                className='absolute top-1/2 right-1 transform -translate-y-1/2 cursor-pointer'
                                size={20}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        ) : (
                            <FaEyeSlash
                                className='absolute top-1/2 right-1 transform -translate-y-1/2 cursor-pointer'
                                size={20}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        )}
                    </div>
                    <div className='flex justify-between mb-5'>
                        <label className='flex items-center gap-2 text-sm font-semibold cursor-pointer'>
                            <input
                                type="checkbox"
                            />
                            Remember me
                        </label>
                        <span className='text-sm font-semibold text-pink-500 cursor-pointer hover:underline'>Forget Password ?</span>
                    </div>
                    <button
                        disabled={loader ? true : false}
                        className='bg-pink-500 w-full hover:bg-pink-600 text-white rounded-md px-7 py-2'
                    >
                        {
                            loader ? (
                                <PropagateLoader
                                    color='#fff'
                                    cssOverride={{
                                        display: 'flex',
                                        margin: '0 auto',
                                        height: '24px',
                                        justifyContent: 'center',
                                        alignItems: "center"
                                    }}
                                />
                            ) : (
                                <span className='text-lg'>Submit</span>
                            )
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin