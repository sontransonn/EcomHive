import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/dashboard',
    withCredentials: true
})

// Thêm product (Seller)
export const add_product = createAsyncThunk(
    'product/add_product',
    async (product, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/add-product', product)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Lấy các product theo query
export const get_products_by_query = createAsyncThunk(
    'product/get_products_by_query',
    async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-products-by-query?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Lấy product theo productId
export const get_product_by_productId = createAsyncThunk(
    'product/get_product_by_productId',
    async (productId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-product-by-productId/${productId}`)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Update product theo productId
export const update_product_by_productId = createAsyncThunk(
    'product/update_product_by_productId',
    async (product, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/update-product-by-productId', product)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Update image product theo productId
export const update_product_image_by_productId = createAsyncThunk(
    'product/update_product_image_by_productId',
    async ({ oldImage, newImage, productId }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const formData = new FormData()

            formData.append('oldImage', oldImage)
            formData.append('newImage', newImage)
            formData.append('productId', productId)

            const { data } = await api.post('/update-product-image-by-productId', formData)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        products: [],
        product: '',
        totalProduct: 0
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_product.pending, (state, action) => {
                state.loader = true
            })
            .addCase(add_product.rejected, (state, action) => {
                state.loader = false
                state.errorMessage = action.payload.error
            })
            .addCase(add_product.fulfilled, (state, action) => {
                state.loader = false
                state.successMessage = action.payload.message
            })
            .addCase(get_products_by_query.fulfilled, (state, action) => {
                state.totalProduct = action.payload.totalProduct
                state.products = action.payload.products
            })
            .addCase(get_product_by_productId.fulfilled, (state, action) => {
                state.product = action.payload.product
            })
            .addCase(update_product_by_productId.pending, (state, action) => {
                state.loader = true
            })
            .addCase(update_product_by_productId.rejected, (state, action) => {
                state.loader = false
                state.errorMessage = action.payload.error
            })
            .addCase(update_product_by_productId.fulfilled, (state, action) => {
                state.loader = false
                state.product = action.payload.product
                state.successMessage = action.payload.message
            })
            .addCase(update_product_image_by_productId.fulfilled, (state, action) => {
                state.product = action.payload.product
                state.successMessage = action.payload.message
            })
    }
})

export const {
    messageClear
} = productSlice.actions

export default productSlice.reducer