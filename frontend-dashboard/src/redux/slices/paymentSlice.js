import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/payment',
    withCredentials: true
})

export const create_stripe_connect_account = createAsyncThunk(
    'seller/create_stripe_connect_account',
    async () => {
        try {
            const { data: { url } } = await api.get(`/create-stripe-connect-account`)
            console.log(url);
            // window.location.href = url
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
            const { data } = await api.put(`/active-stripe-connect-account/${activeCode}`, {})
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
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
} = paymentSlice.actions

export default paymentSlice.reducer
