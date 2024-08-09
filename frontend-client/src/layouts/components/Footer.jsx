import React from 'react'

import { FaFacebookF, FaLinkedin } from 'react-icons/fa'
import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai'

const Footer = () => {
    return (
        <footer className='bg-black'>
            <div className='w-[85%] flex flex-wrap mx-auto border-b py-16 md-lg:pb-10 sm:pb-6'>
                {/* Info */}
                <div className='w-3/12 lg:w-4/12 sm:w-full'>
                    <div className='flex flex-col gap-3'>
                        <img
                            className='w-[190px] h-[70x]'
                            src="http://localhost:5173/images/logo.png"
                            alt="logo"
                        />
                        <ul className='flex flex-col gap-2 text-slate-300'>
                            <li>Address: Hà Nội</li>
                            <li>Phone: +84 0866509926</li>
                            <li>Email: sontransonn@gmail.com</li>
                        </ul>
                    </div>
                </div>

                <div className='w-5/12 lg:w-8/12 sm:w-full'>
                    <div className='flex justify-center sm:justify-start sm:mt-6 w-full'>
                        <div>
                            <div className='flex justify-between gap-[80px] lg:gap-[40px]'>
                                {/* Getting Started */}
                                <ul className='flex flex-col gap-2 text-slate-300 text-sm'>
                                    <li className='text-2xl text-white font-semibold'>
                                        Getting Started
                                    </li>
                                    <li>Introduction</li>
                                    <li>Themes</li>
                                    <li>Documentation</li>
                                    <li>Usages</li>
                                    <li>Elements</li>
                                    <li>Global</li>
                                </ul>

                                {/* Resources */}
                                <ul className='flex flex-col gap-2 text-slate-300 text-sm'>
                                    <li className='text-2xl text-white font-semibold'>
                                        Resources
                                    </li>
                                    <li>API</li>
                                    <li>Form Validation</li>
                                    <li> Accessibility</li>
                                    <li>Marketplace</li>
                                    <li>Visibility</li>
                                    <li>Community</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-4/12 lg:w-full lg:mt-6'>
                    <div className='w-full flex flex-col justify-start gap-5'>
                        <h2 className='font-bold text-2xl text-white'>Newsletter</h2>
                        <p className='text-slate-300'>
                            Subcribe to our newsletter for a weekly close of news, updates, helpful tips,
                            and exclusive offers
                        </p>
                        <div className='h-[50px] w-full bg-white border relative'>
                            <input
                                placeholder='Your Email'
                                className='h-full bg-transparent w-full px-3 outline-0'
                                type="text"
                            />
                            <button
                                className='h-full absolute right-0 bg-indigo-500 hover:bg-indigo-700 text-white uppercase px-4 font-bold text-sm'
                            >
                                Subscribe
                            </button>
                        </div>
                        <ul className='flex justify-start items-center gap-3'>
                            <li className='cursor-pointer w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full' href="#">
                                <FaFacebookF />
                            </li>
                            <li className='cursor-pointer w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full' href="#">
                                <AiOutlineTwitter />
                            </li>
                            <li className='cursor-pointer w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full' href="#">
                                <FaLinkedin />
                            </li>
                            <li className='cursor-pointer w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full' href="#">
                                <AiFillGithub />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer