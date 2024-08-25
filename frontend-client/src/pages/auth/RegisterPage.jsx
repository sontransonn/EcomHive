import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import FadeLoader from 'react-spinners/FadeLoader'
import toast from 'react-hot-toast'

import {
    customer_register,
    messageClear
} from "../../redux/slices/authSlice"

import { FaFacebookF } from 'react-icons/fa'
import { AiOutlineGoogle } from 'react-icons/ai'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdQrCode2 } from "react-icons/md";

import AuthLayout from '../../layouts/AuthLayout'

const RegisterPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        loader,
        successMessage, errorMessage, userInfo
    } = useSelector(state => state.auth)

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (userInfo) {
            navigate('/')
        }
    }, [successMessage, errorMessage])

    const inputHandle = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const register = (e) => {
        e.preventDefault()
        if (!formData.name || !formData.email || !formData.password) {
            toast.error("Vui lòng điền đầy đủ thông tin!")
            return
        }

        dispatch(customer_register(formData))
    }

    return (
        <AuthLayout auth="Đăng ký">
            {loader && (
                <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]' >
                    <FadeLoader />
                </div>
            )}
            <div className='w-full flex justify-end items-end relative'>
                <img
                    src={"http://localhost:3000/images/auth.jpg"}
                    alt=""
                    className='w-full'
                />
                <div className='w-[25%] bg-white flex flex-col gap-3 rounded-md px-7 py-5 mr-8 absolute top-1/2 right-1 transform -translate-y-1/2'>
                    <div className='w-full flex justify-between items-center'>
                        <h2 className='text-2xl text-slate-600 font-bold'>Đăng ký</h2>
                        <div className='flex items-center cursor-pointer'>
                            <MdQrCode2 size={30} />
                        </div>
                    </div>

                    <form
                        onSubmit={register}
                        className='text-slate-600 flex flex-col gap-5'
                    >
                        <div className='flex flex-col'>
                            <input
                                onChange={inputHandle}
                                value={formData.name} type="text"
                                className='w-full px-3 py-2 border text-sm outline-none'
                                id='name' name='name'
                                placeholder='Tên đăng nhập' required
                            />
                        </div>

                        <div className='flex flex-col'>
                            <input
                                onChange={inputHandle}
                                value={formData.email} type="email"
                                className='w-full px-3 py-2 border text-sm outline-none'
                                id='email' name='email'
                                placeholder='Email' required
                            />
                        </div>

                        <div className='flex flex-col relative'>
                            <input
                                onChange={inputHandle}
                                value={formData.password}
                                type={showPassword ? "text" : "password"}
                                className='w-full px-3 py-2 border text-sm outline-none'
                                id='password' name='password'
                                placeholder='Mật khẩu' required
                            />
                            {showPassword ? (
                                <FaEye
                                    className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer'
                                    onClick={() => setShowPassword(prev => !prev)}
                                />
                            ) : (
                                <FaEyeSlash
                                    className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer'
                                    onClick={() => setShowPassword(prev => !prev)}
                                />
                            )}
                        </div>

                        <button className='px-8 w-full py-2 bg-purple-500 shadow-lg hover:shadow-indigo-500/30 text-white rounded-md'>
                            Đăng ký
                        </button>
                    </form>

                    <div className='flex justify-center items-center'>
                        <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                        <span className='px-3 text-slate-300 text-sm'>Hoặc</span>
                        <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                    </div>

                    <button className='px-8 w-full py-2 bg-indigo-500 text-white flex justify-center items-center gap-2'>
                        <span><FaFacebookF /></span>
                        <span className='text-sm'>Đăng nhập với Facebook</span>
                    </button>

                    <button className='px-8 w-full py-2 bg-orange-500 text-white flex justify-center items-center gap-2'>
                        <span><AiOutlineGoogle /></span>
                        <span className='text-sm'>Đăng nhập với Google</span>
                    </button>

                    <div className='text-center text-slate-600'>
                        <p className='text-sm'>Bạn đã có tài khoản?
                            <Link className='text-blue-500 text-sm' to='/login'>
                                {" "}Đăng nhập
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default RegisterPage