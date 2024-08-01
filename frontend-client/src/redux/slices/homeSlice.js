import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true
})

export const get_category = createAsyncThunk(
    'product/get_category',
    async (_, { fulfillWithValue }) => {
        try {
            const { data } = await api.get('/home/get-categorys')

            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const get_products = createAsyncThunk(
    'product/get_products',
    async (_, { fulfillWithValue }) => {
        try {
            const { data } = await api.get('/home/get-products')

            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const get_product = createAsyncThunk(
    'product/get_product',
    async (slug, {
        fulfillWithValue
    }) => {
        try {
            const {
                data
            } = await api.get(`/home/get-product/${slug}`)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const price_range_product = createAsyncThunk(
    'product/price_range_product',
    async (_, { fulfillWithValue }) => {
        try {
            const { data } = await api.get('/home/price-range-latest-product')

            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const get_banners = createAsyncThunk(
    'product/get_banners',
    async (_, {
        fulfillWithValue
    }) => {
        try {
            const {
                data
            } = await api.get('/banners')
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const query_products = createAsyncThunk(
    'product/query_products',
    async (query, { fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/home/query-products?category=${query.category}&&rating=${query.rating}&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${query.sortPrice}&&pageNumber=${query.pageNumber}&&searchValue=${query.searchValue ? query.searchValue : ''}`)

            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const customer_review = createAsyncThunk(
    'review/customer_review',
    async (info, {
        fulfillWithValue
    }) => {
        try {
            const {
                data
            } = await api.post('/home/customer/submit-review', info)
            return fulfillWithValue(data)
        } catch (error) {

        }
    }
)

export const get_reviews = createAsyncThunk(
    'review/get_reviews',
    async ({
        productId,
        pageNumber
    }, {
        fulfillWithValue
    }) => {
        try {
            const {
                data
            } = await api.get(`/home/customer/get-reviews/${productId}?pageNo=${pageNumber}`)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {

        }
    }
)


export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        categories: [],
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
        totalReview: 0,
        rating_review: [],
        reviews: [],
        banners: []
    },
    reducers: {
        messageClear: (state, _) => {
            state.successMessage = ""
            state.errorMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_category.fulfilled, (state, action) => {
                state.categories = action.payload.categories;
            })
            .addCase(get_products.fulfilled, (state, action) => {
                state.products = action.payload.products;
                state.latest_products = action.payload.latest_products;
                state.topRated_products = action.payload.topRated_products;
                state.discount_products = action.payload.discount_products;
            })
            // .addCase(getProduct.fulfilled, (state, action) => {
            //     state.product = action.payload.product;
            //     state.relatedProducts = action.payload.relatedProducts;
            //     state.moreProducts = action.payload.moreProducts;
            // })
            .addCase(price_range_product.fulfilled, (state, action) => {
                state.latest_products = action.payload.latest_product;
                state.priceRange = action.payload.priceRange;
            })
            .addCase(query_products.fulfilled, (state, action) => {
                state.products = action.payload.products;
                state.totalProduct = action.payload.totalProduct;
                state.parPage = action.payload.parPage;
            })
        // .addCase(customerReview.fulfilled, (state, action) => {
        //     state.successMessage = action.payload.message;
        // })
        // .addCase(getReviews.fulfilled, (state, action) => {
        //     state.reviews = action.payload.reviews;
        //     state.totalReview = action.payload.totalReview;
        //     state.rating_review = action.payload.rating_review;
        // })
        // .addCase(getBanners.fulfilled, (state, action) => {
        //     state.banners = action.payload.banners;
        // });
    }
})
export const {
    messageClear
} = homeSlice.actions

export default homeSlice.reducer