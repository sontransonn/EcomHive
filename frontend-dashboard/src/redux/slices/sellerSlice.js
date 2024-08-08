import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/dashboard',
    withCredentials: true
})

// Lấy ra các seller ở trạng thái pending theo query
export const get_pending_sellers_by_query = createAsyncThunk(
    'seller/get_pending_sellers_by_query',
    async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-pending-sellers-by-query?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Lấy ra các seller ở trạng thái active theo query
export const get_active_sellers_by_query = createAsyncThunk(
    'seller/get_active_sellers_by_query',
    async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-active-sellers-by-query?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Lấy ra các seller ở trạng thái deactive theo query
export const get_deactive_sellers_by_query = createAsyncThunk(
    'seller/get_deactive_sellers_by_query',
    async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-deactive-sellers-by-query?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Lấy seller theo sellerId
export const get_seller_by_sellerId = createAsyncThunk(
    'seller/get_seller_by_sellerId',
    async (sellerId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-seller-by-sellerId/${sellerId}`)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// Update trạng thái seller theo sellerId
export const update_status_seller_by_sellerId = createAsyncThunk(
    'seller/update_status_seller_by_sellerId',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post(`/update-status-seller-by-sellerId`, info)

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const create_stripe_connect_account = createAsyncThunk(
    'seller/create_stripe_connect_account',
    async () => {
        try {
            const { data: { url } } = await api.get(`/payment/create-stripe-connect-account`)
            window.location.href = url
            // return fulfillWithValue(data)
        } catch (error) {
            //return rejectWithValue(error.response.data)
        }
    }
)

export const active_stripe_connect_account = createAsyncThunk(
    'seller/active_stripe_connect_account',
    async (activeCode, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/payment/active-stripe-connect-account/${activeCode}`, {})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const sellerSlice = createSlice({
    name: 'seller',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        sellers: [],
        totalSeller: 0,
        seller: ''
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_pending_sellers_by_query.fulfilled, (state, action) => {
                state.sellers = action.payload.sellers
                state.totalSeller = action.payload.totalSeller
            })
            .addCase(get_active_sellers_by_query.fulfilled, (state, action) => {
                state.sellers = action.payload.sellers
                state.totalSeller = action.payload.totalSeller
            })
            .addCase(get_deactive_sellers_by_query.fulfilled, (state, action) => {
                state.sellers = action.payload.sellers
                state.totalSeller = action.payload.totalSeller
            })
            .addCase(get_seller_by_sellerId.fulfilled, (state, action) => {
                state.seller = action.payload.seller
            })
            .addCase(update_status_seller_by_sellerId.fulfilled, (state, action) => {
                state.seller = action.payload.seller
                state.successMessage = action.payload.message
            })
            .addCase(active_stripe_connect_account.pending, (state, action) => {
                state.loader = true
            })
            .addCase(active_stripe_connect_account.rejected, (state, action) => {
                state.loader = false
                state.errorMessage = action.payload.message
            })
            .addCase(active_stripe_connect_account.fulfilled, (state, action) => {
                state.loader = false
                state.successMessage = action.payload.message
            })
    }
})

export const {
    messageClear
} = sellerSlice.actions

export default sellerSlice.reducer