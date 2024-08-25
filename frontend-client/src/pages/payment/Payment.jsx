import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

import MainLayout from "../../layouts/MainLayout"

const Payment = () => {
    const { state: { price, items, orderId } } = useLocation()

    const [paymentMethod, setPaymentMethod] = useState('stripe')

    return (
        <MainLayout>
            <section className='bg-[#eeeeee] w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-10'>
                <div className='flex flex-wrap md:flex-col-reverse'>
                    <div className='w-7/12 md:w-full'>
                        <div className='pr-2 md:pr-0'>
                            <div className='flex flex-wrap'>
                                <div onClick={() => setPaymentMethod('stripe')} className={`w-[20%] border-r cursor-pointer py-8 px-12 ${paymentMethod === 'stripe' ? 'bg-white' : 'bg-slate-100'}`}>
                                    <div className='flex flex-col gap-[3px] justify-center items-center'>
                                        <img src="http://localhost:3000/images/payment/stripe.png" alt="stripe" />
                                        <span className='text-slate-600'>Stripe</span>
                                    </div>
                                </div>
                                <div onClick={() => setPaymentMethod('bkash')} className={`w-[20%] border-r cursor-pointer py-8 px-12 ${paymentMethod === 'bkash' ? 'bg-white' : 'bg-slate-100'}`}>
                                    <div className='flex flex-col gap-[3px] justify-center items-center'>
                                        <img src="http://localhost:3000/images/payment/bkash.png" alt="bkash" />
                                        <span className='text-slate-600'>Zalo</span>
                                    </div>
                                </div>
                                <div onClick={() => setPaymentMethod('nogot')} className={`w-[20%] border-r cursor-pointer py-8 px-12 ${paymentMethod === 'nogot' ? 'bg-white' : 'bg-slate-100'}`}>
                                    <div className='flex flex-col gap-[3px] justify-center items-center'>
                                        <img src="http://localhost:3000/images/payment/nogot.png" alt="nogot" />
                                        <span className='text-slate-600'>Momo</span>
                                    </div>
                                </div>
                                <div onClick={() => setPaymentMethod('roket')} className={`w-[20%] border-r cursor-pointer py-8 px-12 ${paymentMethod === 'roket' ? 'bg-white' : 'bg-slate-100'}`}>
                                    <div className='flex flex-col gap-[3px] justify-center items-center'>
                                        <img src="http://localhost:3000/images/payment/roket.png" alt="roket" />
                                        <span className='text-slate-600'>Roket</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-5/12 md:w-full'>
                        <div className='pl-2 md:pl-0 md:mb-0'>
                            <div className='bg-white shadow p-5 text-slate-600 flex flex-col gap-3'>
                                <h2>Order Summary</h2>
                                <div className='flex justify-between items-center'>
                                    <span>{items} items and shipping fee included</span>
                                    <span>${price}</span>
                                </div>
                                <div className='flex justify-between items-center font-semibold'>
                                    <span>Total Amount</span>
                                    <span className='text-lg text-orange-500'>${price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default Payment