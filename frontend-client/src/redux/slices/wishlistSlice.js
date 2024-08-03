import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/client",
    withCredentials: true
})

const initialState = {
    wishlist_count: 0,
    wishlist: [],
    errorMessage: '',
    successMessage: '',
}

// Lấy ra các sản phẩm trong danh sách yêu thích
export const get_products_in_wishlist = createAsyncThunk(
    'wishlist/get_products_in_wishlist',
    async (userId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-products-in-wishlist/${userId}`)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Thêm sản phẩm vào danh sách yêu thích
export const add_product_to_wishlist = createAsyncThunk(
    'wishlist/add_product_to_wishlist',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/add-product-to-wishlist', info)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Xóa sản phẩm trong danh sách yêu thích
export const delete_product_in_wishlist = createAsyncThunk(
    'wishlist/delete_product_in_wishlist',
    async (wishlistId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.delete(`/product/delete-product-in-wishlist/${wishlistId}`)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        },
        reset_count: (state, _) => {
            state.wishlist_count = 0
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_products_in_wishlist.fulfilled, (state, { payload }) => {
                state.wishlist = payload.wishlists;
                state.wishlist_count = payload.wishlistCount;
            })
            .addCase(add_product_to_wishlist.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
            })
            .addCase(add_product_to_wishlist.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
                state.wishlist_count = state.wishlist_count > 0 ? state.wishlist_count + 1 : 1;
            })
            .addCase(delete_product_in_wishlist.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
                state.wishlist = state.wishlist.filter(p => p._id !== payload.wishlistId);
                state.wishlist_count -= 1;
            });
    }
})

export const {
    messageClear,
    reset_count
} = wishlistSlice.actions

export default wishlistSlice.reducer