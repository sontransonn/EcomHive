import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    get_category,
    get_products
} from "../../redux/slices/homeSlice"

import Header from '../../components/Header'
import Banner from './components/Banner'
import Categories from './components/Categories'
import FeatureProducts from './components/FeatureProducts'
import Products from './components/Products'
import Footer from '../../components/Footer'

const Home = () => {
    const dispatch = useDispatch()

    const {
        products,
        latest_products,
        topRated_products,
        discount_products
    } = useSelector(state => state.home)

    useEffect(() => {
        dispatch(get_products())
    }, [])

    return (
        <div className='w-full'>
            <Header />
            <Banner />
            <div className='my-4'>
                <Categories />
            </div>
            <div className='py-[45px]'>
                <FeatureProducts products={products} />
            </div>

            <div className='py-10'>
                <div className='w-[85%] flex flex-wrap mx-auto'>
                    <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
                        <div className='overflow-hidden'>
                            <Products title='Latest Products' products={latest_products} />
                        </div>
                        <div className='overflow-hidden'>
                            <Products title='Top Rated Products' products={topRated_products} />
                        </div>
                        <div className='overflow-hidden'>
                            <Products title='Discount Products' products={discount_products} />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Home