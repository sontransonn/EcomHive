import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import { add_product_to_cart, messageClear as messageClearOfCart } from "../../../redux/slices/cartSlice"
import { add_product_to_wishlist, messageClear as messageClearOfWishlist } from "../../../redux/slices/wishlistSlice"

import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaEye } from 'react-icons/fa'

import Rating from '../../../components/Rating'

const FeatureProducts = ({ products }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo } = useSelector(state => state.auth)
    const { successMessage: successMessageOfWishlist, errorMessage: errorMessageOfWishlist } = useSelector(state => state.wishlist)
    const { successMessage: successMessageOfCart, errorMessage: errorMessageOfCart } = useSelector(state => state.cart)

    useEffect(() => {
        if (successMessageOfWishlist) {
            toast.success(successMessageOfWishlist)
            dispatch(messageClearOfWishlist())
        }
        if (errorMessageOfWishlist) {
            toast.error(errorMessageOfWishlist)
            dispatch(messageClearOfWishlist())
        }
    }, [errorMessageOfWishlist, successMessageOfWishlist])

    useEffect(() => {
        if (successMessageOfCart) {
            toast.success(successMessageOfCart)
            dispatch(messageClearOfCart())
        }
        if (errorMessageOfCart) {
            toast.error(errorMessageOfCart)
            dispatch(messageClearOfCart())
        }
    }, [errorMessageOfCart, successMessageOfCart])

    const handleAddProductToCart = (id) => {
        if (userInfo) {
            dispatch(add_product_to_cart({
                userId: userInfo.id,
                quantity: 1,
                productId: id
            }))
        } else {
            navigate('/login')
        }
    }

    const handleAddProductToWishlist = (pro) => {
        dispatch(add_product_to_wishlist({
            userId: userInfo.id,
            productId: pro._id,
            name: pro.name,
            price: pro.price,
            image: pro.images[0],
            discount: pro.discount,
            rating: pro.rating,
            slug: pro.slug
        }))
    }

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
                    products.map((product, i) => (
                        <div key={i} className='border group transition-all duration-500 hover:shadow-md hover:-mt-3'>
                            <div className='relative overflow-hidden'>
                                {
                                    product.discount ? <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>{product.discount}%</div> : ""
                                }
                                <img
                                    className='sm:w-full w-full h-[240px]'
                                    src={product.images[0]}
                                    alt="product image"
                                />
                                <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                                    <li
                                        onClick={() => handleAddProductToWishlist(product)}
                                        className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'
                                    >
                                        <AiFillHeart />
                                    </li>
                                    <Link
                                        to={`/product/details/${product.slug}`}
                                        className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'
                                    >
                                        <FaEye />
                                    </Link>
                                    <li
                                        onClick={() => handleAddProductToCart(product._id)}
                                        className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'
                                    >
                                        <AiOutlineShoppingCart />
                                    </li>
                                </ul>
                            </div>
                            <div className='py-3 text-slate-600 px-2'>
                                <h2>{product.name}</h2>
                                <div className='flex justify-start items-center gap-3'>
                                    <span className='text-lg  font-bold'>${product.price}</span>
                                    <div className='flex'>
                                        <Rating ratings={product.rating} />
                                    </div>
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