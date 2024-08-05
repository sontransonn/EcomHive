import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/client",
    withCredentials: true
})

const initialState = {
    products: [],
    totalProduct: 0,
    parPage: 4,
    latest_products: [],
    topRated_products: [],
    discount_products: [],
    priceRange: {
        low: 0,
        high: 100
    },
    product: {},
    relatedProducts: [],
    moreProducts: [],
    successMessage: '',
    errorMessage: '',
}

// Lấy ra các loại sản phẩm
export const get_products = createAsyncThunk(
    'product/get_products',
    async (_, { fulfillWithValue }) => {
        try {
            const { data } = await api.get('/get-products')

            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

// lấy ra các sản phẩm theo query
export const get_products_by_query = createAsyncThunk(
    'product/get_products_by_query',
    async (query, { fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-products-by-query?category=${query.category}&&rating=${query.rating}&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${query.sortPrice}&&pageNumber=${query.pageNumber}&&searchValue=${query.searchValue ? query.searchValue : ''}`)

            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

// Lấy ra sản phẩm theo slug
export const get_product_by_slug = createAsyncThunk(
    'product/get_product_by_slug',
    async (slug, { fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-product-by-slug/${slug}`)

            console.log(data);
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

// Lấy ra các sản phẩm mới nhất và phạm vi giá của các sản phẩm 
export const price_range_products = createAsyncThunk(
    'product/price_range_products',
    async (_, { fulfillWithValue }) => {
        try {
            const { data } = await api.get('/price-range-products')

            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        messageClear: (state, _) => {
            state.successMessage = ""
            state.errorMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_products.fulfilled, (state, action) => {
                state.products = action.payload.products;
                state.latest_products = action.payload.latest_products;
                state.topRated_products = action.payload.topRated_products;
                state.discount_products = action.payload.discount_products;
            })
            .addCase(get_products_by_query.fulfilled, (state, action) => {
                state.products = action.payload.products;
                state.totalProduct = action.payload.totalProduct;
                state.parPage = action.payload.parPage;
            })
            .addCase(get_product_by_slug.fulfilled, (state, action) => {
                state.product = action.payload.product;
                state.relatedProducts = action.payload.relatedProducts;
                state.moreProducts = action.payload.moreProducts;
            })
            .addCase(price_range_products.fulfilled, (state, action) => {
                state.latest_products = action.payload.latest_products;
                state.priceRange = action.payload.priceRange;
            })
    }
})
export const {
    messageClear
} = productSlice.actions

export default productSlice.reducer