import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import {
    messageClear,
    get_products_in_cart,
    quantity_inc,
    quantity_dec,
    delete_product_in_cart,
} from "../../redux/slices/cartSlice"

import MainLayout from "../../layouts/MainLayout"

const Cart = () => {
    const navegate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo } = useSelector(state => state.auth)
    const {
        card_products,
        successMessage, price,
        buy_product_item, shipping_fee, outofstock_products
    } = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(get_products_in_cart(userInfo.id))
    }, [])

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            dispatch(get_products_in_cart(userInfo.id))

        }
    }, [successMessage])

    const inc = (quantity, stock, card_id) => {
        const temp = quantity + 1;
        if (temp <= stock) {
            dispatch(quantity_inc(card_id))
        }
    }

    const dec = (quantity, card_id) => {
        const temp = quantity - 1;
        if (temp !== 0) {
            dispatch(quantity_dec(card_id))
        }
    }

    const redirect = () => {
        navegate('/shipping', {
            state: {
                products: card_products,
                price: price,
                shipping_fee: shipping_fee,
                items: buy_product_item
            }
        })
    }

    return (
        <MainLayout>
            <section className='bg-[#eeeeee] w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90] mx-auto py-10'>
                {card_products.length > 0 || outofstock_products.length > 0 ? (
                    <div className='flex flex-wrap'>
                        <div className='w-[67%] md-lg:w-full'>
                            <div className='pr-3 md-lg:pr-0'>
                                <div className='flex flex-col gap-3'>
                                    <div className='bg-white p-4'>
                                        <h2 className='text-md text-green-500 font-semibold'>Stock Products {card_products.length}</h2>
                                    </div>

                                    {card_products.map((p, i) => (
                                        <div className='flex bg-white p-4 flex-col gap-2'>
                                            <div className='flex justify-start items-center'>
                                                <h2 className='text-md text-slate-600'>{p.shopName}</h2>
                                            </div>
                                            {p.products.map((pt, i) => (<div className='w-full flex flex-wrap'>
                                                <div className='flex sm:w-full gap-2 w-7/12'>
                                                    <div className='flex gap-2 justify-start items-center'>
                                                        <img className='w-[80px] h-[80px]' src={pt.productInfo.images[0]} alt="product image" />
                                                        <div className='pr-4 text-slate-600'>
                                                            <h2 className='text-md'>{pt.productInfo.name}</h2>
                                                            <span className='text-sm'>Brand : {pt.productInfo.brand}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex justify-between w-5/12 sm:w-full sm:mt-3'>
                                                    <div className='pl-4 sm:pl-0'>
                                                        <h2 className='text-lg text-orange-500'>${pt.productInfo.price - Math.floor((pt.productInfo.price * pt.productInfo.discount) / 100)} </h2>
                                                        <p className='line-through'>{pt.productInfo.price}</p>
                                                        <p>-{pt.productInfo.discount}%</p>
                                                    </div>
                                                    <div className='flex gap-2 flex-col'>
                                                        <div className='flex bg-slate-200 h-[30px] justify-center items-center text-xl'>
                                                            <div onClick={() => dec(pt.quantity, pt._id)} className='px-3 cursor-pointer'>-</div>
                                                            <div className='px-3'>{pt.quantity}</div>
                                                            <div onClick={() => inc(pt.quantity, pt.productInfo.stock, pt._id)} className='px-3 cursor-pointer'>+</div>
                                                        </div>
                                                        <button
                                                            onClick={() => dispatch(delete_product_in_cart(pt._id))}
                                                            className='px-5 py-[3px] bg-red-500 text-white'
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            ))}
                                        </div>
                                    ))}

                                    {outofstock_products.length > 0 && (
                                        <div className='flex flex-col gap-3'>
                                            <div className='bg-white p-4'>
                                                <h2 className='text-md text-red-500 font-semibold'>Out of Stock  {outofstock_products.length}</h2>
                                            </div>
                                            <div className='bg-white p-4'>
                                                {outofstock_products.map((p, i) => (
                                                    <div key={i} className='w-full flex flex-wrap'>
                                                        <div className='flex sm:w-full gap-2 w-7/12'>
                                                            <div className='flex gap-2 justify-start items-center'>
                                                                <img className='w-[80px] h-[80px]' src={p.products[0].images[0]} alt="product image" />
                                                                <div className='pr-4 text-slate-600'>
                                                                    <h2 className='text-md'>{p.products[0].name}</h2>
                                                                    <span className='text-sm'>Brand : {p.products[0].brand}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='flex justify-between w-5/12 sm:w-full sm:mt-3'>
                                                            <div className='pl-4 sm:pl-0'>
                                                                <h2 className='text-lg text-orange-500'>${p.products[0].price - Math.floor((p.products[0].price * p.products[0].discount) / 100)} </h2>
                                                                <p className='line-through'>{p.products[0].price}</p>
                                                                <p>-{p.products[0].discount}%</p>
                                                            </div>
                                                            <div className='flex gap-2 flex-col'>
                                                                <div className='flex bg-slate-200 h-[30px] justify-center items-center text-xl'>
                                                                    <div onClick={() => dec(p.quantity, p._id)} className='px-3 cursor-pointer'>-</div>
                                                                    <div className='px-3'>{p.quantity}</div>
                                                                    <div onClick={() => dec(p.quantity, p.products[0].stock, p._id)} className='px-3 cursor-pointer'>+</div>
                                                                </div>
                                                                <button onClick={() => dispatch(delete_product_in_cart(p._id))} className='px-5 py-[3px] bg-red-500 text-white'>Delete</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='w-[33%] md-lg:w-full'>
                            <div className='pl-3 md-lg:pl-0 md-lg:mt-5'>
                                {card_products.length > 0 && (
                                    <div className='bg-white p-3 text-slate-600 flex flex-col gap-3'>
                                        <h2 className='text-xl font-bold'>Order Summary</h2>
                                        <div className='flex justify-between items-center'>
                                            <span>{buy_product_item} Item</span>
                                            <span>${price}</span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span>Shipping Fee</span>
                                            <span>${shipping_fee}</span>
                                        </div>
                                        <div className='flex gap-2'>
                                            <input className='w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500 rounded-sm' type="text" placeholder='Input Vauchar Coupon' />
                                            <button className='px-5 py-[1px] bg-blue-500 text-white rounded-sm uppercase text-sm'>Apply</button>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span>Total</span>
                                            <span className='text-lg text-orange-500'>${price + shipping_fee}</span>
                                        </div>
                                        <button onClick={redirect} className='px-5 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-sm text-white uppercase'>Proceed to checkout {buy_product_item}</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <Link className='px-4 py-1 bg-indigo-500 text-white' to='/shop'>Shop Now</Link>
                    </div>
                )}
            </section>
        </MainLayout>
    )
}

export default Cart