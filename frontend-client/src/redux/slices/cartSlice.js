import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/client",
    withCredentials: true
})

const initialState = {
    card_products: [],
    card_product_count: 0,
    buy_product_item: 0,
    price: 0,
    errorMessage: '',
    successMessage: '',
    shipping_fee: 0,
    outofstock_products: []
}

// Lấy ra các sản phẩm trong giỏ hàng
export const get_products_in_cart = createAsyncThunk(
    'cart/get_products_in_cart',
    async (userId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-products-in-cart/${userId}`)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Thêm sản phẩm vào giỏ hàng (Client)
export const add_product_to_cart = createAsyncThunk(
    'cart/add_product_to_cart',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/add-product-to-cart', info)

            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(error.response.data)
        }
    }
)

// Tăng số lượng sản phẩm
export const quantity_inc = createAsyncThunk(
    'cart/quantity_inc',
    async (card_id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/quantity-inc/${card_id}`)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Giảm số lượng sản phẩm
export const quantity_dec = createAsyncThunk(
    'cart/quantity_dec',
    async (card_id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/quantity-dec/${card_id}`)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Xóa sản phẩm trong giỏ hàng
export const delete_product_in_cart = createAsyncThunk(
    'cart/delete_product_in_cart',
    async (card_id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.delete(`/delete-product-in-cart/${card_id}`)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        },
        reset_count: (state, _) => {
            state.card_product_count = 0
            state.wishlist_count = 0
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_products_in_cart.fulfilled, (state, { payload }) => {
                state.card_products = payload.card_products;
                state.price = payload.price;
                state.card_product_count = payload.card_product_count;
                state.shipping_fee = payload.shipping_fee;
                state.outofstock_products = payload.outOfStockProduct;
                state.buy_product_item = payload.buy_product_item;
            })
            .addCase(add_product_to_cart.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
            })
            .addCase(add_product_to_cart.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
                state.card_product_count += 1;
            })
            .addCase(quantity_inc.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            })
            .addCase(quantity_dec.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            })
            .addCase(delete_product_in_cart.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            })
    }
})

export const {
    messageClear,
    reset_count
} = cartSlice.actions

export default cartSlice.reducer