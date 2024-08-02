import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import toast from 'react-hot-toast'

import {
    messageClear,
    seller_register
} from "../../redux/slices/authSlice"

import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { AiOutlineGooglePlus, AiOutlineGithub } from 'react-icons/ai'
import { FiFacebook } from 'react-icons/fi'
import { CiTwitter } from 'react-icons/ci'

const SellerRegister = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { loader, errorMessage, successMessage } = useSelector(state => state.auth)

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())

            navigate('/')
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    }, [successMessage, errorMessage])

    const inputHandle = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const submit = (e) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            return toast.error("Mật khẩu không khớp!")
        }

        dispatch(seller_register(formData))
    }

    return (
        <div className='flex justify-center items-center bg-no-repeat bg-cover bg-center h-screen bg-[url("https://png.pngtree.com/background/20230618/original/pngtree-korean-e-commerce-in-high-quality-3d-renderings-for-social-media-picture-image_3754412.jpg")]'>
            <div className='p-10 rounded-md text-white bg-white flex flex-col gap-10 shadow-2xl'>
                <div className=' bg-pink-500 rounded-md flex flex-col text-center mt-[-75px] py-3 px-16'>
                    <span className='font-semibold text-xl'>SELLER REGISTER</span>
                    <span className='text-base'>Please enter your Register details!</span>
                </div>

                <form
                    onSubmit={submit}
                    className='text-black'
                >
                    <div className='relative flex flex-col w-full gap-1 mb-5 border-b border-solid border-slate-300 overflow-hidden'>
                        <input
                            onChange={inputHandle} value={formData.name}
                            className='px-3 py-2 outline-none'
                            type="text" name='name'
                            placeholder='Enter Name' id='name' required
                        />
                    </div>

                    <div className='relative flex flex-col w-full gap-1 mb-5 border-b border-solid border-slate-300 overflow-hidden'>
                        <input
                            onChange={inputHandle} value={formData.email}
                            className='px-3 py-2 outline-none'
                            type="text" name='email'
                            placeholder='Enter Email' id='email' required
                        />
                    </div>

                    <div className='relative flex flex-col w-full gap-1 mb-5 border-b border-solid border-slate-300 overflow-hidden'>
                        <input
                            onChange={inputHandle} value={formData.password}
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

                    <div className='relative flex flex-col w-full gap-1 mb-5 border-b border-solid border-slate-300 overflow-hidden'>
                        <input
                            onChange={inputHandle} value={formData.confirmPassword}
                            className='px-3 py-2 outline-none'
                            type="password"
                            name='confirmPassword'
                            placeholder='Enter Confirm Password' id='password' required
                        />
                    </div>

                    <div className='flex items-center w-full gap-3 mb-5'>
                        <input
                            className='w-4 h-4 text-blue-600 overflow-hidden bg-gray-100 rounded border-gray-300 focus:ring-blue-500'
                            type="checkbox" name='checkbox'
                            id='checkbox' required
                        />
                        <label htmlFor="checkbox" className='text-sm font-semibold'>I agree to privacy policy & terms</label>
                    </div>

                    <button
                        disabled={loader ? true : false}
                        className='bg-pink-500 w-full hover:bg-pink-600 text-white rounded-md px-7 py-2 mb-5'
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
                            ) : 'Register'
                        }
                    </button>

                    <div className='flex items-center mb-3 gap-3 justify-center text-sm'>
                        <p>Already have an account?
                            <Link to='/seller/login' className='hover:underline text-pink-500'> Login now!</Link></p>
                    </div>

                    <div className='w-full flex justify-center items-center mb-3'>
                        <div className='w-[45%] bg-slate-300 h-[1px]'></div>
                        <div className='w-[10%] flex justify-center items-center'>
                            <span className='pb-1'>or</span>
                        </div>
                        <div className='w-[45%] bg-slate-300 h-[1px]'></div>
                    </div>
                    <div className='flex justify-center items-center text-white gap-3'>
                        <div className='w-[35px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                            <span><AiOutlineGooglePlus /></span>
                        </div>
                        <div className='w-[35px] h-[35px] flex rounded-md bg-indigo-700 shadow-lg hover:shadow-indigo-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                            <span><FiFacebook /></span>
                        </div>
                        <div className='w-[35px] h-[35px] flex rounded-md bg-cyan-700 shadow-lg hover:shadow-cyan-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                            <span><CiTwitter /></span>
                        </div>
                        <div className='w-[35px] h-[35px] flex rounded-md bg-purple-700 shadow-lg hover:shadow-purple-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                            <span><AiOutlineGithub /></span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SellerRegister