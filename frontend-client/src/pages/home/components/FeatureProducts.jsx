import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaEye } from 'react-icons/fa'

const FeatureProducts = () => {
    return (
        <div className='w-[85%] flex flex-wrap mx-auto'>
            <div className='w-full'>
                <div className='text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]'>
                    <h2>Feature Products</h2>
                    <div className='w-[100px] h-[4px] bg-[#7fad39] mt-4'></div>
                </div>
            </div>

            <div className='w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
                {
                    [1, 2, 3, 4, 5, 6, 7].map((p, i) => (
                        <div key={i} className='border group transition-all duration-500 hover:shadow-md hover:-mt-3'>
                            <div className='relative overflow-hidden'>
                                {/* {
                                    p.discount ? <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>{p.discount}%</div> : ""
                                } */}
                                <img
                                    className='sm:w-full w-full h-[240px]'
                                    src={`http://localhost:5173/images/products/${p}.webp`}
                                    alt="product image"
                                />

                                <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                                    <li
                                        // onClick={() => add_wishlist(p)}
                                        className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'
                                    >
                                        <AiFillHeart />
                                    </li>

                                    <Link to={`/product/details/${p.slug}`} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all' ><FaEye /></Link>

                                    <li
                                        // onClick={() => add_card(p._id)}
                                        className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'
                                    >
                                        <AiOutlineShoppingCart />
                                    </li>
                                </ul>
                            </div>

                            <div className='py-3 text-slate-600 px-2'>
                                <h2>ASUS X515</h2>
                                <div className='flex justify-start items-center gap-3'>
                                    <span className='text-lg  font-bold'>${p.price}</span>
                                    {/* <div className='flex'>
                                        <Ratings ratings={p.rating} />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FeatureProducts