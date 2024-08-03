import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    get_products
} from "../../redux/slices/productSlice"

import MainLayout from '../../layouts/MainLayout'
import Banner from './components/Banner'
import Categories from './components/Categories'
import FeatureProducts from './components/FeatureProducts'
import Products from '../../components/Products'

const HomePage = () => {
    const dispatch = useDispatch()

    const {
        products,
        latest_products,
        topRated_products,
        discount_products
    } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(get_products())
    }, [])

    return (
        <MainLayout>
            <Banner />
            <Categories />

            <FeatureProducts
                products={products}
            />

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
        </MainLayout>
    )
}

export default HomePage